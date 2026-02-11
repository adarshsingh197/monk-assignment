import React from "react";

export const ProductPicker = ({
  isOpen,
  onClose,
  products,
  loading,
  hasMore,
  onLoadMore,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-lg rounded-lg p-6 relative max-h-[80vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-lg font-semibold mb-4">Select Products</h2>

        {/* Product List */}
        <div className="space-y-4">
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

        {/* Load More */}
        {hasMore && products.length > 0 && (
          <div className="mt-4 text-center">
            <button
              onClick={onLoadMore}
              className="px-6 py-2 bg-black text-white rounded"
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


