import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 5000,
});

export async function fetchProductsByCategory(category: string, signal: AbortSignal) {
    const response = await apiClient.get(`/products/category/${category}`, { signal });
    return response.data;
}

export async function searchProducts(query: string, signal: AbortSignal) {
    const response = await apiClient.get(`/products/search`, {
        params: { q: query },
        signal,
    });
    return response.data;  
    }