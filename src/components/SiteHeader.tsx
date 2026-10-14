import Link from "next/link";
import { profile } from "@/content/site";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";

const sections = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export default function SiteHeader() {
  const links = sections.map((s) => ({ href: `/#${s.id}`, label: s.label }));
  return (
    <header className="top">
      <div className="wrap top-in">
        <Link className="brand" href="/" aria-label={`${profile.name}, home`}>
          <span className="tile tile-ink" aria-hidden="true">
            {profile.initials}
          </span>
          <span>{profile.name}</span>
          <span className="sub">Software engineer</span>
        </Link>
        <nav className="nav" aria-label="Primary">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="top-actions">
          <ThemeToggle />
          <Link className="btn btn-ghost btn-cta" href="/#contact">
            Get in touch
          </Link>
          <MobileMenu links={links} />
        </div>
      </div>
    </header>
  );
}
