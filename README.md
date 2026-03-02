# Luie_web

## GitHub Actions 최신 빌드 다운로드 연동

사이트의 다운로드 버튼은 ` /api/download/latest ` 엔드포인트를 호출하고,
접속한 브라우저의 OS(User-Agent)를 기준으로 mac/windows 파일을 자동 분기합니다.

### 필수 환경변수

- `GITHUB_TOKEN` (권장: Fine-grained PAT, `Actions: Read` / `Contents: Read`)
- `GITHUB_REPO_OWNER` (기본값: `Loop0loop`)
- `GITHUB_REPO_NAME` (기본값: `Luie`)

### 동작 우선순위

1. GitHub Actions 아티팩트(최신, OS 매칭)
2. GitHub Release 자산(OS 매칭) fallback

> 참고: 현재 저장소 상태에서 mac용 최신 아티팩트가 없으면,
> 가장 최신으로 발견되는 mac 릴리스 자산(.dmg)으로 fallback 됩니다.
