function SearchBar ({ search, setSearch }: { search: string; setSearch: (value: string) => void }) {
  return (  
  <div>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: "8px", width: "50%", marginBottom: "16px" }}
        />
    </div>);
}   

export default SearchBar;