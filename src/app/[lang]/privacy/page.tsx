import { getDictionary } from "@/lib/dictionary";

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <main className="bg-background py-24 lg:py-32">
      <div className="container max-w-3xl px-6">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-12">
          {dictionary.footer.privacy}
        </h1>

        <div className="prose prose-zinc dark:prose-invert max-w-none text-muted-foreground leading-loose">
          <p>
            loop(이하 &quot;회사&quot;)는 회원 관리, 서비스 제공, AI 기능 개선, 통계 분석, 고객 지원, 안내, 그리고 사용자 피드백 수집을 목적으로 개인정보를 수집·이용합니다.
          </p>

          <h2 className="text-foreground font-bold mt-10 mb-4 text-xl">1. 수집하는 개인정보 항목 및 수집 방법</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>회원 가입 시:</strong> 아이디, 이메일 주소</li>
            <li><strong>수집 방법:</strong> 회원 가입, 서비스 이용, 이벤트 참여 등 직접 입력 및 PC 애플리케이션과 웹사이트를 통한 자동 수집(기기 정보, 쿠키, 로그 데이터 등)</li>
          </ul>

          <h2 className="text-foreground font-bold mt-10 mb-4 text-xl">2. 개인정보의 보유 및 이용 기간</h2>
          <p>
            회사는 법령에 따른 개인정보 보유, 이용 기간 또는 정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보 보유, 이용 기간 내에서 개인정보를 처리, 보유합니다. 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>아이디 / 이름 / 이메일 주소:</strong> 회원 탈퇴 시까지</li>
            <li><strong>서비스 이용 기록:</strong> 서비스 종료 시까지</li>
          </ul>

          <h2 className="text-foreground font-bold mt-10 mb-4 text-xl">3. 사용자 피드백 활용</h2>
          <p>
            회사는 서비스 개선 및 신규 기능 도입을 위해 사용자 피드백 수집을 목적으로 회원가입 시 제공된 이메일 및 연락처 정보를 활용할 수 있습니다. 이 경우, 개인정보는 해당 목적에 한해서만 사용됩니다.
          </p>

          <h2 className="text-foreground font-bold mt-10 mb-4 text-xl">4. 개인정보의 제3자 제공 및 위탁</h2>
          <p>
            회사는 회원의 개인정보를 원칙적으로 제3자에게 제공하지 않습니다. 단, 서비스 제공을 위해 필요한 경우(예: 클라우드 서비스 제공업체 등) 회원의 동의를 받은 후 제3자에게 위탁하며, 위탁 계약을 통해 안전하게 관리합니다.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Google, Microsoft:</strong> 사용데이터 분석</li>
            <li><strong>AWS:</strong> 클라우드 서비스 제공</li>
            <li><strong>Sentry:</strong> 버그 분석</li>
          </ul>

          <h2 className="text-foreground font-bold mt-10 mb-4 text-xl">5. 관련법령에 의한 정보 보유기간</h2>
          <ul className="list-disc pl-6 space-y-4">
            <li>
              <strong>계약 또는 청약철회 등에 관한 기록</strong>
              <br />보존 이유: 전자상거래 등에서의 소비자보호에 관한 법률
              <br />보존 기간: 5년
            </li>
            <li>
              <strong>대금결제 및 재화 등의 공급에 관한 기록</strong>
              <br />보존 이유: 전자상거래 등에서의 소비자보호에 관한 법률
              <br />보존 기간: 5년
            </li>
            <li>
              <strong>전자금융 거래에 관한 기록</strong>
              <br />보존 이유: 전자금융거래법
              <br />보존 기간: 5년
            </li>
            <li>
              <strong>소비자의 불만 또는 분쟁처리에 관한 기록</strong>
              <br />보존 이유: 전자상거래 등에서의 소비자보호에 관한 법률
              <br />보존 기간: 3년
            </li>
          </ul>

          <h2 className="text-foreground font-bold mt-10 mb-4 text-xl">6. 개인정보 보호를 위한 기술적·관리적 대책</h2>
          <p>
            개인정보는 암호화 및 접근 통제 시스템을 통해 보호되며, 정기적인 보안 점검 및 내부 관리 대책을 시행합니다.
          </p>

          <h2 className="text-foreground font-bold mt-10 mb-4 text-xl">7. 쿠키의 사용</h2>
          <p>
            회사는 맞춤형 서비스 제공 및 통계 분석을 위해 쿠키를 사용합니다. 이용자는 웹 브라우저 설정을 통해 쿠키 사용을 거부할 수 있으나, 이 경우 서비스 이용에 일부 제한이 있을 수 있습니다.
          </p>

          <h2 className="text-foreground font-bold mt-10 mb-4 text-xl">8. 이용자의 권리와 행사 방법</h2>
          <p>
            이용자는 언제든지 개인정보의 열람, 정정, 삭제, 처리 정지를 요청할 수 있으며, 관련 요청은 고객센터(이메일: <a href="mailto:sakills914@gmail.com" className="text-foreground underline">sakills914@gmail.com</a>)로 문의하시면 됩니다.
          </p>

          <h2 className="text-foreground font-bold mt-10 mb-4 text-xl">9. 개인정보처리방침 변경</h2>
          <p>
            본 방침의 변경 시에는 회사 홈페이지 및 기타 공지 수단을 통해 사전에 고지하며, 변경된 내용은 고지일로부터 효력을 발생합니다.
          </p>

          <div className="mt-16 pt-8 border-t border-border text-sm">
            <p><strong>[부칙]</strong></p>
            <p>본 개인정보처리방침은 2026년 2월 23일부터 시행합니다.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
