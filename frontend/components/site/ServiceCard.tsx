import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/lib/services";

export function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <Link
      href={`/services/${service.slug}`}
      className="group flex flex-col gap-4 rounded-md border border-hairline bg-canvas p-6 shadow-soft transition-colors hover:border-ink"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-ink">
        <Icon size={24} aria-hidden="true" />
      </span>
      <span className="text-[18px] font-semibold text-ink sm:text-[20px]">{service.name}</span>
      <p className="text-[16px] text-muted">{service.description}</p>
      <span className="mt-auto flex items-center gap-2 text-[16px] font-medium text-ink">
        Learn more
        <ArrowRight
          size={20}
          aria-hidden="true"
          className="transition-transform group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}
