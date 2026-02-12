import axios from "axios";
import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_MONK_API_KEY;

export const useFetchProducts = (searchTerm, pageNumber) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setProducts([]);
  }, [searchTerm]);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    let cancelRequest;

    axios({
      method: "GET",
      url: "/task/products/search",
      params: { search: searchTerm, page: pageNumber, limit: 1 },
      headers: {
        ...(API_KEY ? { "x-api-key": API_KEY } : {}),
      },
      cancelToken: new axios.CancelToken((c) => (cancelRequest = c)),
    })   
      .then((response) => {
        const data = response.data;
        setProducts((prevProducts) => {
          return [...prevProducts, ...data];
        });
        setHasMore(response.data.length > 0);
        setIsLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setIsError(true);
      });

    return () => cancelRequest();
  }, [searchTerm, pageNumber]);

  return { isLoading, isError, products, hasMore };
};
