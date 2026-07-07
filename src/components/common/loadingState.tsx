const LoadingState = ({ items = 3 }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="space-y-3">
        <div className="h-10 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg w-2/3 animate-pulse"></div>
        <div className="h-4 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg w-1/2 animate-pulse"></div>
      </div>

      {/* Roadmap items */}
      {[...Array(items)].map((_, index) => (
        <div 
          key={index} 
          className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow"
        >
          <div className="flex items-start gap-4">
            {/* Avatar/Icon placeholder */}
            <div className="shrink-0">
              <div className="h-12 w-12 bg-linear-to-br from-gray-200 to-gray-300 rounded-full animate-pulse"></div>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <div className="h-5 bg-gray-200 rounded-lg w-3/4 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded-lg w-full animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded-lg w-5/6 animate-pulse"></div>
              </div>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap">
                <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="h-6 w-14 bg-gray-200 rounded-full animate-pulse"></div>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 w-12 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-linear-to-r from-blue-400 to-blue-600 rounded-full animate-pulse"
                    style={{ width: `${Math.random() * 60 + 20}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingState;