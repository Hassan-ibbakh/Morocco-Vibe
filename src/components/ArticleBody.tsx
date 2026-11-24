import { AffiliateCard } from "@/components/Affiliate";
import { CoverImage } from "@/components/CoverImage";
import { RichText } from "@/components/RichText";
import type { Block, Section } from "@/lib/types";

function Callout({
  tone,
  title,
  text,
}: {
  tone: "tip" | "warning";
  title?: string;
  text: string;
}) {
  const styles =
    tone === "tip"
      ? "border-sea bg-[#e8f1f1]"
      : "border-terracotta bg-[#f8e9e2]";
  const label = title ?? (tone === "tip" ? "Conseil" : "À savoir");
  return (
    <aside className={`rounded-r-xl border-l-4 px-5 py-4 ${styles}`} aria-label={label}>
      <p className="font-semibold text-ink">
        <span aria-hidden="true" className="mr-2">
          {tone === "tip" ? "✦" : "!"}
        </span>
        {label}
      </p>
      <p className="mt-1 text-[0.98rem] leading-relaxed text-ink">
        <RichText text={text} />
      </p>
    </aside>
  );
}

function BlockView({ block, seed }: { block: Block; seed: string }) {
  switch (block.type) {
    case "p":
      return (
        <p>
          <RichText text={block.text} />
        </p>
      );
    case "h3":
      return <h3>{block.text}</h3>;
    case "list": {
      const List = block.ordered ? "ol" : "ul";
      return (
        <List>
          {block.items.map((item) => (
            <li key={item}>
              <RichText text={item} />
            </li>
          ))}
        </List>
      );
    }
    case "tip":
    case "warning":
      return <Callout tone={block.type} title={block.title} text={block.text} />;
    case "image":
      return (
        <figure>
          <CoverImage
            image={block.image}
            seed={seed}
            sizes="(min-width: 768px) 720px, 100vw"
            className="aspect-[3/2] rounded-xl"
          />
          {(block.caption || block.image.credit) && (
            <figcaption className="mt-2 text-sm text-ink-soft">
              {block.caption}
              {block.image.credit && <span className="block text-xs">{block.image.credit}</span>}
            </figcaption>
          )}
        </figure>
      );
    case "affiliate":
      return <AffiliateCard block={block} />;
  }
}

export function ArticleBody({ sections, slug }: { sections: Section[]; slug: string }) {
  return (
    <div className="prose-travel">
      {sections.map((section) => (
        <section key={section.id} aria-labelledby={section.id} className="space-y-[1.1em]">
          <h2 id={section.id}>{section.title}</h2>
          {section.blocks.map((block, i) => (
            <BlockView key={i} block={block} seed={`${slug}-${section.id}-${i}`} />
          ))}
        </section>
      ))}
    </div>
  );
}

export function TableOfContents({ sections }: { sections: Section[] }) {
  return (
    <nav aria-labelledby="sommaire-titre" className="rounded-2xl border border-sand-deep bg-white p-5">
      <h2 id="sommaire-titre" className="text-sm font-semibold tracking-widest text-terracotta-dark uppercase">
        Sommaire
      </h2>
      <ol className="mt-3 space-y-2 text-[0.95rem]">
        {sections.map((s, i) => (
          <li key={s.id} className="flex gap-3">
            <span aria-hidden="true" className="font-display text-ink-soft tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <a href={`#${s.id}`} className="text-ink underline-offset-4 hover:text-sea hover:underline">
              {s.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
