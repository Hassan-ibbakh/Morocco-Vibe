import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "browser",
    background_color: "#faf6ef",
    theme_color: "#faf6ef",
    lang: siteConfig.language,
    icons: [{ src: "/logo.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
