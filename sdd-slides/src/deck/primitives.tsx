import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ *
 * Slide chrome
 *
 * Every slide renders inside a fixed 1280x720 stage (see Deck.tsx),
 * so spacing here is in absolute px and never reflows on resize.
 * ------------------------------------------------------------------ */

export const STAGE_W = 1280
export const STAGE_H = 720

export function Slide({
  children,
  className,
  bleed = false,
}: {
  children: ReactNode
  className?: string
  /** Skip the default padding for slides that manage their own canvas. */
  bleed?: boolean
}) {
  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col bg-paper",
        !bleed && "px-[72px] pb-[60px] pt-[56px]",
        className,
      )}
    >
      {children}
    </div>
  )
}

export function SlideHeader({
  eyebrow,
  title,
  lead,
  accent = "teal",
  className,
}: {
  eyebrow?: string
  title: ReactNode
  lead?: ReactNode
  accent?: AccentName
  className?: string
}) {
  const a = ACCENTS[accent]
  return (
    <header className={cn("shrink-0", className)}>
      {eyebrow && (
        <div className="mb-[14px] flex items-center gap-3">
          <span className={cn("h-[3px] w-7", a.bar)} />
          <span className="eyebrow">{eyebrow}</span>
        </div>
      )}
      <h2 className="max-w-[1000px] text-[42px] font-semibold leading-[1.1] tracking-[-0.022em] text-ink">
        {title}
      </h2>
      {lead && (
        <p className="mt-[14px] max-w-[880px] text-[19px] leading-[1.55] text-ink-soft">
          {lead}
        </p>
      )}
    </header>
  )
}

/** Bottom-left deck label + bottom-right slide counter. */
export function SlideFooter({
  index,
  total,
  label,
}: {
  index: number
  total: number
  label: string
}) {
  return (
    <div className="pointer-events-none absolute inset-x-[72px] bottom-[26px] flex items-baseline justify-between">
      <span className="font-mono text-[12px] uppercase tracking-eyebrow text-ink-faint/80">
        {label}
      </span>
      <span className="tabular font-mono text-[12px] text-ink-faint/80">
        {String(index + 1).padStart(2, "0")}
        <span className="text-ink-faint/40"> / {String(total).padStart(2, "0")}</span>
      </span>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Accents
 * ------------------------------------------------------------------ */

export type AccentName = "teal" | "blue" | "sage" | "clay" | "ink"

export const ACCENTS: Record<
  AccentName,
  { text: string; bar: string; tint: string; line: string; dot: string }
> = {
  teal: {
    text: "text-teal-ink",
    bar: "bg-teal-ink",
    tint: "bg-teal-tint",
    line: "border-teal-line",
    dot: "bg-teal-ink",
  },
  blue: {
    text: "text-blue-ink",
    bar: "bg-blue-ink",
    tint: "bg-blue-tint",
    line: "border-blue-line",
    dot: "bg-blue-ink",
  },
  sage: {
    text: "text-sage-ink",
    bar: "bg-sage-ink",
    tint: "bg-sage-tint",
    line: "border-sage-line",
    dot: "bg-sage-ink",
  },
  clay: {
    text: "text-clay-ink",
    bar: "bg-clay-ink",
    tint: "bg-clay-tint",
    line: "border-clay-line",
    dot: "bg-clay-ink",
  },
  ink: {
    text: "text-ink",
    bar: "bg-ink",
    tint: "bg-rule-soft",
    line: "border-rule",
    dot: "bg-ink",
  },
}

/* ------------------------------------------------------------------ *
 * Content blocks
 * ------------------------------------------------------------------ */

/** Dark frame for the exported Excalidraw diagrams (they are dark-canvas). */
export function DiagramPlate({
  src,
  alt,
  caption,
  className,
}: {
  src: string
  alt: string
  caption?: string
  className?: string
}) {
  return (
    <figure className={cn("flex min-h-0 flex-1 flex-col justify-center", className)}>
      <div className="rounded-[7px] bg-plate p-[10px] shadow-[0_18px_44px_-24px_rgba(15,17,21,0.55)] ring-1 ring-ink/10">
        <img
          src={src}
          alt={alt}
          className="block h-auto max-h-[400px] w-full rounded-[3px] object-contain"
        />
      </div>
      {caption && (
        <figcaption className="mt-[14px] font-mono text-[12.5px] leading-relaxed text-ink-faint">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

/** Plain bordered panel. `hero` gives it the highlighted treatment. */
export function Panel({
  children,
  className,
  accent = "ink",
  hero = false,
}: {
  children: ReactNode
  className?: string
  accent?: AccentName
  hero?: boolean
}) {
  const a = ACCENTS[accent]
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-[6px] border bg-surface",
        hero
          ? cn(
              a.line,
              "border-[1.5px] shadow-[0_16px_40px_-26px_rgba(22,132,122,0.55)]",
            )
          : "border-rule",
        className,
      )}
    >
      {hero && <span className={cn("absolute inset-x-0 top-0 h-[3px] rounded-t-[5px]", a.bar)} />}
      {children}
    </div>
  )
}

/** Numbered or dotted bullet list tuned for slide reading distance. */
export function Bullets({
  items,
  accent = "ink",
  numbered = false,
  size = "md",
  className,
}: {
  items: ReactNode[]
  accent?: AccentName
  numbered?: boolean
  size?: "sm" | "md"
  className?: string
}) {
  const a = ACCENTS[accent]
  const text = size === "sm" ? "text-[15px] leading-[1.5]" : "text-[16.5px] leading-[1.55]"
  return (
    <ul className={cn("space-y-[13px]", className)}>
      {items.map((item, i) => (
        <li key={i} className="flex gap-[11px]">
          {numbered ? (
            <span
              className={cn(
                "tabular mt-[2px] shrink-0 font-mono text-[13px] font-semibold",
                a.text,
              )}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
          ) : (
            <span
              className={cn("mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full", a.dot)}
            />
          )}
          <span className={cn(text, "text-ink-soft")}>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/** Small mono chip — used for tags like "Outcome" or HTTP verbs. */
export function Chip({
  children,
  accent = "ink",
  className,
}: {
  children: ReactNode
  accent?: AccentName
  className?: string
}) {
  const a = ACCENTS[accent]
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[4px] px-[7px] py-[3px] font-mono text-[11.5px] font-medium uppercase tracking-[0.09em]",
        a.tint,
        a.text,
        className,
      )}
    >
      {children}
    </span>
  )
}

/** Inline code / API path styling. */
export function Code({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <code
      className={cn(
        "rounded-[3px] bg-rule-soft px-[5px] py-[1.5px] font-mono text-[0.92em] text-ink",
        className,
      )}
    >
      {children}
    </code>
  )
}

/** Column header for the comparison slides. */
export function ColumnHeading({
  kicker,
  title,
  accent = "ink",
  icon,
}: {
  kicker?: string
  title: string
  accent?: AccentName
  icon?: ReactNode
}) {
  const a = ACCENTS[accent]
  return (
    <div className="flex items-start gap-[12px]">
      {icon && <span className={cn("mt-[1px] shrink-0", a.text)}>{icon}</span>}
      <div className="min-w-0">
        {kicker && (
          <div className={cn("font-mono text-[11.5px] uppercase tracking-eyebrow", a.text)}>
            {kicker}
          </div>
        )}
        <div className="mt-[3px] text-[20px] font-semibold leading-[1.25] tracking-[-0.012em] text-ink">
          {title}
        </div>
      </div>
    </div>
  )
}
