import type { SVGProps } from "react"

/* Hand-rolled line icons — keeps the deck free of icon-library defaults
 * and guarantees the single-file bundle has no missing glyphs. */

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

function Svg({ size = 24, children, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  )
}

/** Tangled feedback loop — the prompt-and-pray cycle. */
export function IconLoopChaos(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M20.2 9.4a8.6 8.6 0 0 0-14.9-2.2" />
      <path d="M3.8 14.6a8.6 8.6 0 0 0 14.9 2.2" />
      <path d="M5.1 3.4v3.9h3.9" />
      <path d="M18.9 20.6v-3.9H15" />
      <path d="M9.4 13.6c1.1-2.3 2.3-2.3 2.9-.8.7 1.7 2 1.5 2.6-.6" />
    </Svg>
  )
}

/** Spec document with an approval checklist. */
export function IconSpecDoc(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6 2.8h7.6L19 8.2v13H6z" />
      <path d="M13.4 2.8v5.6H19" />
      <path d="M8.8 12.4l1.2 1.2 2.2-2.2" />
      <path d="M8.8 17.1l1.2 1.2 2.2-2.2" />
      <path d="M14.4 12.6h2.2" />
      <path d="M14.4 17.3h2.2" />
    </Svg>
  )
}

/** Terminal / code-first. */
export function IconTerminal(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="2.8" y="4.2" width="18.4" height="15.6" rx="1.6" />
      <path d="M6.6 9.4l2.6 2.6-2.6 2.6" />
      <path d="M12.4 14.8h4.8" />
    </Svg>
  )
}

/** Test tube / test-first. */
export function IconFlask(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M9.4 2.8v7.1L4.9 17.4a2.7 2.7 0 0 0 2.3 4.1h9.6a2.7 2.7 0 0 0 2.3-4.1l-4.5-7.5V2.8" />
      <path d="M8.2 2.8h7.6" />
      <path d="M6.6 15.4h10.8" />
    </Svg>
  )
}

/** Blueprint / spec-first contract. */
export function IconBlueprint(props: IconProps) {
  return (
    <Svg {...props}>
      <rect x="2.8" y="4.4" width="18.4" height="15.2" rx="1.6" />
      <path d="M2.8 9.2h18.4" />
      <path d="M8.4 9.2v10.4" />
      <path d="M11.6 13h6.2" />
      <path d="M11.6 16.2h4" />
    </Svg>
  )
}

/** Cyclical SDLC arrows. */
export function IconCycle(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M21 12a9 9 0 0 1-15.6 6.1" />
      <path d="M3 12a9 9 0 0 1 15.6-6.1" />
      <path d="M18.6 2.4v3.5h-3.5" />
      <path d="M5.4 21.6v-3.5h3.5" />
    </Svg>
  )
}

/** Divergent arrows — the shift / transformation. */
export function IconShift(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 17.5h6.4L14 6.5h7" />
      <path d="M17.8 3.4L21 6.5l-3.2 3.1" />
      <path d="M3 6.9h4.6" />
      <path d="M3 12.2h2.6" />
    </Svg>
  )
}

export function IconWarning(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3.6L21.2 19.6H2.8z" />
      <path d="M12 9.4v4.6" />
      <path d="M12 17.1h.01" />
    </Svg>
  )
}

export function IconCheck(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4.4 12.6l4.8 4.8L19.6 7" />
    </Svg>
  )
}

export function IconArrowRight(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 12h16" />
      <path d="M14.6 6.4L20.6 12l-6 5.6" />
    </Svg>
  )
}

export function IconBolt(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M13.4 2.4L4.6 13.6h5.4l-1.4 8 8.8-11.2h-5.4z" />
    </Svg>
  )
}
