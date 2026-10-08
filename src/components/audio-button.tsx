"use client";

import { useEffect, useRef, useState } from "react";
import { PlayIcon } from "./ui";

/** Plays one recorded call. Starting one call stops any other that is playing. */
export function AudioButton({ src, label }: { src: string; label: string }) {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const el = audio.current;
    if (!el) return;
    const stopOthers = () =>
      document.querySelectorAll("audio").forEach((other) => {
        if (other !== el) other.pause();
      });
    const onPlay = () => {
      stopOthers();
      setPlaying(true);
    };
    const onStop = () => setPlaying(false);
    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onStop);
    el.addEventListener("ended", onStop);
    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onStop);
      el.removeEventListener("ended", onStop);
    };
  }, []);

  return (
    <>
      <audio ref={audio} src={src} preload="none" />
      <button
        type="button"
        aria-label={`${playing ? "Pause" : "Play"} call: ${label}`}
        onClick={() => (playing ? audio.current?.pause() : audio.current?.play())}
        className="grid size-12 place-items-center rounded-full bg-olive text-white"
      >
        {playing ? (
          <svg className="size-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <PlayIcon className="size-3.5" />
        )}
      </button>
    </>
  );
}
