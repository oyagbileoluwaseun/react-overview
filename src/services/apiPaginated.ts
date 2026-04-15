import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://dummyjson.com",
  timeout: 5000,
}); 

export async function fetchProductsByCategory(
    category: string,
    signal: AbortSignal,
    limit: number = 10,
    skip: number = 0
) {
    const response = await apiClient.get(`/products/category/${category}`, {
        signal,
        params: {
            limit,
            skip
        }
    });

    return response.data;
}

export async function searchProducts(
    query: string,
    signal: AbortSignal,
    limit: number = 10,
    skip: number = 0
) {
    const response = await apiClient.get(`/products/search`, {
        signal,
        params: {
            q: query,
            limit,
            skip
        }
    });

    return response.data;
}