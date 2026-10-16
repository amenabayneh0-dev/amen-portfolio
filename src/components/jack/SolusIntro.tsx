import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import solusLogo from "@/assets/solus-logo.jpg";

const GOLD = "#b99342";
const EXPO_OUT = "expo.out";
const EXPO_IO = "expo.inOut";
const REDUCED = "(prefers-reduced-motion: reduce)";

const LETTERS = "SOLUS".split("");

export function SolusIntro() {
  const [active, setActive] = useState(true);
  const scope = useRef<HTMLDivElement>(null);
  const cover = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLDivElement>(null);
  const fly = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const sc = scope.current,
      cv = cover.current,
      wm = word.current,
      f = fly.current;
    const navLogo = document.getElementById("solus-nav-logo");
    const pulse = document.getElementById("solus-nav-pulse");
    if (!sc || !cv || !wm || !f || !navLogo || !pulse || window.matchMedia(REDUCED).matches) {
      setActive(false);
      return;
    }

    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden"; // no scrolling behind the intro
    navLogo.style.opacity = "0"; // the flying logo becomes the nav logo
    const unlock = () => {
      html.style.overflow = prevOverflow;
    };
    // Failsafe: never trap the visitor behind the intro
    const failsafe = window.setTimeout(() => {
      unlock();
      setActive(false);
    }, 9000);

    let ctx: gsap.Context | undefined;
    let cancelled = false;

    const start = async () => {
      try {
        await Promise.race([
          document.fonts.load('500 100px "Bodoni Moda"'),
          new Promise((r) => window.setTimeout(r, 1500)),
        ]);
      } catch {
        /* fall back to Georgia */
      }
      if (cancelled) return;

      ctx = gsap.context(() => {
        // Logo starts just above the wordmark.
        const r = wm.getBoundingClientRect();
        const S = Math.min(window.innerWidth * 0.34, 170);
        const left = (window.innerWidth - S) / 2;
        const top = Math.max(16, r.top - S - 28);
        // Measured when the flight starts, so late layout shifts (fonts) can't skew it.
        // The nav fades in with a translateY, so subtract it to get its resting spot.
        const target = () => {
          const nav = navLogo.closest("nav");
          const ty = nav ? new DOMMatrixReadOnly(getComputedStyle(nav).transform).m42 : 0;
          const n = navLogo.getBoundingClientRect();
          return {
            dx: n.left + n.width / 2 - (left + S / 2),
            dy: n.top - ty + n.height / 2 - (top + S / 2),
            ratio: n.width / S,
          };
        };

        gsap.set(f, { width: S, height: S, left, top });
        gsap.set(".si", { yPercent: -110 });
        gsap.set(".sx", { autoAlpha: 0, scale: 0.4 });
        gsap.set(wm, { visibility: "visible" });

        gsap
          .timeline({
            onComplete: () => {
              unlock();
              setActive(false);
            },
          })
          .fromTo(
            f,
            { autoAlpha: 0, scale: 0.2, rotation: -360 },
            { autoAlpha: 1, scale: 1, rotation: 0, duration: 1.8, ease: EXPO_OUT },
            0.1,
          )
          .to(".si", { yPercent: 0, duration: 1.2, ease: EXPO_OUT, stagger: 0.08 }, 0.9)
          .to(
            ".sx",
            { autoAlpha: 1, scale: 1, duration: 0.9, ease: "back.out(3)", stagger: 0.1 },
            1.5,
          )
          .to(".si", { yPercent: 110, duration: 0.8, ease: "expo.in", stagger: 0.05 }, 2.8)
          .to(".sx", { autoAlpha: 0, duration: 0.4 }, 2.8)
          // curved path: x and y use different eases
          .to(f, { x: () => target().dx, duration: 1.5, ease: "sine.out" }, 2.9)
          .to(f, { y: () => target().dy, duration: 1.5, ease: "sine.in" }, 2.9)
          .to(f, { scale: () => target().ratio, rotation: 720, duration: 1.5, ease: EXPO_IO }, 2.9)
          .to(cv, { yPercent: 100, duration: 1.2, ease: EXPO_IO }, 3.1)
          .add(() => {
            navLogo.style.opacity = "1";
            gsap.set(f, { autoAlpha: 0 });
          }, 4.4)
          .fromTo(
            pulse,
            { scale: 1, autoAlpha: 0.8 },
            { scale: 3.4, autoAlpha: 0, duration: 1.1, ease: "power2.out" },
            4.4,
          );
      }, sc);
    };
    start();

    return () => {
      cancelled = true;
      window.clearTimeout(failsafe);
      ctx?.revert();
      unlock();
      navLogo.style.opacity = "";
    };
  }, []);

  if (!active) return null;

  return (
    <div ref={scope} className="contents" aria-hidden="true">
      <noscript>
        <style>{".solus-intro{display:none!important}"}</style>
      </noscript>
      <div
        ref={cover}
        className="solus-intro fixed inset-0 z-[100] grid place-items-center overflow-hidden"
        style={{ background: "#0C0C0C" }}
      >
        <div
          ref={word}
          className="flex items-center justify-center"
          style={{
            visibility: "hidden",
            fontFamily: '"Bodoni Moda", Georgia, serif',
            fontWeight: 500,
            fontSize: "clamp(52px, 17vw, 150px)",
            lineHeight: 1.2,
            letterSpacing: ".04em",
            color: "#D7E2EA",
            gap: ".06em",
          }}
        >
          <b
            className="sx"
            style={{ color: GOLD, fontSize: ".4em", fontWeight: 400, margin: "0 .3em" }}
          >
            ✝
          </b>
          {LETTERS.map((c, i) => (
            <span
              key={i}
              className="inline-block overflow-hidden align-top"
              style={{ paddingBottom: ".1em" }}
            >
              <i className="si inline-block not-italic">{c}</i>
            </span>
          ))}
          <b
            className="sx"
            style={{ color: GOLD, fontSize: ".4em", fontWeight: 400, margin: "0 .3em" }}
          >
            ✝
          </b>
        </div>
      </div>
      <img
        ref={fly}
        src={solusLogo}
        alt=""
        draggable={false}
        className="solus-intro pointer-events-none fixed z-[110] rounded-full"
        style={{ visibility: "hidden" }}
      />
    </div>
  );
}
