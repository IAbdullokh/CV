import { Bell } from "./Icons";

// Small, quiet illustrations for the project cards. All values are invented and labelled as such.

function RoutingRules() {
  const rules = [
    ["New chat", "working operator furthest below target"],
    ["Returning customer", "back to their own operator"],
    ["“M3” typed", "operator 3, and the choice is pinned"],
    ["After 18:00", "belongs to the next working day"],
  ];
  return (
    <>
      <div className="mini-h">
        <strong>Routing rules</strong>
        <span>Illustration</span>
      </div>
      <ul>
        {rules.map(([b, s]) => (
          <li key={b}>
            <b>{b}</b>
            <span>{s}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

function PlanVsActual() {
  // Seven synthetic days: plan (grey) behind actual (blue).
  const plan = [30, 30, 30, 30, 30, 22, 22];
  const actual = [24, 33, 28, 36, 31, 17, 25];
  const h = 70;
  const scale = (v: number) => (v / 40) * h;
  return (
    <>
      <div className="mini-h">
        <strong>Plan vs actual, by day</strong>
        <span>Synthetic</span>
      </div>
      <svg className="bars" viewBox="0 0 220 78" aria-hidden="true">
        {plan.map((p, i) => {
          const x = 6 + i * 31;
          return (
            <g key={i}>
              <rect className="plan" x={x} y={h - scale(p) + 4} width="22" height={scale(p)} rx="4" />
              <rect className="fact" x={x + 5} y={h - scale(actual[i]) + 4} width="12" height={scale(actual[i])} rx="3" />
            </g>
          );
        })}
      </svg>
      <div className="key">
        <span>
          <i style={{ background: "var(--chart-slate)" }} />
          Plan
        </span>
        <span>
          <i style={{ background: "var(--brand-500)" }} />
          Actual
        </span>
      </div>
    </>
  );
}

function TasksBell() {
  const tasks = [
    ["Count the cash register", "Manager"],
    ["Price 2 new phones", "Manager"],
    ["Update the dollar rate", "Manager"],
  ];
  return (
    <>
      <div className="mini-h">
        <strong>One place for what needs attention</strong>
        <span>Illustration</span>
      </div>
      <div className="bell">
        <Bell className="ic" />
        Tasks
        <span className="count">3</span>
      </div>
      <ul>
        {tasks.map(([t, who]) => (
          <li key={t}>
            <b>{t}</b>
            <span>{who}</span>
          </li>
        ))}
      </ul>
    </>
  );
}

export default function MiniIllustration({ slug }: { slug: string }) {
  return (
    <div className="mini" aria-hidden="true">
      {slug === "hilol" ? <RoutingRules /> : slug === "clinic-analytics" ? <PlanVsActual /> : <TasksBell />}
    </div>
  );
}
