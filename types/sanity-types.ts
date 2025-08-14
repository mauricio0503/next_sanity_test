import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface MobilePlatformInfo {
  available: boolean;
  rating?: string;
  appSize?: string;
  security?: string;
  bonus?: string;
}

export interface MobileBrowserInfo {
  instantPlay?: boolean;
  responsive?: boolean;
  noDownload?: boolean;
}

export interface MobileExperienceBrand {
  _id: string;
  name: string;
  logo: SanityImageSource;
  ios: MobilePlatformInfo;
  android: MobilePlatformInfo;
  browser: MobileBrowserInfo;
  playUrl: string;
  isTopUx?: boolean;
}

export interface MobileExperienceTableSection {
  title: string;
  description: string;
  bookmark: string;
  mobileBrands: MobileExperienceBrand[];
}

export interface Brand {
  _id: string;
  name: string;
  logo: string;
  subtitle: string;
  title: string;
  description: string;
  reviewer: string;
  reviewDate?: string;
  verifiedDate?: string;
  bonusUrl: string;
  reviewUrl: string;
  score: number;
  award: {
    awardType: string;
    hasAward: boolean;
  };
}

export interface TrustPoint {
  icon: string;
  iconBgColor: string;
  text: string;
  hasLink: boolean;
}

export interface ReviewerInfo {
  name: string;
  title?: string;
  image: SanityImageSource;
}

export interface TrustSectionType {
  _id: string;
  title: string;
  description: string;
  bookmark: string;
  points: TrustPoint[];
  reviewer: {
    lastUpdated: string;
    reviewedBy: ReviewerInfo;
  };
}

export interface BrandSectionType {
  _id: string;
  title: string;
  description: string;
  bookmark: string;
  content: Brand[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Subtopic {
  title: string;
  content: string;
}

export interface HeroSectionType {
  heroTitle: string;
  heroSubtitle: string;
  mainReviewer: ReviewerInfo;
  heroCtas: {
    text: string;
    url: string;
    variant: "primary" | "outline";
  }[];
  complianceLogos: SanityImageSource[];
  heroMainImage: string;
  heroBackgroundImage: string;
}

export interface IntentPage {
  _id: string;
  metaDescription: string;
  states: string[];

  heroSection: HeroSectionType;
  trustSection: TrustSectionType;
  brandSection: BrandSectionType;
  mobileExperienceTableSection: MobileExperienceTableSection;
}

export interface SectionLink {
  bookmark: string;
  title: string;
}

export interface SubMenuItemType {
  _key: string;
  label: string;
  link: string;
}

export interface MenuItemType {
  _key: string;
  label: string;
  link?: string;
  dropdownItems?: SubMenuItemType[];
}

export interface CtaButtonType {
  text: string;
  link: string;
}

export interface HeaderType {
  _type: "header";
  _id: string;
  logo: SanityImageSource;
  brandName: string;
  languages: CountryType[];
  menuItems: MenuItemType[];
  ctaButton: CtaButtonType;
}

export interface CountryType {
  _id: string;
  country: string;
  flag: SanityImageSource;
}

export const desiredOrder = ["trustSection", "brandSection", "mobileExperienceTableSection"];
