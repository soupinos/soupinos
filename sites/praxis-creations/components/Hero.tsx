"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Rail from "./hero/Rail";
import Device from "./hero/Device";
import Booking from "./hero/Booking";
import { WeatherWidget, TasksWidget, VideoWidget } from "./hero/Widgets";
import s from "./hero/hero.module.css";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const reveal = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, ease: EASE, delay },
});

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const deviceRef = useRef<HTMLDivElement>(null);
  const asideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 720px)").matches) return; // no parallax on phones

    let cleanup = () => {};
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const st = {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      };

      const ctx = gsap.context(() => {
        gsap.to(deviceRef.current, { yPercent: -6, ease: "none", scrollTrigger: st });
        gsap.to(asideRef.current, { yPercent: -13, ease: "none", scrollTrigger: st });
      });

      cleanup = () => ctx.revert();
    })();

    return () => cleanup();
  }, []);

  return (
    <>
      <a className={s.skip} href="#hero">
        Μετάβαση στο περιεχόμενο
      </a>

      <Rail />

      <main>
        <section
          ref={sectionRef}
          className={s.stage}
          id="hero"
          aria-label="Εξώφυλλο — PraxisWeb Creations"
        >
          <div className={s.photo} aria-hidden="true" />
          <div className={s.ray} aria-hidden="true">
            <i />
          </div>

          <div className={s.scene}>
            <div ref={deviceRef}>
              <motion.div {...reveal(0.05)}>
                <Device />
              </motion.div>
            </div>

            <div ref={asideRef}>
              <motion.div {...reveal(0.18)}>
                <div className={s.aside}>
                  <WeatherWidget />
                  <TasksWidget />
                  <VideoWidget />
                  <Booking />
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
