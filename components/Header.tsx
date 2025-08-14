"use client";

import Link from "next/link";
import Image from "next/image";
import { Lexend } from "next/font/google";
import { useState, useEffect } from "react";
import { ChevronDown, Search, Menu, X } from "lucide-react";

import { cn, urlFor } from "@/lib/utils";
import { HeaderType, CountryType as LanguageType } from "@/types/sanity-types";

const lexend = Lexend({ subsets: ["latin"], weight: ["700"] });

export const Header = ({ data }: { data: HeaderType }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageType | null>(null);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);

  useEffect(() => {
    if (data.languages && data.languages.length > 0) {
      setSelectedLanguage(data.languages[0]);
    }
  }, [data.languages]);

  const renderMenuItems = (inMobileMenu = false) => {
    const handleMobileDropdownToggle = (key: string) => {
      setOpenMobileDropdown((prevKey) => (prevKey === key ? null : key));
    };

    return data.menuItems.map((item) => {
      const isDropdown = item.dropdownItems && item.dropdownItems.length > 0;

      if (isDropdown) {
        if (!inMobileMenu) {
          return (
            <div className="relative group" key={item._key}>
              <button className="flex items-center gap-1 hover:text-primary transition">
                {item.label}{" "}
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-white border rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 z-10">
                <ul className="py-1">
                  {item.dropdownItems!.map((dropdownItem) => (
                    <li key={dropdownItem._key}>
                      <Link
                        href={dropdownItem.link}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary"
                      >
                        {dropdownItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        }

        const isOpen = openMobileDropdown === item._key;
        return (
          <div key={item._key}>
            <button
              onClick={() => handleMobileDropdownToggle(item._key)}
              className="w-full flex items-center justify-between gap-1 py-2 px-1 hover:text-primary transition"
            >
              {item.label}
              <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
            </button>
            {isOpen && (
              <ul className="pl-4 border-l ml-1">
                {item.dropdownItems!.map((dropdownItem) => (
                  <li key={dropdownItem._key}>
                    <Link
                      href={dropdownItem.link}
                      className="block py-2 px-1 text-sm text-gray-700 hover:text-primary"
                      onClick={() => setMenuOpen(false)}
                    >
                      {dropdownItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      }

      return (
        <Link
          key={item._key}
          href={item.link || "#"}
          className={cn("hover:text-primary transition", inMobileMenu && "py-2 px-1 block")}
          onClick={() => inMobileMenu && setMenuOpen(false)}
        >
          {item.label}
        </Link>
      );
    });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="flex items-center justify-between h-20 px-6 py-5">
        <div className="flex items-center lg:gap-12">
          <Link href="/" className="flex items-center gap-2">
            <span className="rounded-full flex items-center justify-center w-9 h-9">
              <Image
                src={urlFor(data.logo)}
                alt={data._id}
                width={36}
                height={36}
                className="w-full h-full"
              />
            </span>
            <span className={cn(lexend.className, "font-bold", "text-[24px] md:text-[32px]")}>
              {data.brandName}
            </span>
          </Link>
          <nav className="flex-1 items-center justify-between gap-6 ml-8 hidden xl:flex">
            {renderMenuItems()}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded hover:bg-muted" aria-label="Search">
            <Search className="w-5 h-5" />
          </button>

          {data.languages && selectedLanguage && (
            <div className="relative hidden xs:flex">
              <button
                onClick={() => setLanguageDropdownOpen(!languageDropdownOpen)}
                className="flex items-center gap-2 border rounded-md px-3 py-2 bg-background cursor-pointer min-w-[160px]"
              >
                <Image
                  src={urlFor(selectedLanguage.flag)}
                  alt={selectedLanguage.country}
                  width={24}
                  height={24}
                  className="rounded-full object-cover"
                />
                <span className="text-sm font-medium">{selectedLanguage.country}</span>
                <ChevronDown className="w-4 h-4 ml-auto transition-transform" />
              </button>

              {languageDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-full bg-white border rounded-md shadow-lg z-10">
                  <ul className="py-1">
                    {data.languages.map((lang) => (
                      <li key={lang._id}>
                        <button
                          onClick={() => {
                            setSelectedLanguage(lang);
                            setLanguageDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary"
                        >
                          <Image
                            src={urlFor(lang.flag)}
                            alt={lang.country}
                            width={24}
                            height={24}
                            className="rounded-full object-cover"
                          />
                          {lang.country}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <Link href={data.ctaButton.link} legacyBehavior>
            <a className="border-primary text-primary hover:bg-red-50 hover:text-red-600 border-2 font-bold h-12 px-6 text-base hidden lg:flex items-center justify-center rounded-md">
              {data.ctaButton.text}
            </a>
          </Link>
          <button
            className="p-2 rounded hover:bg-muted block xl:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 xl:hidden"
          onClick={() => setMenuOpen(false)}
        >
          <nav
            className="fixed z-50 bg-white top-0 right-0 h-full w-64 bg-background shadow-lg flex flex-col p-6 gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="self-end mb-6 p-2 rounded hover:bg-muted"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
            {renderMenuItems(true)}
            <Link href={data.ctaButton.link} legacyBehavior>
              <a className="border-primary text-primary text-center hover:bg-red-50 hover:text-red-600 border-2 font-bold h-12 px-6 text-base mt-6 flex items-center justify-center rounded-md">
                {data.ctaButton.text}
              </a>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
