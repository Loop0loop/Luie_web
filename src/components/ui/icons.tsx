import { cn } from "../../lib/cn";

type IconProps = {
  className?: string;
};

export function DownloadIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("size-4", className)}
    >
      <path d="M8 2v8m0 0 3-3M8 10 5 7M2.5 13.5h11" />
    </svg>
  );
}

export function ChevronDownIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("size-4", className)}
    >
      <path d="m3.5 6 4.5 4.5L12.5 6" />
    </svg>
  );
}
