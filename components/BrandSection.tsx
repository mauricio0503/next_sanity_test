import Link from "next/link";
import Image from "next/image";
import { GiftIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

import { urlFor } from "@/lib/utils";
import { RegalIcon } from "./icons/legal";
import PercentageCircle from "./icons/percentage-circle";
import { Brand, BrandSectionType } from "@/types/sanity-types";

export const BrandSection = ({ data }: { data: BrandSectionType }) => {
  const awardedBrands = data.content.filter((brand) => brand.award && brand.award.hasAward);
  const otherBrands = data.content.filter((brand) => !brand.award || !brand.award.hasAward);

  const renderBrand = (brand: Brand, idx: number, isAwarded: boolean) => (
    <div key={brand._id + idx} className="relative">
      <div className={`px-4 sm:px-6`}>
        <div
          className={`flex flex-col md:flex-row items-center gap-4 xl:py-6 ${isAwarded ? "pb-9" : ""} py-4 border-b`}
        >
          {/* Brand logo */}
          <div className="relative flex-shrink-0 w-full md:w-auto">
            <Image
              src={urlFor(brand.logo)}
              alt={brand.name}
              width={170}
              height={122}
              className="rounded-lg bg-white object-contain w-full md:w-auto"
            />
            {/* Score Tooltip */}
            <Tooltip>
              <TooltipTrigger asChild className="cursor-pointer">
                <div className="absolute top-2 left-2">
                  <PercentageCircle percentage={brand.score ?? 0} />
                </div>
              </TooltipTrigger>
              <TooltipContent className="text-xs2 font-semibold bg-black text-white">
                <p>Our score is based on independent testing</p>
              </TooltipContent>
            </Tooltip>

            {/* Compare Tooltip */}
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/20 cursor-pointer">
                  <RegalIcon
                    size={20}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent className="text-xs2 font-semibold bg-black text-white">
                <p>Add to compare list</p>
              </TooltipContent>
            </Tooltip>
          </div>
          {/* Brand info */}
          <div className="flex-1 min-w-0 w-full md:w-auto">
            <div className="text-secondary hover:text-primary mb-1 font-medium text-lg cursor-pointer hover:underline underline-offset-4 decoration-solid decoration-0">
              {brand.name}
            </div>
            <div className="font-bold text-xl mb-1 align-middle">{brand.subtitle}</div>
            <div className="text-secondary mb-1 font-inter-tight font-normal not-italic text-base leading-6 tracking-normal">
              {brand.title}
            </div>
            <div className="text-sm mb-2">{brand.description}</div>
            <div className="text-secondary text-xs italic">
              Reviewed by{" "}
              <span className="text-primary cursor-pointer hover:underline underline-offset-4">
                {brand.reviewer}
              </span>{" "}
              {brand.reviewDate && `• ${brand.reviewDate}`}{" "}
              {brand.verifiedDate && `• Last Verified ${brand.verifiedDate}`}
            </div>
          </div>
          {/* Actions */}
          <div className="flex flex-col w-full md:w-auto gap-2 items-end min-w-[160px]">
            <Link
              href={brand.bonusUrl}
              className="flex justify-center items-center w-full gap-3 bg-primary hover:bg-red-600 text-white font-bold px-6 py-3 text-base text-center rounded-lg cursor-pointer"
              target="_blank"
            >
              <GiftIcon />
              Claim Bonus
            </Link>
            <Link
              href={brand.reviewUrl}
              className="text-primary hover:underline hover:font-bold text-sm font-semibold text-center cursor-pointer place-self-center py-2 w-full"
              target="_blank"
            >
              Read Review
            </Link>
          </div>
        </div>
      </div>

      {/* Award badge: Desktop vertical ribbon */}
      {isAwarded && brand.award && brand.award.hasAward && (
        <div
          style={{ width: "30px" }}
          className="hidden xl:flex absolute -translate-x-full left-0 top-0 bottom-0 items-center z-10"
        >
          <span
            className="bg-red-500 text-white text-xs font-bold px-2 py-2 rounded-r-2xl shadow flex flex-row items-center justify-center h-full w-full"
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              minHeight: "100%",
              letterSpacing: "0.05em",
            }}
          >
            <Image
              src="/images/vertical-check-badge.svg"
              alt={brand.name}
              width={24}
              height={24}
              className="mb-2 rotate-180"
            />
            {brand.award.awardType}
          </span>
        </div>
      )}

      {/* Award badge: Mobile horizontal badge */}
      {isAwarded && brand.award && brand.award.hasAward && (
        <div className="flex xl:hidden absolute -translate-y-full top-0 left-0 z-10">
          <span className="bg-red-500 text-white text-xs font-bold px-10 py-1 rounded-t-lg shadow flex items-center gap-2">
            <Image
              alt={brand.name}
              src="/images/vertical-check-badge.svg"
              width={18}
              height={18}
              className="rotate-90"
            />
            {brand.award.awardType}
          </span>
        </div>
      )}
    </div>
  );

  return (
    <TooltipProvider>
      <section id={data.bookmark} className="w-full mt-8 scroll-offset">
        <h2 className="text-2xl font-bold mb-2">{data.title}</h2>
        <p className="mb-10 text-secondary">{data.description}</p>
        <div
          className={`bg-white border p-0 rounded-lg ${awardedBrands.length > 0 && "rounded-tl-none"}`}
        >
          {/* Render awarded brands first */}
          <div className="border-2 border-dashed border-primary rounded-r">
            {awardedBrands.map((brand, idx) => renderBrand(brand, idx, true))}
          </div>
          {/* Then render other brands */}
          {otherBrands.map((brand, idx) => renderBrand(brand, idx, false))}
        </div>
      </section>
    </TooltipProvider>
  );
};
