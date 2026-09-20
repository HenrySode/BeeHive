import { Star, MessageSquareQuote } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { testimonials } from "@/lib/site-content";

/**
 * No reviews have been supplied yet (discovery brief section 6). Rather
 * than invent quotes, this renders an honest placeholder state until real
 * testimonials are confirmed with the client.
 */
export function TestimonialsGrid({ limit }: { limit?: number }) {
  const items = limit ? testimonials.slice(0, limit) : testimonials;

  if (items.length === 0) {
    return (
      <Card className="flex flex-col items-center gap-3 py-12 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-soft text-muted">
          <MessageSquareQuote size={24} aria-hidden="true" />
        </span>
        <p className="max-w-md text-[16px] text-muted">
          Customer reviews will appear here once Bee Hive shares them. This section is ready
          and waiting for real testimonials.
        </p>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((testimonial) => (
        <Card key={testimonial.author} className="flex flex-col gap-4">
          <div className="flex gap-1 text-accent" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star key={index} size={16} fill="currentColor" stroke="none" />
            ))}
          </div>
          <p className="text-[16px] text-body">&ldquo;{testimonial.quote}&rdquo;</p>
          <div className="mt-auto text-[14px] text-muted">
            <span className="font-medium text-ink">{testimonial.author}</span>
            {testimonial.location ? <span> &middot; {testimonial.location}</span> : null}
          </div>
        </Card>
      ))}
    </div>
  );
}
