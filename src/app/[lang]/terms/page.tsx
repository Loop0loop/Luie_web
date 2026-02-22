import { getDictionary } from "@/lib/dictionary";

export default async function TermsOfServicePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <main className="min-h-screen bg-background py-24 lg:py-32">
      <div className="container max-w-3xl px-6">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-12">
          {dictionary.footer.terms}
        </h1>

        <div className="prose prose-zinc dark:prose-invert max-w-none text-muted-foreground leading-loose">
          <h2 className="text-foreground font-bold mt-10 mb-4 text-xl">제 1 조 (목적)</h2>
          <p>
            본 약관은 loop(이하 &quot;회사&quot;)가 제공하는 PC용 작가 워드프로세서 (이하 &quot;Luie&quot;)의 이용 조건 및 절차, 회원과 회사의 권리·의무 등 기본적인 사항을 규정함을 목적으로 합니다.
          </p>

          <h2 className="text-foreground font-bold mt-10 mb-4 text-xl">제 2 조 (정의)</h2>
          <ul className="list-decimal pl-6 space-y-2">
            <li><strong>&quot;회원&quot;</strong>이라 함은 본 약관에 따라 회사와 이용계약을 체결하고 서비스를 이용하는 자를 말합니다.</li>
            <li><strong>&quot;비회원&quot;</strong>이라 함은 회원 가입 없이 서비스를 이용하는 자를 말합니다.</li>
            <li><strong>&quot;AI 분석기능&quot;</strong>이라 함은 인공지능 기술을 활용하여 피드백 및 교정, 등을 제공하는 서비스를 의미합니다.</li>
          </ul>

          <h2 className="text-foreground font-bold mt-10 mb-4 text-xl">제 3 조 (약관의 효력 및 변경)</h2>
          <ul className="list-decimal pl-6 space-y-2">
            <li>본 약관은 회원이 서비스 가입 시 체크박스를 클릭함으로써 효력이 발생합니다.</li>
            <li>회사는 관련 법률 및 정책에 따라 본 약관을 변경할 수 있으며, 변경된 약관은 홈페이지에 공지하거나 이메일 등으로 통지합니다.</li>
          </ul>

          <h2 className="text-foreground font-bold mt-10 mb-4 text-xl">제 4 조 (서비스의 제공 및 변경)</h2>
          <ul className="list-decimal pl-6 space-y-2">
            <li>회사는 AI 분석기능, 텍스트 편집 도구, 문서 저장 및 공유 기능 등 다양한 서비스를 제공합니다.</li>
            <li>회사는 서비스의 개선 및 보안을 위해 서비스의 일부 또는 전부를 변경하거나 중단할 수 있으며, 이로 인한 책임은 회사의 귀책 사유가 없는 한 면책됩니다.</li>
          </ul>

          <h2 className="text-foreground font-bold mt-10 mb-4 text-xl">제 5 조 (회원 가입 및 계정 관리)</h2>
          <ul className="list-decimal pl-6 space-y-2">
            <li>회원 가입은 회사가 정한 절차에 따르며, 가입 시 정확한 정보를 제공하여야 합니다.</li>
            <li>회원은 본인의 계정 및 비밀번호 관리에 책임을 지며, 제3자에게 이를 양도하거나 공유할 수 없습니다.</li>
          </ul>

          <h2 className="text-foreground font-bold mt-10 mb-4 text-xl">제 6 조 (회원의 의무 및 금지 행위)</h2>
          <ul className="list-decimal pl-6 space-y-2">
            <li>회원은 서비스를 이용할 때 관계 법령 및 본 약관을 준수하여야 합니다.</li>
            <li>
              다음 행위는 금지되며, 위반 시 서비스 이용 제한 등의 조치를 받을 수 있습니다:
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>불법 정보의 게시 또는 전송</li>
                <li>타인의 명예 또는 저작권을 침해하는 행위</li>
                <li>서비스를 악의적으로 이용하여 타인에게 피해를 주는 행위</li>
                <li>시스템을 교란시키거나, 자동화 도구로서 대량의 비정상적인 콘텐츠를 생성하는 행위</li>
              </ul>
            </li>
            <li>회사는 회원의 이용 제한에 의한 피해에 책임지지 않습니다.</li>
          </ul>

          <h2 className="text-foreground font-bold mt-10 mb-4 text-xl">제 7 조 (저작권 및 지식재산권)</h2>
          <ul className="list-decimal pl-6 space-y-2">
            <li>서비스 내 제공되는 모든 콘텐츠 및 소프트웨어의 저작권은 회사 또는 정당한 권리자로부터 사용 허락을 받은 자에게 귀속됩니다.</li>
            <li>회원이 생성한 콘텐츠에 대해서는 회원 본인에게 저작권이 있으며, 상업적 활용이 가능합니다. 회사는 서비스 개선 목적으로 해당 데이터를 활용할 수 있습니다.</li>
          </ul>

          <h2 className="text-foreground font-bold mt-10 mb-4 text-xl">제 8 조 (환불 규정)</h2>
          <ul className="list-decimal pl-6 space-y-4">
            <li>서비스의 특성상 일부 환불은 제한될 수 있으므로, 정책에 명시된 조건에 따라 처리됩니다.</li>
            <li>
              <strong>환불 신청 가능 기간</strong>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>구독 서비스의 첫 결제일로부터 7일 이내에 환불 요청을 하실 수 있습니다.</li>
                <li>이 기간이 경과된 경우, 단순 변심에 의한 환불은 불가합니다.</li>
              </ul>
            </li>
            <li>
              <strong>환불 조건</strong>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>결제 관련 오류: 중복 결제나 결제 과정의 오류가 확인될 경우, 고객 지원팀을 통해 환불 처리합니다.</li>
                <li>서비스 품질 문제: 기능상 심각한 오류가 장시간 발생한 경우, 고객 지원팀에서 검토 후 환불 요청을 승인할 수 있습니다.</li>
                <li>단순 변심: 초기 7일 이내에 신청된 단순 변심에 따른 환불은 전액 환불 대상이나, AI 기능 사용 횟수가 500회 이상의 경우, 부분 환불이 이루어질 수 있습니다.</li>
              </ul>
            </li>
            <li>
              <strong>환불 절차</strong>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>환불 요청은 이메일(<a href="mailto:sakills914@gmail.com" className="text-foreground underline">sakills914@gmail.com</a>)을 통해 신청할 수 있습니다.</li>
                <li>요청 시, 계정 아이디, 이메일 주소, 환불 사유 및 관련 증빙 자료(필요시)를 함께 제출해주십시오.</li>
              </ul>
            </li>
            <li>
              <strong>예외 사항</strong>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>할인된 상품은 할인된 금액을 제하고 지불한 금액에 한하여 환불됩니다.</li>
                <li>구독 기간 중 사용한 서비스에 대해 지난일수에 비례하여 환불이 제한될 수 있습니다. (예시: 구독 시작 후 10일 후 환불 요청을 하실 경우, 2/3에 해당하는 금액만 환불될 수 있습니다.)</li>
              </ul>
            </li>
            <li>환불 규정은 회사의 자유 사항이며, 회사는 이용약관을 수정하여 환불 규정을 변경할 수 있습니다.</li>
          </ul>

          <h2 className="text-foreground font-bold mt-10 mb-4 text-xl">제 9 조 (책임의 한계 및 면책조항)</h2>
          <ul className="list-decimal pl-6 space-y-2">
            <li>회사는 서비스 제공과 관련하여 회원에게 발생한 손해에 대하여 고의 또는 중대한 과실이 없는 한 책임을 지지 않습니다.</li>
            <li>AI 분석기능은 참고용으로 제공되며, 그로 인한 분석 오류 또는 결과에 대해서 회사는 어떠한 책임도 부담하지 않습니다.</li>
          </ul>

          <h2 className="text-foreground font-bold mt-10 mb-4 text-xl">제 10 조 (분쟁 해결 및 준거법)</h2>
          <ul className="list-decimal pl-6 space-y-2">
            <li>본 약관과 관련된 분쟁은 대한민국 법률에 따르며, 관할 법원은 서울중앙지방법원(또는 회사 소재지의 관할 법원)으로 합니다.</li>
          </ul>

          <h2 className="text-foreground font-bold mt-10 mb-4 text-xl">제 11 조 (기타)</h2>
          <ul className="list-decimal pl-6 space-y-2">
            <li>본 약관에 명시되지 않은 사항은 관련 법령 및 상관례에 따릅니다.</li>
            <li>회원이 서비스를 이용함으로써 본 약관의 모든 내용에 동의한 것으로 간주됩니다.</li>
          </ul>

          <div className="mt-16 pt-8 border-t border-border text-sm">
            <p><strong>[부칙]</strong></p>
            <p>본 약관은 2026년 2월 23일부터 시행합니다.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
