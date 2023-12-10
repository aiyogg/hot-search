interface WeiboDate {
  url: string
  title: string
}

async function getWeiboDate() {
  const regexp = /<a href="(\/weibo\?q=[^"]+)".*?>(.+)<\/a>/g

  const response = await fetch('https://s.weibo.com/top/summary', {
    headers: {
      Cookie:
        'SUB=_2AkMWJrkXf8NxqwJRmP8SxWjnaY12zwnEieKgekjMJRMxHRl-yj9jqmtbtRB6PaaX-IGp-AjmO6k5cS-OH2X9CayaTzVD',
    },
  })
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const result = await response.text()
  const matches = result.matchAll(regexp)
  const words: WeiboDate[] = Array.from(matches).map((x) => ({
    url: x[1],
    title: x[2],
  }))
  return words
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const weiboData = await getWeiboDate()

  return (
    <main className="container mx-auto px-5 py-10">
      <section className="w-full pb-12 lg:pb-32 xl:pb-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Hot Search Trending
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
          <div
            className="rounded-lg border bg-card text-card-foreground shadow-sm"
            data-v0-t="card"
          >
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold leading-none tracking-tight">
                Weibo Hot Search
              </h3>
              <p className="text-sm text-muted-foreground">
                Discover the Weibo latest trends.
              </p>
            </div>
            <div className="p-6 space-y-2">
              {weiboData.map((x, i) => (
                <a
                  key={x.url}
                  href={`https://s.weibo.com${x.url}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-3"
                >
                  <span className="text-sm font-medium text-primary-foreground">
                    {i + 1}.
                  </span>
                  <span className="text-sm font-medium text-primary-foreground">
                    {x.title}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
