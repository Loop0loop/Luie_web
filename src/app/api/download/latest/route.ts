import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

type Platform = "windows" | "mac";

type Artifact = {
  name: string;
  expired: boolean;
  archive_download_url: string;
};

type ArtifactsResponse = {
  artifacts: Artifact[];
};

type ReleaseAsset = {
  name: string;
  browser_download_url: string;
};

type Release = {
  assets: ReleaseAsset[];
};

const REPO_OWNER = process.env.GITHUB_REPO_OWNER ?? "Loop0loop";
const REPO_NAME = process.env.GITHUB_REPO_NAME ?? "Luie";
const API_BASE = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`;

const PLATFORM_PATTERNS: Record<Platform, RegExp[]> = {
  windows: [/windows/i, /win/i, /exe/i],
  mac: [/mac/i, /darwin/i, /dmg/i],
};

const RELEASE_PATTERNS: Record<Platform, RegExp> = {
  windows: /\.(exe|msi|zip)$/i,
  mac: /\.(dmg|pkg|zip)$/i,
};

const createGithubHeaders = (token?: string): HeadersInit => ({
  Accept: "application/vnd.github+json",
  "User-Agent": "luie-web-download-proxy",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
});

const detectPlatform = (userAgent: string | null): Platform => {
  const ua = (userAgent ?? "").toLowerCase();
  if (ua.includes("windows")) return "windows";
  return "mac";
};

const parsePlatform = (raw: string | null): Platform | null => {
  if (!raw) return null;
  const value = raw.toLowerCase();
  if (value === "windows" || value === "win") return "windows";
  if (value === "mac" || value === "macos" || value === "darwin") return "mac";
  return null;
};

const findArtifactForPlatform = (artifacts: Artifact[], platform: Platform) => {
  const patterns = PLATFORM_PATTERNS[platform];
  return artifacts.find((artifact) => {
    if (artifact.expired) return false;
    return patterns.some((pattern) => pattern.test(artifact.name));
  });
};

const resolveActionsDownloadUrl = async (
  platform: Platform,
  token: string,
): Promise<string | null> => {
  const artifactsRes = await fetch(`${API_BASE}/actions/artifacts?per_page=100`, {
    headers: createGithubHeaders(token),
    cache: "no-store",
  });

  if (!artifactsRes.ok) return null;

  const artifactsData = (await artifactsRes.json()) as ArtifactsResponse;
  const artifact = findArtifactForPlatform(artifactsData.artifacts ?? [], platform);
  if (!artifact) return null;

  const signedRes = await fetch(artifact.archive_download_url, {
    headers: createGithubHeaders(token),
    redirect: "manual",
    cache: "no-store",
  });

  if (signedRes.status >= 300 && signedRes.status < 400) {
    return signedRes.headers.get("location");
  }

  return null;
};

const resolveReleaseDownloadUrl = async (platform: Platform): Promise<string | null> => {
  const releasesRes = await fetch(`${API_BASE}/releases?per_page=20`, {
    headers: createGithubHeaders(),
    cache: "no-store",
  });

  if (!releasesRes.ok) return null;

  const releases = (await releasesRes.json()) as Release[];
  const extensionPattern = RELEASE_PATTERNS[platform];

  for (const release of releases) {
    for (const asset of release.assets ?? []) {
      if (!extensionPattern.test(asset.name)) continue;
      if (platform === "mac" && !/(mac|darwin|dmg)/i.test(asset.name)) continue;
      if (platform === "windows" && !/(win|windows|setup|exe)/i.test(asset.name)) continue;
      return asset.browser_download_url;
    }
  }

  return null;
};

export async function GET(request: NextRequest) {
  const headerList = await headers();
  const queryPlatform = parsePlatform(request.nextUrl.searchParams.get("os"));
  const platform = queryPlatform ?? detectPlatform(headerList.get("user-agent"));

  const token = process.env.GITHUB_TOKEN;
  const actionsUrl = token
    ? await resolveActionsDownloadUrl(platform, token)
    : null;

  const releaseUrl = await resolveReleaseDownloadUrl(platform);
  const targetUrl = actionsUrl ?? releaseUrl;

  if (targetUrl) {
    return NextResponse.redirect(targetUrl);
  }

  return NextResponse.json(
    {
      message:
        "다운로드 가능한 최신 빌드를 찾지 못했습니다. 잠시 후 다시 시도하거나 GitHub Actions/Release 상태를 확인해 주세요.",
      platform,
    },
    { status: 404 },
  );
}
