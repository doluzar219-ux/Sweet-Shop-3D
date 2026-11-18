"use client";

type Props = { progress: number; done: boolean; failed: boolean };

export default function Preloader({ progress, done, failed }: Props) {
  return (
    <div className={`preloader ${done ? "gone" : ""}`} aria-live="polite" role="status">
      <div className="pre-inner">
        <p className="pre-brand">Madhuram</p>
        <p className="pre-sub">{failed ? "Some scenes could not be loaded" : "Opening the shutters…"}</p>
        <div className="pre-bar">
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>
      </div>
    </div>
  );
}
