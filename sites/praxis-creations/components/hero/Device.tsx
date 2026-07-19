import { ArrowRight } from "lucide-react";
import MagneticLink from "./MagneticLink";
import s from "./hero.module.css";

/**
 * The on-desk monitor — framed styling around the *real* page hero
 * (semantic h1 + lede + CTA). The coastal art and glare are decorative.
 */
export default function Device() {
  return (
    <div className={s.device}>
      <div className={s.sea} aria-hidden="true">
        <span className={s.town}>
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className={s.seaFade} aria-hidden="true" />
      <div className={s.glare} aria-hidden="true" />

      <div className={s.deviceInner}>
        <div className={s.deviceBar}>
          <div>
            <div className={s.brandName}>PraxisWeb</div>
            <div className={s.brandSub}>Creations</div>
          </div>
          <nav className={s.deviceMenu} aria-label="Δευτερεύον μενού">
            <a href="#services">Υπηρεσίες</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#about">Σχετικά</a>
            <a className={s.ctaSm} href="#contact">
              Επικοινωνία
            </a>
          </nav>
        </div>

        <div className={s.heroCopy}>
          <h1>
            PraxisWeb
            <br />
            Creations
            <span className={s.diamond} aria-hidden="true" />
          </h1>
          <p>Ψηφιακές εμπειρίες με ψυχή. Από την Κέρκυρα, για τον κόσμο.</p>
          <MagneticLink href="#portfolio" className={s.heroCta}>
            Δες τη δουλειά μας
            <ArrowRight aria-hidden="true" />
          </MagneticLink>
        </div>
      </div>
    </div>
  );
}
