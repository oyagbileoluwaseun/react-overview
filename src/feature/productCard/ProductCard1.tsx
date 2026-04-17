function ProductCard1({product, onSelect}: {product: { title: string; description: string; price: number; rating: number; thumbnail: string; discountPercentage: number; brand: string; category: string; stock: number }, 
    onSelect: (product: { title: string; description: string; price: number; rating: number; thumbnail: string; discountPercentage: number; brand: string; category: string; stock: number }) => void }) {
    const {
        title,
        description,
        price,
        thumbnail,
        brand,
        category,
        rating,
        discountPercentage,
        stock,
    } = product;

    const isLowStock = stock > 0 && stock <= 5;
    const isOutOfStock = stock === 0;

    return (
        <article
            onClick={() => onSelect(product)}
            style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "16px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <img
                src={thumbnail}
                alt={title}
                style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    marginBottom: "16px",
                }}
            />

            <div style={{ marginBottom: "8px" }}>
                <h2 style={{ 
                    fontSize: "18px",
                    margin: "0 0 8px 0",
                    lineHeight: "1.3",
                    color: "#6b6b6b",}}
                    >
                    {title}
                </h2>
                <p style={{ margin: "0 0 6px 0", color: "#555" }}>
                    <strong>Brand:</strong> {brand}
                </p>

                <p style={{ margin: "0 0 6px 0", color: "#555" }}>
                    <strong>Category:</strong> {category}
                </p>
            </div>

            <p
                style={{
                margin: "0 0 12px 0",
                color: "#444",
                fontSize: "14px",
                lineHeight: 1.5,
                }}
            >
                {description}
            </p>

            <div style={{ marginTop: "12px" }}>
                <p style={{ margin: "0 0 8px 0"}}>
                     <strong>Price:</strong> ${price}
                </p>

                <p style={{ margin: "0 0 6px 0" }}>
                    <strong>Discount:</strong> {discountPercentage}%
                </p>

                <p style={{ margin: "0 0 6px 0" }}>
                    <strong>Rating:</strong> {rating} / 5
                </p>
            </div>

            <p
                style={{
                margin: 0,
                fontWeight: "bold",
                color: isOutOfStock
                    ? "#c62828"
                    : isLowStock
                    ? "#ef6c00"
                    : "#2e7d32",
                }}
            >
                {isOutOfStock
                ? "Out of stock"
                : isLowStock
                ? `Low stock: ${stock} left`
                : `In stock: ${stock}`}
            </p>

        </article>
    );
}

export default ProductCard1;