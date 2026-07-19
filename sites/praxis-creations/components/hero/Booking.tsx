"use client";

import { useMemo, useState, type FormEvent } from "react";
import { CalendarDays, Mail, Pencil } from "lucide-react";
import s from "./hero.module.css";

/** Set this to the real inbox that should receive booking requests. */
const CONTACT_EMAIL = "hello@praxiscreations.gr";

const MONTHS = [
  "Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος",
  "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος",
];
const DOW = ["ΔΕ", "ΤΡ", "ΤΕ", "ΠΕ", "ΠΑ", "ΣΑ", "ΚΥ"];

type Cell = { key: string; day: number; date: Date | null; muted: boolean };

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function sameDay(a: Date | null, b: Date | null) {
  return (
    !!a && !!b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export default function Booking() {
  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const [view, setView] = useState(() => startOfMonth(today));
  const [selected, setSelected] = useState<Date | null>(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  const atStart =
    view.getFullYear() === today.getFullYear() && view.getMonth() === today.getMonth();

  const cells = useMemo<Cell[]>(() => {
    const y = view.getFullYear();
    const m = view.getMonth();
    const firstDow = new Date(y, m, 1).getDay(); // 0=Sun
    const lead = firstDow === 0 ? 6 : firstDow - 1; // Monday-first
    const daysInMonth = new Date(y, m + 1, 0).getDate();
    const prevCount = new Date(y, m, 0).getDate();

    const out: Cell[] = [];
    for (let i = lead; i > 0; i--)
      out.push({ key: `p${i}`, day: prevCount - i + 1, date: null, muted: true });
    for (let d = 1; d <= daysInMonth; d++)
      out.push({ key: `d${d}`, day: d, date: new Date(y, m, d), muted: false });
    const trail = (7 - (out.length % 7)) % 7;
    for (let t = 1; t <= trail; t++)
      out.push({ key: `t${t}`, day: t, date: null, muted: true });
    return out;
  }, [view]);

  const monthLabel = `${MONTHS[view.getMonth()]} ${view.getFullYear()}`;

  const isDisabled = (date: Date) =>
    date < today || date.getDay() === 0 || date.getDay() === 6;
  // first open weekdays of the month, shown as suggested (gold-ringed) slots
  const isSuggested = (date: Date) =>
    !isDisabled(date) && date.getDate() <= 4 && date.getDay() !== 1;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const mail = email.trim();
    if (!mail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
      setNote("Συμπλήρωσε ένα έγκυρο email.");
      return;
    }
    if (!message.trim()) {
      setNote("Γράψε ένα σύντομο μήνυμα.");
      return;
    }
    const when = selected
      ? `${selected.getDate()} ${MONTHS[selected.getMonth()]} ${selected.getFullYear()}`
      : "χωρίς συγκεκριμένη ημερομηνία";
    const subject = "Αίτημα ραντεβού — PraxisWeb Creations";
    const body = `Ημερομηνία: ${when}\nEmail: ${mail}\n\nΜήνυμα:\n${message.trim()}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    setBusy(true);
    setNote(`Θα ανοίξει η εφαρμογή email σας για να στείλετε το αίτημα (${when}).`);
    window.setTimeout(() => setBusy(false), 4000);
  }

  return (
    <aside className={s.booking} id="contact" aria-label="Κλείστε ραντεβού">
      <div className={s.ribbon} aria-hidden="true" />
      <div className={s.bookingBody}>
        <div className={s.bookingTitle}>
          <CalendarDays size={18} aria-hidden="true" />
          Κλείστε Ραντεβού
        </div>
        <div className={s.bookingRule} aria-hidden="true" />

        <div className={s.calHead}>
          <button
            type="button"
            className={s.calNav}
            aria-label="Προηγούμενος μήνας"
            disabled={atStart}
            onClick={() =>
              setView((v) => new Date(v.getFullYear(), v.getMonth() - 1, 1))
            }
          >
            ‹
          </button>
          <div className={s.calMonth} aria-live="polite">
            {monthLabel}
          </div>
          <button
            type="button"
            className={s.calNav}
            aria-label="Επόμενος μήνας"
            onClick={() =>
              setView((v) => new Date(v.getFullYear(), v.getMonth() + 1, 1))
            }
          >
            ›
          </button>
        </div>

        <div className={s.calGrid} aria-hidden="true">
          {DOW.map((d) => (
            <div key={d} className={s.dow}>
              {d}
            </div>
          ))}
        </div>

        <div className={s.calGrid} role="grid" aria-label="Επιλογή ημερομηνίας">
          {cells.map((c) => {
            if (!c.date) {
              return (
                <button
                  key={c.key}
                  type="button"
                  className={`${s.day} ${s.dayMuted}`}
                  disabled
                  aria-hidden="true"
                  tabIndex={-1}
                >
                  {c.day}
                </button>
              );
            }
            const disabled = isDisabled(c.date);
            const sel = sameDay(c.date, selected);
            const cls = [
              s.day,
              disabled ? s.dayMuted : "",
              !disabled && isSuggested(c.date) ? s.dayAvail : "",
              sel ? s.daySel : "",
            ]
              .filter(Boolean)
              .join(" ");
            return (
              <button
                key={c.key}
                type="button"
                role="gridcell"
                className={cls}
                disabled={disabled}
                aria-disabled={disabled || undefined}
                aria-selected={sel || undefined}
                aria-label={`${c.day} ${MONTHS[c.date.getMonth()]} ${c.date.getFullYear()}`}
                onClick={() => c.date && setSelected(c.date)}
              >
                {c.day}
              </button>
            );
          })}
        </div>

        <form onSubmit={onSubmit} noValidate>
          <label className={s.field}>
            <span className="sr-only">Email</span>
            <Mail aria-hidden="true" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className={s.field}>
            <span className="sr-only">Σύντομο μήνυμα</span>
            <Pencil aria-hidden="true" />
            <input
              type="text"
              name="message"
              placeholder="Σύντομο μήνυμα"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </label>
          <button type="submit" className={s.send} disabled={busy}>
            {busy ? "Ανοίγει το email σας…" : "Αποστολή"}
          </button>
          <div className={s.note} role="status" aria-live="polite">
            {note}
          </div>
        </form>

        <div className={s.mark} aria-hidden="true">
          ◇
        </div>
      </div>
    </aside>
  );
}
