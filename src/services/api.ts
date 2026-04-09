const BASE_URL = "https://dummyjson.com";

export async function fetchProductsByCategory(category: string, signal: AbortSignal) {
    const response = await fetch(
        `${BASE_URL}/products/category/${category}`, { signal }
    );

    if (!response.ok) {
        throw new Error(`HTTP error! Failed to fetch products for category '${category}'. Status: ${response.status}`);
    }

    return response.json();
}

export async function searchProducts(query: string, signal: AbortSignal) {
    const response = await fetch(
        `${BASE_URL}/products/search?q=${encodeURIComponent(query)}`, 
        { signal }
    );

    if (!response.ok) {
        throw new Error(`HTTP error! Failed to search products. Status: ${response.status}`);
    }

    return response.json();
}
