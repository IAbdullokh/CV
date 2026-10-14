import { Route } from "./Icons";

// Hints at the kind of work on the home page. Every value is invented and the card says so.
const rows = [
  { time: "09:46", chat: "Chat #2484", to: "Operator 2", why: "New chat → furthest below target share" },
  { time: "09:44", chat: "Chat #2483", to: "Operator 1", why: "Customer typed “M1” → pinned hand-off" },
  { time: "09:43", chat: "Chat #2482", to: "Operator 4", why: "Operator 5 on long leave → a working operator" },
  { time: "09:41", chat: "Chat #2481", to: "Operator 3", why: "Returning customer → their own operator" },
];

export default function RoutingCard() {
  return (
    <aside className="card text sim rise" style={{ ["--i" as string]: 3 }} aria-labelledby="sim-h">
      <div className="sim-h">
        <span className="tile tile-blue" aria-hidden="true">
          <Route />
        </span>
        <div>
          <strong id="sim-h">Chat routing</strong>
          <div className="eyebrow">Illustration · synthetic data</div>
        </div>
      </div>
      <ul>
        {rows.map((r, i) => (
          <li key={r.chat} style={{ ["--i" as string]: i }}>
            <time>{r.time}</time>
            <div>
              <div className="who">
                {r.chat} <span className="arr">→</span> {r.to}
              </div>
              <div className="why">{r.why}</div>
            </div>
            <span className="dot" aria-hidden="true" />
          </li>
        ))}
      </ul>
      <div className="sim-f">
        <span>Control panel · counts faults as they happen</span>
        <span>After 18:00 → next working day</span>
      </div>
    </aside>
  );
}
