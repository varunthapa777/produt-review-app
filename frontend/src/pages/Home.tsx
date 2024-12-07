import { Link } from "react-router";
import { useProducts } from "../api/queries/productQueries";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { data, isLoading, isError } = useProducts();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Something went wrong</p>;
  }
  if (!isError && !isLoading) {
    console.log(data);
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data?.map((product) => (
              <Link to={`/products/${product._id}`} key={product._id}>
                <ProductCard
                  image={product.mainImage}
                  name={product.name}
                  price={product.price}
                  rating={product.averageRating}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default HomePage;
