import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Diagram from "@/components/Diagrams";
import { ArrowLeft, Check, Clock, ProjectGlyph } from "@/components/Icons";
import OwnerChangesChart from "@/components/OwnerChangesChart";
import Section from "@/components/Section";
import { profile, projects } from "@/content/site";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  const title = `${project.name}: ${project.title}`;
  const path = `/projects/${project.slug}/`;
  const known = Boolean(process.env.SITE_URL);
  return {
    title,
    description: project.card,
    alternates: known ? { canonical: path } : undefined,
    openGraph: { title, description: project.card, type: "article", siteName: profile.name, locale: "en_GB", ...(known ? { url: path } : {}) },
    twitter: { card: "summary", title, description: project.card },
  };
}

// Colour of the dot next to each credit line: me, a colleague, AI agents, or anything else.
function creditClass(who: string) {
  if (who === "Me") return "me";
  if (/colleague/i.test(who)) return "team";
  if (/AI/.test(who)) return "ai";
  return undefined;
}

export default async function CaseStudy({ params }: Params) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index < 0) notFound();
  const project = projects[index];
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  return (
    <main id="main" className="cs">
      <div className="wrap cs-head">
        <Link className="back" href="/#projects">
          <ArrowLeft />
          All projects
        </Link>
        <div className="cs-id">
          <span className={`tile tile-lg tile-${project.tone}`} aria-hidden="true">
            <ProjectGlyph slug={project.slug} />
          </span>
          <p className="eyebrow">
            <span>
              Case study {index + 1} of {projects.length}
            </span>
            <b>{project.name}</b>
          </p>
        </div>
        <h1>{project.title}</h1>
        <p className="lede">{project.summary}</p>
        <dl className="card text meta">
          {project.facts.map((f) => (
            <div key={f.label}>
              <dt className="eyebrow">{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <Section id="problem" n={1} label="Problem" title="The problem">
        <div className="prose">
          {project.problem.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </Section>

      <Section id="responsibility" n={2} label="My part" title="My responsibility">
        <div className="prose">
          {project.responsibility.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <dl className="card text credits" aria-label="Who did what">
          {project.credits.map((c) => (
            <div key={c.who}>
              <dt className={creditClass(c.who)}>
                <i aria-hidden="true" />
                {c.who}
              </dt>
              <dd>{c.text}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="how" n={3} label={project.howTitle} title={project.howTitle}>
        <Diagram kind={project.diagram} caption={project.diagramCaption} />
        <ol className="howlist">
          {project.howItWorks.map((h) => (
            <li key={h}>
              <span>{h}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="decision" n={4} label="Decision" title="A difficult decision">
        <div className="stack">
          <article className="card text decision">
            <div className="eyebrow">
              <span className="pill pill-blue">
                <i className="dot" aria-hidden="true" />
                Decision
              </span>
            </div>
            <h3>{project.decision.title}</h3>
            {project.decision.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </article>
          {project.slug === "hilol" ? <OwnerChangesChart /> : null}
        </div>
      </Section>

      <Section id="outcome" n={5} label="Outcome" title="Outcome">
        <div className="outcome">
          <div className="card text ok">
            <h3>
              <span className="pill pill-accent">
                <i className="dot" aria-hidden="true" />
                What the record shows
              </span>
            </h3>
            <ul>
              {project.outcome.proven.map((o) => (
                <li key={o}>
                  <Check />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card text open">
            <h3>
              <span className="pill pill-amber">
                <i className="dot" aria-hidden="true" />
                Not shown yet
              </span>
            </h3>
            <ul>
              {project.outcome.notProven.map((o) => (
                <li key={o}>
                  <Clock />
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section id="tech" n={6} label="Tech" title="Tech">
        <ul className="chips" aria-label="Technologies">
          {project.tech.map((t) => (
            <li className="chip" key={t}>
              {t}
            </li>
          ))}
        </ul>
        <nav className="pn" aria-label="Other case studies">
          <Link className="card text card-hover prev" href={`/projects/${prev.slug}/`}>
            <span className="eyebrow">← Previous</span>
            <strong>{prev.name}</strong>
            <span>{prev.title}</span>
          </Link>
          <Link className="card text card-hover next" href={`/projects/${next.slug}/`}>
            <span className="eyebrow">Next →</span>
            <strong>{next.name}</strong>
            <span>{next.title}</span>
          </Link>
        </nav>
      </Section>
    </main>
  );
}
