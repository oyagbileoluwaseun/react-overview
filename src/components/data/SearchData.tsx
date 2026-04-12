import { useState } from "react";
import SearchBar from "../search/SearchBar";
import CategoryFilter from "../search/CategoryFilter";
import ProductList from "../List/ProductList";
import useProducts from "../../hooks/useProducts";




function SearchData() {
  const [category, setCategory] = useState<string>("smartphones");
  const [search, setSearch] = useState<string>("");

  const { products, loading, error } = useProducts(category, search);
  

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

export default SearchData;