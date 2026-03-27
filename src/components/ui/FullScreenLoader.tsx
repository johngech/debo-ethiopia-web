import { HiOutlineLockClosed } from "react-icons/hi";

interface FullScreenLoaderProps {
  message?: string;
}

const FullScreenLoader = ({
  message = "Authenticating...",
}: FullScreenLoaderProps) => {
  return (
    <div className="flex items-center justify-center h-screen bg-linear-to-r from-purple-500 to-indigo-600">
      <div className="text-center space-y-6 p-8 bg-white rounded-2xl shadow-xl animate-pulse max-w-sm">
        <HiOutlineLockClosed className="mx-auto w-16 h-16 text-purple-500" />
        <h2 className="text-2xl font-bold text-gray-700">{message}</h2>
        <p className="text-gray-500">
          Please wait while we verify your credentials.
        </p>
        <progress className="progress progress-primary w-full mt-4" />
      </div>
    </div>
  );
};

export default FullScreenLoader;
