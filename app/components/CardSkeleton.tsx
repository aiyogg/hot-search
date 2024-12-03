import WordsPlaceholder from './WordsPlaceholder'

function CardSkeleton() {
  return (
    <div className="p-5 rounded-lg ring-1 ring-slate-900/5 shadow-lg animate-pulse">
      <div className="flex flex-col space-y-1.5 pb-3 mb-1">
        <div className="w-3/4 h-5 mb-2 bg-gray-300 rounded"></div>
        <div className="w-1/2 h-3 mb-3 bg-gray-300 rounded"></div>
      </div>
      <div className="space-y-2">
        <WordsPlaceholder />
      </div>
    </div>
  )
}

export default CardSkeleton
