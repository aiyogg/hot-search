# Hot Search Trending

This project is a web application that displays the top 10 trending searches on Weibo, Zhihu and Pengpai News.
You can easily view all three hot trending searches on one page.

## Use as MCP server
Add the following config to your MCP client:
```json
{
  "mcpServers": {
    "hot-search-news": {
      "name": "Hot Search News",
      "type": "streamableHttp",
      "description": "Today's hot search news on Weibo, Zhihu and Pengpai News",
      "baseUrl": "https://hot.fuckgfw.store/mcp"
    },
  }
}
```

## Using Docker

1. [Install Docker](https://docs.docker.com/get-docker/) on your machine.
1. Build your container: `docker build -t hot-search .`.
1. Run your container: `docker run -p 3000:3000 hot-search`.

You can view your images created with `docker images`.

## Running Locally

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

