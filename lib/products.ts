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
    description: "Concrete mixing and vibration equipment for site-level pour work.",
    number: "01",
  },
  {
    slug: "compaction",
    name: "Compaction",
    shortName: "Compaction",
    description: "Plate compactors and rammers built for demanding site work.",
    number: "02",
  },
  {
    slug: "material-lifting",
    name: "Material Lifting",
    shortName: "Lifting",
    description: "Equipment for moving material and loads efficiently on site.",
    number: "03",
  },
  {
    slug: "screening",
    name: "Screening",
    shortName: "Screening",
    description: "Practical site equipment for material preparation.",
    number: "04",
  },
  {
    slug: "cutting",
    name: "Cutting",
    shortName: "Cutting",
    description: "Cutting equipment for paver blocks and surface work.",
    number: "05",
  },
  {
    slug: "site-equipment",
    name: "Site Equipment",
    shortName: "Site Equipment",
    description: "General site and material handling equipment.",
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
    shortDescription: "Compaction equipment designed for demanding site work.",
    description:
      "A forward plate compactor for compacting soil, gravel and asphalt on construction and road-work sites. Exact model specifications are available on request.",
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
    shortDescription: "Equipment for moving material efficiently on site.",
    description:
      "A monkey hoist machine used on construction sites for vertical material handling. Shree Sanjay Equipments is listed as a supplier of this equipment. Specifications available on request.",
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
    shortDescription: "Construction equipment designed for screening and separating sand/material on site.",
    description:
      "A vibratory screening machine used to screen and separate sand and other site material. Capacity and specifications are confirmed at the time of enquiry.",
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
    shortDescription: "Concrete mixing equipment for site-level pour work.",
    description:
      "An electric concrete mixer for on-site concrete preparation. Capacity and motor specifications available on request.",
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
    shortDescription: "Vibratory rammer for compacting soil in confined areas.",
    description:
      "An earth rammer (vibratory rammer) suited to trench and confined-area compaction work. Specifications available on request.",
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
    shortDescription: "Site lifting equipment for material handling.",
    description:
      "A construction lift used for vertical movement of material on site. Specifications available on request.",
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
    shortDescription: "Vibration equipment for consolidating poured concrete.",
    description:
      "A concrete vibrator used to consolidate freshly poured concrete and remove air pockets. Specifications available on request.",
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
    shortDescription: "Cutting equipment for paver block and surface work.",
    description:
      "A paver block cutting machine used for site-level paver and surface cutting work. Specifications available on request.",
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
    shortDescription: "Site material handling equipment.",
    description: "A single wheel barrow for general on-site material handling.",
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
  if (product.priceStatus === "request-price") return "Price on Request";
  return "Contact for Latest Price";
}
