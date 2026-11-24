import type { Metadata } from "next";
import Link from "next/link";
import { StarMark } from "@/components/Logo";
import { Container } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container className="py-20 sm:py-28">
      <div className="mx-auto max-w-xl text-center">
        <StarMark className="spin-slow mx-auto h-14 w-14" />
        <p className="mt-6 text-sm font-semibold tracking-[0.2em] text-terracotta-dark uppercase">Error 404</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
          This page got lost in the medina.
        </h1>
        <p className="mt-5 text-lg text-ink-soft">
          The link may be old or the address may contain a typo. Here are a few ways to find your way again.
        </p>
        <ul className="mt-8 flex flex-wrap justify-center gap-3">
          <li>
            <Link
              href="/en"
              className="inline-flex h-12 items-center rounded-full bg-terracotta px-6 font-semibold text-white hover:bg-terracotta-dark"
            >
              Back to the homepage
            </Link>
          </li>
          <li>
            <Link
              href="/en/guides"
              className="inline-flex h-12 items-center rounded-full border border-sand-deep px-6 font-semibold text-ink hover:bg-sand"
            >
              All guides
            </Link>
          </li>
        </ul>
      </div>
    </Container>
  );
}
