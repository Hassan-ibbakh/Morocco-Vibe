import type { Metadata } from "next";
import Link from "next/link";
import { TextPage } from "@/components/TextPage";
import { contactFormConfig } from "@/config/contact";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  lang: "en",
  languages: { fr: "/contact", en: "/en/contact" },
  title: "Contact us",
  description: `Contact the ${siteConfig.name} team to report a mistake in a guide, suggest a topic about Morocco or propose a partnership. We read every message.`,
  path: "/en/contact",
  ogImagePath: "/en/share-image.png",
});

export default function ContactPage() {
  const email = siteConfig.contactEmail;
  return (
    <TextPage
      lang="en"
      title="Contact us"
      path="/en/contact"
      intro="A question, a correction, an idea for a guide? We read every message, in English or in French."
    >
      {email && (
        <div className="not-prose rounded-3xl bg-sand p-6 sm:p-8">
          <p className="text-sm font-semibold tracking-widest text-terracotta-dark uppercase">By email</p>
          <p className="mt-2">
            <a
              href={`mailto:${email}`}
              className="font-display text-2xl font-semibold break-all text-sea underline underline-offset-4 hover:text-terracotta"
            >
              {email}
            </a>
          </p>
        </div>
      )}
      {contactFormConfig.enabled && (
        <p>
          You can also use our{" "}
          <Link href="/contact" hrefLang="fr">
            contact form
          </Link>{" "}
          (the page is in French, but you can write to us in English).
        </p>
      )}
      {!email && !contactFormConfig.enabled && <p>Our contact details will be available here very soon.</p>}

      <h2>For a quick reply</h2>
      <ul>
        <li>
          <strong>Reporting a mistake:</strong> include the address of the page and, if possible, the official source of
          the correct information.
        </li>
        <li>
          <strong>Partnerships:</strong> introduce your organisation and your proposal. Any sponsored content is
          clearly labelled as such.
        </li>
      </ul>
      <p>
        We cannot organise trips or make bookings for you. The data you send us is handled as described in our{" "}
        <Link href="/en/privacy">privacy policy</Link>.
      </p>
    </TextPage>
  );
}
