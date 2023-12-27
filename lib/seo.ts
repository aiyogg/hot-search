export const seo = {
  url: new URL(process.env.NODE_ENV === 'production' ? 'https://hot.fuckgfw.space' : 'http://localhost:3000'),
  title: 'Hot Search Trending',
  description: 'China’s trending social media hot searches',
} as const;