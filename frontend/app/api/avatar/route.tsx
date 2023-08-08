import { ImageResponse, NextRequest } from 'next/server'
import color from 'tinycolor2'

export const runtime = 'edge'

const djb2 = (str: string) => {
  let hash = 5381

  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i)
  }

  return hash
}

const generateGradient = (username: string) => {
  const c1 = color({ h: djb2(username) % 360, s: 0.95, l: 0.5 })
  const second = c1.triad()[1].toHexString()

  return {
    fromColor: c1.toHexString(),
    toColor: second
  }
}

export function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const name = searchParams.get('name')
  const size = Number(searchParams.get('size') || '120')
  const gradient = generateGradient(name || `${Math.random()}`)

  const avatar = (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={gradient.fromColor} />
            <stop offset="100%" stopColor={gradient.toColor} />
          </linearGradient>
        </defs>
        <rect fill="url(#gradient)" x="0" y="0" width={size} height={size} />
      </g>
    </svg>
  )

  return new ImageResponse(avatar, {
    width: size,
    height: size
  })
}
