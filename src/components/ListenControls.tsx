"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Status = "idle" | "speaking" | "paused" | "unsupported";

function chunkText(text: string, max = 180): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const chunks: string[] = [];
  let buf: string[] = [];
  for (const w of words) {
    buf.push(w);
    if (buf.join(" ").length >= max) {
      chunks.push(buf.join(" "));
      buf = [];
    }
  }
  if (buf.length) chunks.push(buf.join(" "));
  return chunks;
}

export function ListenControls({ text }: { text: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [supported, setSupported] = useState(true);
  const idxRef = useRef(0);
  const chunksRef = useRef<string[]>([]);
  const cancelledRef = useRef(false);

  const cancel = useCallback(() => {
    cancelledRef.current = true;
    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    idxRef.current = 0;
    setStatus("idle");
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setSupported(false);
      setStatus("unsupported");
      return;
    }
    return () => {
      cancelledRef.current = true;
      window.speechSynthesis.cancel();
    };
  }, []);

  const speakFrom = useCallback(
    (start: number) => {
      if (!window.speechSynthesis) return;
      cancelledRef.current = false;
      const chunks = chunksRef.current;
      if (!chunks.length) return;

      const speakNext = (i: number) => {
        if (cancelledRef.current || i >= chunks.length) {
          setStatus("idle");
          idxRef.current = 0;
          return;
        }
        idxRef.current = i;
        const u = new SpeechSynthesisUtterance(chunks[i]);
        u.rate = 1;
        u.onend = () => speakNext(i + 1);
        u.onerror = () => setStatus("idle");
        setStatus("speaking");
        window.speechSynthesis.speak(u);
      };

      window.speechSynthesis.cancel();
      speakNext(start);
    },
    [],
  );

  const play = () => {
    if (!window.speechSynthesis) return;
    chunksRef.current = chunkText(text);
    if (status === "paused") {
      window.speechSynthesis.resume();
      setStatus("speaking");
      return;
    }
    speakFrom(0);
  };

  const pause = () => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.pause();
    setStatus("paused");
  };

  if (!supported) {
    return (
      <button
        type="button"
        disabled
        className="fixed z-20 flex min-h-12 min-w-12 items-center justify-center rounded-full bg-[var(--lib-paper-deep)] text-[11px] font-semibold text-[var(--lib-muted)]"
        style={{
          right: "max(24px, var(--lib-safe-right))",
          bottom: "calc(140px + var(--lib-safe-bottom))",
        }}
        aria-label="Listen unsupported"
        title="Speech not supported"
      >
        N/A
      </button>
    );
  }

  const speaking = status === "speaking";
  const paused = status === "paused";

  return (
    <div
      className="fixed z-20 flex flex-col items-end gap-2"
      style={{
        right: "max(24px, var(--lib-safe-right))",
        bottom: "calc(140px + var(--lib-safe-bottom))",
      }}
    >
      {(speaking || paused) && (
        <div className="flex gap-2 rounded-2xl bg-[var(--lib-card)] p-1.5 shadow-lg ring-1 ring-[var(--lib-line)]">
          {speaking ? (
            <button
              type="button"
              onClick={pause}
              className="min-h-11 min-w-11 rounded-xl text-sm font-semibold text-[var(--lib-ink)]"
              aria-label="Pause listening"
            >
              Pause
            </button>
          ) : (
            <button
              type="button"
              onClick={play}
              className="min-h-11 min-w-11 rounded-xl text-sm font-semibold text-[var(--lib-ink)]"
              aria-label="Resume listening"
            >
              Resume
            </button>
          )}
          <button
            type="button"
            onClick={cancel}
            className="min-h-11 min-w-11 rounded-xl text-sm font-semibold text-[var(--lib-muted)]"
            aria-label="Stop listening"
          >
            Stop
          </button>
        </div>
      )}
      <button
        type="button"
        onClick={speaking ? pause : play}
        className="flex min-h-12 min-w-12 items-center justify-center rounded-full bg-[var(--lib-accent)] text-sm font-semibold text-white shadow-lg transition-transform active:scale-95"
        aria-label={speaking ? "Pause listening" : "Listen to chapter"}
      >
        {speaking ? "II" : "Listen"}
      </button>
    </div>
  );
}
