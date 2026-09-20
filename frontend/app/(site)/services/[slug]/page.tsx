import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/site/ServiceCard";
import { services, getServiceBySlug, serviceImageSrc } from "@/lib/services";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.description,
  };
}

export default async function ServiceCategoryPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const Icon = service.icon;
  const image = serviceImageSrc[service.image];
  const otherServices = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <>
      <section className="border-b border-hairline bg-surface-soft py-16 lg:py-20">
        <Container className="flex flex-col gap-6">
          <Link href="/services" className="flex items-center gap-2 text-[16px] text-body">
            <ArrowLeft size={20} aria-hidden="true" />
            All services
          </Link>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="flex flex-col items-start gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-ink">
                <Icon size={28} aria-hidden="true" />
              </span>
              <h1 className="text-[32px] font-semibold text-ink sm:text-[40px]">{service.name}</h1>
              <p className="max-w-lg text-[16px] text-body">{service.description}</p>
              <Button href="/contact">Request Service</Button>
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md border border-hairline shadow-soft">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading title="Other services" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherServices.map((item) => (
              <ServiceCard key={item.slug} service={item} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
