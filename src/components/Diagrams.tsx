import type { DiagramKind } from "@/content/types";

// Simplified architecture diagrams. Labels are generic; there is no client data in them.
// Each diagram has a wide layout and a narrow one, so text stays readable on a phone.

function Markers({ id }: { id: string }) {
  return (
    <defs>
      <marker id={`${id}-a`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L10 5 0 10z" className="head" />
      </marker>
      <marker id={`${id}-h`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0L10 5 0 10z" className="head hl" />
      </marker>
    </defs>
  );
}

function Box({
  x,
  y,
  w = 168,
  h = 62,
  title,
  sub,
  hl = false,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  title: string;
  sub?: string;
  hl?: boolean;
}) {
  const cx = x + w / 2;
  const titleY = sub ? y + h / 2 - 4 : y + h / 2 + 4;
  return (
    <g>
      <rect className={hl ? "box hl-box" : "box"} x={x} y={y} width={w} height={h} rx="14" />
      <text x={cx} y={titleY} textAnchor="middle">
        {title}
      </text>
      {sub ? (
        <text x={cx} y={titleY + 18} textAnchor="middle" className="t2">
          {sub}
        </text>
      ) : null}
    </g>
  );
}

const HILOL_DESC =
  "A customer's message arrives in the chat platform, Wazzup. A bridge relays it to the CRM, Bitrix24, and asks the routing service who should own the chat. The routing service keeps rules, conversation sessions and an ownership log in PostgreSQL, and pushes the owner back to Wazzup, so Bitrix24 shows the same person. The Nazorat panel compares the owners on Wazzup's contacts with the ownership log, counts faults, and sends safe repairs back through the routing service.";

function Hilol() {
  return (
    <>
      <svg className="diag d-only" viewBox="0 0 760 264" role="img" aria-label={HILOL_DESC}>
        <Markers id="hd" />
        <Box x={16} y={40} title="Chat platform" sub="Wazzup" />
        <Box x={296} y={40} title="Bridge" sub="relays · asks who owns" />
        <Box x={576} y={40} title="CRM" sub="Bitrix24" />
        <Box x={16} y={150} title="Nazorat panel" sub="faults · safe repairs" />
        <Box x={296} y={150} title="Routing service" sub="Node.js · the rules" hl />
        <Box x={576} y={150} title="PostgreSQL" sub="sessions · ownership log" />

        <line className="ar" x1="184" y1="71" x2="294" y2="71" markerEnd="url(#hd-a)" />
        <text className="lbl" x="239" y="62" textAnchor="middle">new message</text>
        <line className="ar" x1="464" y1="71" x2="574" y2="71" markerEnd="url(#hd-a)" />
        <text className="lbl" x="519" y="62" textAnchor="middle">relays the chat</text>
        <line className="ar" x1="380" y1="102" x2="380" y2="148" markerEnd="url(#hd-a)" />
        <text className="lbl" x="388" y="129">who owns it?</text>

        <path className="ar hl" d="M320 150 V126 H150 V104" markerEnd="url(#hd-h)" />
        <text className="lbl hl-t" x="235" y="119" textAnchor="middle">owner push</text>
        <line className="ar" x1="100" y1="102" x2="100" y2="148" markerEnd="url(#hd-a)" />
        <text className="lbl" x="92" y="129" textAnchor="end">contact owners</text>

        <line className="ar hl" x1="184" y1="181" x2="294" y2="181" markerEnd="url(#hd-h)" />
        <text className="lbl hl-t" x="239" y="172" textAnchor="middle">safe repairs</text>
        <line className="ar" x1="466" y1="181" x2="574" y2="181" markerStart="url(#hd-a)" markerEnd="url(#hd-a)" />
        <text className="lbl" x="520" y="172" textAnchor="middle">rules · history</text>
        <path className="ar" d="M660 212 V246 H100 V214" markerEnd="url(#hd-a)" />
        <text className="lbl" x="380" y="240" textAnchor="middle">ownership log</text>
      </svg>

      <svg className="diag m-only" viewBox="0 0 320 452" role="img" aria-label={HILOL_DESC}>
        <Markers id="hm" />
        <Box x={8} y={8} w={140} h={54} title="Chat platform" sub="Wazzup" />
        <Box x={172} y={8} w={140} h={54} title="CRM" sub="Bitrix24" />
        <Box x={90} y={100} w={140} h={54} title="Bridge" sub="relays · asks" />
        <Box x={90} y={196} w={140} h={54} title="Routing service" sub="the rules" hl />
        <Box x={90} y={292} w={140} h={54} title="PostgreSQL" sub="ownership log" />
        <Box x={90} y={388} w={140} h={54} title="Nazorat panel" sub="faults · repairs" />

        <line className="ar" x1="100" y1="62" x2="126" y2="98" markerEnd="url(#hm-a)" />
        <line className="ar" x1="194" y1="98" x2="220" y2="64" markerEnd="url(#hm-a)" />
        <line className="ar" x1="160" y1="154" x2="160" y2="194" markerEnd="url(#hm-a)" />
        <text className="lbl" x="168" y="179">who owns it?</text>
        <path className="ar hl" d="M90 223 H40 V64" markerEnd="url(#hm-h)" />
        <text className="lbl hl-t" x="46" y="176">owner</text>
        <text className="lbl hl-t" x="46" y="189">push</text>
        <path className="ar" d="M18 62 V415 H88" markerEnd="url(#hm-a)" />
        <text className="lbl" x="26" y="330">contact</text>
        <text className="lbl" x="26" y="343">owners</text>
        <line className="ar" x1="160" y1="252" x2="160" y2="290" markerStart="url(#hm-a)" markerEnd="url(#hm-a)" />
        <line className="ar" x1="160" y1="346" x2="160" y2="386" markerEnd="url(#hm-a)" />
        <text className="lbl" x="168" y="371">log</text>
        <path className="ar hl" d="M230 415 H290 V223 H232" markerEnd="url(#hm-h)" />
        <text className="lbl hl-t" x="284" y="312" textAnchor="end">safe</text>
        <text className="lbl hl-t" x="284" y="325" textAnchor="end">repairs</text>
      </svg>
    </>
  );
}

const CLINIC_DESC =
  "Four sources — Meta Ads, Moizvonki and OnlinePBX telephony, and the Bitrix24 CRM — feed a sync service that uses full pulls, a 45-second incremental tick and webhooks. The sync service writes into a PostgreSQL mirror, which the dashboard reads. Three times a day a monitor compares the mirror's counts with Bitrix24, asks the sync service to repair the gaps it can (leads and deals by ID, calls by re-pulling recent days), and posts a report to Telegram.";

function Clinic() {
  const sources = ["Meta Ads", "Moizvonki", "OnlinePBX", "Bitrix24 CRM"];
  return (
    <>
      <svg className="diag d-only" viewBox="0 0 760 312" role="img" aria-label={CLINIC_DESC}>
        <Markers id="cd" />
        {sources.map((s, i) => (
          <Box key={s} x={16} y={24 + i * 52} w={150} h={40} title={s} />
        ))}
        <Box x={216} y={88} w={150} h={66} title="Sync service" sub="pulls · ticks · webhooks" hl />
        <Box x={416} y={88} w={150} h={66} title="PostgreSQL" sub="mirror" />
        <Box x={600} y={88} w={144} h={66} title="Dashboard" sub="leads · deals · calls" />
        <Box x={416} y={232} w={150} h={62} title="Monitor" sub="3× a day" />
        <Box x={600} y={232} w={144} h={62} title="Telegram" sub="report · alerts" />

        {sources.map((s, i) => (
          <line key={s} className="ar" x1="166" y1={44 + i * 52} x2="214" y2={104 + i * 12} markerEnd="url(#cd-a)" />
        ))}
        <line className="ar" x1="366" y1="121" x2="414" y2="121" markerEnd="url(#cd-a)" />
        <line className="ar" x1="566" y1="121" x2="598" y2="121" markerEnd="url(#cd-a)" />
        <line className="ar" x1="491" y1="154" x2="491" y2="230" markerStart="url(#cd-a)" markerEnd="url(#cd-a)" />
        <text className="lbl" x="499" y="196">counts</text>
        <path className="ar" d="M416 274 H91 V218" markerEnd="url(#cd-a)" />
        <text className="lbl" x="250" y="266" textAnchor="middle">compare with the CRM</text>
        <path className="ar hl" d="M436 232 V198 H291 V156" markerEnd="url(#cd-h)" />
        <text className="lbl hl-t" x="364" y="191" textAnchor="middle">repair gaps</text>
        <line className="ar" x1="566" y1="263" x2="598" y2="263" markerEnd="url(#cd-a)" />
      </svg>

      <svg className="diag m-only" viewBox="0 0 320 470" role="img" aria-label={CLINIC_DESC}>
        <Markers id="cm" />
        <rect className="box" x="40" y="8" width="240" height="66" rx="14" />
        <text x="160" y="35" textAnchor="middle">Bitrix24 · OnlinePBX</text>
        <text x="160" y="55" textAnchor="middle">Moizvonki · Meta Ads</text>
        <Box x={80} y={112} w={160} h={54} title="Sync service" sub="pulls · ticks · webhooks" hl />
        <Box x={80} y={204} w={160} h={54} title="PostgreSQL" sub="mirror" />
        <Box x={80} y={296} w={160} h={54} title="Dashboard" sub="leads · deals · calls" />
        <Box x={8} y={398} w={136} h={54} title="Telegram" sub="report" />
        <Box x={176} y={398} w={136} h={54} title="Monitor" sub="3× a day" />

        <line className="ar" x1="160" y1="74" x2="160" y2="110" markerEnd="url(#cm-a)" />
        <line className="ar" x1="160" y1="166" x2="160" y2="202" markerEnd="url(#cm-a)" />
        <line className="ar" x1="160" y1="258" x2="160" y2="294" markerEnd="url(#cm-a)" />
        <path className="ar" d="M240 231 H296 V396" markerEnd="url(#cm-a)" />
        <text className="lbl" x="290" y="290" textAnchor="end">counts</text>
        <line className="ar" x1="176" y1="425" x2="146" y2="425" markerEnd="url(#cm-a)" />
        <path className="ar hl" d="M200 398 V376 H24 V139 H78" markerEnd="url(#cm-h)" />
        <text className="lbl hl-t" x="30" y="252">repair</text>
        <text className="lbl hl-t" x="30" y="265">gaps</text>
      </svg>
    </>
  );
}

const APPLEKOR_DESC =
  "Three roles use one Next.js app: a finder who buys phones in Korea, a manager who prices, approves and runs the finances, and a seller in the shop. The app checks each role on the server. Money goes through one cash ledger stored as integers, where each movement is posted once; everything that needs attention becomes a task for the right role in a single Tasks bell; receipts are kept in private storage. Cost prices never reach sellers or finders.";

function Applekor() {
  const roles = [
    { t: "Finder", s: "buys in Korea" },
    { t: "Manager", s: "prices · approves" },
    { t: "Seller", s: "sells in the shop" },
  ];
  const parts = [
    { t: "Cash ledger", s: "integer money · posted once" },
    { t: "Tasks bell", s: "computed per role" },
    { t: "Receipts", s: "private storage" },
  ];
  return (
    <>
      <svg className="diag d-only" viewBox="0 0 760 306" role="img" aria-label={APPLEKOR_DESC}>
        <Markers id="ad" />
        {roles.map((r, i) => (
          <Box key={r.t} x={16} y={20 + i * 92} w={160} h={62} title={r.t} sub={r.s} />
        ))}
        <Box x={286} y={110} w={188} h={74} title="Next.js app" sub="role checked on the server" hl />
        {parts.map((p, i) => (
          <Box key={p.t} x={556} y={20 + i * 92} w={188} h={62} title={p.t} sub={p.s} />
        ))}
        {roles.map((r, i) => (
          <line key={r.t} className="ar" x1="176" y1={51 + i * 92} x2="284" y2={133 + i * 14} markerEnd="url(#ad-a)" />
        ))}
        {parts.map((p, i) => (
          <line key={p.t} className={i === 1 ? "ar hl" : "ar"} x1="474" y1={133 + i * 14} x2="554" y2={51 + i * 92} markerEnd={i === 1 ? "url(#ad-h)" : "url(#ad-a)"} />
        ))}
        <text className="lbl" x="16" y="296">cost prices never reach finders or sellers</text>
      </svg>

      <svg className="diag m-only" viewBox="0 0 320 330" role="img" aria-label={APPLEKOR_DESC}>
        <Markers id="am" />
        {roles.map((r, i) => (
          <Box key={r.t} x={8 + i * 104} y={8} w={96} h={54} title={r.t} sub={["Korea", "office", "shop"][i]} />
        ))}
        <Box x={70} y={128} w={180} h={62} title="Next.js app" sub="role checked on the server" hl />
        {parts.map((p, i) => (
          <Box key={p.t} x={8 + i * 104} y={258} w={96} h={54} title={p.t.split(" ")[0] === "Cash" ? "Ledger" : p.t.split(" ")[0]} sub={["posted once", "per role", "private"][i]} />
        ))}
        {[0, 1, 2].map((i) => (
          <line key={`u${i}`} className="ar" x1={56 + i * 104} y1="62" x2={130 + i * 30} y2="126" markerEnd="url(#am-a)" />
        ))}
        {[0, 1, 2].map((i) => (
          <line key={`d${i}`} className={i === 1 ? "ar hl" : "ar"} x1={130 + i * 30} y1="190" x2={56 + i * 104} y2="256" markerEnd={i === 1 ? "url(#am-h)" : "url(#am-a)"} />
        ))}
      </svg>
    </>
  );
}

export default function Diagram({ kind, caption }: { kind: DiagramKind; caption: string }) {
  return (
    <figure className="card text fig">
      <div className="fig-h">
        <strong>Architecture, simplified</strong>
        <span className="pill">Generic labels</span>
      </div>
      {kind === "hilol" ? <Hilol /> : kind === "clinic" ? <Clinic /> : <Applekor />}
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
