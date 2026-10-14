// Every sentence here was checked against the repositories, commit history and development logs.
// Optional fields (job title, dates, email…) are left out until confirmed, and the layout copes without them.
import type {
  ContactLink,
  EducationItem,
  ExperienceItem,
  Fact,
  MoreWork,
  Project,
  SkillGroup,
  WorkStep,
} from "./types";

export const profile = {
  name: "Abdulloh Talibov",
  initials: "AT",
  headline: "Software Engineer · CRM Integrations & Data Systems",
  location: "Tashkent, Uzbekistan",
  timezone: "UTC+5",
  lead: "I connect CRMs, chat platforms, telephony and ad accounts into working systems, and check that the numbers they report agree with the source. AI coding agents write most of the code; I set the rules, check the results and make the key decisions.",
  description:
    "Software engineer in Tashkent building CRM integrations, analytics dashboards and business automation for schools, a clinic, retailers and other sales teams.",
};

export const heroFacts: Fact[] = [
  { label: "Now", value: "Data365, Tashkent" },
  { label: "Clients", value: "Schools · a clinic · retailers · a logistics company · a taxi fleet" },
  { label: "Studying", value: "Foundation year (CIFS), Westminster International University in Tashkent" },
];

export const about = {
  paragraphs: [
    "At Data365 I build CRM integrations, dashboards, reporting and business automation for organisations such as schools, clinics and sales teams. Most of my work sits between systems: the Bitrix24 CRM, the chat platform Wazzup, cloud telephony, Meta Ads, and the PostgreSQL database each dashboard reads from.",
    "I care about the details that decide whether a system and its numbers are trusted: what exactly counts as a sale, who owns a customer while their operator is on leave, and why a dashboard disagrees with the CRM.",
  ],
  facts: [
    { label: "Now", value: "Data365 — CRM integrations, analytics and automation" },
    { label: "Studying", value: "CIFS foundation programme (foundation year), Westminster International University in Tashkent" },
    { label: "Based in", value: "Tashkent, Uzbekistan (UTC+5)" },
    { label: "Interests", value: "Software and data engineering, databases, business analytics, applied AI" },
  ] satisfies Fact[],
};

export const howIWork = {
  intro:
    "I build with AI coding agents, mainly Claude Code and sometimes Codex, and they write nearly all of the code in my projects. My part is what they can't be trusted to do alone: understanding what the business needs, deciding the rules, finding out what is really happening, rejecting explanations that don't fit the facts, reviewing the result and deciding what ships.",
  steps: [
    {
      title: "Understand",
      text: "Turn a request, such as a client's forwarded message or a recorded walkthrough of their old app, into a precise requirement.",
      example:
        "On Applekor, labels were matched to the words in the client's walkthrough video in three rounds; in the last one I caught a core label that said “request money” where the client's word was “send money”.",
    },
    {
      title: "Define the rules",
      text: "Pin down exactly what counts, and define it in one place.",
      example:
        "For a clinic's deals report, my coding agent laid out three possible definitions of a sale. I chose “from the paid stage onward”, and every card, table and drill-down on that page reads that one rule.",
    },
    {
      title: "Investigate",
      text: "Count before explaining.",
      example:
        "When operators kept reporting customers changing hands, I asked the agent how often it was happening rather than discussing single cases. The count showed that one rule, which the agent had added itself, had caused 143 moves in a fortnight, so it was removed.",
    },
    {
      title: "Check explanations",
      text: "If an explanation contradicts a known fact, it is wrong until proven otherwise.",
      example:
        "I rejected the agent's claim that Wazzup kept reassigning chats: Wazzup names an operator only once, when a chat arrives. Checking its answers against the staff rota also caught explanations that were simply wrong.",
    },
    {
      title: "Review",
      text: "Look at the result myself before keeping it, and have changes challenged.",
      example:
        "I had Codex rework a clinic dashboard's deals layout, looked at it live, and had it reverted the same morning.",
    },
    {
      title: "Decide",
      text: "Choose what ships, and what doesn't.",
      example:
        "On Applekor I had approved a staff day-off feature, but removed it once I saw it wasn't in the client's walkthrough, and set the rule that we build only what the walkthrough describes.",
    },
  ] satisfies WorkStep[],
};

