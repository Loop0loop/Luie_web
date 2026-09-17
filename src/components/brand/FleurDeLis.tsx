import { cn } from "../../lib/cn";

/**
 * 플뢰르드리스(백합 문장) 마크. 태양왕 루이 14세 모티프의 브랜드 심벌.
 * 가운데 꽃잎만 채우고 나머지는 선으로 표현한 미니멀 문장 형태다.
 */
export function FleurDeLis({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      <path
        d="M12 2.2C10.4 4.6 9.6 6.6 9.6 8.3c0 1.9.9 3.6 2.4 5 1.5-1.4 2.4-3.1 2.4-5 0-1.7-.8-3.7-2.4-6.1Z"
        fill="currentColor"
      />
      <path
        d="M9.8 9.2C7.8 8.1 5.6 8.4 4.3 9.9 3 11.4 3 13.5 4.4 14.9c1 1 2.5 1.3 3.9.9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M14.2 9.2c2-1.1 4.2-.8 5.5.7 1.3 1.5 1.3 3.6-.1 5-1 1-2.5 1.3-3.9.9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M6.4 18h11.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M12 16.2c-.9 1.3-1.3 2.4-1.3 3.3 0 1.1.5 2 1.3 2.7.8-.7 1.3-1.6 1.3-2.7 0-.9-.4-2-1.3-3.3Z"
        fill="currentColor"
      />
    </svg>
  );
}
