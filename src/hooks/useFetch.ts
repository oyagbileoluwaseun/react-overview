import { useState, useEffect } from 'react';

function useFetch<T>(requestFn: (signal: AbortSignal) => Promise<T>, dependencies: any[] = []) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        async function runRequest() {
            setLoading(true);
            setError(null);

            try {
                const result = await requestFn(signal);
                setData(result);
            } catch (err: any) {
                if (err.name !== 'AbortError') {
                    setError(err.message || 'An error occurred while fetching data.');
                }
            } finally {
                setLoading(false);
            }
        }

        runRequest();

        return () => {
            controller.abort();
        };
    }, dependencies);

    return { data, loading, error };
}

export default useFetch;