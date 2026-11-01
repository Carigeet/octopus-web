import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";
import { Product, CategoryInfo } from "@/types/product";

export async function getAllProducts(): Promise<Product[]> {
  return productsData as Product[];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = (productsData as Product[]).find((p) => p.slug === slug);
  return product || null;
}

export async function getBestSellers(): Promise<Product[]> {
  return (productsData as Product[]).filter((p) => p.bestSeller);
}

export async function getCategories(): Promise<CategoryInfo[]> {
  return categoriesData as CategoryInfo[];
}
