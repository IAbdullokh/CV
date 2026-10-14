import Link from "next/link";
import { contact, profile, siteNote } from "@/content/site";

export default function SiteFooter() {
  const github = contact.links.find((l) => l.label === "GitHub");
  return (
    <footer className="wrap foot">
      <span>
        © {new Date().getFullYear()} {profile.name} · Tashkent
      </span>
      <span>{siteNote}</span>
      <nav className="n" aria-label="Footer">
        <Link href="/#about">About</Link>
        <Link href="/#projects">Projects</Link>
        {github ? <a href={github.href}>GitHub</a> : null}
        <a href="#top">Back to top</a>
      </nav>
    </footer>
  );
}
