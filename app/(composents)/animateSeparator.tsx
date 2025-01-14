export default function AnimateSeparator() {
    return (
        <div className="w-[45%] h-[4px] bg-yellow-300 rounded flex items-center mb-4 ml-2">
            <div className="w-1 h-1 rounded-full animate-dotMove shadow-dotEffect"></div>
        </div>
    )
}