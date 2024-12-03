import WordsPlaceholder from './WordsPlaceholder'

function CardErrorFallback() {
  return (
    <div className="rounded-lg border shadow-sm p-5">
      <div className="flex flex-col space-y-1.5 pb-3">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">
          Something went wrong
        </h3>
        <p className="text-sm text-muted-foreground">Please try again later.</p>
      </div>
      <div className="space-y-2">
        <WordsPlaceholder />
      </div>
    </div>
  )
}

export default CardErrorFallback
