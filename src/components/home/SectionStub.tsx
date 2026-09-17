import { cn } from "../../lib/cn";

type SectionStubProps = {
  id: string;
  number: string;
  title: string;
  hint?: string;
  className?: string;
};

/**
 * 앞으로 채워질 섹션의 자리 표시.
 * 앵커 내비게이션과 헤더 동작 검증용이며, 각 섹션 구현 시 교체된다.
 */
export function SectionStub({ id, number, title, hint, className }: SectionStubProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative flex min-h-[85vh] items-center justify-center px-6",
        className,
      )}
    >
      <div className="absolute inset-x-6 top-0 h-px bg-line" />
      <div className="text-center">
        <p className="text-sm font-medium tracking-[0.2em] text-accent-soft">{number}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
          {title}
        </h2>
        {hint && <p className="mt-3 text-base text-muted">{hint}</p>}
      </div>
    </section>
  );
}
