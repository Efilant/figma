"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CHAPTERS, FIGMA_DEMO_URL, PRESENTATION_DURATION_SEC } from "@/data/config";
import { slides, totalSlides, type Slide } from "@/data/slides";
import styles from "./Presentation.module.css";

const TYPE_LABELS: Record<Slide["type"], string> = {
  cover: "Kapak",
  agenda: "Ajanda",
  content: "Sunum",
  theory: "Teori",
  demo: "Canlı Demo",
  closing: "Kapanış",
  notes: "Notlar",
};

function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function Presentation() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [notesOpen, setNotesOpen] = useState(false);
  const [agendaOpen, setAgendaOpen] = useState(false);
  const [uiVisible, setUiVisible] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [timerOn, setTimerOn] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(index);
  const navigatingRef = useRef(false);
  const slide = slides[index];
  const progress = ((index + 1) / totalSlides) * 100;

  indexRef.current = index;

  const goTo = useCallback((next: number) => {
    const clamped = Math.min(Math.max(next, 0), totalSlides - 1);
    const current = indexRef.current;
    if (clamped === current) return;

    setDirection(clamped > current ? 1 : -1);
    setIndex(clamped);
    setAgendaOpen(false);
  }, []);

  const go = useCallback(
    (delta: number) => {
      goTo(indexRef.current + delta);
    },
    [goTo],
  );

  useEffect(() => {
    if (!timerOn) return;
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, [timerOn]);

  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {
      await rootRef.current?.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "BUTTON" || tag === "A" || tag === "INPUT") return;

      const navKeys = ["ArrowRight", "ArrowLeft", " ", "PageDown", "PageUp"];
      if (navKeys.includes(e.key) && e.repeat) return;

      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        go(1);
      }
      if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(-1);
      }
      if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      }
      if (e.key === "End") {
        e.preventDefault();
        goTo(totalSlides - 1);
      }
      if (e.key === "n" || e.key === "N") {
        e.preventDefault();
        setNotesOpen((o) => !o);
      }
      if (e.key === "g" || e.key === "G") {
        e.preventDefault();
        setAgendaOpen((o) => !o);
      }
      if (e.key === "t" || e.key === "T") {
        e.preventDefault();
        setTimerOn((o) => !o);
      }
      if (e.key === "f" || e.key === "F") {
        e.preventDefault();
        void toggleFullscreen();
      }
      if (e.key === "h" || e.key === "H") {
        e.preventDefault();
        setUiVisible((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, goTo, toggleFullscreen]);

  const handleMainClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (navigatingRef.current) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      navigatingRef.current = true;
      x > rect.width / 2 ? go(1) : go(-1);
      window.setTimeout(() => {
        navigatingRef.current = false;
      }, 280);
    },
    [go],
  );

  useEffect(() => {
    const onFs = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFs);
    return () => document.removeEventListener("fullscreenchange", onFs);
  }, []);

  const remaining = Math.max(PRESENTATION_DURATION_SEC - elapsed, 0);
  const chapter = CHAPTERS.find((c) => c.slides.includes(slide.id));

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${!uiVisible ? styles.uiHidden : ""} ${fullscreen ? styles.fullscreen : ""}`}
    >
      <div className={styles.bg} aria-hidden>
        <div className={styles.grid} />
      </div>

      <div
        className={styles.topBar}
        style={{ opacity: uiVisible ? 1 : 0 }}
      >
        <div
          className={styles.progressFill}
          style={{ width: `${progress}%` }}
        />
      </div>

      <aside
        className={styles.sidebar}
        style={{ opacity: uiVisible ? 1 : 0 }}
        aria-label="Bölümler"
      >
        {CHAPTERS.map((ch) => {
          const active = ch.slides.includes(slide.id);
          const done = ch.slides.every((id) => slides.findIndex((s) => s.id === id) < index);
          return (
            <button
              key={ch.id}
              type="button"
              className={`${styles.chapter} ${active ? styles.chapterActive : ""} ${done ? styles.chapterDone : ""}`}
              style={{ "--ch-color": ch.color } as React.CSSProperties}
              onClick={() => goTo(slides.findIndex((s) => s.id === ch.slides[0]))}
            >
              <span className={styles.chapterNum}>{ch.id}</span>
              <span className={styles.chapterLabel}>{ch.label}</span>
            </button>
          );
        })}
      </aside>

      <header
        className={styles.header}
        style={{ opacity: uiVisible ? 1 : 0 }}
      >
        <div className={styles.brand}>
          <span className={styles.figmaMark} aria-hidden>
            <i className={styles.markRed} />
            <i className={styles.markPurple} />
            <i className={styles.markBlue} />
            <i className={styles.markGreen} />
          </span>
          <span className={styles.badge}>{slide.section}</span>
        </div>
        <span className={styles.timing}>{slide.timing}</span>
        <div className={styles.headerActions}>
          {timerOn && (
            <span
              className={`${styles.timer} ${remaining < 120 ? styles.timerWarn : ""}`}
            >
              {formatTime(remaining)}
            </span>
          )}
          <span className={`${styles.type} ${styles[`type_${slide.type}`]}`}>
            {TYPE_LABELS[slide.type]}
          </span>
        </div>
      </header>

      <main className={styles.main} onClick={handleMainClick}>
        <div
          key={slide.id}
          className={`${styles.slideWrap} ${direction > 0 ? styles.enterForward : styles.enterBack}`}
        >
          <SlideView slide={slide} chapterColor={chapter?.color} />
        </div>
      </main>

      <footer
        className={styles.footer}
        style={{ opacity: uiVisible ? 1 : 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.toolbar}>
          <button type="button" className={styles.toolBtn} onClick={() => goTo(0)}>
            Başlangıç
          </button>
          <button
            type="button"
            className={styles.toolBtn}
            onClick={() => setAgendaOpen(true)}
          >
            Ajanda (G)
          </button>
          <button
            type="button"
            className={styles.toolBtn}
            onClick={() => setNotesOpen((o) => !o)}
          >
            Notlar (N)
          </button>
          <button
            type="button"
            className={`${styles.toolBtn} ${timerOn ? styles.toolActive : ""}`}
            onClick={() => setTimerOn((o) => !o)}
          >
            Zamanlayıcı (T)
          </button>
          <button type="button" className={styles.toolBtn} onClick={toggleFullscreen}>
            Tam ekran (F)
          </button>
          {slide.figmaZone && (
            <a
              href={FIGMA_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.figmaBtn}
            >
              Figma’da aç →
            </a>
          )}
        </div>

        <div className={styles.nav}>
          <button
            type="button"
            className={styles.navBtn}
            disabled={index === 0}
            onClick={() => go(-1)}
          >
            ←
          </button>
          <div className={styles.thumbs}>
            {slides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                title={s.title}
                className={`${styles.thumb} ${i === index ? styles.thumbActive : ""} ${i < index ? styles.thumbDone : ""} ${styles[`thumb_${s.type}`]}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <button
            type="button"
            className={styles.navBtn}
            disabled={index === totalSlides - 1}
            onClick={() => go(1)}
          >
            →
          </button>
        </div>

        <p className={styles.counter}>
          {String(index + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
          <span className={styles.hint}>
            Sol/sağ tık · ← → · G ajanda · H arayüz gizle
          </span>
        </p>
      </footer>

      {agendaOpen && (
        <div className={styles.overlay} onClick={() => setAgendaOpen(false)}>
          <div className={styles.agenda} onClick={(e) => e.stopPropagation()}>
            <h2>Sunum Ajandası</h2>
            <ul>
              {slides.map((s, i) => (
                <li key={s.id}>
                  <button type="button" onClick={() => goTo(i)}>
                    <span className={styles.agendaTime}>{s.timing}</span>
                    <span className={styles.agendaTitle}>{s.title}</span>
                    <span className={`${styles.agendaType} ${styles[`type_${s.type}`]}`}>
                      {TYPE_LABELS[s.type]}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {notesOpen && (
        <aside className={styles.notes} onClick={(e) => e.stopPropagation()}>
          <div className={styles.notesHeader}>
            <div>
              <strong>Konuşmacı notları</strong>
              <span className={styles.notesSlide}>{slide.title}</span>
            </div>
            <button type="button" onClick={() => setNotesOpen(false)} aria-label="Kapat">
              ✕
            </button>
          </div>
          {slide.figmaZone && (
            <a
              href={FIGMA_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.notesFigma}
            >
              📍 {slide.figmaZone}
            </a>
          )}
          {slide.speakers && (
            <div className={styles.speakerBlock}>
              <div className={styles.speakerCard}>
                <span>Kişi A</span>
                <p>{slide.speakers.a}</p>
              </div>
              <div className={styles.speakerCard}>
                <span>Kişi B</span>
                <p>{slide.speakers.b}</p>
              </div>
            </div>
          )}
          {slide.highlight && (
            <blockquote className={styles.notesHighlight}>{slide.highlight}</blockquote>
          )}
          {slide.bullets && slide.type === "notes" && (
            <ul className={styles.notesList}>
              {slide.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
          {slide.terms && (
            <div className={styles.notesTerms}>
              {slide.terms.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          )}
        </aside>
      )}
    </div>
  );
}

function SlideView({
  slide,
  chapterColor,
}: {
  slide: Slide;
  chapterColor?: string;
}) {
  return (
    <article
      className={`${styles.slide} ${styles[`slide_${slide.type}`]}`}
      style={
        chapterColor
          ? ({ "--accent": chapterColor } as React.CSSProperties)
          : undefined
      }
    >
      {slide.icon && (
        <div className={styles.slideIcon} aria-hidden>
          {slide.icon}
        </div>
      )}

      <div className={styles.slideMeta}>
        <span className={styles.slideNum}>
          {String(slide.id).padStart(2, "0")}
        </span>
        {slide.figmaZone && (
          <span className={styles.figmaChip}>{slide.figmaZone}</span>
        )}
      </div>

      <h1 className={styles.title}>{slide.title}</h1>
      {slide.subtitle && <p className={styles.subtitle}>{slide.subtitle}</p>}

      {slide.type === "agenda" && (
        <div className={styles.agendaGrid}>
          {CHAPTERS.map((ch) => (
            <div
              key={ch.id}
              className={styles.agendaCard}
              style={{ borderColor: ch.color }}
            >
              <span className={styles.agendaCardNum} style={{ color: ch.color }}>
                {ch.id}
              </span>
              <span className={styles.agendaCardLabel}>{ch.label}</span>
              <span className={styles.agendaCardTime}>
                {ch.slides.length} slayt
              </span>
            </div>
          ))}
        </div>
      )}

      {slide.bullets && slide.type !== "agenda" && (
        <ul className={styles.bullets}>
          {slide.bullets.map((b, i) => (
            <li key={b} style={{ animationDelay: `${i * 0.06}s` }}>
              {b}
            </li>
          ))}
        </ul>
      )}

      {slide.speakers && slide.type === "demo" && (
        <div className={styles.demoGrid}>
          <div className={styles.demoCard}>
            <div className={styles.demoHead}>
              <span className={styles.demoAvatar}>A</span>
              <span className={styles.demoLabel}>Kişi A</span>
            </div>
            <p>{slide.speakers.a}</p>
          </div>
          <div className={styles.demoCard}>
            <div className={styles.demoHead}>
              <span className={styles.demoAvatar}>B</span>
              <span className={styles.demoLabel}>Kişi B</span>
            </div>
            <p>{slide.speakers.b}</p>
          </div>
        </div>
      )}

      {slide.speakers && slide.type === "cover" && (
        <div className={styles.coverSpeakers}>
          <div className={styles.coverSpeaker}>
            <span>A</span>
            <p>{slide.speakers.a}</p>
          </div>
          <div className={styles.coverSpeaker}>
            <span>B</span>
            <p>{slide.speakers.b}</p>
          </div>
        </div>
      )}

      {slide.highlight && (
        <blockquote className={styles.highlight}>{slide.highlight}</blockquote>
      )}

      {slide.terms && slide.type !== "notes" && (
        <div className={styles.terms}>
          {slide.terms.map((t) => (
            <span key={t} className={styles.term}>
              {t}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
