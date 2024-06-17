import Image from 'next/image'

export function Logo() {
  return (
    <Image
      width={28}
      height={28}
      quality={100}
      src="/icon.png"
      alt="TofuPilot"
    />
  )
}