export const experience: ExperienceItem[] = [
  {
    org: "Data365",
    place: "Tashkent",
    summary: "Client projects: CRM integrations, analytics dashboards and business automation.",
    bullets: [
      "Clients include schools, a clinic, an education academy, retailers, a logistics company and a taxi fleet; I often work with a colleague.",
      "Connect the Bitrix24 CRM with chat (Wazzup), telephony (OnlinePBX, Moizvonki) and Meta Ads, and a taxi fleet's systems with the Yandex Fleet API. The data is mirrored into PostgreSQL so reports load fast and can be checked.",
      "Rebuild clients' existing reports from Yandex DataLens, a dashboard tool, in SQL and code, and check the new numbers against the CRM and the original reports.",
      "Add safeguards for live client data: scheduled checks against the CRM, monitoring that reports to Telegram, and a deploy check that refuses to overwrite unrecorded changes on the server. Before new work, bring any changes made directly on a server back into git.",
      "In colleagues' dashboards, trace numbers that disagree with the CRM to their cause (for example, leads silently rejected by a database constraint), and add checks that fail visibly when a sync is incomplete.",
      "Direct AI coding agents day to day: set the requirements and project rules they follow, review their changes and verify the results against live data.",
    ],
  },
];

export const projects: Project[] = [
  {
    slug: "hilol",
    name: "Hilol",
    title: "Customer-chat routing and an ownership control panel",
    card: "Customers of a book publisher and retailer order through Telegram chats. I owned the routing that shares those chats fairly among operators across working hours, days off and leave, and a control panel that counts ownership faults as they happen.",
    highlights: [
      "Decided the routing rules: working hours, leave, returning customers and “M3” hand-offs.",
      "Rejected explanations that contradicted how Wazzup assigns chats and asked for counts instead; the counting led to a stray server job that rewrote owners every 30 minutes.",
      "In production; 70 unit tests of the live rules pass; long-term stability not yet measured.",
    ],
    tone: "pink",
    status: "Ongoing",
    period: "Jul 2026 – present",
    tags: ["Wazzup", "Bitrix24", "Node.js", "PostgreSQL", "React"],
    summary:
      "A book publisher and retailer sells in its shops, online and through customer chats. The chats come in on Telegram through Wazzup and are tracked in Bitrix24. I owned the routing layer that decides which operator owns each customer, and Nazorat (Uzbek for “oversight”), a control panel built for staff to spot and repair ownership problems.",
    facts: [
      { label: "Role", value: "Owned the chat-routing layer: requirements, rule decisions, investigation and review" },
      { label: "Team", value: "One Data365 colleague until early September; AI coding agents wrote the code" },
      { label: "Period", value: "July 2026 – present (routing work since late August)" },
      { label: "Status", value: "In production; long-term stability not yet measured" },
    ],
    problem: [
      "A small team of operators shares the chats. Wazzup names an operator once, when a chat arrives, and Bitrix24 has assignment rules of its own; neither knew who was working that day, on a day off or on leave.",
      "So customers landed on operators who were off or on leave, and a customer who wrote in from a new number reached a stranger instead of the operator who had served them. Management also wanted reports it could trust: leads, calls, response times and sales credited to each operator.",
    ],
    responsibility: [
      "I owned the routing layer from requirements to production checks. I turned the rules into exact requirements — working hours, days off, leave, returning customers and hand-offs — brought the agents the problems operators reported, challenged their explanations and made the calls on rules and risky changes. For the riskiest rules, such as the “M3” hand-off (typing “M3” passes a chat to operator 3) and the phrases that close a chat, the agent checked each change against 60 days of real messages before it went live.",
      "Several rules were my own decisions: the system, not Wazzup or Bitrix24, decides who gets a new chat; a chat that arrives after 18:00 belongs to the next working day; a returning customer goes back to their own operator; each order counts on the day it arrived; and the control panel comes with fix buttons staff can use without me. The sales-credit rules came from the client's written specification.",
      "Early versions had faults of their own — for a few days in September one operator received a whole evening's chats — which were found by counting and fixed.",
    ],
    credits: [
      {
        who: "Me",
        text: "Requirements and rule decisions; directing the work on availability and distribution, conversation sessions, returning customers, the “M3” hand-off, an ownership history log, the Nazorat panel, chat lifecycle and morning reminders, the monthly report and sales credited per operator; directing the ownership investigation; asking for a test suite.",
      },
      {
        who: "Colleague",
        text: "Until early September: the React app shell, the login and roles backend, the deals sync, chat-analytics caching, the per-operator view inside Bitrix24, and the distribution page's live chat split, what-if preview and log of share changes. The sync service and its “largest deficit first” distributor began as that colleague's code in an earlier project; I extended them.",
      },
      {
        who: "AI agents",
        text: "Wrote nearly all of the code, chose and ran most of the measurements, deployed most fixes, proposed the single ownership path, the unit tests and the alerts, and found the stray server job. Codex wrote parts of the monthly-report screen.",
      },
      {
        who: "Existing code",
        text: "The Wazzup–Bitrix24 bridge arrived already written; I changed how it assigns chats.",
      },
    ],
    howTitle: "How it works",
    howItWorks: [
      "Messages arrive in Wazzup. A bridge relays them to Bitrix24 and asks the routing service who should own a new chat; a copy of each message also goes straight to the routing service.",
      "The routing service (Node.js and PostgreSQL) gives a new chat to the working operator furthest below their target share. A chat that arrives after the 18:00 close belongs to the next working day.",
      "A returning customer goes back to their own operator if that operator works that day. A customer or operator who types “M3” hands the chat to operator 3, and that choice is pinned.",
      "Hand-offs, rule-based moves and repairs are recorded with their reason in one history table, and the new owner is pushed to Wazzup so Bitrix24 shows the same person. Repairs go through one function that refuses accounts that may not own a chat, such as management.",
      "Bitrix24's own assignment can't be switched off, so the system re-asserts its choice when Bitrix overrides it, at most five times per lead.",
      "Nazorat compares the database with Wazzup's contact list and counts each kind of fault — chats with no owner, customers waiting on an operator who is off, the CRM and the database disagreeing, unusual churn — and offers a repair button only where a repair is safe: at most 25 chats per click, logged, and never touching a chat someone pinned.",
    ],
    diagram: "hilol",
    diagramCaption: "Simplified data flow; a copy of each message also reaches the routing service directly. Labels are generic; no client data is shown.",
    decision: {
      title: "Which explanation to trust",
      paragraphs: [
        "From early September, operators reported customers switching to another operator in the middle of a conversation. Several causes were real and were fixed one by one, including a recurring check I had asked for myself, which pushed chats onto operators who were off. But the AI agent kept blaming the rest on Wazzup — first a round-robin (rotating assignment), then a periodic sync — and drafted a support ticket.",
        "I had set up Wazzup myself, and it names an operator only once, when a new chat arrives. I had said so on 14 September, but we didn't act on it for another week. On 22 September I asked for counts instead of case-by-case answers: how many times was this happening? The count showed, for example, that Wazzup named the last person to reply in only 1 of 130 disagreements, which disproved the premise of a rule the agent had added, so the rule was removed.",
        "Within about an hour I rejected two opposite conclusions: that owners weren't changing at all (sampling every minute then showed about 50 changes a minute), and that Wazzup itself was redistributing chats. Together, they pointed to something outside our code that was writing owners.",
        "The agent lined up the times of contact changes with jobs on the server and found it: a systemd timer, installed on 2 September outside the repository, that re-ran a one-off script every 30 minutes. The script copied each CRM lead's owner, sometimes from an old archived lead, onto the matching Wazzup contact — about 12,900 writes in a day — overwriting the operator who held the chat. Its log lines matched the observed changes.",
        "The script wasn't in the repository, and nothing showed who had put a one-off script on a repeating timer. The agent recommended switching it off on 22 September. I hadn't asked for this script to run on a schedule, so the next morning I asked what it was and where it had come from, and on 23 September I had it disabled.",
      ],
    },
    outcome: {
      proven: [
        "After the timer was disabled, a check that read Wazzup's contacts about once a minute saw no owner change in its first eight readings (about seven minutes), against more than 200 changes during a single run before. The agent ran this check.",
        "Later work found and fixed two further sources of ownership problems: an owner sync that kept switching a customer between their chats (5 October), and an owner push that searched only part of the contact list, so some hand-offs never reached Wazzup (12 October).",
        "On 5 October I also reversed a rule that sent a returning customer whose chat had closed back to the day's rota. The agent had raised it on 23 September; by then it was the largest single cause of customers changing hands.",
        "70 unit tests run the production code for distribution, working hours, the “M3” hand-off, chat closing, the monthly report and sales-credit codes; all passed in a run on 14 October 2026.",
      ],
      notProven: [
        "That ownership churn has stopped for good: there is no long-term measurement yet, and the check after the timer was disabled lasted minutes.",
        "Some lookups still read only part of the contact list, and some chats left with the wrong owner were never reassigned.",
        "Seven more tests check a copy of the leave rule with an older 10-day threshold rather than the production rule (48 hours), and the background sync jobs have no automated tests.",
      ],
    },
    tech: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "Python",
      "React",
      "TypeScript",
      "Wazzup API",
      "Bitrix24 REST (webhooks, Open Lines)",
      "OnlinePBX API",
      "nginx",
      "systemd",
      "node:test",
    ],
  },
  {
    slug: "clinic-analytics",
    name: "Clinic analytics",
    title: "One reporting system for a private clinic",
    card: "A private clinic tracked leads, deals, calls and ad spend across Bitrix24, two phone systems and Meta Ads. I led the build of one reporting system on top of them.",
    highlights: [
      "Lead metrics ported formula by formula from the clinic's DataLens dashboard.",
      "A written sale rule for the Deals page; walk-in services kept out of the ad report.",
      "Compares itself with the CRM three times a day, repairs gaps and reports to Telegram.",
    ],
    tone: "mint",
    status: "Deployed",
    period: "Jul – Oct 2026",
    tags: ["Bitrix24", "PostgreSQL", "Node.js", "React", "Meta Ads"],
    summary:
      "A private clinic tracked marketing and sales across Bitrix24, two telephony systems and Meta Ads, and read its CRM lead figures through a dashboard in Yandex DataLens, a business-intelligence tool. I led the build of one reporting system on top of those sources — leads, deals, calls, ad campaigns and a daily plan-versus-actual report — and made it check itself against the CRM. Several pages were adapted from dashboards my team and I had built for other clients.",
    facts: [
      { label: "Role", value: "Led the project: requirements, the rules behind the numbers, review and deployment" },
      { label: "Team", value: "A colleague built the ad-campaigns page and the login; AI coding agents wrote the code" },
      { label: "Period", value: "30 July – 7 October 2026" },
      { label: "Status", value: "Deployed to a production server; last deployed 7 October 2026" },
    ],
    problem: [
      "Taken at face value, the CRM gave misleading numbers. Bitrix24 marks only the last stage of the sales pipeline as won, so paid check-ups looked like open prospects and sales read close to zero. Hiring, repeat-sales and patient-survey pipelines shared the same CRM, and until mid-September the new daily report counted job candidates from the hiring pipeline as deals.",
      "Walk-in patients booked for a single service, almost none of them from ads, were at first counted in the new daily ad-funnel report and swamped its conversion rates. And deal amounts were recorded in Uzbek so'm while Meta bills ad spend in US dollars.",
    ],
    responsibility: [
      "I led the project. I set what each report had to show and settled the rules behind the numbers: what counts as a sale, and which pipeline and which services belong in each report. I questioned figures that didn't match, had them checked against the CRM and against SQL queries written separately from the dashboard, and directed deployment and monitoring.",
    ],
    credits: [
      {
        who: "Me",
        text: "The rules behind the numbers; directing the data mirror and sync, the leads and calls sections, and adapting the deals, daily-report and cycle-time sections to the clinic's data; DataLens formula parity; matching Meta leads and calls to CRM records; monitoring, the Telegram command bot and a deploy check against unrecorded server changes; directing the fix for a week-long sync failure that the coding agent diagnosed.",
      },
      {
        who: "Colleague",
        text: "The Meta Ads campaigns page and its sync (ported from an earlier team dashboard), the admin login, and the daily report's metric explainer and month picker.",
      },
      {
        who: "Reused work",
        text: "The deals page was adapted from a dashboard I had built with a colleague for another client; the daily report follows a colleague's report from an earlier project; the bot's commands follow another project's bot.",
      },
      {
        who: "Clinic",
        text: "The formulas of its existing DataLens dashboard, and the plan colour bands.",
      },
      {
        who: "AI agents",
        text: "Wrote nearly all of the code and ran most of the checks. One Codex layout rework was reviewed live and reverted.",
      },
    ],
    howTitle: "How it works",
    howItWorks: [
      "A Node.js service mirrors Bitrix24 leads, deals and stage history into PostgreSQL with full pulls, a 45-second incremental tick and Bitrix webhooks. Calls come from OnlinePBX and Moizvonki, ads from Meta. Pages never wait on Bitrix.",
      "Each of the 11 lead KPI cards reproduces a formula from the clinic's DataLens dashboard, quoted in the code. Tables on the Leads, Deals and Calls pages drill down from a figure to the records behind it.",
      "Each OnlinePBX call is matched to Bitrix24's own record of the same call (same last nine phone digits, start times within two minutes), which gives it its recording and, where Bitrix linked one, its lead.",
      "Deal amounts in so'm are converted to US dollars at the Central Bank of Uzbekistan's rate for each day, so revenue and ad spend can be compared. Spend that can't be matched to leads is left unattributed rather than guessed.",
      "Three times a day the system compares lead, deal and call counts with Bitrix24, repairs the gaps it can and reports to Telegram, with a separate “couldn't check” outcome so a check that failed to run is never reported as clean.",
      "A pull that comes back short fails loudly, and a full replace refuses to shrink a table by more than half, after a network blip once wiped most of the deals table.",
    ],
    diagram: "clinic",
    diagramCaption: "Simplified data flow and the self-check loop. Labels are generic; no client data is shown.",
    decision: {
      title: "Honest numbers over flattering ones",
      paragraphs: [
        "The daily plan-versus-actual report is where ad results are judged, and walk-in patients made its conversion rates describe the wrong traffic. I had walk-in services taken out of that report inside its query, rather than behind an optional filter.",
        "Later I asked why the report's lead total differed from the Leads page, and the agent traced the gap to that exclusion. I kept the Leads page counting everything and labelled the report's default view “All (without walk-in services)”, so the two pages differ openly instead of silently.",
        "Then I asked to drop leads that had no project set. The agent showed that this would flatter the conversion rates, so I chose its alternative: take the project from the lead's deal.",
      ],
    },
    outcome: {
      proven: [
        "Leads (with a cycle-time analysis), Deals, Calls, Campaigns and a Daily report are built on a PostgreSQL mirror of the CRM, telephony and ads data.",
        "It was deployed to a production server, last on 7 October 2026, with the server configuration and the nightly backup script kept in the repository.",
        "Monitoring compares the mirror with Bitrix24 three times a day, repairs gaps and reports to Telegram.",
        "A week-long sync failure was traced to a Bitrix24 per-method time limit that the hourly re-runs kept renewing, and fixed in code; the commit messages report the full lead pull completing again and the lead count matching Bitrix.",
      ],
      notProven: [
        "Business impact: there are no before-and-after measurements.",
        "Only the Deals page uses the written sale rule. The daily report, the Campaigns page and the cycle-time analysis each count a sale differently (a deal currently at the paid stage, a completed visit as a stand-in, or Bitrix24's own won flag), so their totals can disagree.",
        "The project has no automated test suite; checks were SQL and CRM cross-checks.",
      ],
    },
    tech: [
      "Node.js",
      "PostgreSQL",
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Recharts",
      "Bitrix24 REST",
      "OnlinePBX",
      "Moizvonki",
      "Meta Marketing API",
      "Telegram Bot API",
      "nginx",
      "systemd",
    ],
  },
  {
    slug: "applekor-erp",
    name: "Applekor ERP",
    title: "Redesigning a working MVP",
    card: "An internal ERP (business-management system) for a phone reseller that buys in Korea and sells in Uzbekistan. A colleague built the first working version; with Claude Code, I led its redesign into a calm, consistent system, fixed cash-handling edge cases and added end-to-end tests.",
    highlights: [
      "My redesign became the base for the team's next merge.",
      "Sent back my own first redesign and replaced warning banners with one Tasks bell.",
      "Cash edge cases fixed with regression tests; unit tests grew from 61 to 162.",
    ],
    tone: "orange",
    status: "Test deployment",
    period: "Oct 2026",
    tags: ["Next.js", "TypeScript", "Prisma", "Tailwind CSS", "Playwright"],
    summary:
      "Applekor buys used iPhones and Samsungs in South Korea and sells them through a shop in Uzbekistan; staff had been running the business on Google Sheets and AppSheet. A colleague built a working MVP (minimum viable product) — inventory by IMEI, pricing, sales, instalment debts and a cash ledger — before I started on the code. Over the next two days, working with Claude Code, I led the redesign and fixed edge cases in the parts that handle money.",
    facts: [
      { label: "Role", value: "Redesign and hardening after the MVP: design direction, interface rules, cash-integrity fixes, tests and deployment settings" },
      { label: "Team", value: "One colleague and I on the main branch, each with our own Claude Code; a second colleague on feature branches" },
      { label: "Period", value: "8–10 October 2026" },
      { label: "Status", value: "Test deployment; go-live not confirmed" },
    ],
    problem: [
      "The MVP worked, but its labels used the developers' words instead of the client's, and a few money paths had edge cases: a transfer could take a cash register below zero, and a cash count booked pending expenses as a shortage, so they were deducted twice once approved.",
      "My own first redesign pass then added a new problem: it flagged every issue with yellow warning rows and red badges, so the finance pages looked alarming and were hard to read at a glance.",
    ],
    responsibility: [
      "I set the direction, reviewed the redesigned pages and decided what was pushed. Claude Code and its sub-agents wrote the code and tests, and its QA agents checked pages at desktop and phone widths.",
    ],
    credits: [
      {
        who: "Colleague, before I started",
        text: "The MVP and its same-day hardening: data model, routes, cash ledger (integer money, each movement posted once), permissions, receipts, instalments, attendance and 61 unit tests.",
      },
      {
        who: "Colleague, in parallel",
        text: "The Next.js 15 upgrade, the UZ/EN/RU translation framework, the collapsible menu and password change.",
      },
      {
        who: "Me",
        text: "Direction and review of the redesign of every page for all three roles; the finance and cash dashboards; the calm-interface rules and the Tasks bell; labels matched to the client's walkthrough; cash-integrity fixes; date pickers, help tips and the IMEI-scanner rewrite; Playwright end-to-end tests, demo data and a local PostgreSQL test site; rules for the team's AI agents; connecting my pages to the translations; deployment settings.",
      },
      {
        who: "Second colleague",
        text: "Bulk pricing, statistics filters and debt features, on separate branches.",
      },
      {
        who: "AI agents",
        text: "Claude Code and its sub-agents wrote the code and tests in all 14 of my code commits, and its test agents found the cash edge cases.",
      },
    ],
    howTitle: "What I changed",
    howItWorks: [
      "A calm interface: each problem is shown once, at its source; red is kept for negative money, form errors and destructive actions; and everything that needs attention becomes a task for the right role, computed on the server and shown in one Tasks bell.",
      "The client's own words: labels were matched to the words used in the client's recorded walkthrough of their old app, with the timestamps kept in the project docs.",
      "One scope per page: the finance page's balance, income, outflow, chart, debts, list and CSV all read the same cash-register filter, so the page reconciles with itself.",
      "Money edge cases: transfers check the available balance while the register is locked; a cash count now allows for pending expenses; a retried request with a different amount is rejected with a clear error; an exchange rate typed with a decimal comma is no longer stored ten times too large; and CSV exports are protected against formula injection. The transfer, cash-count and exchange-rate fixes have regression tests.",
      "Safe places to review: demo data generated only through the app's own services, a local PostgreSQL test site that refuses any non-local database, and end-to-end tests on a fresh database, so dashboards could be checked without touching the client's data.",
      "Tests: unit tests grew from 61 to 162 (counted in the code), plus a Playwright suite that checks, among other things, that cost prices never reach sellers or the buyers in Korea.",
    ],
    diagram: "applekor",
    diagramCaption: "Three roles, one cash ledger, and one place for everything that needs attention. The cash ledger, server-side role checks and private receipts came from my colleague's MVP (I added cloud storage for receipts); the highlighted Tasks bell came from my redesign. Labels are generic; no client data is shown.",
    decision: {
      title: "Sending back my own redesign",
      paragraphs: [
        "My first AI-built redesign flagged every problem it could find, with yellow warning rows, red badges and long explanations. On the finance pages you couldn't tell at a glance what mattered.",
        "I sent it back and chose the approach that replaced it: each problem shown once, at its source; red kept for negative money, form errors and destructive actions; and everything that needs attention moved into one Tasks bell, computed on the server for each role. Red badges across the app went from 33 to none.",
        "My colleague's next merge took my version as the base and kept my changes in full, adding the colleague's own features on top.",
      ],
    },
    outcome: {
      proven: [
        "All 14 of my code commits are on the shared main branch, and the redesign covers every page of the three roles.",
        "My colleague's merge used my redesign as the base.",
        "The Tasks system and the cash-integrity fixes are in the code; unit tests grew from 61 to 162 and an end-to-end suite was added.",
        "A test version is deployed on Vercel from my machine. It isn't linked here because it is the client's test system.",
      ],
      notProven: ["Whether the client has gone live, and current test results: the suites haven't been re-run for this write-up."],
    },
    tech: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "SQLite and PostgreSQL",
      "Vitest",
      "Playwright",
      "Vercel",
      "Supabase Storage",
    ],
  },
];

