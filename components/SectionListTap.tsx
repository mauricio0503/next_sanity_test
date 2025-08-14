"use client";

import { useState, useRef, useEffect } from "react";
import { BookText, ChevronDown, ChevronUp, MapPin } from "lucide-react";

import { SectionLink } from "@/types/sanity-types";
import { useActiveSection } from "@/hooks/useActiveSection";

export const DesktopSectionListTap = ({
  sectionList,
  states,
}: {
  sectionList: SectionLink[];
  states: string[];
}) => {
  const sectionIds = sectionList.map((s) => s.bookmark);
  const { activeId, scrollToSection } = useActiveSection(sectionIds);

  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <aside className="hidden xl:block w-full md:w-96 flex-shrink-0 scroll">
      <div className="sticky top-24">
        {/* States Dropdown */}
        {/* 4. Attach the ref to the dropdown's container */}
        <div ref={dropdownRef} className="bg-white text-secondary rounded-xl mb-4 relative">
          <button
            className="w-full flex items-center justify-between text-left font-normal py-4 px-4 h-auto border rounded-xl"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="flex items-center gap-2">
              <MapPin />
              <span>{selectedState || "Choose State"}</span>
            </div>
            {dropdownOpen ? (
              <ChevronUp className="w-4 h-4 ml-2" />
            ) : (
              <ChevronDown className="w-4 h-4 ml-2" />
            )}
          </button>

          {dropdownOpen && (
            <ul className="absolute top-full overflow-auto max-h-60 left-0 right-0 bg-white border rounded-b-xl shadow-lg z-10">
              {states.map((state) => (
                <li
                  key={state}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setSelectedState(state);
                    setDropdownOpen(false);
                  }}
                >
                  {state}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Section List */}
        <div className="bg-white text-secondary rounded-xl border p-6">
          <ul className="space-y-4">
            {sectionList.map((item) => (
              <li
                key={item.bookmark}
                className={`cursor-pointer ${
                  activeId === item.bookmark
                    ? "font-semibold text-primary"
                    : "hover:text-primary hover:underline underline-offset-4"
                }`}
                onClick={() => scrollToSection(item.bookmark)}
              >
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export const MobileSectionListTap = ({ sectionList }: { sectionList: SectionLink[] }) => {
  const [open, setOpen] = useState(false);
  const sectionIds = sectionList.map((s) => s.bookmark);
  const { activeId, scrollToSection } = useActiveSection(sectionIds);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={mobileMenuRef} className="block sm:hidden sticky top-20 z-20 bg-white border-y">
      <div className="w-full py-3 relative z-30">
        <div
          className="w-full flex items-center justify-between text-left font-semibold text-sm h-auto px-4 cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <div className="flex items-center gap-2">
            <BookText size={20} />
            <span>Table of Contents</span>
          </div>
          {open ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
        </div>

        {open && (
          <div className="absolute left-0 right-0 mt-2 bg-white text-secondary border-b px-12 py-2 pb-6">
            <ul className="space-y-3">
              {sectionList.map((item) => (
                <li
                  key={item.bookmark}
                  className={`cursor-pointer ${
                    activeId === item.bookmark
                      ? "font-semibold text-primary"
                      : "hover:text-primary hover:underline underline-offset-4"
                  }`}
                  onClick={() => {
                    scrollToSection(item.bookmark);
                    setOpen(false);
                  }}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export const TabletSectionListTap = ({ sectionList }: { sectionList: SectionLink[] }) => {
  const sectionIds = sectionList.map((s) => s.bookmark);
  const { activeId, scrollToSection } = useActiveSection(sectionIds);

  return (
    <div className="hidden xl:hidden sm:flex sticky top-20 z-20 bg-white border-b overflow-x-auto whitespace-nowrap mt-6">
      <div className="flex">
        {sectionList.map((item) => (
          <button
            key={item.bookmark}
            className={`px-4 py-3 font-medium flex-shrink-0 ${
              activeId === item.bookmark
                ? "font-semibold text-primary"
                : "hover:text-primary hover:underline underline-offset-4"
            }`}
            onClick={() => scrollToSection(item.bookmark)}
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
};
