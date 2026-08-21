import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { SLIDES } from "./slides"
import { STAGE_H, STAGE_W, SlideFooter } from "./primitives"

const DECK_LABEL = "Spec-Driven Development"

/** Scale factor that fits the fixed 1280x720 stage inside the viewport. */
function useStageScale() {
  const [scale, setScale] = useState(1)

  useLayoutEffect(() => {
    const measure = () => {
      const pad = window.innerWidth < 700 ? 8 : 24
      const w = window.innerWidth - pad * 2
      const h = window.innerHeight - pad * 2
      setScale(Math.min(w / STAGE_W, h / STAGE_H))
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  return scale
}

/** Slide index encoded in the URL hash (`#4`), so a reload keeps your place
 *  and you can jump straight to a slide when presenting. */
function hashIndex(total: number): number | null {
  const raw = window.location.hash.replace(/^#/, "")
  if (!/^\d+$/.test(raw)) return null
  return Math.max(0, Math.min(total - 1, Number(raw) - 1))
}

export default function Deck() {
  const total = SLIDES.length
  const [index, setIndex] = useState(() => hashIndex(total) ?? 0)
  const [overview, setOverview] = useState(false)
  const [showHelp, setShowHelp] = useState(false)
  const scale = useStageScale()

  const go = useCallback(
    (next: number) => setIndex(Math.max(0, Math.min(total - 1, next))),
    [total],
  )

  /* Keep the hash in sync both ways. */
  useEffect(() => {
    const target = `#${index + 1}`
    if (window.location.hash !== target) {
      window.history.replaceState(null, "", target)
    }
  }, [index])

  useEffect(() => {
    const onHash = () => {
      const i = hashIndex(total)
      if (i !== null) setIndex(i)
    }
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [total])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
        case "PageDown":
        case " ":
        case "Enter":
          e.preventDefault()
          if (overview) setOverview(false)
          else go(index + 1)
          break
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
          e.preventDefault()
          if (!overview) go(index - 1)
          break
        case "Home":
          e.preventDefault()
          go(0)
          break
        case "End":
          e.preventDefault()
          go(total - 1)
          break
        case "o":
        case "O":
        case "g":
        case "G":
          e.preventDefault()
          setOverview((v) => !v)
          break
        case "?":
          e.preventDefault()
          setShowHelp((v) => !v)
          break
        case "Escape":
          if (overview) {
            e.preventDefault()
            setOverview(false)
          } else if (showHelp) {
            e.preventDefault()
            setShowHelp(false)
          }
          break
        case "f":
        case "F": {
          e.preventDefault()
          try {
            if (document.fullscreenElement) void document.exitFullscreen()
            else void document.documentElement.requestFullscreen()
          } catch {
            /* fullscreen can be blocked when embedded — ignore */
          }
          break
        }
      }
    }

    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [go, index, overview, showHelp, total])

  const current = SLIDES[index]

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#EDEBE6]">
      {/* Stage */}
      <div className="grid h-full w-full place-items-center">
        <div
          style={{
            width: STAGE_W,
            height: STAGE_H,
            transform: `scale(${scale})`,
            transformOrigin: "center",
          }}
          className="relative shrink-0 overflow-hidden rounded-[3px] bg-paper shadow-[0_24px_70px_-30px_rgba(23,26,31,0.32)] ring-1 ring-ink/[0.07]"
        >
          <div key={index} className="h-full w-full animate-slide-enter">
            {current.render()}
          </div>

          {index > 0 && <SlideFooter index={index} total={total} label={DECK_LABEL} />}

          {/* Progress rail, pinned to the stage so it scales with it */}
          <div className="absolute inset-x-0 bottom-0 h-[3px] bg-rule-soft">
            <div
              className="h-full bg-teal-ink transition-[width] duration-300 ease-out"
              style={{ width: `${((index + 1) / total) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <Controls
        index={index}
        total={total}
        onPrev={() => go(index - 1)}
        onNext={() => go(index + 1)}
        onOverview={() => setOverview(true)}
        onHelp={() => setShowHelp((v) => !v)}
      />

      {showHelp && <HelpCard onClose={() => setShowHelp(false)} />}

      {overview && (
        <Overview
          index={index}
          onPick={(i) => {
            go(i)
            setOverview(false)
          }}
          onClose={() => setOverview(false)}
        />
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Floating controls — dim until hovered so they stay out of the way
 * while presenting or recording.
 * ------------------------------------------------------------------ */

function Controls({
  index,
  total,
  onPrev,
  onNext,
  onOverview,
  onHelp,
}: {
  index: number
  total: number
  onPrev: () => void
  onNext: () => void
  onOverview: () => void
  onHelp: () => void
}) {
  return (
    <div className="group fixed bottom-4 right-4 flex items-center gap-[6px] opacity-25 transition-opacity duration-200 hover:opacity-100 focus-within:opacity-100">
      <IconBtn label="Slide overview (O)" onClick={onOverview}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <rect x="3" y="3" width="7.5" height="7.5" rx="1.2" />
          <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.2" />
          <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.2" />
          <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.2" />
        </svg>
      </IconBtn>
      <IconBtn label="Keyboard shortcuts (?)" onClick={onHelp}>
        <span className="font-mono text-[12px] font-semibold leading-none">?</span>
      </IconBtn>
      <div className="mx-[3px] h-5 w-px bg-ink/15" />
      <IconBtn label="Previous slide" onClick={onPrev} disabled={index === 0}>
        <Chevron dir="left" />
      </IconBtn>
      <span className="tabular min-w-[52px] text-center font-mono text-[12px] text-ink-soft">
        {index + 1} / {total}
      </span>
      <IconBtn label="Next slide" onClick={onNext} disabled={index === total - 1}>
        <Chevron dir="right" />
      </IconBtn>
    </div>
  )
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ transform: dir === "left" ? "rotate(180deg)" : undefined }}
    >
      <path d="M9 5l7 7-7 7" />
    </svg>
  )
}

function IconBtn({
  children,
  label,
  onClick,
  disabled,
}: {
  children: ReactNode
  label: string
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={cn(
        "grid h-[30px] w-[30px] place-items-center rounded-[5px] border border-ink/10 bg-surface/90 text-ink-soft shadow-sm backdrop-blur transition-colors",
        disabled
          ? "cursor-default opacity-35"
          : "hover:border-ink/20 hover:bg-surface hover:text-ink",
      )}
    >
      {children}
    </button>
  )
}

/* ------------------------------------------------------------------ *
 * Shortcut help
 * ------------------------------------------------------------------ */

function HelpCard({ onClose }: { onClose: () => void }) {
  const rows: [string, string][] = [
    ["→  Space", "Next slide"],
    ["←", "Previous slide"],
    ["Home / End", "First / last slide"],
    ["O", "Slide overview"],
    ["F", "Fullscreen"],
    ["?", "Toggle this panel"],
  ]
  return (
    <div className="fixed bottom-[62px] right-4 w-[268px] rounded-[7px] border border-ink/10 bg-surface/97 p-[16px] shadow-[0_18px_44px_-22px_rgba(23,26,31,0.4)] backdrop-blur">
      <div className="mb-[11px] flex items-center justify-between">
        <span className="font-mono text-[10.5px] uppercase tracking-eyebrow text-ink-faint">
          Shortcuts
        </span>
        <button
          type="button"
          onClick={onClose}
          className="font-mono text-[13px] leading-none text-ink-faint hover:text-ink"
          aria-label="Close shortcuts"
        >
          ✕
        </button>
      </div>
      <dl className="space-y-[7px]">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-3">
            <dt className="font-mono text-[11.5px] text-ink">{k}</dt>
            <dd className="text-[12.5px] text-ink-soft">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Overview grid — real slides rendered at thumbnail scale
 * ------------------------------------------------------------------ */

const THUMB_W = 292
const THUMB_SCALE = THUMB_W / STAGE_W

function Overview({
  index,
  onPick,
  onClose,
}: {
  index: number
  onPick: (i: number) => void
  onClose: () => void
}) {
  const activeRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "center" })
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 bg-[#EDEBE6]/95 backdrop-blur-sm"
      role="dialog"
      aria-label="Slide overview"
    >
      <div className="flex h-full flex-col">
        <div className="flex shrink-0 items-center justify-between px-6 py-[18px]">
          <div className="flex items-center gap-3">
            <span className="h-[3px] w-7 bg-teal-ink" />
            <span className="eyebrow">All slides · {SLIDES.length}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-[5px] border border-ink/10 bg-surface px-[11px] py-[5px] font-mono text-[11px] uppercase tracking-eyebrow text-ink-soft hover:text-ink"
          >
            Esc
          </button>
        </div>

        <div className="overview-scroll min-h-0 flex-1 overflow-y-auto px-6 pb-8">
          {/* Fixed 292px tracks: the thumbnails are transform-scaled, so the
              column width must match THUMB_W exactly. */}
          <div className="grid justify-center gap-x-[20px] gap-y-[22px] [grid-template-columns:repeat(auto-fill,292px)]">
            {SLIDES.map((s, i) => (
              <button
                key={i}
                ref={i === index ? activeRef : undefined}
                type="button"
                onClick={() => onPick(i)}
                className="group text-left"
              >
                <div
                  className={cn(
                    "overflow-hidden rounded-[4px] bg-paper transition-shadow",
                    i === index
                      ? "ring-2 ring-teal-ink"
                      : "ring-1 ring-ink/10 group-hover:ring-ink/25",
                  )}
                  style={{ width: THUMB_W, height: STAGE_H * THUMB_SCALE }}
                >
                  <div
                    className="pointer-events-none origin-top-left"
                    style={{
                      width: STAGE_W,
                      height: STAGE_H,
                      transform: `scale(${THUMB_SCALE})`,
                    }}
                  >
                    {s.render()}
                  </div>
                </div>
                <div className="mt-[9px] flex items-baseline gap-[8px]">
                  <span
                    className={cn(
                      "tabular font-mono text-[11px]",
                      i === index ? "text-teal-ink" : "text-ink-faint",
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="truncate text-[13px] text-ink-soft group-hover:text-ink">
                    {s.title}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
