import Image from "next/image";
import { Check, ChevronDown, CircleX } from "lucide-react";

import { urlFor } from "@/lib/utils";
import { RegalIcon } from "./icons/legal";
import { MobileExperienceBrand, MobileExperienceTableSection } from "@/types/sanity-types";

export const MobileExperienceTable = ({ data }: { data: MobileExperienceTableSection }) => {
  const awardedBrands = data.mobileBrands.filter((brand) => brand.isTopUx);
  const otherBrands = data.mobileBrands.filter((brand) => !brand.isTopUx);

  const renderBrand = (brand: MobileExperienceBrand, idx: number, isTopUx: boolean) => {
    return (
      <tr
        key={brand._id + idx}
        className={`relative ${isTopUx ? "!rounded-3xl !border-2 !border-l-0 !border-dashed !border-primary" : ""}`}
      >
        {/* Casino */}
        <td className="py-4 px-4 align-top border border-gray-200">
          {/* Top UX badge cell */}
          {isTopUx === true && (
            <div
              style={{ width: "30px" }}
              className="absolute -left-0.5 top-0 h-full -translate-x-full z-10 hidden xl:table-cell"
            >
              <span
                className="h-full w-full bg-red-500 text-white text-xs text-center content-center font-bold rounded-r-lg shadow block"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                TOP UX
              </span>
            </div>
          )}
          <Image
            src={urlFor(brand.logo)}
            alt={brand.name}
            width={56}
            height={40}
            className="rounded bg-white object-contain w-full md:w-20 h-auto"
          />
          <div className="font-semibold text-sm mt-2">{brand.name}</div>
          {/* Mobile Button */}
          <div className="flex md:hidden items-center gap-2 mt-2">
            <a
              href={brand.playUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary hover:bg-red-600 text-white font-bold px-5 py-2 rounded-lg flex items-center gap-2"
            >
              Play <ChevronDown className="w-4 h-4" />
            </a>
            <RegalIcon className="text-secondary hover:text-primary transition-colors cursor-pointer" />
          </div>
        </td>

        {/* IOS */}
        <td className="py-4 px-4 align-top border border-gray-200">
          {brand.ios?.available ? (
            <div className="space-y-2">
              <div className="text-secondary font-medium text-sm">
                Rating: <span className="text-black ml-1">{brand.ios.rating || "N/A"}</span>
              </div>
              <div className="text-secondary font-medium text-sm">
                App size: <span className="text-black ml-1">{brand.ios.appSize || "N/A"}</span>
              </div>
              <div className="text-secondary font-medium text-sm">
                Security: <span className="text-black ml-1">{brand.ios.security || "N/A"}</span>
              </div>
              <div className="text-secondary font-medium text-sm">
                Bonus: <span className="text-black ml-1">{brand.ios.bonus || "N/A"}</span>
              </div>
            </div>
          ) : (
            <CircleX fill="#ff3b30" size={24} className="text-white" />
          )}
        </td>

        {/* Android */}
        <td className="py-4 px-4 align-top border border-gray-200">
          {brand.android?.available ? (
            <div className="space-y-2">
              <div className="text-secondary font-medium text-sm">
                Rating: <span className="text-black ml-1">{brand.android.rating || "N/A"}</span>
              </div>
              <div className="text-secondary font-medium text-sm">
                App size: <span className="text-black ml-1">{brand.android.appSize || "N/A"}</span>
              </div>
              <div className="text-secondary font-medium text-sm">
                Security: <span className="text-black ml-1">{brand.android.security || "N/A"}</span>
              </div>
              <div className="text-secondary font-medium text-sm">
                Bonus: <span className="text-black ml-1">{brand.android.bonus || "N/A"}</span>
              </div>
            </div>
          ) : (
            <CircleX fill="#ff3b30" size={24} className="text-white" />
          )}
        </td>

        {/* Browser */}
        <td className="py-4 px-4 align-top border border-gray-200">
          <ul className="space-y-2">
            {brand.browser?.instantPlay && (
              <li className="flex items-center gap-2">
                <Check size={20} className="text-secondary" /> Instant Play
              </li>
            )}
            {brand.browser?.responsive && (
              <li className="flex items-center gap-2">
                <Check size={20} className="text-secondary" /> Responsive design
              </li>
            )}
            {brand.browser?.noDownload && (
              <li className="flex items-center gap-2">
                <Check size={20} className="text-secondary" /> No download required
              </li>
            )}
            {!brand.browser?.instantPlay &&
              !brand.browser?.responsive &&
              !brand.browser?.noDownload && (
                <li className="text-lg font-bold">
                  <CircleX fill="#ff3b30" size={24} className="text-white" />
                </li>
              )}
          </ul>
        </td>

        {/* Play button */}
        <td className="hidden md:table-cell py-4 px-4 align-top border border-gray-200">
          <a
            href={brand.playUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-500 hover:bg-red-600 text-white font-bold px-5 py-2 rounded-lg flex justify-between items-center gap-2"
          >
            Play <ChevronDown className="w-4 h-4" />
          </a>
          <RegalIcon className="mt-2.5 place-self-center text-secondary hover:text-primary transition-colors cursor-pointer" />
        </td>
      </tr>
    );
  };

  return (
    <section id={data.bookmark} className="w-full mt-12 scroll-offset">
      <h2 className="text-xl md:text-2xl font-bold mb-2">{data.title}</h2>
      <p className="mb-6 text-secondary">{data.description}</p>
      {/* Hint of TOP UX */}
      <div className="flex xl:hidden items-center gap-2 mb-4 text-primary text-sm font-bold">
        <Image src="/images/Rectangle 5.svg" alt="hit" width={32} height={16} />-{" "}
        <span>Top UX</span>
      </div>
      <div className="overflow-x-auto md:overflow-visible">
        <table className="md:min-w-full min-w-md bg-white text-sm">
          <thead className="">
            <tr>
              <th className="relative text-left font-semibold p-0">
                <div className="absolute inset-0 border rounded-tl-lg bg-light p-4">Casino</div>
              </th>
              <th className="py-4 px-4 text-left font-semibold p-0 bg-light border">IOS</th>
              <th className="py-4 px-4 text-left font-semibold p-0 bg-light border">Android</th>
              <th className="py-4 px-4 text-left font-semibold p-0 bg-light border">Browser</th>
              <th className="hidden md:table-cell relative text-left font-semibold p-0">
                <div className="absolute inset-0 border border-l-0 rounded-tr-lg bg-light p-4"></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {awardedBrands.map((brand, idx) => renderBrand(brand, idx, true))}
            {otherBrands.map((brand, idx) => renderBrand(brand, idx, false))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
