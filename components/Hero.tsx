import Image from "next/image";
import { urlFor } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { HeroSectionType } from "@/types/sanity-types";

const getButtonClasses = (variant: string) => {
  if (variant === "outline") {
    return "border-red-600 bg-black text-red-500 hover:bg-red-50 hover:text-red-500 border-2";
  }
  return "bg-red-600 hover:bg-red-500 text-white";
};
export const Hero = ({ data }: { data: HeroSectionType }) => {
  if (!data) return null;

  return (
    <section className="w-full">
      <div className="w-full">
        {/* Main Hero Card - Now fully dynamic */}
        <div className="bg-black rounded-2xl py-8 px-6 md:py-10 md:px-8 flex flex-col-reverse md:flex-row items-center relative overflow-hidden">
          {/* Left: Text Content */}
          <div className="flex-1 text-white z-10 w-full">
            <div className="md:w-4/5">
              <h1 className="font-inter-tight font-bold text-[32px] leading-10 -tracking-normal align-middle mb-3">
                {data.heroTitle}
              </h1>
              <p className="text-base md:text-lg text-white/80">{data.heroSubtitle}</p>
            </div>
            <div className="flex items-center gap-3 my-8">
              <Image
                src={urlFor(data.mainReviewer.image)}
                alt={data.mainReviewer.name}
                width={32}
                height={32}
                className="rounded-full border-2 border-white/50"
              />
              <span className="text-sm italic">
                Reviewed by{" "}
                <span className="font-semibold text-primary hover:underline underline-offset-4 cursor-pointer">
                  {data.mainReviewer.name}
                </span>
                , {data.mainReviewer.title}
              </span>
            </div>
            {/* Dynamically generate buttons from Sanity data */}
            <div className="flex flex-col md:flex-row flex-wrap gap-4">
              {data.heroCtas?.map((cta, index) => (
                <Button
                  key={index}
                  asChild
                  size="lg"
                  className={`${getButtonClasses(cta.variant)} cursor-pointer font-bold h-12 px-6 text-base shadow-lg`}
                >
                  <a href={cta.url}>{cta.text}</a>
                </Button>
              ))}
            </div>
            {/* Dynamically generate compliance logos from Sanity data */}
            <div className="flex gap-4 items-center justify-center md:justify-start mt-8 md:mt-6">
              {data.complianceLogos?.map((logoUrl, index) => (
                <Image
                  key={index}
                  src={urlFor(logoUrl)}
                  alt={`Compliance Logo ${index + 1}`}
                  className="h-8 w-auto"
                  width={90}
                  height={32}
                  objectFit="contain"
                />
              ))}
            </div>
          </div>
          {/* Right: Flag chip image */}
          <div className="flex flex-col items-center justify-center z-10 pb-8 md:p-0">
            <Image src={urlFor(data.heroMainImage)} alt="Country Badge" width={160} height={160} />
          </div>
          {/* Decorative dots/map */}
          <div className="absolute right-0 top-0 w-full md:w-2/3 md:bottom-0 pointer-events-none z-0">
            <Image
              src={urlFor(data.heroBackgroundImage)}
              alt="USA Chip"
              width={96}
              height={96}
              className="rounded-full w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
