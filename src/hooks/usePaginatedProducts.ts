import { useEffect, useState } from "react";
import { fetchProductsByCategory, searchProducts } from "../services/apiPaginated";

const PAGE_SIZE = 6;

function usePaginatedProducts(category: string, search: string) {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [skip, setSkip] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        async function loadInitialProducts() {
            setLoading(true);
            setError(null);
            setSkip(0);

            try {
                let data;
            
                if (search.trim()) {
                    data = await searchProducts(search, signal, PAGE_SIZE, 0);
                } else {
                    data = await fetchProductsByCategory(category, signal, PAGE_SIZE, 0);
                }

                setProducts(data.products);
                setTotal(data.total);
            } catch (err: any) {
                if (err.name !== "CanceledError" && err.name !== "AbortError") {
                    setError(err.message || "An error occurred while fetching products.");
                } 
            } finally {
                setLoading(false);
            }
        }

        loadInitialProducts();

        return () => {
            controller.abort();
        };
    }, [category, search]);

    async function loadMore() {
        const controller = new AbortController();
        const signal = controller.signal;
        const nextSkip = skip + PAGE_SIZE;

        setLoadingMore(true);
        setError(null);

        try {
            let data;
            
            if (search.trim()) {
                data = await searchProducts(search, signal, PAGE_SIZE, nextSkip);
            } else {
                data = await fetchProductsByCategory(category, signal, PAGE_SIZE, nextSkip);
            }

            setProducts(prev => [...prev, ...data.products]);
            setSkip(nextSkip);
            setTotal(data.total);
        } catch (err: any) {
            if (err.name !== "CanceledError" && err.name !== "AbortError") {
                setError(err.message || "An error occurred while fetching more products.");
            }
        } finally {
            setLoadingMore(false);
        }
    }

    const hasMore = products.length < total;

    return { products, loading, error, loadMore, loadingMore, hasMore, total };
}

export default usePaginatedProducts;
