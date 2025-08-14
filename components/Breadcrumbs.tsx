import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export const Breadcrumbs = ({
  items,
  className,
}: {
  items: BreadcrumbItem[];
  className?: string;
}) => {
  return (
    <nav className={`${className} w-full text-sm flex items-center gap-2`} aria-label="Breadcrumb">
      {items.map((item, idx) => (
        <span key={item.label} className="flex items-center gap-2">
          {item.href && idx !== items.length - 1 ? (
            <Link href={item.href} className="text-secondary hover:text-primary hover:underline">
              {item.label}
            </Link>
          ) : (
            <span>{item.label}</span>
          )}
          {idx < items.length - 1 && <ChevronRight size={16} />}
        </span>
      ))}
    </nav>
  );
};
