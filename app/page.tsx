import { Suspense, use } from 'react'
import {clsxm} from '../utils/helpers'

interface Word {
  url: string
  title: string
}

async function getWeiboData() {
  const response = await fetch('https://weibo.com/ajax/side/hotSearch', {
    headers: {
      Cookie:
        'SUB=_2AkMWJrkXf8NxqwJRmP8SxWjnaY12zwnEieKgekjMJRMxHRl-yj9jqmtbtRB6PaaX-IGp-AjmO6k5cS-OH2X9CayaTzVD',
    },
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const { data, ok } = await response.json()
  if (ok !== 1) {
    throw new Error('response not ok')
  }
  const words: Word[] = data?.realtime
    .filter((item) => item.ad_channel !== 1)
    .map((item) => ({
      url: `https://s.weibo.com/weibo?q=${encodeURIComponent(
        item.word_scheme
      )}`,
      title: item.word,
    }))
  return words
}

async function getZhihuData() {
  const response = await fetch(
    'https://www.zhihu.com/api/v4/creators/rank/hot?domain=0&period=hour'
  )
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const { data } = await response.json()
  const words: Word[] = data?.map(({ question }) => ({
    url: question.url,
    title: question.title,
  }))
  return words
}

async function getPengpaiData() {
  const response = await fetch(
    'https://cache.thepaper.cn/contentapi/wwwIndex/rightSidebar'
  )
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const { data: {hotNews} } = await response.json()
  const words: Word[] = hotNews
    ?.map((item) => ({
      url: `https://www.thepaper.cn/newsDetail_forward_${item.contId}`,
      title: item.name,
    }))
  return words
}

function CardSkeleton() {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-5 animate-pulse">
      <div className="flex flex-col space-y-1.5 pb-3">
        <div className="w-3/4 h-5 bg-gray-300 rounded"></div>
        <div className="w-1/2 h-3 bg-gray-300 rounded"></div>
      </div>
      <div className="space-y-2">
        {new Array(10).fill(null).map((_, i) => (
          <div key={i} className="flex items-center space-x-3 first-of-type:pt-2 last-of-type:pb-2">
            <span className="w-5 h-5 bg-gray-300 rounded"></span>
            <div className="flex-1 h-5 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Card({title, request}: {title: string, request: () => Promise<Word[]>}) {
  const words = use(request().then((data) => data.slice(0, title === 'Weibo' ? 15: 10)));

  return (
    <div
      key={title}
      className="rounded-lg border bg-card text-card-foreground shadow-sm p-5"
    >
      <div className="flex flex-col space-y-1.5 pb-3">
        <h3 className="text-2xl font-semibold leading-none tracking-tight">
          {title} Hot Search
        </h3>
        <p className="text-sm text-muted-foreground">
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
            <span className={clsxm("inline-block w-5 rounded text-sm text-center bg-gray-300 text-gray-900",
              i === 0 && "bg-red-500 text-white",
              i === 1 && "bg-orange-500 text-white",
              i === 2 && "bg-yellow-400 text-white",
            )}>{i + 1}</span>
            <span className="flex-1 text-base text-gray-900 dark:text-slate-200 font-normal hover:underline hover:underline-offset-4 text-primary-foreground">
              {x.title}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const sources = [
    { title: 'Weibo', request: getWeiboData },
    { title: 'Zhihu', request: getZhihuData },
    { title: 'Pengpai', request: getPengpaiData },
  ]

  return (
    <main className="container mx-auto px-5 py-10">
      <section className="w-full pb-8 lg:pb-18 xl:pb-22">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                <span className=" bg-gradient-to-tr from-red-600 via-yellow-400  to-red-600 text-transparent bg-clip-text">Hot Search</span> Trending
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Discover the top trending right now.
              </p>
            </div>
            {/* <div className="space-x-4">
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                  Discover More
                </button>
              </div> */}
          </div>
        </div>
      </section>
      <section className="py-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {sources.map(({ title, request }) => (
            <Suspense key={title} fallback={<CardSkeleton />}>
              <Card title={title} request={request} />
            </Suspense>
          ))}
        </div>
      </section>
    </main>
  )
}

export const revalidate = 0 
