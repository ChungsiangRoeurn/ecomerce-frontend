export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="w-full h-40 bg-gray-200"></div>

      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        <div className="h-5 bg-gray-300 rounded w-1/4 mt-2"></div>
        <div className="h-10 bg-gray-300 rounded w-full mt-4"></div>
      </div>
    </div>
  );
}
