import { useState, useEffect } from "react";
import SearchBar from "../search/SearchBar";
import CategoryFilter from "../search/CategoryFilter";
import ProductList from "../List/ProductList2";
import usePaginatedProducts from "../../hooks/usePaginatedProducts";

function MyApp() {
    const [category, setCategory] = useState<string>("smartphones");
    const [search, setSearch] = useState<string>("");
    const [debounceSearch, setDebounceSearch] = useState<string>("");

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebounceSearch(search);
        }, 500);

        return () => clearTimeout(timerId);
    }, [search]);

    const { products, loading, loadingMore, error, loadMore, hasMore, total } = usePaginatedProducts(category, debounceSearch);

    return (
        <main style={{ padding: "24px", fontFamily: "Arial, sans-serif" }}>
            <h1>Products Explorer: {category}</h1>

            {/* Search Input */}
            <SearchBar search={search} setSearch={setSearch} />

            {/* Category Filter */}
            <CategoryFilter search={search} setCategory={setCategory} />

            <p>
                Showing <strong>{products.length}</strong>
                {total > 0 ? ` of ${total} ` : " "} products
            </p>

            {/* Product List */}
            {loading && <p>Loading products...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && !error && (
                <>
                    <ProductList 
                    products={products} 
                    search={debounceSearch}
                    category={category}
                    />
                    {hasMore && products.length > 0 && (
                        <button onClick={loadMore} disabled={loadingMore} style={{ marginTop: "16px", padding: "8px 16px", fontSize: "16px", 
                        cursor: loadingMore ? "not-allowed" : "pointer", }}>
                            {loadingMore ? "Loading more..." : "Load More"}
                        </button>
                    )}
                </>
            )}
        </main>

    );
}

export default MyApp;



