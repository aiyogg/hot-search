import Image from 'next/image'
import Link from 'next/link'
import cloudflareSvg from '../assets/cloudflare.svg'

function Footer() {
  return (
    <footer className="mb-10 text-center text-sm text-gray-500 dark:text-gray-400">
      <p className="flex items-center justify-center">
        <span className="mr-2">Made with ❤️ & Powered by</span>
        <Link target="_blank" rel="noopener noreferrer" href="https://cloudflare.com">
          <Image src={cloudflareSvg} alt="cloudflare" width={70} height={40} />
        </Link>
      </p>
    </footer>
  )
}

export default Footer
