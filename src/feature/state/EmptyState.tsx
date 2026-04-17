function EmptyState({ search, category }: { search: string; category: string }) {
    const isSearching = search.trim().length > 0;

    return (
        <div
      style={{
        border: "1px dashed #cfcfcf",
        borderRadius: "12px",
        padding: "24px",
        textAlign: "center",
        backgroundColor: "#fafafa",
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: "12px" }}>
        No products found
      </h2>

      {isSearching ? (
        <>
          <p style={{ margin: "0 0 8px 0", color: "#555" }}>
            We could not find any products matching{" "}
            <strong>"{search}"</strong>.
          </p>
          <p style={{ margin: 0, color: "#666" }}>
            Try a different search term or clear the search to browse products
            in <strong>{category}</strong>.
          </p>
        </>
      ) : (
        <>
          <p style={{ margin: "0 0 8px 0", color: "#555" }}>
            There are currently no products available in{" "}
            <strong>{category}</strong>.
          </p>
          <p style={{ margin: 0, color: "#666" }}>
            Try another category to continue browsing.
          </p>
        </>
      )}
    </div>
    );
}

export default EmptyState;