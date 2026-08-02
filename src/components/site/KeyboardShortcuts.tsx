"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Keyboard, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/**
 * KeyboardShortcuts
 *
 * A floating help button (bottom-left) that opens a modal documenting every
 * keyboard shortcut available across the WinterVell site, and a small global
 * keydown handler that wires up the sequence (`g` then `p`/`d`/`c`) and
 * jump (`t` / `b`) shortcuts.
 *
 * Design notes:
 * - `?` opens this dialog (suppressed while typing in an input/textarea).
 * - `g` then `p` / `d` / `c` scrolls to pricing / demo / contact respectively.
 * - `t` scrolls to top, `b` scrolls to bottom.
 * - Arrow + Space shortcuts are owned by the ProductProof demo component when
 *   it is hovered — we document them here but do not re-implement them.
 * - `/` and `Esc` for FAQ search are owned by FAQSection.
 * - Honors `prefers-reduced-motion`: no pulse, no smooth scroll.
 * - The help button pulses on first visit only. After the dialog is opened
 *   once, we persist `wintervell-kb-help-seen` in localStorage so the pulse
 *   never returns on subsequent visits.
 */

const STORAGE_KEY = "wintervell-kb-help-seen";

/* ─── Tiny external store for the "help seen" flag ───
 * Reads from localStorage, but does so via useSyncExternalStore so we avoid
 * the set-state-in-effect anti-pattern and stay SSR-safe (server snapshot
 * is `false`, client snapshot reads localStorage lazily). Writes go through
 * `markSeen`, which both persists and notifies subscribers.
 */
const seenListeners = new Set<() => void>();
let seenCache: boolean | null = null;

function readSeenCache(): boolean {
  if (seenCache === null) {
    try {
      seenCache = window.localStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      seenCache = false;
    }
  }
  return seenCache;
}

function writeSeenCache(value: boolean) {
  seenCache = value;
  try {
    window.localStorage.setItem(STORAGE_KEY, value ? "1" : "0");
  } catch {
    /* ignore persistence failures */
  }
  seenListeners.forEach((l) => l());
}

function subscribeSeen(callback: () => void): () => void {
  seenListeners.add(callback);
  // Cross-tab updates — also re-read when another tab toggles the flag.
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      seenCache = null; // force re-read
      callback();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    seenListeners.delete(callback);
    window.removeEventListener("storage", onStorage);
  };
}

function getSeenSnapshot(): boolean {
  return readSeenCache();
}

function getSeenServerSnapshot(): boolean {
  return false;
}

/* Sequence-shortcut target sections */
const SEQUENCE_TARGETS: Record<string, string> = {
  p: "pricing",
  d: "demo",
  c: "contact",
};

const SEQUENCE_TIMEOUT_MS = 900;

type ShortcutRow = {
  keys: string[];
  label: string;
  hint?: string;
};

const SHORTCUT_GROUPS: { title: string; rows: ShortcutRow[] }[] = [
  {
    title: "Global",
    rows: [
      { keys: ["?"], label: "Open this help" },
      { keys: ["/"], label: "Focus FAQ search" },
      { keys: ["Esc"], label: "Close dialogs / clear search" },
    ],
  },
  {
    title: "Demo walkthrough",
    rows: [
      {
        keys: ["←", "→"],
        label: "Navigate demo steps",
        hint: "when hovering the demo",
      },
      {
        keys: ["Space"],
        label: "Play / pause auto-advance",
        hint: "when hovering the demo",
      },
    ],
  },
  {
    title: "Jump to section",
    rows: [
      { keys: ["g", "p"], label: "Go to pricing", hint: "sequence shortcut" },
      { keys: ["g", "d"], label: "Go to demo", hint: "sequence shortcut" },
      { keys: ["g", "c"], label: "Go to contact", hint: "sequence shortcut" },
      { keys: ["t"], label: "Back to top" },
      { keys: ["b"], label: "Back to bottom" },
    ],
  },
];

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="inline-flex min-w-[1.75rem] items-center justify-center rounded border border-[#DDE3E7] bg-[#F4F6F7] px-1.5 py-0.5 font-mono text-[11px] font-semibold text-[#111820] shadow-sm">
      {children}
    </kbd>
  );
}

function isTypingTarget(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el) return false;
  const tag = el.tagName;
  return (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    el.isContentEditable
  );
}

function scrollToId(id: string, prefersReducedMotion: boolean) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }
}

function scrollToEdge(which: "top" | "bottom", prefersReducedMotion: boolean) {
  const behavior: ScrollBehavior = prefersReducedMotion ? "auto" : "smooth";
  if (which === "top") {
    window.scrollTo({ top: 0, behavior });
  } else {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior,
    });
  }
}

