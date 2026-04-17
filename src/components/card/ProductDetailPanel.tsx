function ProductDetailPanel({ product, onClose }: { product: { 
    title: string; 
    description: string; 
    price: number; 
    brand: string;
    category: string;
    stock: number;
    rating: number; 
    thumbnail: string; 
    discountPercentage: number }, onClose: () => void }) {
        if (!product) {
            return null;
        }

        const { title, description, price, thumbnail, brand, category, rating, discountPercentage, stock } = product;

        const isLowStock = stock > 0 && stock <= 5;
        const isOutOfStock = stock === 0;

        return (
            <section
                style={{
                    border: "1px solid #dcdcdc",
                    borderRadius: "16px",
                    padding: "20px",
                    marginBottom: "24px",
                    backgroundColor: "#ffffff",
                    boxShadow: "0 4px 14px rgba(0, 0, 0, 0.08)",
                }}>
                    <div
                        style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "16px",
                        marginBottom: "16px",
                        }}
                    >
                        <div>
                        <p
                            style={{
                            margin: "0 0 8px 0",
                            fontSize: "14px",
                            color: "#666",
                            }}
                        >
                            Selected Product
                        </p>
                        <h2 style={{ margin: 0, color: "#6b6b6b" }}>{title}</h2>
                        </div>

                        <button
                        onClick={onClose}
                        style={{
                            padding: "8px 12px",
                            borderRadius: "8px",
                            border: "1px solid #ccc",
                            backgroundColor: "#636363",
                            cursor: "pointer",
                        }}
                        >
                        Close
                        </button>
                    </div>

                    <div
                        style={{
                        display: "grid",
                        gridTemplateColumns: "minmax(220px, 320px) 1fr",
                        gap: "20px",
                        }}
                    >
                        <div>
                        <img
                            src={thumbnail}
                            alt={title}
                            style={{
                            width: "100%",
                            height: "260px",
                            objectFit: "cover",
                            borderRadius: "12px",
                            }}
                        />
                        </div>

                        <div>
                        <p style={{ margin: "0 0 10px 0", color: "#444", lineHeight: 1.6 }}>
                            {description}
                        </p>

                        <p style={{ margin: "0 0 8px 0" }}>
                            <strong>Brand:</strong> {brand}
                        </p>

                        <p style={{ margin: "0 0 8px 0" }}>
                            <strong>Category:</strong> {category}
                        </p>

                        <p style={{ margin: "0 0 8px 0" }}>
                            <strong>Price:</strong> ${price}
                        </p>

                        <p style={{ margin: "0 0 8px 0" }}>
                            <strong>Discount:</strong> {discountPercentage}%
                        </p>

                        <p style={{ margin: "0 0 8px 0" }}>
                            <strong>Rating:</strong> {rating} / 5
                        </p>

                        <p
                            style={{
                            margin: "0 0 12px 0",
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
                    </div>
                </div>
            </section>
        );
}

export default ProductDetailPanel;
