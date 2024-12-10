import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

Modal.setAppElement("#root");

interface ProductModalProps {
  productId: string;
  isOpen: boolean;
  data: ProductDetails;
  onRequestClose: () => void;
}
interface ProductDetails {
  name: string;
  price: number;
  buylink: string;
  mainImage: string;
  description: string;
  images: string[];
  brand: string;
  category: string;
}

interface ExtractResponse {
  name: string;
  price: number;
  images: string[];
}

const UpdateProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  data,
  productId,
  onRequestClose,
}) => {
  const [productDetails, setProductDetails] = useState<ProductDetails>({
    name: data.name,
    price: data.price,
    buylink: data.buylink,
    mainImage: data.mainImage,
    description: data.description,
    images: data.images,
    brand: data.brand,
    category: data.category,
  });

  const [extractLink, setExtractLink] = useState("");
  const [newImageUrl, setNewImageUrl] = useState("");
  const [showImages, setShowImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProductDetails({ ...productDetails, [name]: value });
  };

  const handleExtractDetails = async () => {
    console.log("Extracting details for link:", extractLink);
    setLoading(true);
    console.log(loading);
    try {
      const { data } = await axios.get(
        "/api/products/scrape/flipkart?url=" + extractLink
      );
      console.log(data);
      const { name, price, images } = data as ExtractResponse;
      setProductDetails({
        name,
        price,
        description: "",
        mainImage: images.length > 0 ? images[0] : "",
        buylink: extractLink,
        brand: "",
        category: "",
        images: images.length > 0 ? images : [],
      });
      setLoading(false);
    } catch (error) {
      console.error("Failed to extract product details", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.patch(`/api/admin/products/${productId}`, productDetails);
      toast.success("Product updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["admin-products"],
        exact: true,
      });
    } catch (error) {
      console.error("Failed to add product", error);
      toast.error("Failed to add product");
    }
    onRequestClose();
  };

  const handleImageClick = (url: string) => {
    setProductDetails({ ...productDetails, mainImage: url });
  };

  const handleAddImageUrl = () => {
    if (newImageUrl) {
      setProductDetails({
        ...productDetails,
        images: [...productDetails.images, newImageUrl],
      });
      setNewImageUrl("");
    }
  };

  const handleRemoveImageUrl = (url: string) => {
    setProductDetails({
      ...productDetails,
      images: productDetails.images.filter((imageUrl) => imageUrl !== url),
    });
  };

  const handleViewImages = () => {
    setShowImages(!showImages);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Product"
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-20 max-h-[80vh] overflow-y-auto custom-scrollbar"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        Add Product
      </h2>
      <input
        type="text"
        placeholder="Enter product link to extract details"
        value={extractLink}
        onChange={(e) => setExtractLink(e.target.value)}
        className="w-full p-2 mb-4 border rounded-lg"
      />

      {loading ? (
        <div className="flex justify-center items-center mb-4">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        <button
          onClick={handleExtractDetails}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mb-4"
        >
          Extract Details
        </button>
      )}

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded-lg mb-4">
          <img
            src={productDetails.mainImage}
            alt="Product"
            className={`w-full h-48 rounded-lg object-contain ${
              productDetails.mainImage ? "" : "hidden"
            }`}
          />
        </div>
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={productDetails.name}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border rounded-lg"
          required
        />
        <input
          type="text"
          name="price"
          placeholder="Product Price"
          value={productDetails.price}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border rounded-lg"
          required
        />
        <input
          type="text"
          name="link"
          placeholder="Product Link"
          value={productDetails.buylink}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border rounded-lg"
          required
        />
        <input
          type="text"
          name="brand"
          placeholder="Product Brand"
          value={productDetails.brand}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border rounded-lg"
        />
        <input
          type="text"
          name="category"
          placeholder="Product Category"
          value={productDetails.category}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border rounded-lg"
          required
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={productDetails.description}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 border rounded-lg"
          required
        />
        <div className="mb-4">
          <input
            type="text"
            placeholder="Add new image URL"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            className="w-full p-2 mb-2 border rounded-lg"
          />
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleAddImageUrl}
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
            >
              Add Image URL
            </button>
            <button
              type="button"
              onClick={handleViewImages}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              {showImages ? "Hide Images" : "View Images"}
            </button>
          </div>
        </div>

        {showImages && (
          <div className="grid grid-cols-3 gap-4 mb-4">
            {productDetails.images.map((url, index) => (
              <div key={index} className="relative">
                <img
                  src={url}
                  alt="Product"
                  className="w-full h-24 object-cover cursor-pointer rounded-lg border"
                  onClick={() => handleImageClick(url)}
                />
                <button
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  onClick={() => handleRemoveImageUrl(url)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
          >
            Update Product
          </button>
          <button
            type="button"
            className=" bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
      <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 12px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #888;
                    border-radius: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #555;
                }
            `}</style>
    </Modal>
  );
};

export default UpdateProductModal;
