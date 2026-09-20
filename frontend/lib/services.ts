import {
  Flame,
  Snowflake,
  Thermometer,
  Waves,
  ArrowLeftRight,
  AirVent,
  Droplet,
  Droplets,
  Wind,
  Fan,
  WashingMachine,
  ClipboardCheck,
  Wrench,
  HardHat,
  type LucideIcon,
} from "lucide-react";

/**
 * The service catalogue. Copy is taken directly from content.md, which in
 * turn comes from the discovery brief. Do not reword these descriptions
 * without updating content.md to match.
 *
 * `image` picks one of the two concept photos available until the client
 * supplies real photography per service (see content.md open items):
 * "exterior" is the technician working on an outdoor unit, "interior" is
 * the living room with a wall-mounted mini-split.
 *
 * Once the backend exists, this list is replaced by the ServiceCategory
 * table (see schema.md) served through GET /services (see api-spec.md).
 */
export type Service = {
  slug: string;
  name: string;
  description: string;
  icon: LucideIcon;
  image: "exterior" | "interior";
};

export const services: Service[] = [
  {
    slug: "heating-services",
    name: "Heating Services",
    description:
      "Keep your home warm and comfortable with dependable heating maintenance, repairs, and installations.",
    icon: Flame,
    image: "exterior",
  },
  {
    slug: "cooling-services",
    name: "Cooling Services",
    description:
      "Stay cool with professional air-conditioning maintenance, repairs, and installations.",
    icon: Snowflake,
    image: "exterior",
  },
  {
    slug: "furnaces",
    name: "Furnaces",
    description:
      "Reliable furnace service to keep your heating system running safely and efficiently.",
    icon: Thermometer,
    image: "exterior",
  },
  {
    slug: "boilers",
    name: "Boilers",
    description:
      "Professional boiler maintenance, repairs, replacements, and installations.",
    icon: Waves,
    image: "exterior",
  },
  {
    slug: "heat-pumps",
    name: "Heat Pumps",
    description:
      "Energy-efficient heating and cooling solutions for year-round comfort.",
    icon: ArrowLeftRight,
    image: "interior",
  },
  {
    slug: "mini-splits",
    name: "Mini-Splits",
    description:
      "Flexible, ductless heating and cooling for individual rooms and spaces.",
    icon: AirVent,
    image: "interior",
  },
  {
    slug: "humidifiers",
    name: "Humidifiers",
    description: "Improve indoor comfort by adding balanced moisture to dry air.",
    icon: Droplet,
    image: "interior",
  },
  {
    slug: "dehumidification",
    name: "Dehumidification",
    description:
      "Reduce excess moisture and create a more comfortable indoor environment.",
    icon: Droplets,
    image: "interior",
  },
  {
    slug: "ductwork",
    name: "Ductwork",
    description:
      "Improve airflow with professional ductwork inspections, repairs, and installations.",
    icon: Wind,
    image: "exterior",
  },
  {
    slug: "ventilation",
    name: "Ventilation",
    description: "Bring fresh air into your home and improve overall indoor airflow.",
    icon: Fan,
    image: "interior",
  },
  {
    slug: "dryer-vent-cleaning",
    name: "Dryer-Vent Cleaning",
    description:
      "Remove lint buildup to improve dryer performance and support household safety.",
    icon: WashingMachine,
    image: "exterior",
  },
  {
    slug: "preventive-maintenance",
    name: "Preventive Maintenance",
    description:
      "Keep HVAC equipment performing properly and identify potential problems early.",
    icon: ClipboardCheck,
    image: "exterior",
  },
  {
    slug: "repair-services",
    name: "Repair Services",
    description: "Diagnose and resolve heating, cooling, and ventilation problems.",
    icon: Wrench,
    image: "exterior",
  },
  {
    slug: "installation-services",
    name: "Installation Services",
    description:
      "Install new HVAC equipment selected to fit the customer's home and comfort needs.",
    icon: HardHat,
    image: "interior",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export const serviceImageSrc: Record<Service["image"], { src: string; alt: string }> = {
  exterior: {
    src: "/images/concept-technician-outdoor-unit.jpg",
    alt: "A Bee Hive technician servicing an outdoor HVAC unit",
  },
  interior: {
    src: "/images/concept-living-room-mini-split.jpg",
    alt: "A living room with a wall-mounted mini-split heating and cooling unit",
  },
};
