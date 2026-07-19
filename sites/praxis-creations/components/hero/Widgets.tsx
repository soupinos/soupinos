import s from "./hero.module.css";

/** Decorative floating glass widgets — weather, tasks, mini preview. */

export function WeatherWidget() {
  return (
    <div className={`${s.glass} ${s.wWeather}`} aria-label="Καιρός στην Κέρκυρα">
      <div className={s.wSun} aria-hidden="true">
        <i />
      </div>
      <div>
        <div className={s.wLoc}>Κέρκυρα</div>
        <div className={s.wTemp}>28°C</div>
        <div className={s.wDesc}>Αίθριος</div>
      </div>
    </div>
  );
}

export function TasksWidget() {
  return (
    <div className={`${s.glass} ${s.wTasks}`} aria-hidden="true">
      <div className={s.wTasksHead}>
        <span>Σημερινές εργασίες</span>
        <span>•••</span>
      </div>
      <div className={s.taskRow}>
        <span className={s.dotDone}>✓</span>
        <span className={s.taskDone}>Προσχέδιο νέου site</span>
      </div>
      <div className={s.taskRow}>
        <span className={s.dotOpen} />
        <span>Συνάντηση Δευτ. 10:00</span>
      </div>
    </div>
  );
}

export function VideoWidget() {
  return (
    <div className={`${s.glass} ${s.wVideo}`} aria-hidden="true">
      <div className={s.wVideoHead}>
        <span>Μίνι Animation Preview</span>
        <span>↗</span>
      </div>
      <div className={s.wVideoStage}>
        <div className={s.sweep} />
        <svg viewBox="0 0 200 70" preserveAspectRatio="none">
          <path
            d="M0,45 C40,10 70,60 110,32 C150,6 175,50 200,28"
            fill="none"
            stroke="rgba(212,175,55,.75)"
            strokeWidth="2.5"
          />
        </svg>
        <div className={s.play} />
      </div>
      <div className={s.vBar}>
        <i />
      </div>
      <div className={s.vTime}>01:12 / 03:40</div>
    </div>
  );
}
