import type { Metadata } from "next";
import { GuidesListing } from "@/components/GuidesListing";
import { getGuidesPage, getTotalGuidePages } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Guides de voyage au Maroc : préparatifs, itinéraires et visites",
  description:
    "Tous nos guides pour voyager au Maroc : checklist avant le départ, itinéraires, idées de visites, budget et conseils pratiques sur place.",
  path: "/guides",
});

export default function GuidesPage() {
  return <GuidesListing guides={getGuidesPage(1)} page={1} totalPages={getTotalGuidePages()} />;
}
