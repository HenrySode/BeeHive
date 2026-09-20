/**
 * Site-wide content that is not tied to a single page. Copy comes from
 * content.md, which is derived from the discovery brief and prd.md.
 *
 * Anything marked "placeholder" below is called out as an open item in
 * content.md and should be replaced once the client confirms it. Contact
 * details use the standard 555 placeholder convention so nobody mistakes
 * them for a real number.
 */

export const business = {
  name: "Bee Hive Heating and Air Conditioning",
  shortName: "Bee Hive",
  slogan: "Comfort You Can Count On",
  description:
    "Bee Hive provides residential heating, cooling, ventilation, indoor air quality, maintenance, repair, and installation services.",
  phone: "(555) 123-4567", // Placeholder, to confirm (brief section 6/7).
  phoneHref: "tel:+15551234567",
  email: "info@beehive-hvac.com", // Placeholder, to confirm.
  serviceArea: "Service area to be confirmed with the client", // Placeholder.
  hours: [
    { day: "Monday to Friday", time: "8:00 AM to 6:00 PM" },
    { day: "Saturday", time: "9:00 AM to 2:00 PM" },
    { day: "Sunday", time: "Closed" },
  ], // Placeholder hours, to confirm.
};

export const primaryNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

/**
 * Draft FAQ content. The discovery brief confirms no FAQ list has been
 * supplied yet, so these are grounded only in confirmed facts (the service
 * list and the request-service process) and are shown as drafts pending
 * client review, not presented as final copy.
 */
export const faqsDraft = [
  {
    question: "What services does Bee Hive offer?",
    answer:
      "Heating, cooling, ventilation, indoor air quality, maintenance, repair, and installation services, including furnaces, boilers, heat pumps, mini-splits, humidifiers, dehumidification, ductwork, and dryer-vent cleaning. See the Services page for the full list.",
  },
  {
    question: "How do I request a service?",
    answer:
      "Use the Request Service form on any page, or the Contact page. Include your address, the service you need, and a preferred date and time, and Bee Hive will follow up to confirm.",
  },
  {
    question: "Do you offer preventive maintenance plans?",
    answer:
      "Yes. Preventive maintenance helps keep your equipment running properly and catches small problems before they become expensive repairs.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "Service area to be confirmed with the client. Contact Bee Hive directly to check availability at your address.",
  },
  {
    question: "How quickly can someone come out?",
    answer:
      "Response times depend on the type of service and current scheduling. Submit a request with your preferred date and time and Bee Hive will confirm availability.",
  },
];

/**
 * No testimonials have been supplied yet (discovery brief section 6). Keep
 * this list empty rather than inventing quotes; the testimonials page and
 * home page strip render an honest placeholder state when it is empty.
 */
export const testimonials: Array<{ quote: string; author: string; location?: string }> = [];

/**
 * No gallery photography has been supplied yet, beyond the two concept
 * images already used elsewhere on the site for design direction. This
 * count drives how many placeholder tiles the gallery grid shows.
 */
export const galleryPlaceholderCount = 8;
