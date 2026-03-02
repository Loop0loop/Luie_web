import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.search;
  const deepLink = `luie://auth/callback${query}`;

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Luie 인증 연결</title>
  </head>
  <body>
    <script>
      window.location.replace(${JSON.stringify(deepLink)});
    </script>
    <p>Luie 앱으로 돌아가는 중입니다...</p>
  </body>
</html>`;

  return new NextResponse(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
