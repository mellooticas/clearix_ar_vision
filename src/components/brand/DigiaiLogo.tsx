import { type SVGProps } from "react"

interface DigiaiLogoProps extends SVGProps<SVGSVGElement> {
  size?: number
  color?: string
}

export function DigiaiLogo({
  size = 20,
  color = "#64748B",
  ...props
}: DigiaiLogoProps) {
  return (
    <svg
      viewBox="0 0 120 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={size * 5}
      height={size}
      role="img"
      aria-label="DIGIAI"
      {...props}
    >
      <text
        x="0"
        y="18"
        fontFamily="system-ui, sans-serif"
        fontSize="18"
        fontWeight="700"
        letterSpacing="2"
        fill={color}
      >
        DIGIAI
      </text>
    </svg>
  )
}

export function PoweredByDigiai({ className }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 text-micro text-muted-foreground ${className ?? ''}`}
    >
      powered by
      <svg width="12" height="12" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <rect x="10" y="10" width="35" height="80" rx="4" fill="#2563EB" />
        <path d="M45 10 H60 A40 40 0 0 1 60 90 H45 Z" fill="#06B6D4" />
      </svg>
      <span className="font-semibold tracking-wide">DIGIAI</span>
    </span>
  )
}
