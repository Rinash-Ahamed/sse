export type PriceStatus = "confirmed" | "request-price" | "contact-for-latest-price";

export type Specification = {
  label: string;
  value: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: CategorySlug;
  subcategory?: string;
  shortDescription: string;
  description?: string;

  price?: number;
  pricePrefix?: string;
  priceUnit?: string;
  priceStatus: PriceStatus;

  specifications?: Specification[];
  features?: string[];
  applications?: string[];

  images?: string[];
  featured?: boolean;
  brand?: string;

  seoTitle?: string;
  seoDescription?: string;
};

export type CategorySlug =
  | "concrete-vibration"
  | "compaction"
  | "material-lifting"
  | "screening"
  | "cutting"
  | "site-equipment";

export type Category = {
  slug: CategorySlug;
  name: string;
  shortName: string;
  description: string;
  number: string;
};

export const categories: Category[] = [
  {
    slug: "concrete-vibration",
    name: "Concrete & Vibration",
    shortName: "Concrete",
    description: "Mix concrete and remove trapped air during pours.",
    number: "01",
  },
  {
    slug: "compaction",
    name: "Compaction",
    shortName: "Compaction",
    description: "Compact soil and base layers before paving or building.",
    number: "02",
  },
  {
    slug: "material-lifting",
    name: "Material Lifting",
    shortName: "Lifting",
    description: "Lift building materials between levels on site.",
    number: "03",
  },
  {
    slug: "screening",
    name: "Screening",
    shortName: "Screening",
    description: "Screen sand and prepare material for construction.",
    number: "04",
  },
  {
    slug: "cutting",
    name: "Cutting",
    shortName: "Cutting",
    description: "Cut paver blocks to fit the job.",
    number: "05",
  },
  {
    slug: "site-equipment",
    name: "Site Equipment",
    shortName: "Site Equipment",
    description: "Move materials and handle everyday site tasks.",
    number: "06",
  },
];

