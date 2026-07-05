'use client'

import Image from 'next/image'
import { PixelCanvas } from './PixelCanvas'

export function TechChip({
  icon,
  label,
  w,
  h,
  color,
  active,
  onHover,
  onLeave,
  onClick,
}: {
  icon: string
  label: string
  w: number
  h: number
  color: string
  active: boolean
  onHover: () => void
  onLeave: () => void
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      aria-pressed={active}
      style={{ '--brand': color } as React.CSSProperties}
      className={`group relative flex aspect-square items-center justify-center overflow-hidden border-b-2 border-r-2 border-[var(--line)] transition-colors duration-300 ${
        active ? 'bg-[color-mix(in_srgb,var(--brand)_8%,var(--bg))]' : 'bg-[var(--bg)]'
      }`}
    >
      <PixelCanvas color={color} active={active} />

      {/* Radial darkening so pixels never wash out the icon in the center. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          background:
            'radial-gradient(circle at 50% 45%, color-mix(in srgb, var(--bg) 88%, transparent) 0%, color-mix(in srgb, var(--bg) 55%, transparent) 40%, transparent 72%)',
          opacity: active ? 1 : 0,
        }}
      />

      <span className="relative flex w-full flex-col items-center justify-center px-2">
        <Image
          src={icon}
          width={w}
          height={h}
          alt=""
          className="h-[clamp(2.75rem,5.5vw,4rem)] w-auto transition-transform duration-500"
          style={{
            filter: active ? 'grayscale(0)' : 'grayscale(1) brightness(1.6)',
            opacity: active ? 1 : 0.5,
            transform: active ? 'scale(1.08)' : 'none',
          }}
        />
        {/* Grows in below the icon; the centered column keeps both vertically balanced. */}
        <span
          className="overflow-hidden text-balance break-words text-center font-mono text-[0.95rem] font-medium leading-tight transition-all duration-300"
          style={{
            color: 'var(--text)',
            maxHeight: active ? '3.5rem' : 0,
            marginTop: active ? '0.7rem' : 0,
            opacity: active ? 1 : 0,
            transform: active ? 'translateY(0)' : 'translateY(4px)',
          }}
        >
          {label}
        </span>
      </span>
    </button>
  )
}
