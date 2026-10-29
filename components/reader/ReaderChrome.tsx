"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

/* ============================================================
   Contenu CHAUD : tout ce qui dépend du lecteur ou du scroll.
   Le texte du chapitre arrive déjà rendu par le serveur (children) ;
   ce composant n'ajoute que l'habillage interactif autour.
   ============================================================ */

interface Props {
  oeuvre: string;
  numero: number;
  /** URL de l'illustration du chapitre, ou null */
  bgImage: string | null;
  children: ReactNode;
}

/* ---------- Où trouver les fichiers audio ----------
   Tous les fichiers sont dans public/music. Le marqueur du .md est toujours lu relativement à ce dossier :
     #### music:/Escape_Route.mp3   → /music/Escape_Route.mp3
     #### music:Escape_Route.mp3    → /music/Escape_Route.mp3
     #### music:Escape_Route        → /music/Escape_Route.mp3   (extension ajoutée si absente)
     #### music:ambiance/pluie.ogg  → /music/ambiance/pluie.ogg
   Seule une adresse complète (https://…) est utilisée telle quelle. */
const MUSIC_DIR = "/music";
const MUSIC_EXT = ".mp3";
function trackUrl(track: string): string {
  const t = track.trim();
  if (/^https?:\/\//.test(t)) return t;
  const rel = t.replace(/^\/+/, "").replace(/^music\//, ""); // « /x.mp3 » ou « music/x.mp3 » → « x.mp3 »
  const hasExt = /\.[a-z0-9]{2,4}$/i.test(rel);
  const path = rel.split("/").map(encodeURIComponent).join("/");
  return `${MUSIC_DIR}/${path}${hasExt ? "" : MUSIC_EXT}`;
}

const DEFAULT_VOLUME = 70; // en %, avant le premier réglage du lecteur
const FADE_MS = 1400;

const store = {
  get(k: string) { try { return localStorage.getItem(k); } catch { return null; } },
  set(k: string, v: string) { try { localStorage.setItem(k, v); } catch { /* navigation privée */ } },
};

/** Fondu de volume sur un <audio>, renvoie une promesse résolue à la fin.
    La cible peut être une fonction : elle est relue à chaque image (le curseur de volume reste actif pendant le fondu). */
function fade(audio: HTMLAudioElement, to: number | (() => number), ms = FADE_MS): Promise<void> {
  return new Promise((resolve) => {
    const from = audio.volume, start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      const target = typeof to === "function" ? to() : to;
      audio.volume = Math.min(1, Math.max(0, from + (target - from) * t));
      if (t < 1) requestAnimationFrame(step); else resolve();
    };
    requestAnimationFrame(step);
  });
}

export default function ReaderChrome({ oeuvre, numero, bgImage, children }: Props) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const threadRef = useRef<HTMLElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // préférences : valeurs par défaut au premier rendu (identique serveur/client), puis lues dans le navigateur
  const [withBg, setWithBg] = useState(false);
  const [size, setSize] = useState(19);
  const [playing, setPlaying] = useState(false);
  const [track, setTrack] = useState<string | null>(null);
  const [railAway, setRailAway] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const volRef = useRef(DEFAULT_VOLUME / 100);

  useEffect(() => {
    setWithBg(store.get("dn-bg") === "on");
    setSize(Number(store.get("dn-size")) || 19);
    setPlaying(store.get("dn-music") === "on");
    const v = Number(store.get("dn-volume"));
    if (store.get("dn-volume") !== null && v >= 0 && v <= 100) { setVolume(v); volRef.current = v / 100; }
  }, []);

  const say = useCallback((msg: string) => setToast(msg), []);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  /* ---------- Fil de progression, rail qui se cache, signet automatique ---------- */
  useEffect(() => {
    let lastY = scrollY, finished = false, raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = scrollY;
        const max = document.documentElement.scrollHeight - innerHeight;
        const p = max > 0 ? Math.min(1, y / max) : 1;
        // le fil est mis à jour directement dans le DOM : pas de re-rendu React à chaque frame
        if (threadRef.current) threadRef.current.style.transform = `scaleX(${p.toFixed(4)})`;
        if (y > lastY + 4 && y > 200) setRailAway(true);
        else if (y < lastY - 4) setRailAway(false);
        lastY = y;

        if (!finished && p > 0.94) {
          finished = true;
          const key = `dn-${oeuvre}-mark`;
          if (numero >= (Number(store.get(key)) || 0)) {
            store.set(key, String(numero));
            store.set("lastReadChapter", String(numero)); // compatibilité avec l'ancien site
            say(`Signet posé au chapitre ${numero}`);
          }
        }
      });
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => { removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, [oeuvre, numero, say]);

  /* ---------- Musique : la piste est celle du dernier marqueur passé au-dessus de la ligne de lecture ----------
     (ligne à 60 % de la hauteur de l'écran). Avant le premier marqueur, c'est la première piste du chapitre :
     la musique démarre dès l'arrivée, comme dans l'ancienne version. */
  useEffect(() => {
    let raf = 0;
    const pick = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // pendant la remontée animée vers le chapitre suivant, on ne traverse pas les pistes une à une
        if (document.documentElement.dataset.turning) return;
        const markers = bodyRef.current?.querySelectorAll<HTMLElement>("[data-music]");
        if (!markers?.length) return;
        const line = innerHeight * 0.6;
        let current = markers[0];
        for (const m of markers) if (m.getBoundingClientRect().top < line) current = m;
        setTrack(current.getAttribute("data-music")); // même valeur : React ne re-rend pas
      });
    };
    pick();
    // fin d'un changement de chapitre animé (ChapterLink retire data-turning) : on choisit la piste du nouveau chapitre
    const mo = new MutationObserver(() => { if (!document.documentElement.dataset.turning) pick(); });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-turning"] });
    addEventListener("scroll", pick, { passive: true });
    addEventListener("resize", pick);
    return () => { mo.disconnect(); removeEventListener("scroll", pick); removeEventListener("resize", pick); cancelAnimationFrame(raf); };
  }, [numero]);

  // marque visuellement le marqueur en cours de lecture
  useEffect(() => {
    bodyRef.current?.querySelectorAll<HTMLElement>("[data-music]").forEach((m) => {
      m.classList.toggle("playing", playing && m.getAttribute("data-music") === track);
    });
  }, [playing, track]);

  // fondu enchaîné entre les pistes
  useEffect(() => {
    const old = audioRef.current;
    if (!playing || !track) {
      if (old) { fade(old, 0, 600).then(() => old.pause()); audioRef.current = null; }
      return;
    }
    if (old && old.dataset.track === track) return;

    const url = trackUrl(track);
    const next = new Audio(url);
    next.dataset.track = track;
    next.loop = true;
    next.volume = 0;
    next.preload = "auto";

    // fichier introuvable ou illisible : on le dit clairement au lieu de rester silencieux
    next.addEventListener("error", () => {
      console.error(`[musique] impossible de lire « ${track} » → ${url}`, next.error);
      say(`Piste introuvable : ${url}`);
    }, { once: true });

    let retry: (() => void) | null = null;
    const start = () => next.play().then(() => fade(next, () => volRef.current));
    start().catch((err: DOMException) => {
      if (err?.name === "NotAllowedError") {
        // le navigateur exige un geste de l'utilisateur (ex. musique réactivée depuis une visite précédente) :
        // on relance au premier clic ou toucher, n'importe où sur la page
        say("Touchez la page pour lancer la musique");
        retry = () => { start().catch(() => {}); };
        addEventListener("pointerdown", retry, { once: true });
        addEventListener("keydown", retry, { once: true });
      } else if (err?.name !== "AbortError") {
        console.error(`[musique] lecture refusée pour ${url}`, err);
      }
    });

    if (old) fade(old, 0).then(() => old.pause());
    audioRef.current = next;
    say(`♪ ${track}`);
    return () => {
      if (retry) { removeEventListener("pointerdown", retry); removeEventListener("keydown", retry); }
    };
  }, [playing, track, say]);

  useEffect(() => () => { audioRef.current?.pause(); }, []);

  /* ---------- Actions du rail ---------- */
  const changeVolume = (v: number) => {
    setVolume(v);
    volRef.current = v / 100;
    store.set("dn-volume", String(v));
    if (audioRef.current) audioRef.current.volume = v / 100;
  };
  const toggleBg = () => {
    const next = !withBg;
    setWithBg(next);
    store.set("dn-bg", next ? "on" : "off");
  };
  const toggleMusic = () => {
    const next = !playing;
    setPlaying(next);
    store.set("dn-music", next ? "on" : "off");
    if (!next) say("Musique coupée");
    else if (!track) say("Musique activée");
  };
  const resize = (d: number) => {
    const next = Math.min(25, Math.max(16, size + d));
    setSize(next);
    store.set("dn-size", String(next));
  };

  return (
    <div className={`reader${withBg && bgImage ? " with-bg" : ""}`} style={{ "--r-size": `${size}px` } as CSSProperties}>
      <div className="thread" aria-hidden="true"><i ref={threadRef} /></div>
      {bgImage && <div className="r-bg" aria-hidden="true" style={{ backgroundImage: `linear-gradient(180deg, rgba(18,18,20,.3), rgba(18,18,20,.85) 70%), url(${bgImage})` }} />}

      <div ref={bodyRef}>{children}</div>

      <div className={`r-rail${railAway ? " away" : ""}`} role="toolbar" aria-label="Réglages de lecture">
        {bgImage && (
          <button type="button" onClick={toggleBg} aria-pressed={withBg} data-label={withBg ? "Masquer l’illustration" : "Afficher l’illustration"} aria-label="Illustration du chapitre">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="1.5" /><path d="m3 16 5-5 4 4 3-3 6 6" /><circle cx="16" cy="9" r="1.6" /></svg>
          </button>
        )}
        <button type="button" onClick={toggleMusic} aria-pressed={playing} data-label={playing ? `Musique · ${track ?? "en attente d’un thème"}` : "Musique coupée"} aria-label="Musique">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 17.5a3 3 0 1 1-2-2.83V4l12-2v12.5a3 3 0 1 1-2-2.83V5.36L9 6.7z" /></svg>
        </button>
        {playing && (
          // curseur de volume : ordinateur uniquement (sur téléphone, ce sont les boutons de l'appareil)
          <div className="r-volume">
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={volume}
              onChange={(e) => changeVolume(Number(e.target.value))}
              aria-label="Volume de la musique"
              aria-valuetext={`${volume} %`}
              style={{ "--v": `${volume}%` } as CSSProperties}
            />
            <span aria-hidden="true">{volume}</span>
          </div>
        )}
        <button type="button" onClick={() => resize(-1)} data-label="Texte plus petit" aria-label="Texte plus petit">A−</button>
        <button type="button" onClick={() => resize(1)} data-label="Texte plus grand" aria-label="Texte plus grand">A+</button>
      </div>

      <div className={`r-toast${toast ? " on" : ""}`} role="status" aria-live="polite">{toast}</div>
    </div>
  );
}
