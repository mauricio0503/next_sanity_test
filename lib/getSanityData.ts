import { groq } from "next-sanity";
import { client } from "./sanityClient";
import { HeaderType, IntentPage } from "@/types/sanity-types";

const landingDataQuery = groq`
  *[_type == "intentPage"]{
    _id,
    states,
    heroSection->{
      _id,
      heroTitle,
      heroSubtitle,
      mainReviewer,
      heroCtas,
      complianceLogos,
      heroMainImage,
      heroBackgroundImage,
    },
    trustSection->{
      _id,
      title,
      description,
      bookmark,
      points,
      reviewer
    },
    brandSection->{
      _id,
      title,
      description,
      bookmark,
      content[]->{
        _id,
        name,
        logo,
        subtitle,
        title,
        score,
        description,
        reviewer,
        reviewDate,
        verifiedDate,
        bonusUrl,
        reviewUrl,
        award
      }
    },
    mobileExperienceTableSection->{
      _id,
      title,
      description,
      bookmark,
      mobileBrands[]->{
        _id,
        name,
        ios,
        android,
        browser,
        logo,
        playUrl,
        appStoreUrl,
        award
      }
    }
  }
`;

const headerDataQuery = groq`
  *[_type == "header"][0] {
    _id,
    logo,
    brandName,
    languages,
    menuItems[] {
      _key,
      label,
      link,
      dropdownItems[] {
        _key,
        label,
        link
      }
    },
    ctaButton {
      text,
      link
    }
  }
`;

export const getHeaderData = async (): Promise<HeaderType> => {
  const data = await client.fetch(headerDataQuery);

  if (!data) {
    throw new Error("Failed to fetch data for the Crypto Casinos page from Sanity.");
  }
  return data;
};

export async function getLandingPageData(): Promise<IntentPage> {
  const data = await client.fetch(landingDataQuery);

  if (!data) {
    throw new Error("Failed to fetch data for the Crypto Casinos page from Sanity.");
  }
  return data[0];
}
