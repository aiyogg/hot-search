import Image from 'next/image'
import Link from 'next/link'

function Footer() {
  return (
    <footer className="mb-10 text-center text-sm text-gray-500 dark:text-gray-400">
      <p className="flex items-center justify-center">
        <span className="mr-2">Made with ❤️ & Powered by</span>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href="https://cloudflare.com"
        >
          <Image src="/assets/cloudflare.svg" alt="cloudflare" width={70} height={30} />
        </Link>
      </p>
      <p className="mt-2 text-xs text-gray-400">
        Last released: {process.env.NEXT_PUBLIC_BUILD_TIME || 'Unknown'}
      </p>
    </footer>
  )
}

export default Footer