export const products: Product[] = [
  {
    id: "forward-plate-compactor",
    images: ["/images/products/10.png"],
    slug: "forward-plate-compactor",
    name: "Forward Plate Compactor",
    category: "compaction",
    shortDescription: "Compact soil, gravel and base layers before paving or building.",
    description:
      "Use a forward plate compactor to prepare soil, gravel or paving base layers. Ask us for current model specifications and availability.",
    priceStatus: "contact-for-latest-price",
    applications: ["Site Compaction", "Road & Paver Base Preparation", "General Construction"],
    featured: true,
    seoTitle: "Forward Plate Compactor in Coimbatore | Shree Sanjay Equipments",
    seoDescription:
      "Forward plate compactor available from Shree Sanjay Equipments, Coimbatore. Contact for latest price and specifications.",
  },
  {
    id: "construction-monkey-hoist",
    images: ["/images/products/9.png","/images/products/14.png"],
    slug: "construction-monkey-hoist",
    name: "Construction Monkey Hoist Machine",
    category: "material-lifting",
    shortDescription: "Lift building materials between levels on site.",
    description:
      "A monkey hoist moves building materials vertically on construction sites. Contact us to discuss the available model and lifting requirements.",
    priceStatus: "contact-for-latest-price",
    applications: ["Material Lifting", "Multi-storey Construction Sites"],
    featured: true,
    seoTitle: "Monkey Hoist Machine in Coimbatore | Shree Sanjay Equipments",
    seoDescription:
      "Construction monkey hoist machine available from Shree Sanjay Equipments, Coimbatore. Contact for latest price and details.",
  },
  {
    id: "vibrator-sand-screening-machine",
    images: ["/images/products/5.png"],
    slug: "vibrator-sand-screening-machine",
    name: "Vibrator Sand Screening Machine",
    category: "screening",
    shortDescription: "Screen sand and separate material before use on site.",
    description:
      "Screen sand and other site materials before they are used. Ask us about current capacity and model details.",
    priceStatus: "contact-for-latest-price",
    applications: ["Sand Screening", "Material Preparation"],
    featured: true,
    seoTitle: "Sand Screening Machine in Coimbatore | Shree Sanjay Equipments",
    seoDescription:
      "Vibrator sand screening machine available from Shree Sanjay Equipments, Coimbatore. Contact for latest price and specifications.",
  },
  {
    id: "electric-concrete-mixer",
    images: ["/images/products/12.png"],
    slug: "electric-concrete-mixer",
    name: "Electric Concrete Mixer",
    category: "concrete-vibration",
    shortDescription: "Mix concrete at the job site before a pour.",
    description:
      "Prepare concrete on site with an electric mixer. Contact us for current capacity, motor details and availability.",
    priceStatus: "contact-for-latest-price",
    applications: ["Concrete Work", "General Construction"],
    featured: true,
    seoTitle: "Electric Concrete Mixer in Coimbatore | Shree Sanjay Equipments",
    seoDescription:
      "Electric concrete mixer available from Shree Sanjay Equipments, Coimbatore. Contact for latest price and specifications.",
  },
  {
    id: "earth-rammer",
    images: ["/images/products/15.png"],
    slug: "earth-rammer",
    name: "Earth Rammer",
    category: "compaction",
    subcategory: "Vibratory Rammer",
    shortDescription: "Compact soil in trenches and other confined areas.",
    description:
      "An earth rammer is used to compact soil where larger machines have less room to work, such as trenches. Ask us for current model details.",
    priceStatus: "contact-for-latest-price",
    applications: ["Trench Compaction", "Confined Site Areas"],
    featured: true,
    seoTitle: "Earth Rammer in Coimbatore | Shree Sanjay Equipments",
    seoDescription:
      "Earth rammer / vibratory rammer available from Shree Sanjay Equipments, Coimbatore. Contact for latest price and details.",
  },
  {
    id: "construction-lift",
    images: ["/images/products/16.png"],
    slug: "construction-lift",
    name: "Construction Lift",
    category: "material-lifting",
    shortDescription: "Move construction materials vertically on site.",
    description:
      "A construction lift helps move materials between site levels. Contact us to discuss your lifting needs and available models.",
    priceStatus: "contact-for-latest-price",
    applications: ["Material Lifting", "Construction Sites"],
    featured: true,
    seoTitle: "Construction Lift in Coimbatore | Shree Sanjay Equipments",
    seoDescription:
      "Construction lift available from Shree Sanjay Equipments, Coimbatore. Contact for latest price and details.",
  },
  {
    id: "concrete-vibrator",
    slug: "concrete-vibrator",
    name: "Concrete Vibrator",
    category: "concrete-vibration",
    shortDescription: "Remove trapped air from freshly poured concrete.",
    description:
      "Use a concrete vibrator during a pour to remove trapped air and help concrete settle around reinforcement. Ask us for model details.",
    priceStatus: "contact-for-latest-price",
    applications: ["Concrete Work", "Foundation & Slab Work"],
    seoTitle: "Concrete Vibrator in Coimbatore | Shree Sanjay Equipments",
    seoDescription:
      "Concrete vibrator available from Shree Sanjay Equipments, Coimbatore. Contact for latest price and details.",
  },
  {
    id: "paver-block-cutting-machine",
    images: ["/images/products/4.png"],
    slug: "paver-block-cutting-machine",
    name: "Paver Block Cutting Machine",
    category: "cutting",
    shortDescription: "Cut paver blocks to fit edges and layouts.",
    description:
      "Cut paver blocks to fit edges, corners and planned layouts. Contact us for current machine specifications.",
    priceStatus: "contact-for-latest-price",
    applications: ["Paver & Surface Work"],
    seoTitle: "Paver Block Cutting Machine in Coimbatore | Shree Sanjay Equipments",
    seoDescription:
      "Paver block cutting machine available from Shree Sanjay Equipments, Coimbatore. Contact for latest price and details.",
  },
  {
    id: "single-wheel-barrow",
    slug: "single-wheel-barrow",
    name: "Single Wheel Barrow",
    category: "site-equipment",
    shortDescription: "Move sand, aggregate and supplies around the site.",
    description: "A single wheel barrow for moving loose materials and supplies across a job site.",
    priceStatus: "contact-for-latest-price",
    applications: ["General Construction", "Material Handling"],
    seoTitle: "Single Wheel Barrow in Coimbatore | Shree Sanjay Equipments",
    seoDescription:
      "Single wheel barrow available from Shree Sanjay Equipments, Coimbatore. Contact for latest price and details.",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(category: CategorySlug): Product[] {
  return products.filter((p) => p.category === category);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function priceLabel(product: Product): string {
  if (product.priceStatus === "confirmed" && product.price) {
    const prefix = product.pricePrefix ? `${product.pricePrefix} ` : "";
    const unit = product.priceUnit ? ` / ${product.priceUnit}` : "";
    return `${prefix}₹${product.price.toLocaleString("en-IN")}${unit}`;
  }
  return "Price on request";
}
