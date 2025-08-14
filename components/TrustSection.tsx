import Image from "next/image";
import { MoveUpRight, RefreshCcw } from "lucide-react";

import { urlFor } from "@/lib/utils";
import { TrustSectionType } from "@/types/sanity-types";

export const TrustSection = ({ data }: { data: TrustSectionType }) => (
  <div id={data.bookmark} className="mt-12 scroll-offset">
    <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-3">{data.title}</h2>
    <p className="text-secondary mb-6 max-w-3xl">{data.description}</p>
    <div className="space-y-3">
      {data.points?.map((point, index) => (
        <div
          key={index}
          className="flex items-center bg-card rounded-lg border px-5 py-5 shadow-sm"
        >
          <span
            className={`flex items-center justify-center w-8 h-8 rounded-full ${point.iconBgColor} mr-4`}
          >
            <Image src={urlFor(point.icon)} alt={point.text} width={32} height={32} />
          </span>
          <span className="flex-1 font-semibold">{point.text}</span>
          {point.hasLink && (
            <div className="bg-red-50 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer">
              <MoveUpRight size={12} className="text-primary" />
            </div>
          )}
        </div>
      ))}
    </div>
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6 text-sm italic text-secondary">
      <div className="flex items-center border rounded-md p-2">
        <Image
          src={urlFor(data.reviewer.reviewedBy.image)}
          alt={data.reviewer.reviewedBy.name}
          width={20}
          height={20}
          className="rounded-full border mr-2"
        />
        <span>
          Reviewed by{" "}
          <span className="text-primary hover:underline underline-offset-4 cursor-pointer">
            {data.reviewer.reviewedBy.name}
          </span>
        </span>
      </div>
      <div className="flex items-center gap-1 border rounded-md p-2">
        <RefreshCcw size={20} className="text-blue" />
        {data.reviewer.lastUpdated}
      </div>
    </div>
  </div>
);
