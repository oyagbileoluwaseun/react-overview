import { useEffect, useState } from "react";
import { fetchProductsByCategory, searchProducts } from "../services/api";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  thumbnail: string;
  discountPercentage: number;
};

function useProducts(category: string, search: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchProducts(): Promise<void> {
        setLoading(true);
        setError("");

        try { 
            let data;

            if (search.trim()) {
                data = await searchProducts(search, signal);
            } else {
                data = await fetchProductsByCategory(category, signal);
            }

            setProducts(data.products);
        } catch (err: any) {
            if (err.name !== "AbortError") {
            setError((err as Error).message || "An error occurred while fetching products.");
        }
        } finally {
            setLoading(false);
        }
    }

    fetchProducts();

    return () => {
        controller.abort();
    };
}, [category, search]);

    return { products, loading, error };
}

export default useProducts;