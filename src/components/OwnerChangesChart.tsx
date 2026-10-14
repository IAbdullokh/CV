// Illustration for the Hilol case study. The values are invented: they show the shape the counts took
// (changes clustered when a server job ran every 30 minutes), not real data.
const buckets = [
  ["09:00", 12], ["09:10", 2], ["09:20", 1], ["09:30", 13], ["09:40", 1], ["09:50", 2],
  ["10:00", 11], ["10:10", 2], ["10:20", 1], ["10:30", 14], ["10:40", 1], ["10:50", 2],
  ["11:00", 12], ["11:10", 2], ["11:20", 1], ["11:30", 13], ["11:40", 1], ["11:50", 2],
] as const;

const DESC =
  "Illustrative bar chart with synthetic values: owner changes per ten-minute bucket from 09:00 to 12:00 stay between one and two, except every 30 minutes, when the server job ran and they jump to between eleven and fourteen.";

function Bars({ width, height, barW, left }: { width: number; height: number; barW: number; left: number }) {
  const plotH = height - 30;
  const step = (width - left - 8) / buckets.length;
  const y = (v: number) => plotH - (v / 15) * (plotH - 10);
  return (
    <>
      {[0, 5, 10, 15].map((v) => (
        <g key={v}>
          <line className="grid" x1={left} y1={y(v)} x2={width - 4} y2={y(v)} />
          <text x={left - 8} y={y(v) + 4} textAnchor="end">
            {v}
          </text>
        </g>
      ))}
      {buckets.map(([t, v], i) => {
        const burst = i % 3 === 0;
        const x = left + 4 + i * step + (step - barW) / 2;
        return <rect key={t} className={burst ? "s" : "b"} x={x} y={y(v)} width={barW} height={plotH - y(v)} rx={Math.min(4, barW / 3)} />;
      })}
      {["09:00", "10:00", "11:00"].map((t, k) => (
        <text key={t} x={left + 4 + k * 6 * step + step / 2} y={height - 8} textAnchor="middle">
          {t}
        </text>
      ))}
      <text x={width - 4} y={height - 8} textAnchor="end">
        12:00
      </text>
    </>
  );
}

export default function OwnerChangesChart() {
  const columns = [buckets.slice(0, 6), buckets.slice(6, 12), buckets.slice(12)];
  return (
    <figure className="card text fig">
      <div className="fig-h">
        <strong>Owner changes per 10 minutes, one morning</strong>
        <span className="pill pill-amber">Illustration · synthetic data</span>
      </div>
      <svg className="chart d-only" viewBox="0 0 640 210" role="img" aria-label={DESC}>
        <Bars width={640} height={210} barW={20} left={44} />
        <path className="lead" d="M168 44 L182 26" />
        <text className="note" x="188" y="20">
          each run of the job
        </text>
      </svg>
      <svg className="chart m-only" viewBox="0 0 320 170" role="img" aria-label={DESC}>
        <Bars width={320} height={170} barW={9} left={30} />
      </svg>
      <div className="key" aria-hidden="true">
        <span>
          <i style={{ background: "var(--chart-slate)" }} />
          other changes
        </span>
        <span>
          <i style={{ background: "var(--rose)" }} />
          while the server job ran, every 30 minutes
        </span>
      </div>
      <figcaption>
        The shape of the evidence, not the real numbers: every value here is invented to show what the counts looked like once
        someone asked for them.
      </figcaption>
      <details className="disc">
        <summary>Show the synthetic values as a table</summary>
        <div className="tbl-cols">
          {columns.map((col, c) => (
            <table key={c}>
              <thead>
                <tr>
                  <th scope="col">Time</th>
                  <th scope="col">Changes</th>
                </tr>
              </thead>
              <tbody>
                {col.map(([t, v]) => (
                  <tr key={t}>
                    <td>{t}</td>
                    <td className="n">{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
        </div>
      </details>
    </figure>
  );
}
