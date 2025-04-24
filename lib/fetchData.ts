import type { Word } from '../app/types'
const jsdom = require('jsdom')

const { JSDOM } = jsdom

export async function getWeiboData() {
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
    .filter((item) => item.ad_channel !== 1 && item.is_ad !== 1)
    .map((item) => ({
      url: `https://m.weibo.cn/search?containerid=100103&q=${encodeURIComponent(
        item.word_scheme
      )}`,
      title: item.word,
    }))
  return words
}

export async function getZhihuData() {
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

export async function getNeteaseData() {
  const response = await fetch('https://news.163.com/')
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  const html = await response.text()
  const { document }: { document: Document } = new JSDOM(html).window
  const hotNewsItems = document.querySelectorAll('.mod_hot_rank ul li')

  const words: Word[] = Array.from(hotNewsItems).map((item: Element) => {
    const titleElement = item.querySelector('a')
    return {
      url: titleElement.href,
      title: titleElement.innerHTML,
    }
  })

  return words
}
