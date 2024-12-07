import { useState } from "react";
import ProductModal from "../../components/ProductModal";

const ProductPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">
        Products
      </h1>
      <button
        onClick={openModal}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Add Product
      </button>

      <ProductModal isOpen={modalIsOpen} onRequestClose={closeModal} />
    </div>
  );
};

export default ProductPage;
