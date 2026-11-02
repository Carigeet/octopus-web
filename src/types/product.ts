export type ProductCategory = "kitchen" | "home-security" | "hair-care" | "accessories";

export interface ProductSpecSection {
  title: string;
  items: string[];
}

export interface ProductFeature {
  title: string;
  description: string;
  image?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  shortDescription: string;
  description?: string;
  image: string;
  bestSeller: boolean;
  colours?: string[];
  features?: ProductFeature[];
  specs?: ProductSpecSection[];
  lifestyleImages?: {
    top?: string;
    bottom?: string;
  };
}

export interface CategoryInfo {
  slug: ProductCategory;
  name: string;
  shortDescription: string;
  featuredProductSlug: string;
  secondaryProductSlugs: string[];
  image: string;
}

