import { useState } from "react";
import SearchBar from "../search/SearchBar";
import CategoryFilter from "../search/CategoryFilter";
import ProductList from "../List/ProductList";
import { fetchProductsByCategory, searchProducts } from "../../services/api";
import useFetchAxios from "../../hooks/useFetechAxios";

function DataFetchAxios() {
  const [category, setCategory] = useState<string>("smartphones");
  const [search, setSearch] = useState<string>("");

  const requestFn = async (signal: AbortSignal) => {
    if (search.trim()) {
      return searchProducts(search, signal);
    }
    return fetchProductsByCategory(category, signal);
    };

    const { data, loading, error } = useFetchAxios(requestFn, [category, search]);

    const products = data ? data.products : [];

    return ( 
    <main style={{ padding: "24px", fontFamily: "Arial, sans-serif" }}>
      <h1>Products Explorer: {category}</h1>
      <h4>Searching for: {search}</h4>

        {/* Search Input */}
        <SearchBar search={search} setSearch={setSearch} />

        {/* Category Filter */}
        <CategoryFilter search={search} setCategory={setCategory} />

        {/* Product List */}
         {loading && <p>Loading products...</p> }
        {error && <p style={{ color: "red" }}>{error}</p> }
        {!loading && !error && <ProductList products={products} />}
    </main>
  );
}

export default DataFetchAxios;