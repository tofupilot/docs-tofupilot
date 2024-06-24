import Image from 'next/image'
import Link from 'next/link'

export function Logo() {
  return (
    <Link href="https://www.tofupilot.com" aria-label="Landing Page">
      <Image
        width={28}
        height={28}
        quality={100}
        src="/icon.png"
        alt="TofuPilot"
      />
    </Link>
  )
}
