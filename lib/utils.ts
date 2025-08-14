import { twMerge } from "tailwind-merge";
import { clsx, type ClassValue } from "clsx";

import { client } from "./sanityClient";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source).url();
}
