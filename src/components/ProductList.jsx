import React, { useState } from "react";
import axios from "axios";

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchProductList = async (
    search = "Hat",
    isLoadMore = false,
    page = pageNumber
  ) => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}?search=${search}&page=${page}&limit=10`,
        {
          headers: {
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
        }
      );

      const data = response.data;

      if (isLoadMore) {
        setProducts((prev) => [...prev, ...data]);
      } else {
        setProducts(data);
      }

      setHasMore(data.length === 10);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    setPageNumber(0);
    fetchProductList("Hat", false, 0);
  };

  const handleLoadMore = () => {
    const nextPage = pageNumber + 1;
    setPageNumber(nextPage);
    fetchProductList("Hat", true, nextPage);
  };

  return (
    <div className="w-full max-w-[580px]">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Add Products
      </h2>

      <div className="flex justify-end mt-4 pr-4">
        <button
          onClick={handleAddProduct}
          className="px-12 py-2 border-2 border-[#008060] text-[#008060] text-sm font-medium rounded hover:bg-[#008060] hover:text-white transition-colors"
        >
          Add Product
        </button>
      </div>

      {/* Products List */}
      <div className="mt-6 space-y-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded">
            <img
              src={product.image?.src}
              alt={product.title}
              className="w-20 h-20 object-cover mb-2"
            />
            <h3 className="font-medium">{product.title}</h3>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && products.length > 0 && (
        <div className="mt-4 text-center">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-black text-white rounded"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};
