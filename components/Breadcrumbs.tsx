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
            <div className="text-secondary hover:text-primary hover:underline cursor-pointer">
              {item.label}
            </div>
          ) : (
            <span>{item.label}</span>
          )}
          {idx < items.length - 1 && <ChevronRight size={16} />}
        </span>
      ))}
    </nav>
  );
};
