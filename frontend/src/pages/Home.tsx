import { Link } from "react-router";
import { useProducts } from "../api/queries/productQueries";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";

const HomePage = () => {
  const { data, isLoading, isError } = useProducts();

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <p>Something went wrong</p>;
  }
  if (!isError && !isLoading) {
    return (
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
    );
  }
};

export default HomePage;