export default function KeyboardShortcuts() {
  const prefersReducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const hasSeen = useSyncExternalStore(
    subscribeSeen,
    getSeenSnapshot,
    getSeenServerSnapshot
  );
  const pendingSequenceRef = useRef<false | true>(false);
  const sequenceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const markSeen = useCallback(() => {
    writeSeenCache(true);
  }, []);

  const handleOpenChange = useCallback(
    (next: boolean) => {
      setOpen(next);
      if (next) markSeen();
    },
    [markSeen]
  );

  /* Global keyboard handler — wires up `?`, `g`-sequences and `t`/`b`. */
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const typing = isTypingTarget(e.target);

      /* `?` opens the dialog (shift+/). Suppressed while typing. */
      if ((e.key === "?" || (e.key === "/" && e.shiftKey)) && !typing) {
        e.preventDefault();
        setOpen(true);
        markSeen();
        return;
      }

      /* Modifier-aware shortcuts below — bail out if the user is holding
         Ctrl/Meta/Alt so we don't hijack browser shortcuts. */
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      /* Sequence: `g` then `p`/`d`/`c` */
      if (e.key === "g" && !typing) {
        pendingSequenceRef.current = true;
        if (sequenceTimerRef.current) clearTimeout(sequenceTimerRef.current);
        sequenceTimerRef.current = setTimeout(() => {
          pendingSequenceRef.current = false;
        }, SEQUENCE_TIMEOUT_MS);
        return;
      }

      if (pendingSequenceRef.current && !typing) {
        const targetId = SEQUENCE_TARGETS[e.key.toLowerCase()];
        if (targetId) {
          e.preventDefault();
          pendingSequenceRef.current = false;
          if (sequenceTimerRef.current) {
            clearTimeout(sequenceTimerRef.current);
            sequenceTimerRef.current = null;
          }
          scrollToId(targetId, !!prefersReducedMotion);
          return;
        }
        // Any other key cancels the pending sequence.
        pendingSequenceRef.current = false;
        if (sequenceTimerRef.current) {
          clearTimeout(sequenceTimerRef.current);
          sequenceTimerRef.current = null;
        }
      }

      /* `t` → top, `b` → bottom */
      if (!typing) {
        if (e.key === "t") {
          e.preventDefault();
          scrollToEdge("top", !!prefersReducedMotion);
        } else if (e.key === "b") {
          e.preventDefault();
          scrollToEdge("bottom", !!prefersReducedMotion);
        }
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      if (sequenceTimerRef.current) clearTimeout(sequenceTimerRef.current);
    };
  }, [markSeen, prefersReducedMotion]);

  const showPulse =
    !prefersReducedMotion && hasSeen === false && !open;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <motion.button
          type="button"
          aria-label="View keyboard shortcuts"
          aria-haspopup="dialog"
          // Subtle pulse on first visit only.
          animate={
            showPulse
              ? {
                  boxShadow: [
                    "0 0 0 0 rgba(37, 99, 235, 0.45)",
                    "0 0 0 10px rgba(37, 99, 235, 0)",
                    "0 0 0 0 rgba(37, 99, 235, 0)",
                  ],
                }
              : { boxShadow: "0 0 0 0 rgba(37, 99, 235, 0)" }
          }
          transition={
            showPulse
              ? {
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeOut",
                }
              : { duration: 0 }
          }
          className="fixed bottom-4 left-4 z-40 inline-flex size-12 items-center justify-center rounded-full border border-[#DDE3E7] bg-white text-[#142634] shadow-lg shadow-[#142634]/10 transition-colors hover:bg-[#F4F6F7] hover:text-[#111820] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F6F7]"
        >
          <Keyboard className="size-5" aria-hidden="true" />
          {!hasSeen && (
            <span
              className="absolute -right-1 -top-1 flex size-3.5 items-center justify-center"
              aria-hidden="true"
            >
              <span className="absolute inline-flex size-2.5 rounded-full bg-[#2563EB]" />
              <span className="relative inline-flex size-1.5 rounded-full bg-white" />
            </span>
          )}
        </motion.button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-[#111820]">
            <Sparkles
              className="size-4 text-[#2563EB]"
              aria-hidden="true"
            />
            Keyboard shortcuts
          </DialogTitle>
          <DialogDescription className="text-[#56616C]">
            Press the keys below to navigate WinterVell faster. Shortcuts are
            suppressed while you&rsquo;re typing in a field.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 flex flex-col gap-5">
          {SHORTCUT_GROUPS.map((group) => (
            <div key={group.title} className="flex flex-col gap-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#56616C]">
                {group.title}
              </h3>
              <ul className="flex flex-col gap-1.5">
                {group.rows.map((row) => (
                  <li
                    key={row.label}
                    className="flex items-center justify-between gap-3 rounded-md px-2 py-1.5 transition-colors hover:bg-[#F4F6F7]"
                  >
                    <span className="text-sm text-[#142634]">{row.label}</span>
                    <span className="flex items-center gap-1.5">
                      {row.hint && (
                        <span className="text-[10px] font-medium uppercase tracking-wide text-[#56616C]/70">
                          {row.hint}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        {row.keys.map((k, i) => (
                          <span key={`${k}-${i}`} className="flex items-center gap-1">
                            {i > 0 && (
                              <span
                                className="text-[10px] text-[#56616C]"
                                aria-hidden="true"
                              >
                                then
                              </span>
                            )}
                            <Kbd>{k}</Kbd>
                          </span>
                        ))}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-2 border-t border-[#DDE3E7] pt-3 text-xs text-[#56616C]">
          Tip: press{" "}
          <Kbd>?</Kbd> anywhere to reopen this list.
        </p>
      </DialogContent>
    </Dialog>
  );
}
