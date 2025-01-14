export default function AltListeChapter(){
    return (
        <div className="animate-pulse">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="w-[90vw] h-[5vh] border-l-4 rounded-xl border-violet-700 px-3 py-1 bg-black/50 mb-4">
          </div>
        ))}
      </div>
    )
}