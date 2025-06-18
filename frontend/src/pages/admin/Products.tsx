import { useState } from "react";
import ProductModal from "../../components/ProductModal";
import { useProducts } from "../../api/queries/adminQueries";
import Spinner from "../../components/ui/Spinner";
import toast, { ErrorIcon } from "react-hot-toast";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import UpdateProductModal, {
  ProductDetails,
} from "../../components/UpdateProductModal";
interface InOperation {
  productId: string;
  operation: boolean;
}

const ProductPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [UpdateModalIsOpen, setUpdateModalIsOpen] = useState(false);
  const { data, isLoading, isError } = useProducts();

  const queryClient = useQueryClient();
  const [inOperation, setInOperation] = useState<InOperation>({
    productId: "",
    operation: false,
  });

  const [selectedProduct, setSelectedProduct] = useState<ProductDetails | null>(
    null
  );
  const [productId, setProductId] = useState<string>("");

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const openUpdateModal = () => setUpdateModalIsOpen(true);
  const closeUpdateModal = () => setUpdateModalIsOpen(false);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner className="w-10 h-10 dark:text-white" />
      </div>
    );

  if (isError) return <ErrorIcon />;

  const handleDelete = async (productId: string) => {
    setInOperation({ productId, operation: true });
    try {
      const response = await axios.delete(`/api/admin/products/${productId}`);
      if (response.status === 200) {
        toast.success("Product deleted successfully");
        queryClient.invalidateQueries({
          queryKey: ["admin-products"],
          exact: true,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete product");
    } finally {
      setInOperation({ productId: "", operation: false });
    }
  };
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
        {data?.map((product) => (
          <div
            key={product._id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg"
          >
            <div className="p-2 bg-white">
              <img
                src={product.mainImage}
                alt={product.name}
                className="w-20 h-20 rounded-lg mx-auto mb-4 object-contain"
              />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 text-center">
              {product.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              ₹{product.price}
            </p>
            <div className="flex justify-center">
              <Spinner
                className={`w-5 h-5 ml-2 dark:text-white ${
                  inOperation.operation && inOperation.productId === product._id
                    ? "block"
                    : "hidden"
                }`}
              />
            </div>
            <div className="flex justify-center mt-4">
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 mr-2"
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </button>
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                onClick={() => {
                  setSelectedProduct(product as ProductDetails);
                  setProductId(product._id);
                  openUpdateModal();
                }}
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <UpdateProductModal
          isOpen={UpdateModalIsOpen}
          onRequestClose={() => {
            closeUpdateModal();
            setSelectedProduct(null);
            setProductId("");
          }}
          productId={productId}
          data={selectedProduct}
        />
      )}
    </div>
  );
};

export default ProductPage;
