import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import * as diagrams from "@/lib/diagrams"
import {
  ACCENTS,
  Bullets,
  Chip,
  Code,
  ColumnHeading,
  DiagramPlate,
  Panel,
  Slide,
  SlideHeader,
  type AccentName,
} from "./primitives"
import {
  IconArrowRight,
  IconBlueprint,
  IconBolt,
  IconCheck,
  IconCycle,
  IconFlask,
  IconLoopChaos,
  IconShift,
  IconSpecDoc,
  IconTerminal,
} from "./icons"

export type SlideDef = {
  /** Shown in the overview grid and the progress rail tooltip. */
  title: string
  /** Short section name for grouping in the overview. */
  section: string
  render: () => ReactNode
}

/* ================================================================== *
 * 01 — Title
 * ================================================================== */

function TitleSlide() {
  const contents = [
    { n: "01", label: "Vibe coding" },
    { n: "02", label: "The SDLC" },
    { n: "03", label: "Spec-driven development" },
  ]
  return (
    <Slide className="justify-between">
      <div className="flex items-center gap-3">
        <span className="h-[3px] w-7 bg-teal-ink" />
        <span className="eyebrow">A practical introduction</span>
      </div>

      <div className="-mt-6">
        <h1 className="text-[76px] font-semibold leading-[1.02] tracking-[-0.033em] text-ink">
          Spec-Driven
          <br />
          Development
        </h1>
        <p className="mt-[26px] max-w-[720px] text-[21px] leading-[1.5] text-ink-soft">
          Why the <span className="font-medium text-ink">specification</span> — not the
          prompt — is becoming the primary artifact of software built with AI.
        </p>
      </div>

      <div>
        <div className="hairline" />
        <div className="mt-[18px] flex items-end justify-between">
          <ul className="flex gap-[52px]">
            {contents.map((c) => (
              <li key={c.n} className="flex items-baseline gap-[9px]">
                <span className="tabular font-mono text-[12px] text-teal-ink">{c.n}</span>
                <span className="text-[15px] text-ink-soft">{c.label}</span>
              </li>
            ))}
          </ul>
          <span className="flex items-center gap-[8px] font-mono text-[11.5px] uppercase tracking-eyebrow text-ink-faint">
            Press
            <kbd className="rounded-[3px] border border-rule bg-surface px-[6px] py-[2px] text-[11px] text-ink-soft">
              →
            </kbd>
            to begin
          </span>
        </div>
      </div>
    </Slide>
  )
}

/* ================================================================== *
 * 02 — The AI shift
 * ================================================================== */

