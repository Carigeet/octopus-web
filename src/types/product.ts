export type ProductCategory = "kitchen" | "home-security" | "hair-care" | "accessories";

export interface ProductSpecSection {
  title: string;
  items: string[];
}

export interface ProductFeature {
  title: string;
  description: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  shortDescription: string;
  image: string;
  bestSeller: boolean;
  colours?: string[];
  features?: ProductFeature[];
  specs?: ProductSpecSection[];
}

export interface CategoryInfo {
  slug: ProductCategory;
  name: string;
  shortDescription: string;
  featuredProductSlug: string;
  secondaryProductSlugs: string[];
  image: string;
}

