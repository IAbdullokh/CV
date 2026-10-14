import { ArrowRight, ArrowUpRight, GitHub, LinkIcon, Mail, Pin } from "@/components/Icons";
import LocalTime from "@/components/LocalTime";
import ProjectCard from "@/components/ProjectCard";
import RoutingCard from "@/components/RoutingCard";
import Section from "@/components/Section";
import {
  about,
  contact,
  education,
  experience,
  heroFacts,
  howIWork,
  moreWork,
  profile,
  projects,
  skills,
} from "@/content/site";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  description: profile.description,
  worksFor: { "@type": "Organization", name: "Data365" },
  address: { "@type": "PostalAddress", addressLocality: "Tashkent", addressCountry: "UZ" },
  sameAs: contact.links.filter((l) => l.href.startsWith("https://")).map((l) => l.href),
  ...(process.env.SITE_URL ? { url: process.env.SITE_URL } : {}),
};

function contactIcon(label: string) {
  if (label === "GitHub") return <GitHub />;
  if (label === "Email") return <Mail />;
  return <LinkIcon />;
}

export default function Home() {
  return (
    <main id="main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }} />

      {/* Hero */}
      <section className="hero" aria-labelledby="hero-h">
        <div className="wrap hero-g">
          <div>
            <p className="eyebrow kicker rise" style={{ ["--i" as string]: 0 }}>
              {profile.headline}
            </p>
            <h1 id="hero-h" className="rise" style={{ ["--i" as string]: 1 }}>
              {profile.name}
            </h1>
            <p className="lede rise" style={{ ["--i" as string]: 2 }}>
              {profile.lead}
            </p>
            <div className="cta rise" style={{ ["--i" as string]: 3 }}>
              <a className="btn btn-primary" href="#projects">
                View projects <ArrowRight />
              </a>
              <a className="btn btn-ghost" href="#contact">
                Get in touch
              </a>
              <span className="where">
                <Pin />
                <span>
                  <span className="nw">{profile.location}</span>
                  <span className="nw">
                    {" · "}
                    <LocalTime />
                  </span>
                </span>
              </span>
            </div>
            <ul className="facts rise" style={{ ["--i" as string]: 4 }} aria-label="At a glance">
              {heroFacts.map((f) => (
                <li className="card fact" key={f.label}>
                  <span className="eyebrow">{f.label}</span>
                  <strong>{f.value}</strong>
                </li>
              ))}
            </ul>
          </div>
          <RoutingCard />
        </div>
      </section>

      {/* About */}
      <Section id="about" n={1} label="About" title="I work on the rules behind the numbers.">
        <div className="about-g">
          <div className="prose">
            {about.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <dl className="card text factcard">
            {about.facts.map((f) => (
              <div key={f.label}>
                <dt className="eyebrow">{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="sub-h">
          <h3>How I work with AI agents</h3>
          <span className="eyebrow">Six steps · real examples</span>
        </div>
        <p className="how-intro">{howIWork.intro}</p>
        <ol className="steps">
          {howIWork.steps.map((s) => (
            <li className="card text step" key={s.title}>
              <h4>{s.title}</h4>
              <p className="principle">{s.text}</p>
              <p className="example">
                <b>Example</b>
                {s.example}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Experience */}
      <Section id="experience" n={2} label="Experience" title="Where I work">
        <div className="stack">
          {experience.map((x) => (
            <article className="card text xp" key={x.org}>
              <div className="xp-h">
                <h3>{x.org}</h3>
                {x.role ? <span className="role">{x.role}</span> : null}
                <span className="role">{x.place}</span>
                {x.period ? <span className="when eyebrow">{x.period}</span> : null}
              </div>
              <p>{x.summary}</p>
              <ul>
                {x.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" n={3} label="Projects" title="Selected work">
        <p className="lede">
          Three case studies. Each shows who did what (me, my colleagues or the AI agents) and separates what is proven from
          what isn&apos;t yet.
        </p>
        <div className="stack">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>

        <div className="sub-h">
          <h3>More work</h3>
          <span className="eyebrow">Client names left out</span>
        </div>
        <div className="more-g">
          {moreWork.map((m) => (
            <article className="card text more" key={m.title}>
              <div className="more-h">
                <h4>{m.title}</h4>
                <span className="eyebrow">{m.period}</span>
              </div>
              <p>{m.text}</p>
              <ul className="chips" aria-label="Technologies">
                {m.tags.map((t) => (
                  <li className="chip" key={t}>
                    {t}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" n={4} label="Skills" title="Tools and systems">
        <p className="skills-intro">{skills.intro}</p>
        <dl className="card text skills">
          {skills.groups.map((g) => (
            <div key={g.name}>
              <dt>{g.name}</dt>
              <dd>
                <ul className="chips">
                  {g.items.map((item) => (
                    <li className="chip" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
                {g.note ? <p className="skill-note">{g.note}</p> : null}
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Education */}
      <Section id="education" n={5} label="Education" title="Education">
        <div className="edu-g">
          {education.map((e) => (
            <article className="card text edu" key={e.title}>
              <div className="eyebrow">
                {e.label}
                {e.badge ? <span className="pill pill-accent">{e.badge}</span> : null}
              </div>
              <h3>{e.title}</h3>
              <p className="org">{e.org}</p>
              {e.note ? <p className="note">{e.note}</p> : null}
              {e.score ? (
                <p className="big">
                  {e.score}
                  <small>{e.scoreNote}</small>
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" n={6} label="Contact" title="Get in touch">
        <div className="ink">
          <div className="contact-g">
            <div>
              <h3>Let&apos;s talk about CRM, data or automation work.</h3>
              <p>{contact.intro}</p>
              <p className="where">
                <Pin />
                <span>
                  <span className="nw">{profile.location}</span>
                  <span className="nw">
                    {" · "}
                    <LocalTime />
                  </span>
                </span>
              </p>
            </div>
            <ul className="clist">
              {contact.links.map((l) => (
                <li key={l.label}>
                  <a className="clink" href={l.href} rel="me">
                    <span className="tile tile-sm tile-ink" aria-hidden="true">
                      {contactIcon(l.label)}
                    </span>
                    <span>
                      <span className="l">{l.label}</span>
                      <span className="v">{l.value}</span>
                    </span>
                    <span className="go" aria-hidden="true">
                      <ArrowUpRight />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
    </main>
  );
}
