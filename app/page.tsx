import { Suspense } from 'react'
import { clsxm } from '../utils/helpers'
import ErrorBoundary from '../components/ErrorBoundary'
import CardBackground from '../components/CardBackground'
import CardSkeleton from '../components/CardSkeleton'
import CardErrorFallback from '../components/CardErrorFallback'
import Footer from '../components/Footer'
import type { CardType, Word } from './types'
import { getWeiboData, getZhihuData, getNeteaseData } from '../lib/fetchData'

async function Card({
  title,
  request,
}: {
  title: CardType
  request: () => Promise<Word[]>
}) {
  const words = await request().then((data) =>
    data.slice(0, title === 'Weibo' ? 15 : 10)
  )

  return (
    <div
      key={title}
      className="relative overflow-hidden p-5 rounded-lg ring-1 ring-slate-900/5 shadow-lg"
    >
      <CardBackground title={title} />
      <div className="flex flex-col space-y-1.5 pb-3">
        <h3 className="text-2xl font-semibold leading-none tracking-wide">
          {title} Hot Search
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Discover the {title} latest trends.
        </p>
      </div>
      <div className="space-y-2">
        {words.map((x, i) => (
          <a
            key={x.url}
            href={`${x.url}`}
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-3 first-of-type:pt-2 last-of-type:pb-2"
          >
            <span
              className={clsxm(
                'inline-block w-5 rounded text-sm text-center bg-gray-300 text-gray-900',
                i === 0 && 'bg-red-500 text-white',
                i === 1 && 'bg-orange-500 text-white',
                i === 2 && 'bg-yellow-400 text-white'
              )}
            >
              {i + 1}
            </span>
            <span className="flex-1 text-base text-gray-900 dark:text-slate-200 font-normal hover:underline hover:underline-offset-4 decoration-dotted decoration-1 text-primary-foreground">
              {x.title}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}

export default async function Page() {
  const sources: { title: CardType; request: () => Promise<Word[]> }[] = [
    { title: 'Weibo', request: getWeiboData },
    { title: 'Zhihu', request: getZhihuData },
    { title: 'Netease', request: getNeteaseData },
  ]

  return (
    <>
      <main className="container mx-auto px-5 py-10">
        <section className="w-full pb-8 lg:pb-18 xl:pb-22">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  <span className=" bg-gradient-to-tr from-red-600 via-yellow-400 to-red-600 text-transparent bg-clip-text">
                    Hot Search
                  </span>{' '}
                  Trending
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Discover the top trending right now.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {sources.map(({ title, request }) => (
              <ErrorBoundary key={title} fallback={<CardErrorFallback />}>
                <Suspense fallback={<CardSkeleton />}>
                  <Card title={title} request={request} />
                </Suspense>
              </ErrorBoundary>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export const revalidate = 0
