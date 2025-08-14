import { Metadata, NextPage } from "next";

import { getLandingPageData } from "@/lib/getSanityData";
import { desiredOrder, SectionLink } from "@/types/sanity-types";
import {
  DesktopSectionListTap,
  MobileSectionListTap,
  TabletSectionListTap,
} from "@/components/SectionListTap";
import { Hero } from "@/components/Hero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BrandSection } from "@/components/BrandSection";
import { TrustSection } from "@/components/TrustSection";
import { MobileExperienceTable } from "@/components/MobileExperienceTable";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getLandingPageData();
  const canonicalUrl = "/us/crypto";

  return {
    title: pageData.heroSection.heroTitle,
    description: pageData.metaDescription,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: pageData.heroSection.heroTitle,
      description: pageData.metaDescription,
      url: canonicalUrl,
      siteName: "Your Crypto Site",
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: pageData.heroSection.heroTitle,
      description: pageData.metaDescription,
    },
  };
}

const CryptoCasinosPage: NextPage = async () => {
  const pageData = await getLandingPageData();

  const sectionList: SectionLink[] = Object.entries(pageData)
    .filter(([, value]) => value.bookmark)
    .sort(([keyA], [keyB]) => desiredOrder.indexOf(keyA) - desiredOrder.indexOf(keyB))
    .map(([, value]) => ({
      title: value.title,
      bookmark: value.bookmark,
    }));

  return (
    <>
      <MobileSectionListTap sectionList={sectionList} />
      <main className="flex flex-col items-center w-full px-6 xl:px-16 pb-20">
        {/* Breadcrumb */}
        <Breadcrumbs
          className="max-w-screen-2xl mx-auto py-4 text-xs"
          items={[
            { label: "CasinoTop", href: "/" },
            { label: "Sweden or CasinoTop", href: "/sweden" },
            { label: "USA", href: "/us/crypto" },
          ]}
        />
        {/* Main content area */}
        <div className="w-full max-w-screen-2xl mx-auto flex flex-col xl:flex-row gap-8 pt-5">
          <div className="flex-1">
            {/* <Header /> */}
            <Hero data={pageData.heroSection} />
            <TabletSectionListTap sectionList={sectionList} />
            <TrustSection data={pageData.trustSection} />
            <BrandSection data={pageData.brandSection} />
            <MobileExperienceTable data={pageData.mobileExperienceTableSection} />
          </div>
          {/* Right sidebar */}
          <DesktopSectionListTap sectionList={sectionList} states={pageData.states} />
        </div>
      </main>
    </>
  );
};

export default CryptoCasinosPage;
