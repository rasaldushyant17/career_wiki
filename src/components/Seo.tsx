import { useEffect } from "react";
import { SITE, toAbsoluteUrl } from "@/utils/site";

type SeoProps = {
  title?: string;
  description?: string;
  canonicalPath?: string;
  imagePathOrUrl?: string;
  noindex?: boolean;
};

const upsertMeta = (selector: string, attrs: Record<string, string>) => {
  const head = document.head;
  const existing = head.querySelector(selector);
  const el = (existing ?? document.createElement("meta")) as HTMLMetaElement;
  Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
  if (!existing) head.appendChild(el);
};

const upsertLink = (rel: string, href: string) => {
  const head = document.head;
  const selector = `link[rel="${rel}"]`;
  const existing = head.querySelector(selector);
  const el = (existing ?? document.createElement("link")) as HTMLLinkElement;
  el.setAttribute("rel", rel);
  el.setAttribute("href", href);
  if (!existing) head.appendChild(el);
};

const upsertJsonLd = (id: string, json: unknown) => {
  const head = document.head;
  const selector = `script[data-jsonld-id="${id}"]`;
  const existing = head.querySelector(selector);
  const el = (existing ?? document.createElement("script")) as HTMLScriptElement;
  el.type = "application/ld+json";
  el.setAttribute("data-jsonld-id", id);
  el.text = JSON.stringify(json);
  if (!existing) head.appendChild(el);
};

const Seo = ({ title, description, canonicalPath, imagePathOrUrl, noindex }: SeoProps) => {
  useEffect(() => {
    const pageTitle = title ? `${title} | ${SITE.name}` : SITE.defaultTitle;
    const pageDescription = description ?? SITE.defaultDescription;
    const canonicalUrl = toAbsoluteUrl(canonicalPath ?? window.location.pathname);
    const imageUrl = toAbsoluteUrl(imagePathOrUrl ?? SITE.defaultImagePath);

    document.title = pageTitle;

    upsertMeta('meta[name="description"]', { name: "description", content: pageDescription });
    upsertMeta('meta[name="robots"]', { name: "robots", content: noindex ? "noindex, nofollow" : "index, follow" });

    upsertMeta('meta[property="og:type"]', { property: "og:type", content: "website" });
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: SITE.name });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: pageTitle });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: pageDescription });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: imageUrl });
    upsertMeta('meta[property="og:image:alt"]', { property: "og:image:alt", content: SITE.name });
    upsertMeta('meta[property="og:locale"]', { property: "og:locale", content: "en_IN" });

    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: pageTitle });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: pageDescription });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: imageUrl });

    upsertLink("canonical", canonicalUrl);

    upsertJsonLd("core", {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": `${SITE.baseUrl.replace(/\/+$/, "")}/#organization`,
          name: SITE.name,
          url: SITE.baseUrl,
        },
        {
          "@type": "WebSite",
          "@id": `${SITE.baseUrl.replace(/\/+$/, "")}/#website`,
          url: SITE.baseUrl,
          name: SITE.name,
          publisher: { "@id": `${SITE.baseUrl.replace(/\/+$/, "")}/#organization` },
          inLanguage: "en-IN",
        },
        {
          "@type": "WebPage",
          "@id": `${canonicalUrl}#webpage`,
          url: canonicalUrl,
          name: pageTitle,
          description: pageDescription,
          isPartOf: { "@id": `${SITE.baseUrl.replace(/\/+$/, "")}/#website` },
          inLanguage: "en-IN",
        },
      ],
    });
  }, [title, description, canonicalPath, imagePathOrUrl, noindex]);

  return null;
};

export default Seo;
