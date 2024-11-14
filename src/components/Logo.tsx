import Image from 'next/image'

export function Logo() {
  return (
    <a href="https://www.tofupilot.com" aria-label="Landing Page">
      <Image
        width={28}
        height={28}
        quality={100}
        src="/docs/icon.png"
        alt="TofuPilot"
      />
    </a>
  )
}
