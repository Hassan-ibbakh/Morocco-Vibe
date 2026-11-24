import type { Metadata } from "next";
import Link from "next/link";
import { TextPage, ToFill } from "@/components/TextPage";
import { contactFormConfig } from "@/config/contact";
import { newsletterConfig } from "@/config/newsletter";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  lang: "en",
  languages: { fr: "/confidentialite", en: "/en/privacy" },
  title: "Privacy and cookies",
  description: `Privacy policy of ${siteConfig.name}: the personal data we collect, why, how long we keep it, your rights, and our use of cookies (none for tracking).`,
  path: "/en/privacy",
  ogImagePath: "/en/share-image.png",
});

export default function PrivacyPage() {
  return (
    <TextPage
      lang="en"
      title="Privacy and cookies"
      path="/en/privacy"
      intro="We collect as little data as possible. This page describes the current situation of the site."
    >
      <p>
        This is a translation provided for information. The reference versions are the French{" "}
        <Link href="/confidentialite" hrefLang="fr" lang="fr">
          privacy policy
        </Link>{" "}
        and{" "}
        <Link href="/cookies" hrefLang="fr" lang="fr">
          cookie policy
        </Link>
        .
      </p>

      <h2>Data controller</h2>
      <p>
        <ToFill lang="en">publisher&apos;s name and contact details</ToFill> — see the{" "}
        <Link href="/en/legal-notice">legal notice</Link>.
      </p>

      <h2>Data collected today</h2>
      <ul>
        <li>
          <strong>No accounts, no analytics and no advertising tools</strong> are active on the site at present.
        </li>
        <li>
          <strong>Hosting logs:</strong> like any website, our hosting provider (Vercel) processes technical data (IP
          address, browser, pages requested) to run and secure the service.
        </li>
        <li>
          <strong>Emails and contact form:</strong> if you write to us, we only use your name, address and message to
          reply to you. The site does not store them
          {contactFormConfig.enabled ? ": form messages are sent to us by email via the Resend delivery service." : "."}
        </li>
        {newsletterConfig.enabled && (
          <li>
            <strong>Newsletter:</strong> if you subscribe, your email address is stored by our emailing provider,
            Brevo, only to send you the newsletter. Subscription is confirmed by email (double opt-in), and every email
            contains an unsubscribe link.
          </li>
        )}
      </ul>

      <h2>Retention period</h2>
      <p>
        <ToFill lang="en">retention period for emails and logs</ToFill>
      </p>

      <h2>Your rights</h2>
      <p>
        Under the applicable regulations (in particular the GDPR for people in the European Union, and Moroccan law
        no. 09-08 in Morocco), you can request access to, correction or deletion of your data by writing to us via the{" "}
        <Link href="/en/contact">contact page</Link>. You can also contact the competent data protection authority.
      </p>

      <h2>Cookies</h2>
      <p>
        {siteConfig.name} does not set any tracking, analytics or advertising cookies, which is why no consent banner is
        shown. Only mechanisms strictly necessary for the technical operation of the site may be used by our hosting
        provider; they do not require your consent. If this ever changes, we will ask for your consent beforehand and
        update this page.
      </p>
    </TextPage>
  );
}