function ShiftSlide() {
  const stages: {
    era: string
    title: string
    body: string
    accent: AccentName
  }[] = [
    {
      era: "Until recently",
      title: "Humans write every line",
      body: "Throughput is bounded by how fast a team can type, review, and refactor code by hand.",
      accent: "ink",
    },
    {
      era: "Today",
      title: "AI assists in the editor",
      body: "Completion and chat absorb the boilerplate. Humans still own structure and intent.",
      accent: "blue",
    },
    {
      era: "Now emerging",
      title: "Agents implement whole tasks",
      body: "Given a clear target, an agent writes the code, the tests and the docs in one pass.",
      accent: "teal",
    },
  ]

  return (
    <Slide>
      <SlideHeader
        eyebrow="The shift"
        title="AI is redrawing where software effort goes"
        lead="Generating code is no longer the expensive part. What is expensive is deciding — precisely — what should be built."
      />

      <div className="mt-[34px] flex items-stretch gap-[14px]">
        {stages.map((s, i) => (
          <div key={s.era} className="flex min-w-0 flex-1 items-stretch gap-[14px]">
            <Panel
              accent={s.accent}
              hero={i === 2}
              className="min-w-0 flex-1 px-[22px] pb-[22px] pt-[21px]"
            >
              <div
                className={cn(
                  "font-mono text-[11.5px] uppercase tracking-eyebrow",
                  ACCENTS[s.accent].text,
                )}
              >
                {s.era}
              </div>
              <div className="mt-[9px] text-[19px] font-semibold leading-[1.28] tracking-[-0.012em] text-ink">
                {s.title}
              </div>
              <p className="mt-[10px] text-[14.5px] leading-[1.5] text-ink-soft">{s.body}</p>
            </Panel>
            {i < stages.length - 1 && (
              <div className="flex shrink-0 items-center text-ink-faint/50">
                <IconArrowRight size={19} />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-[30px] flex items-start gap-[13px] rounded-[6px] border border-teal-line bg-teal-tint px-[22px] py-[17px]">
        <span className="mt-[1px] shrink-0 text-teal-ink">
          <IconShift size={20} />
        </span>
        <p className="text-[17px] leading-[1.5] text-ink">
          The bottleneck moved from{" "}
          <span className="font-medium">writing the code</span> to{" "}
          <span className="font-medium text-teal-ink">
            stating the requirement precisely enough to delegate it
          </span>
          .
        </p>
      </div>
    </Slide>
  )
}

/* ================================================================== *
 * 03 — Vibe coding (diagram)
 * ================================================================== */

function VibeCodingSlide() {
  return (
    <Slide>
      <SlideHeader
        eyebrow="Pattern 01"
        accent="clay"
        title="Vibe coding"
        lead={
          <>
            Describe the feature in a sentence, let the model generate something, look at
            the result, and re-prompt until it feels right. The loop is driven by{" "}
            <span className="font-medium text-ink">impression</span>, not by a definition
            of done.
          </>
        }
      />
      <DiagramPlate
        className="mt-[26px]"
        src={diagrams.vibeCoding}
        alt="Vibe coding flow: developer writes an initial prompt, the LLM generates boilerplate code, the developer evaluates whether it is desired, and if not edits the prompt and repeats."
        caption="Prompt → generate → eyeball → edit prompt → repeat. The only exit condition is the developer's gut feeling."
      />
    </Slide>
  )
}

/* ================================================================== *
 * 04 — Vibe coding is limited (statement)
 * ================================================================== */

function VibeLimitSlide() {
  const missing = [
    { label: "Requirements", note: "nothing to verify against" },
    { label: "Design", note: "architecture is guessed" },
    { label: "Testing & QA", note: "correctness is assumed" },
    { label: "Maintenance", note: "no plan for the next change" },
  ]
  return (
    <Slide className="justify-center">
      <div className="flex gap-[34px]">
        <span className="mt-[8px] w-[3px] shrink-0 rounded-full bg-clay-ink" />
        <div className="min-w-0">
          <div className="eyebrow mb-[18px]">The limit</div>
          <h2 className="text-[54px] font-semibold leading-[1.08] tracking-[-0.028em] text-ink">
            Vibe coding is limited —
            <br />
            it skips the{" "}
            <span className="text-clay-ink">software development life cycle</span>.
          </h2>
          <p className="mt-[24px] max-w-[900px] text-[20px] leading-[1.55] text-ink-soft">
            The loop stops at <span className="italic">“it looks right.”</span> Nothing in
            it asks what the system must do, how it should be structured, or how you would
            know it works. That is fine for a demo and{" "}
            <span className="font-medium text-ink">
              expensive for anything you have to keep
            </span>
            .
          </p>

          <ul className="mt-[34px] flex gap-[13px]">
            {missing.map((m) => (
              <li
                key={m.label}
                className="flex-1 rounded-[6px] border border-dashed border-clay-line bg-clay-tint/45 px-[16px] py-[14px]"
              >
                <div className="flex items-center gap-[7px]">
                  <span className="font-mono text-[13px] leading-none text-clay-ink">✕</span>
                  <span className="text-[15.5px] font-medium text-ink">{m.label}</span>
                </div>
                <div className="mt-[6px] text-[13px] leading-[1.4] text-ink-faint">
                  {m.note}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Slide>
  )
}

/* ================================================================== *
 * 05 — SDLC intro
 * ================================================================== */

function SdlcIntroSlide() {
  const phases = [
    { n: "01", name: "Planning & Design", body: "Agree the problem, scope and shape. Produce a PRD." },
    { n: "02", name: "Implementation", body: "Build the feature against that agreed shape." },
    { n: "03", name: "Testing & QA", body: "Prove behaviour matches what was specified." },
    { n: "04", name: "Deployment", body: "Ship it to real users, safely and repeatably." },
    { n: "05", name: "Maintenance", body: "Absorb change without eroding the design." },
  ]
  return (
    <Slide>
      <SlideHeader
        eyebrow="The established discipline"
        accent="blue"
        title="The Software Development Life Cycle"
        lead="Decades of engineering practice compressed into ordered phases, each with an explicit exit criterion before the next one starts."
      />

      <div className="mt-[32px] grid grid-cols-5 gap-[12px]">
        {phases.map((p) => (
          <Panel key={p.n} className="px-[17px] pb-[18px] pt-[16px]">
            <div className="tabular font-mono text-[12px] font-semibold text-blue-ink">
              {p.n}
            </div>
            <div className="mt-[9px] text-[16.5px] font-semibold leading-[1.25] tracking-[-0.01em] text-ink">
              {p.name}
            </div>
            <p className="mt-[8px] text-[13.5px] leading-[1.45] text-ink-soft">{p.body}</p>
          </Panel>
        ))}
      </div>

      <div className="mt-[30px] flex items-start gap-[13px] rounded-[6px] border border-rule bg-surface px-[22px] py-[17px]">
        <span className="mt-[1px] shrink-0 text-blue-ink">
          <IconCycle size={20} />
        </span>
        <p className="text-[16.5px] leading-[1.5] text-ink-soft">
          The value is not the diagram — it is the{" "}
          <span className="font-medium text-ink">gates</span>. You cannot start coding
          until someone has written down what “correct” means.
        </p>
      </div>
    </Slide>
  )
}

/* ================================================================== *
 * 06 — SDLC diagram
 * ================================================================== */

function SdlcDiagramSlide() {
  return (
    <Slide>
      <SlideHeader
        eyebrow="SDLC"
        accent="blue"
        title="Linear on paper, recursive in practice"
      />
      <DiagramPlate
        className="mx-auto mt-[24px] w-full max-w-[1080px]"
        src={diagrams.sdlc}
        alt="Traditional SDLC flow: planning and design, implementation, testing and QA, deployment, maintenance — with a feedback loop from testing back to implementation labelled bugs found / re-code."
        caption="Most of a project's real cost lives in the red loop: bugs found → re-code → re-test. Every trip round it is work that a sharper specification could have prevented."
      />
    </Slide>
  )
}

/* ================================================================== *
 * 07 — SDD intro
 * ================================================================== */

function SddIntroSlide() {
  const steps = [
    {
      n: "01",
      name: "Specify",
      body: "Write the requirements and constraints as a document. Review it. Approve it.",
      file: "requirements.md",
    },
    {
      n: "02",
      name: "Design",
      body: "Turn the approved spec into a technical design and an ordered task list.",
      file: "design.md · tasks.md",
    },
    {
      n: "03",
      name: "Execute",
      body: "The agent implements task by task against the spec — code, tests and docs.",
      file: "src/ · tests/",
    },
  ]
  return (
    <Slide>
      <SlideHeader
        eyebrow="Pattern 02"
        title="Spec-Driven Development"
        lead="Keep every gate the SDLC gives you, but make one written specification the primary artifact — then let AI agents execute against it."
      />

      <div className="mt-[32px] flex gap-[26px]">
        <ol className="flex flex-1 flex-col gap-[12px]">
          {steps.map((s) => (
            <li
              key={s.n}
              className="flex items-start gap-[16px] rounded-[6px] border border-rule bg-surface px-[20px] py-[15px]"
            >
              <span className="tabular mt-[3px] shrink-0 font-mono text-[13px] font-semibold text-teal-ink">
                {s.n}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="text-[17.5px] font-semibold tracking-[-0.01em] text-ink">
                    {s.name}
                  </span>
                  <span className="shrink-0 font-mono text-[11.5px] text-ink-faint">
                    {s.file}
                  </span>
                </div>
                <p className="mt-[5px] text-[14.5px] leading-[1.45] text-ink-soft">
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <Panel hero accent="teal" className="w-[352px] px-[24px] pb-[24px] pt-[26px]">
          <span className="text-teal-ink">
            <IconSpecDoc size={26} />
          </span>
          <div className="mt-[15px] text-[21px] font-semibold leading-[1.25] tracking-[-0.014em] text-ink">
            The spec is the contract
          </div>
          <p className="mt-[11px] text-[14.5px] leading-[1.5] text-ink-soft">
            Ambiguity is resolved once, in prose a human can review — before a single line
            of code exists. Everything downstream is generated from it, so code, tests and
            documentation cannot drift apart.
          </p>
          <div className="mt-[16px] flex flex-wrap gap-[6px]">
            <Chip accent="teal">Reviewable</Chip>
            <Chip accent="teal">Versioned</Chip>
            <Chip accent="teal">Executable by agents</Chip>
          </div>
        </Panel>
      </div>
    </Slide>
  )
}

/* ================================================================== *
 * 08 — SDD diagram
 * ================================================================== */

function SddDiagramSlide() {
  return (
    <Slide>
      <SlideHeader
        eyebrow="SDD"
        title="Two approval gates, then the agent runs"
        lead="Humans spend their attention on the spec and the design. Code, tests and docs are downstream outputs."
      />
      <DiagramPlate
        className="mt-[24px]"
        src={diagrams.sdd}
        alt="Spec-driven development workflow: a user prompt defines rules and constraints, which becomes a requirements specification acting as the system contract. Once the spec is approved it becomes a design document with a to-do list. Once the design is approved, tasks are sent to an AI agent that executes them, producing clean code, automated test cases and documentation. The spec drives all downstream work."
        caption="Rejecting a spec costs a paragraph. Rejecting an implementation costs a sprint — which is exactly why the gates sit where they do."
      />
    </Slide>
  )
}

/* ================================================================== *
 * 09 — Evolution of development paradigms
 * ================================================================== */

function ParadigmsSlide() {
  const columns: {
    kicker: string
    title: string
    icon: ReactNode
    accent: AccentName
    hero?: boolean
    bullets: ReactNode[]
    artifact: string
  }[] = [
    {
      kicker: "Traditional",
      title: "Code-first",
      icon: <IconTerminal size={22} />,
      accent: "ink",
      bullets: [
        "Code is written first; documentation and tests are treated as an afterthought.",
        "High risk of architectural drift and an outdated codebase over time.",
      ],
      artifact: "The code",
    },
    {
      kicker: "TDD / BDD",
      title: "Test-first",
      icon: <IconFlask size={22} />,
      accent: "blue",
      bullets: [
        "Write the test cases first, then write application code until they pass.",
        "Robust but heavily code-centric — no high-level architectural alignment before starting.",
      ],
      artifact: "The test suite",
    },
    {
      kicker: "SDD",
      title: "Spec-first",
      icon: <IconBlueprint size={22} />,
      accent: "teal",
      hero: true,
      bullets: [
        <>
          Use LLMs to establish formal system specs — requirements and constraints — as
          the primary artifact <span className="font-medium text-ink">before</span> any
          coding.
        </>,
        "Acts as a contract: it removes ambiguity up front, then generates the implementation code and its tests from that same source.",
      ],
      artifact: "The specification",
    },
  ]

  return (
    <Slide>
      <SlideHeader
        eyebrow="Comparison"
        title="The evolution of development paradigms"
        lead="Each generation moved the first artifact you produce earlier in the process — and further away from the keyboard."
      />

      <div className="mt-[30px] grid flex-1 grid-cols-3 gap-[16px]">
        {columns.map((c) => (
          <Panel
            key={c.kicker}
            accent={c.accent}
            hero={c.hero}
            className="px-[22px] pb-[20px] pt-[22px]"
          >
            <ColumnHeading
              kicker={c.kicker}
              title={c.title}
              accent={c.accent}
              icon={c.icon}
            />
            <div className="my-[16px] h-px w-full bg-rule-soft" />
            <Bullets items={c.bullets} accent={c.accent} size="sm" className="flex-1" />
            <div className="mt-[18px] flex items-baseline gap-[8px] border-t border-rule-soft pt-[13px]">
              <span className="font-mono text-[10.5px] uppercase tracking-eyebrow text-ink-faint">
                Primary artifact
              </span>
              <span
                className={cn(
                  "text-[14px] font-medium",
                  c.hero ? ACCENTS[c.accent].text : "text-ink",
                )}
              >
                {c.artifact}
              </span>
            </div>
          </Panel>
        ))}
      </div>
    </Slide>
  )
}

/* ================================================================== *
 * 10 — Practical example: /login
 * ================================================================== */

function LoginExampleSlide() {
  return (
    <Slide>
      <SlideHeader
        eyebrow="Practical example"
        title={
          <>
            Implementing <Code className="text-[0.86em]">/login</Code>
          </>
        }
        lead="Same feature, same model, two ways of asking."
      />

      <div className="mt-[26px] grid flex-1 grid-cols-2 gap-[18px]">
        {/* ---- Vibe coding ---- */}
        <Panel accent="clay" className="px-[24px] pb-[20px] pt-[22px]">
          <ColumnHeading
            kicker="Vibe coding · no spec"
            title="The prompt-and-pray cycle"
            accent="clay"
            icon={<IconLoopChaos size={24} />}
          />
          <div className="my-[16px] h-px w-full bg-rule-soft" />

          <div className="rounded-[5px] border border-dashed border-clay-line bg-clay-tint/45 px-[15px] py-[11px]">
            <div className="font-mono text-[10.5px] uppercase tracking-eyebrow text-clay-ink">
              The prompt
            </div>
            <div className="mt-[6px] font-mono text-[14px] leading-[1.45] text-ink">
              “Build me a login page.”
            </div>
          </div>

          <ul className="mt-[15px] flex-1 space-y-[11px]">
            {[
              "The model guesses the architecture, the auth strategy and the error cases.",
              "Output is plausible but misaligned — so you re-prompt, patch, and re-prompt.",
              "Nothing states what a wrong password should return, so nothing catches it.",
            ].map((t, i) => (
              <li key={i} className="flex gap-[11px]">
                <span className="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-clay-ink" />
                <span className="text-[14.5px] leading-[1.5] text-ink-soft">{t}</span>
              </li>
            ))}
          </ul>

          <div className="mt-[16px] flex items-start gap-[10px] border-t border-rule-soft pt-[14px]">
            <Chip accent="clay" className="mt-[2px] shrink-0">
              Outcome
            </Chip>
            <span className="text-[14.5px] leading-[1.45] text-ink-soft">
              Time burnt in the loop, inconsistent code, technical debt from day one.
            </span>
          </div>
        </Panel>

        {/* ---- SDD ---- */}
        <Panel hero accent="teal" className="px-[24px] pb-[20px] pt-[22px]">
          <ColumnHeading
            kicker="Spec-driven development"
            title="The design-first contract"
            accent="teal"
            icon={<IconSpecDoc size={24} />}
          />
          <div className="my-[16px] h-px w-full bg-rule-soft" />

          <div className="rounded-[5px] border border-teal-line bg-teal-tint/60 px-[15px] py-[11px]">
            <div className="font-mono text-[10.5px] uppercase tracking-eyebrow text-teal-ink">
              The spec
            </div>
            <div className="mt-[7px] space-y-[3px] font-mono text-[12.5px] leading-[1.5] text-ink">
              <div>
                <span className="font-semibold text-teal-ink">POST</span> /login
              </div>
              <div className="text-ink-soft">in &nbsp;→ email, password</div>
              <div className="text-ink-soft">200 → { "{ token }" }</div>
              <div className="text-ink-soft">401 → invalid credentials</div>
            </div>
          </div>

          <ol className="mt-[15px] flex-1 space-y-[11px]">
            {[
              "Define the endpoint, its inputs and every explicit behaviour, up front.",
              "Review and approve the spec and design — before any code is generated.",
              "The agent executes the task list and delivers code plus test cases in one pass.",
            ].map((t, i) => (
              <li key={i} className="flex gap-[11px]">
                <span className="tabular mt-[2px] shrink-0 font-mono text-[12.5px] font-semibold text-teal-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[14.5px] leading-[1.5] text-ink-soft">{t}</span>
              </li>
            ))}
          </ol>

          <div className="mt-[16px] flex items-start gap-[10px] border-t border-rule-soft pt-[14px]">
            <Chip accent="teal" className="mt-[2px] shrink-0">
              Outcome
            </Chip>
            <span className="text-[14.5px] leading-[1.45] text-ink-soft">
              First-time-right execution, and behaviour you can predict before you run it.
            </span>
          </div>
        </Panel>
      </div>
    </Slide>
  )
}

/* ================================================================== *
 * 11 — Closing
 * ================================================================== */

function ClosingSlide() {
  const recap = [
    { icon: <IconSpecDoc size={19} />, text: "Write the spec, and review it like code." },
    { icon: <IconBlueprint size={19} />, text: "Approve the design before generation." },
    { icon: <IconBolt size={19} />, text: "Let the agent execute the task list." },
  ]
  return (
    <Slide className="justify-center">
      <div className="max-w-[980px]">
        <div className="eyebrow mb-[18px]">Takeaway</div>
        <h2 className="text-[58px] font-semibold leading-[1.06] tracking-[-0.03em] text-ink">
          Specify once.
          <br />
          <span className="text-teal-ink">Execute predictably.</span>
        </h2>
        <p className="mt-[24px] max-w-[820px] text-[20px] leading-[1.55] text-ink-soft">
          Vibe coding asks the model to guess. The SDLC insists you decide first.
          Spec-driven development keeps that discipline and hands the execution to an
          agent — so the specification, not the prompt, is the thing you maintain.
        </p>

        <ul className="mt-[36px] flex gap-[14px]">
          {recap.map((r, i) => (
            <li
              key={i}
              className="flex flex-1 items-start gap-[12px] rounded-[6px] border border-rule bg-surface px-[18px] py-[16px]"
            >
              <span className="mt-[1px] shrink-0 text-teal-ink">{r.icon}</span>
              <span className="text-[15px] leading-[1.45] text-ink-soft">{r.text}</span>
            </li>
          ))}
        </ul>

        <div className="mt-[34px] flex items-center gap-[10px]">
          <span className="text-teal-ink">
            <IconCheck size={17} />
          </span>
          <span className="font-mono text-[13px] text-ink-faint">
            requirements.md → design.md → tasks.md → implementation
          </span>
        </div>
      </div>
    </Slide>
  )
}

/* ================================================================== *
 * Deck manifest
 * ================================================================== */

export const SLIDES: SlideDef[] = [
  { title: "Spec-Driven Development", section: "Opening", render: TitleSlide },
  { title: "AI is redrawing where software effort goes", section: "The shift", render: ShiftSlide },
  { title: "Vibe coding", section: "Vibe coding", render: VibeCodingSlide },
  { title: "Vibe coding is limited", section: "Vibe coding", render: VibeLimitSlide },
  { title: "The Software Development Life Cycle", section: "SDLC", render: SdlcIntroSlide },
  { title: "Linear on paper, recursive in practice", section: "SDLC", render: SdlcDiagramSlide },
  { title: "Spec-Driven Development", section: "SDD", render: SddIntroSlide },
  { title: "Two approval gates, then the agent runs", section: "SDD", render: SddDiagramSlide },
  { title: "The evolution of development paradigms", section: "Comparison", render: ParadigmsSlide },
  { title: "Implementing /login", section: "Comparison", render: LoginExampleSlide },
  { title: "Specify once. Execute predictably.", section: "Closing", render: ClosingSlide },
]
