import Spinner from "./ui/Spinner";

const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Spinner className="w-10 h-10 dark:text-white" />
    </div>
  );
};

export default Loading;
