import type { ReactNode } from "react";

// A page section with the sticky side label ("01 About") and a heading that names the section.
export default function Section({
  id,
  n,
  label,
  title,
  children,
}: {
  id: string;
  n: number;
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="sec" id={id} aria-labelledby={`${id}-h`}>
      <div className="wrap sg">
        <div className="mark" aria-hidden="true">
          {String(n).padStart(2, "0")} <b>{label}</b>
        </div>
        <div>
          <h2 id={`${id}-h`}>{title}</h2>
          {children}
        </div>
      </div>
    </section>
  );
}