export const moreWork: MoreWork[] = [
  {
    title: "Taxi-fleet platform",
    text: "An internal platform for a taxi fleet's office staff, built with two colleagues (prototype, multi-park support, driver creation, interface redesign). My part was mainly the server side: a PostgreSQL mirror of drivers kept in sync with the Yandex Fleet API, edits written to Yandex first, role-based access where operators must confirm a driver's phone number before opening their card, and the test suite. When fleet totals matched the Yandex panel but per-driver figures didn't, I switched to the segment labels Yandex itself uses.",
    period: "Sep – Oct 2026",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Yandex Fleet API", "node:test"],
  },
  {
    title: "CRM analytics for schools",
    text: "Dashboards on Bitrix24 data for three schools (lead funnel, visits, deals, calls and ad campaigns); two of the three were built with a colleague. My parts included the lead and ad-campaign analytics, call-statistics fixes, metric definitions checked against the schools' DataLens boards, DataLens formulas translated into SQL, and a re-runnable check that fails if a dashboard number disagrees with the CRM.",
    period: "Jul – Aug 2026",
    tags: ["Node.js", "PostgreSQL", "React", "Bitrix24", "Meta Marketing API"],
  },
  {
    title: "Admissions analytics for an education academy",
    text: "Built on a colleague's baseline: Meta campaigns, forms and creatives drilled down to the CRM leads behind them, funnel stages derived from the CRM's own pipeline data, and a duplicate-lead sweep with a kill switch, an audit log and one-command undo. Its first live run was limited to one lead; when a later run closed one lead wrongly, I caught it in the CRM and the per-lead undo reversed just that one.",
    period: "Sep – Oct 2026",
    tags: ["Node.js", "PostgreSQL", "React", "Bitrix24", "Telegram Bot API"],
  },
  {
    title: "WordGarden",
    text: "An offline-first vocabulary app built for a relative who is learning Arabic: saved words, spaced review, a lesson reader with word-by-word glosses, and sync across devices without accounts.",
    period: "Oct 2026 · personal",
    tags: ["React", "TypeScript", "IndexedDB", "Vercel", "Vitest", "Playwright"],
  },
];

