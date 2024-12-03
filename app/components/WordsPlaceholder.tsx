import { clsxm } from '../../utils/helpers'

function WordsPlaceholder() {
  const placeholderWidths = ['w-1/2', 'w-3/4', 'w-3/5']

  return (
    <>
      {new Array(15).fill(null).map((_, i) => (
        <div
          key={i}
          className="flex items-center space-x-5 pb-1 first-of-type:pt-2 last-of-type:pb-2"
        >
          <span className="w-5 h-5 bg-gray-300 rounded"></span>
          <div
            className={clsxm(
              'h-4 bg-gray-300 rounded',
              placeholderWidths[i % 3]
            )}
          ></div>
        </div>
      ))}
    </>
  )
}

export default WordsPlaceholder
