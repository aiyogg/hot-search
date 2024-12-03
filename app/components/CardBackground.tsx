import { clsxm } from '../../utils/helpers'
import { CardType } from '../types'

function CardBackground({ title }: { title: CardType }) {
  return (
    <div
      className={clsxm(
        'absolute dark:bg-gray-700 z-[-1] w-full h-full right-0 bottom-0 opacity-30 bg-no-repeat bg-[length:15em] bg-right-bottom',
        title === 'Weibo' && 'bg-[url(./assets/weibo.svg)]',
        title === 'Zhihu' && 'bg-[url(./assets/zhihu.svg)]',
        title === 'Netease' && 'bg-[url(./assets/netease.svg)]'
      )}
    />
  )
}

export default CardBackground