export const skills = {
  intro:
    "The technologies in my projects. AI agents write the code under my direction; these are the systems I work with and make decisions about.",
  groups: [
    { name: "Languages", items: ["TypeScript", "JavaScript (Node.js)", "SQL", "Some Python"] },
    {
      name: "Data & reporting",
      items: ["PostgreSQL", "SQLite", "Supabase", "Yandex DataLens", "Power BI", "Excel export"],
      note: "SQL in practice: CTEs, window functions, lateral joins, grouping sets, medians and advisory locks. DataLens work so far means rebuilding clients' existing reports and checking them against the CRM.",
    },
    {
      name: "CRM & integrations",
      note: "Bitrix24 in practice: webhooks, robots, Open Lines, batch calls and its per-method time limits.",
      items: [
        "Bitrix24 REST",
        "Wazzup",
        "Meta Marketing API",
        "OnlinePBX",
        "Moizvonki",
        "Telegram Bot API",
        "Yandex Fleet API",
      ],
    },
    { name: "Web", items: ["React", "Next.js", "Vite", "Tailwind CSS", "TanStack Query", "Recharts"] },
    { name: "Operations", items: ["Linux servers", "nginx", "systemd", "Deploy scripts", "Vercel"] },
    { name: "Quality", items: ["node:test", "Vitest", "Playwright", "Reconciliation scripts", "Monitoring with Telegram alerts"] },
    {
      name: "AI-assisted development",
      items: ["Claude Code", "OpenAI Codex", "Sub-agents and multi-agent reviews", "Project rules and handoff briefs"],
    },
  ] satisfies SkillGroup[],
};

export const education: EducationItem[] = [
  {
    label: "Current",
    badge: "Foundation year",
    title: "CIFS foundation programme",
    org: "Westminster International University in Tashkent",
    note: "2026–27, alongside work",
  },
  {
    label: "Secondary school",
    title: "School No. 205",
    org: "Tashkent",
    score: "≈ 4.8",
    scoreNote: "/ 5 GPA",
  },
  {
    label: "Test score",
    title: "SAT",
    org: "College Board",
    score: "1400",
    scoreNote: "Math 770 · Reading and Writing 630",
  },
];

export const contact = {
  intro: "I'm happy to walk through any of the case studies in more detail, decisions included.",
  links: [
    { label: "GitHub", value: "github.com/IAbdullokh", href: "https://github.com/IAbdullokh" },
    // Add when confirmed, e.g. { label: "Email", value: "…", href: "mailto:…" }
  ] satisfies ContactLink[],
};

export const siteNote = "This site was built with AI coding agents under my direction, like my other projects.";
