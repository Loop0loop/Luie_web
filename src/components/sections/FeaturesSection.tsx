import { SectionStub } from "../home/SectionStub";

/**
 * 히어로 행성의 밤면 — 접합선 아래에서 어두워지며 밤에 잠기는 몸체.
 *
 * 히어로 행성(지름 296vh)은 화면 폭 전체라 아랫 아치로 원을 닫으면 렌즈(계란)가
 * 된다. 대신 캔버스 절단면 아래에서 같은 톤의 몸체가 이어지다가 아래로 어두워지며
 * 배경으로 완전히 잠긴다 — 아랫 경계 자체가 없으므로 화면을 지나 가는 행성의
 * 밤면이 된다(macOS 지구 밤면과 같은 논리). 셰이더는 시임 없이 캔버스 끝까지
 * 광구 색을 유지하므로 접합부는 톤 매칭만으로 이어진다.
 */
function PlanetNightfall() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[60vh]"
      style={{
        // 좌우 에지는 셰이더 행성 하단 모서리의 림 음영에 맞춰 살짝 어둡게.
        background:
          "radial-gradient(140% 90% at 50% 0%, rgba(0, 0, 0, 0) 55%, rgba(8, 3, 2, 0.45) 100%), linear-gradient(to bottom, rgb(50, 19, 8) 0%, rgb(34, 13, 7) 30%, rgb(19, 7, 5) 62%)",
        // 아랫 경계 없음 — 마스크로 배경에 완전히 잠긴다.
        WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 38%, transparent 88%)",
        maskImage: "linear-gradient(to bottom, black 0%, black 38%, transparent 88%)",
      }}
    />
  );
}

/**
 * 02 기능 소개 섹션. 상단의 행성 밤면이 히어로 전환을 잇고, 이후 실제
 * 콘텐츠가 그 잔광 위에 앉는 구조로 교체된다.
 */
export function FeaturesSection() {
  return (
    <div className="relative isolate">
      <PlanetNightfall />
      <SectionStub
        id="features"
        number="02"
        title="Luie의 기능들"
        hint="UI와 기능을 번호로 소개합니다"
        divider={false}
      />
    </div>
  );
}
