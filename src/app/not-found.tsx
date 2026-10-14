import Link from "next/link";
import { ArrowLeft } from "@/components/Icons";

export default function NotFound() {
  return (
    <main id="main" className="wrap nf">
      <p className="eyebrow">404</p>
      <h1>This page doesn&apos;t exist.</h1>
      <p>The link may be old, or the address mistyped.</p>
      <Link className="btn btn-primary" href="/">
        <ArrowLeft />
        Back to the home page
      </Link>
    </main>
  );
}
