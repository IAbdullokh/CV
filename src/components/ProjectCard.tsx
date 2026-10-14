import Link from "next/link";
import type { Project } from "@/content/types";
import { ArrowRight, ProjectGlyph } from "./Icons";
import MiniIllustration from "./MiniIllustration";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const headingId = `proj-${project.slug}`;
  return (
    <Link className="card text card-hover proj" href={`/projects/${project.slug}/`} aria-labelledby={headingId}>
      <span className={`tile tile-${project.tone}`} aria-hidden="true">
        <ProjectGlyph slug={project.slug} />
      </span>
      <div>
        <div className="proj-top">
          <span className="eyebrow">
            Case study {String(index + 1).padStart(2, "0")} · {project.period}
          </span>
          <span className="pill">{project.status}</span>
        </div>
        <h3 id={headingId}>
          <span className="name">{project.name}:</span> {project.title}
        </h3>
        <p className="sum">{project.card}</p>
        <ul className="did">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
        <ul className="chips" aria-label="Technologies">
          {project.tags.map((t) => (
            <li className="chip" key={t}>
              {t}
            </li>
          ))}
        </ul>
        <span className="read">
          Read the case study <ArrowRight />
        </span>
      </div>
      <MiniIllustration slug={project.slug} />
    </Link>
  );
}
