import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

type Platform = "windows" | "mac";
type Arch = "arm64" | "x64";

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

const ARCH_PATTERNS: Record<Arch, RegExp[]> = {
  arm64: [/arm64/i, /aarch64/i, /arm/i],
  x64: [/x64/i, /amd64/i, /x86_64/i, /win64/i, /intel/i],
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

const detectArch = (userAgent: string | null): Arch => {
  const ua = (userAgent ?? "").toLowerCase();
  if (ARCH_PATTERNS.arm64.some((pattern) => pattern.test(ua))) return "arm64";
  return "x64";
};

const parsePlatform = (raw: string | null): Platform | null => {
  if (!raw) return null;
  const value = raw.toLowerCase();
  if (value === "windows" || value === "win") return "windows";
  if (value === "mac" || value === "macos" || value === "darwin") return "mac";
  return null;
};

const parseArch = (raw: string | null): Arch | null => {
  if (!raw) return null;
  const value = raw.toLowerCase();
  if (value === "arm" || value === "arm64" || value === "aarch64") return "arm64";
  if (value === "x64" || value === "amd64" || value === "x86_64" || value === "intel") return "x64";
  return null;
};

const hasArchInName = (name: string, arch: Arch) => {
  return ARCH_PATTERNS[arch].some((pattern) => pattern.test(name));
};

const pickByPriority = <T>(
  list: T[],
  matchers: Array<(item: T) => boolean>,
): T | null => {
  for (const matcher of matchers) {
    const found = list.find(matcher);
    if (found) return found;
  }
  return null;
};

const findArtifactForPlatform = (
  artifacts: Artifact[],
  platform: Platform,
  arch: Arch,
) => {
  const activeArtifacts = artifacts.filter((artifact) => !artifact.expired);
  const isMacArtifact = (name: string) => /(mac|darwin|osx|dmg|pkg)/i.test(name);
  const isWindowsArtifact = (name: string) => /(win|windows|exe|setup|portable)/i.test(name);

  if (platform === "windows") {
    return pickByPriority(activeArtifacts, [
      (a) => /web[-_. ]?setup/i.test(a.name) && hasArchInName(a.name, arch),
      (a) => /web[-_. ]?setup/i.test(a.name),
      (a) => /portable/i.test(a.name) && hasArchInName(a.name, arch),
      (a) => /portable/i.test(a.name),
      (a) => isWindowsArtifact(a.name) && hasArchInName(a.name, arch),
      (a) => isWindowsArtifact(a.name),
    ]);
  }

  return pickByPriority(activeArtifacts, [
    (a) => /dmg/i.test(a.name) && hasArchInName(a.name, arch),
    (a) => /dmg/i.test(a.name),
    (a) => /pkg/i.test(a.name) && hasArchInName(a.name, arch),
    (a) => /pkg/i.test(a.name),
    (a) => /zip/i.test(a.name) && isMacArtifact(a.name) && hasArchInName(a.name, arch),
    (a) => /zip/i.test(a.name) && isMacArtifact(a.name),
  ]);
};

const resolveActionsDownloadUrl = async (
  platform: Platform,
  arch: Arch,
  token: string,
): Promise<string | null> => {
  const artifactsRes = await fetch(`${API_BASE}/actions/artifacts?per_page=100`, {
    headers: createGithubHeaders(token),
    cache: "no-store",
  });

  if (!artifactsRes.ok) return null;

  const artifactsData = (await artifactsRes.json()) as ArtifactsResponse;
  const artifact = findArtifactForPlatform(artifactsData.artifacts ?? [], platform, arch);
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

const resolveReleaseDownloadUrl = async (
  platform: Platform,
  arch: Arch,
): Promise<string | null> => {
  const releasesRes = await fetch(`${API_BASE}/releases?per_page=20`, {
    headers: createGithubHeaders(),
    cache: "no-store",
  });

  if (!releasesRes.ok) return null;

  const releases = (await releasesRes.json()) as Release[];
  const pickFromAssets = (assets: ReleaseAsset[]) => {
    const isWinExe = (name: string) => /\.exe$/i.test(name);
    const isMacDmg = (name: string) => /\.dmg$/i.test(name);
    const isMacPkg = (name: string) => /\.pkg$/i.test(name);
    const isMacZip = (name: string) => /\.zip$/i.test(name) && /(mac|darwin|osx|universal)/i.test(name);

    if (platform === "windows") {
      return pickByPriority(assets, [
        (a) => /luie[-_. ]?web[-_. ]?setup/i.test(a.name) && isWinExe(a.name) && hasArchInName(a.name, arch),
        (a) => /luie[-_. ]?web[-_. ]?setup/i.test(a.name) && isWinExe(a.name),
        (a) => /luie[-_. ]?portable/i.test(a.name) && isWinExe(a.name) && hasArchInName(a.name, arch),
        (a) => /luie[-_. ]?portable/i.test(a.name) && isWinExe(a.name),
        (a) => isWinExe(a.name) && hasArchInName(a.name, arch),
        (a) => isWinExe(a.name),
      ]);
    }

    return pickByPriority(assets, [
      (a) => isMacDmg(a.name) && hasArchInName(a.name, arch),
      (a) => isMacDmg(a.name),
      (a) => isMacPkg(a.name) && hasArchInName(a.name, arch),
      (a) => isMacPkg(a.name),
      (a) => isMacZip(a.name) && hasArchInName(a.name, arch),
      (a) => isMacZip(a.name),
    ]);
  };

  for (const release of releases) {
    const selected = pickFromAssets(release.assets ?? []);
    if (selected) return selected.browser_download_url;
  }

  return null;
};

export async function GET(request: NextRequest) {
  const headerList = await headers();
  const queryPlatform = parsePlatform(request.nextUrl.searchParams.get("os"));
  const queryArch = parseArch(request.nextUrl.searchParams.get("arch"));
  const platform = queryPlatform ?? detectPlatform(headerList.get("user-agent"));
  const arch = queryArch ?? detectArch(headerList.get("user-agent"));

  const token = process.env.GITHUB_TOKEN;
  const releaseUrl = await resolveReleaseDownloadUrl(platform, arch);
  const actionsUrl = token
    ? await resolveActionsDownloadUrl(platform, arch, token)
    : null;
  const targetUrl = releaseUrl ?? actionsUrl;

  if (targetUrl) {
    return NextResponse.redirect(targetUrl);
  }

  return NextResponse.json(
    {
      message:
        "다운로드 가능한 최신 빌드를 찾지 못했습니다. 잠시 후 다시 시도하거나 GitHub Actions/Release 상태를 확인해 주세요.",
      platform,
      arch,
    },
    { status: 404 },
  );
}
