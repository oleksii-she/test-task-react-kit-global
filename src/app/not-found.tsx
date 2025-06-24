export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center px-6 py-12  border border-gray-700  bg-neutral-800 rounded-2xl shadow-lg">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-indigo-600 mb-2">
          Not found
        </h2>
        <p className="text-gray-300  mb-6">
          Unfortunately, the page you are looking for is not or has been moved.
        </p>
        <a
          href="/"
          className="inline-block  text-sm line-clamp-3 mb-4 cursor-pointer bg-gradient-to-r from-blue-400 to-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:from-blue-500 hover:to-blue-700 hover:scale-105 transition-transform duration-300"
        >
          Go home
        </a>
      </div>
    </div>
  );
}
