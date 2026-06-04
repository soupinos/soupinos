<?php
/**
 * Front page — PHASE 1 SCAFFOLD.
 *
 * Only the hero is assembled here, to prove the forked engine renders
 * with the sand skin + soft Ken Burns + softened reveal.
 *
 * PHASE 2 (awaiting Iggy OK) wires the remaining sections, in order:
 *   #about    → px-about (block 20)            — ΠΟΙΟΣ ΕΙΜΑΙ
 *   #services → px-services (block 25) ×3       — ΤΙ ΚΑΝΩ
 *   #why      → px-statement (block 26)         — ΓΙΑΤΙ ΕΓΩ
 *   (CTA)     → .book-banner pattern            — Η ΠΡΩΤΗ ΓΝΩΡΙΜΙΑ
 *   #reviews  → px-testimonials (block 27)      — ΜΑΡΤΥΡΙΕΣ (render only if real+consented)
 *   #contact  → contact-grid + #ll-cform        — ΕΠΙΚΟΙΝΩΝΙΑ
 * Copy for each section is in the build brief (GR), with [placeholders]
 * kept until real details are provided.
 */
get_header(); ?>

<!-- ============================ HERO (static image + soft Ken Burns) ============================ -->
<section class="hero" id="hero" data-layout="left">
  <div class="media">
    <!-- PLACEHOLDER until the real photo of Δημήτρης is provided:
         a genuine, eye-to-camera, natural-light, un-posed portrait.
         Swap the gradient for:  <img class="kb" src="…" alt="[ΟΝΟΜΑ]" /> -->
    <div class="kb" style="background:linear-gradient(135deg,#5C3D2E 0%,#3a2118 60%,#2b190f 100%);" role="img" aria-label="[φωτο hero — πορτρέτο Δημήτρη]"></div>
  </div>
  <div class="scrim"></div>

  <div class="hero-inner">
    <div class="hero-block">
      <h1>«Δεν θα σου πω <span class="serif-it">“όλα θα πάνε καλά”.</span><br>
        Θα σου πω <span class="gold serif-it">“κάτσε να δούμε γιατί δεν πάνε”.»</span></h1>
      <p class="hero-sub">Ψυχοθεραπεία χωρίς εμπορευματοποίηση. Χωρίς life coaching. Χωρίς 5 βήματα για την ευτυχία.</p>
      <div class="hero-ctas">
        <a class="btn btn-gold" href="#contact">Κλείσε ένα ραντεβού — χωρίς δέσμευση</a>
      </div>
    </div>
  </div>

  <a class="scroll-cue" href="#about" aria-label="Συνέχεια">
    <span>ΓΝΩΡΙΣΕ ΜΕ</span><span class="chev"></span>
  </a>
</section>

<?php /* PHASE 2: sections #about / #services / #why / CTA / #reviews / #contact wired here. */ ?>

<?php get_footer(); ?>
