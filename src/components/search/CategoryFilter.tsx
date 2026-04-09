function CategoryFilter ({ search, setCategory }: { search: string; setCategory: (value: string) => void }) {
  return (  
  <div style={{ marginBottom: "16px" }}>
        <button onClick={() => setCategory("smartphones")} disabled={search.length > 0}>
          Smartphones
        </button>
        <button onClick={() => setCategory("laptops")} disabled={search.length > 0}>
          Laptops
        </button>
        <button onClick={() => setCategory("fragrances")} disabled={search.length > 0}>
          Fragrances
        </button>
        <button onClick={() => setCategory("groceries")} disabled={search.length > 0}>
          Groceries
        </button>
    </div> );
}

export default CategoryFilter;