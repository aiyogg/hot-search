import { createServerResponseAdapter } from '../../lib/server-response-adapter'
import { initializeMcpApiHandler } from '../../lib/mcp-api-handler'
import { CallToolResult } from '@modelcontextprotocol/sdk/types'
import { getWeiboData, getZhihuData, getNeteaseData } from '../../lib/fetchData'

const mcpHandler = initializeMcpApiHandler(
  (server) => {
    server.tool(
      'hot_search_news',
      '今日微博、知乎、网易热搜新闻',
      {},
      async ({}, { sendNotification }): Promise<CallToolResult> => {
        await sendNotification({
          method: 'notifications/message',
          params: {
            level: 'info',
            data: `正在获取热搜榜单...`,
          },
        })

        const results = await Promise.allSettled([
          getWeiboData(),
          getZhihuData(),
          getNeteaseData(),
        ])

        const [weiboData, zhihuData, neteaseData] = results.map((result) =>
          result.status === 'fulfilled' ? result.value.slice(0, 10) : []
        )

        return {
          content: [
            {
              type: 'text',
              text: `## 微博热搜： ${weiboData.reduce(
                (acc, curr, i) =>
                  `${acc}\n${i + 1}. [${curr.title}](${curr.url})`,
                ''
              )}`,
            },
            {
              type: 'text',
              text: `## 知乎热搜： ${zhihuData.reduce(
                (acc, curr, i) =>
                  `${acc}\n${i + 1}. [${curr.title}](${curr.url})`,
                ''
              )}`,
            },
            {
              type: 'text',
              text: `## 网易热搜： ${neteaseData.reduce(
                (acc, curr, i) =>
                  `${acc}\n${i + 1}. [${curr.title}](${curr.url})`,
                ''
              )}`,
            },
          ],
        }
      }
    )
  },
  {
    capabilities: {
      logging: {},
      tools: {
        热搜新闻榜单: {
          description: '今日微博、知乎、网易热搜新闻',
        },
      },
    },
  }
)

const handler = (req: Request) => {
  return createServerResponseAdapter(req.signal, (res) => {
    mcpHandler(req, res)
  })
}

export { handler as GET }
export { handler as POST }
export { handler as DELETE }
