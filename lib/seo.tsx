import React from "react";

export function MetaTags({
  meta,
  canonical,
}: {
  meta?: { title?: string; description?: string };
  canonical?: string;
}) {
  const title = meta?.title ?? "Crypto Casinos (US)";
  const description = meta?.description ?? "";
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </>
  );
}
