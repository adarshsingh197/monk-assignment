import axios from "axios";
import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_MONK_API_KEY;

/**
 * Fetches products based on a search term and page number.
 * Handles loading, error state, infinite scrolling (`hasMore`), and request cancellation.
 *
 * @param {string} searchTerm
 * @param {number} pageNumber
 */
export const useFetchProducts = (searchTerm, pageNumber) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setProducts([]);
  }, [searchTerm]);

  useEffect(() => {
    let cancelRequest;

    const fetchProducts = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await axios({
          method: "GET",
          url: "/task/products/search",
          params: { search: searchTerm, page: pageNumber, limit: 1 },
          headers: {
            ...(API_KEY ? { "x-api-key": API_KEY } : {}),
          },
          cancelToken: new axios.CancelToken((c) => {
            cancelRequest = c;
          }),
        });

        const data = response.data;

        setProducts((prevProducts) => [...prevProducts, ...data]);
        setHasMore(Array.isArray(data) && data.length > 0);
      } catch (error) {
        if (axios.isCancel(error)) return;
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();

    return () => {
      if (cancelRequest) {
        cancelRequest();
      }
    };
  }, [searchTerm, pageNumber]);

  return { isLoading, isError, products, hasMore };
};
