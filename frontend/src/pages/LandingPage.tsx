import { Link } from "react-router";

const LandingPage = () => {
  return (
    <div>
      <h1 className=" text-5xl m-auto align-middle">Landing Page</h1>
      <Link to="/signin" className="text-blue-500 m-auto align-middle">
        Sign In
      </Link>
    </div>
  );
};

export default LandingPage;
