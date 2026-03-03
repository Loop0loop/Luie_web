import { NextRequest, NextResponse } from "next/server";

const DEFAULT_SITE_URL = "https://eluie.kro.kr";

const normalizeSupabaseOrigin = (rawUrl: string): string => {
  const parsed = new URL(rawUrl);
  parsed.pathname = "";
  parsed.search = "";
  parsed.hash = "";
  return parsed.origin;
};

export async function GET(request: NextRequest) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      {
        message: "SUPABASE_URL 또는 SUPABASE_KEY가 설정되지 않았습니다.",
      },
      { status: 500 },
    );
  }

  const provider = request.nextUrl.searchParams.get("provider") ?? "google";
  const state = request.nextUrl.searchParams.get("state") ?? crypto.randomUUID();
  const redirectTo =
    request.nextUrl.searchParams.get("redirect_to") ??
    `${DEFAULT_SITE_URL}/auth/callback`;

  let supabaseOrigin: string;

  try {
    supabaseOrigin = normalizeSupabaseOrigin(supabaseUrl);
  } catch {
    return NextResponse.json(
      {
        message: "SUPABASE_URL 형식이 올바르지 않습니다.",
      },
      { status: 500 },
    );
  }

  const authorizeUrl = new URL("/auth/v1/authorize", supabaseOrigin);
  authorizeUrl.searchParams.set("provider", provider);
  authorizeUrl.searchParams.set("redirect_to", redirectTo);
  authorizeUrl.searchParams.set("state", state);
  authorizeUrl.searchParams.set("apikey", supabaseKey);

  return NextResponse.json({
    authorizeUrl: authorizeUrl.toString(),
    state,
    redirectTo,
    provider,
    supabaseOrigin,
  });
}
