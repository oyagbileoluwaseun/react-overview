import { useEffect, useState, useRef } from "react";
import SearchBar from "../search/SearchBar";
import CategoryFilter from "../search/CategoryFilter";
import ProductList from "../List/ProductList";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  thumbnail: string;
  discountPercentage: number;
};
const PRODUCTS_SEARCH_API_URL = "https://dummyjson.com/products";

function UseRef() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState<string>("smartphones");
  const [search, setSearch] = useState<string>("");
  const previousSearch = useRef<string>("");
  const isFirstRender = useRef<boolean>(true);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchProducts(): Promise<void> {
        setLoading(true);
        setError("");
        previousSearch.current = search;

        try { 
            let url = "";

            if (search.trim()) {
                url = `${PRODUCTS_SEARCH_API_URL}/search?q=${encodeURIComponent(search)}`;
            } else {
                url = `${PRODUCTS_SEARCH_API_URL}/category/${category}`;
            }

            const response = await fetch(url, { signal });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setProducts(data.products);
        } catch (err: any) {
            if (err.name !== "AbortError") {
            setError((err as Error).message || "An error occurred while fetching products.");
        } 
    } finally {
        setLoading(false);
        }
    }
      if (isFirstRender.current) {
    isFirstRender.current = false;
    return;
    } 
    console.log("Search changed:", search);

    fetchProducts();

    return () => {
        controller.abort();
    };

  }, [search]);


  return (
    <main style={{ padding: "24px", fontFamily: "Arial, sans-serif" }}>
      <h1>Products Explorer {category}</h1>
      <h4>Searching for: {search}</h4>

      {/* Search Input */}
      <SearchBar search={search} setSearch={setSearch} />

      {/* Category Buttons */}
      <CategoryFilter search={search} setCategory={setCategory} />

      {/* UI States */}
      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <ProductList products={products} />
        )}
        
    </main>
  );
}

export default UseRef;