/**
 * GL식 smoothstep. edge 구간 밖은 0/1로 클램프한다.
 * 스크롤 페이드 곡선 등 부드러운 보간에 쓴다.
 */
export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}
