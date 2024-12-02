import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";
interface testResponse {
  message: string;
}

const HomePage = () => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch("/api/users/test")
      .then((res) => res.json())
      .then((data: testResponse) => {
        setMessage(data.message);
        console.log(data.message);
      })
      .catch((error) => {
        toast.error("Failed to fetch data");
        console.error("Failed to fetch data", error);
      });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Home Page</h1>
      <p>{message}</p>
      <Link to="/profile">Profile</Link>
    </div>
  );
};

export default HomePage;
