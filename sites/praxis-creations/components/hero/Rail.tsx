"use client";

import { useState } from "react";
import { Home, LayoutGrid, Images, Mail, Facebook, Instagram, Linkedin } from "lucide-react";
import s from "./hero.module.css";

const LINKS = [
  { href: "#hero", label: "Αρχική", Icon: Home, active: true },
  { href: "#services", label: "Υπηρεσίες", Icon: LayoutGrid },
  { href: "#portfolio", label: "Portfolio", Icon: Images },
  { href: "#contact", label: "Επικοινωνία", Icon: Mail },
];

export default function Rail() {
  const [open, setOpen] = useState(false);

  return (
    <header className={s.rail}>
      <a className={s.logo} href="/" aria-label="PraxisWeb Creations — Αρχική">
        C
      </a>

      <button
        type="button"
        className={`${s.toggle} ${open ? s.toggleOpen : ""}`}
        aria-expanded={open}
        aria-controls="railnav"
        aria-label={open ? "Κλείσιμο μενού" : "Άνοιγμα μενού"}
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>

      <nav
        id="railnav"
        className={`${s.railNav} ${open ? s.railNavOpen : ""}`}
        aria-label="Κύρια πλοήγηση"
      >
        {LINKS.map(({ href, label, Icon, active }) => (
          <a
            key={href}
            href={href}
            className={`${s.railLink} ${active ? s.railLinkActive : ""}`}
            aria-current={active ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            <Icon strokeWidth={1.6} aria-hidden="true" />
            <span>{label}</span>
          </a>
        ))}
      </nav>

      <div className={s.railFoot}>
        <div className={s.social}>
          <a href="#" aria-label="Facebook">
            <Facebook fill="currentColor" stroke="none" aria-hidden="true" />
          </a>
          <a href="#" aria-label="Instagram">
            <Instagram strokeWidth={1.6} aria-hidden="true" />
          </a>
          <a href="#" aria-label="LinkedIn">
            <Linkedin fill="currentColor" stroke="none" aria-hidden="true" />
          </a>
        </div>
        <p className={s.copy}>
          © 2026
          <br />
          PraxisWeb
          <br />
          Creations
        </p>
      </div>
    </header>
  );
}
