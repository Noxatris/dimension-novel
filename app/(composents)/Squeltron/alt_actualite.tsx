export default function AltActualite() {
  return (
          <div className="animate-pulse">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="border-l-4 rounded-xl border-violet-700 px-3 py-1 bg-black/50 mb-4">
                <div className="h-6 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
                <div className="h-4 bg-gray-700 rounded mb-2"></div>
              </div>
            ))}
          </div>
  )
}