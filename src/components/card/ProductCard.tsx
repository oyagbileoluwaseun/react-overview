function ProductCard ({ product }: { product: { title: string; description: string; price: number; rating: number; thumbnail: string; discountPercentage: number } }) {
  return (
    <article
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
      }}
    >
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>
        <strong>Price:</strong> ${product.price}
      </p>
      <p>⭐ {product.rating}</p>
      <img src={product.thumbnail} alt={product.title} width="100" />
      <p>{product.discountPercentage}% off</p>
    </article>
  );
}

export default ProductCard;