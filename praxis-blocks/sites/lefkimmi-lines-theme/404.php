<?php
/**
 * Lefkimmi Lines — Custom 404 page
 */
get_header();
?>
<main style="min-height:72vh;display:flex;align-items:center;justify-content:center;padding:80px 16px;">
  <div style="text-align:center;max-width:540px;">

    <div style="font-family:var(--fontH);font-size:clamp(80px,16vw,140px);color:var(--navy);line-height:1;
                opacity:.12;margin-bottom:-24px;letter-spacing:-.02em;user-select:none;">404</div>

    <svg width="64" height="64" viewBox="0 0 34 40" fill="none" xmlns="http://www.w3.org/2000/svg"
         style="margin-bottom:24px;opacity:.6;">
      <path d="M17 2L29 13V36H5V13L17 2Z" stroke="#c2a35b" stroke-width="1.4"/>
      <path d="M9 26C12 23 22 23 25 26C22 30 12 30 9 26Z" fill="#c2a35b"/>
      <path d="M17 11L17 24" stroke="#c2a35b" stroke-width="1.4"/>
      <path d="M17 13L23 21H11L17 13Z" fill="#c2a35b" opacity=".55"/>
    </svg>

    <h1 style="font-family:var(--fontH);color:var(--navy);font-size:clamp(24px,4vw,36px);
               margin:0 0 16px;line-height:1.2;">
      Η σελίδα δεν βρέθηκε
    </h1>
    <p style="color:var(--body-ink);font-size:16px;line-height:1.65;margin:0 0 36px;">
      Φαίνεται ότι αυτή η σελίδα δεν υπάρχει ή μετακινήθηκε.<br>
      Δοκίμασε από την αρχική σελίδα.
    </p>

    <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;">
      <a class="btn btn-gold" href="<?php echo esc_url( home_url( '/' ) ); ?>">
        Αρχική σελίδα
      </a>
      <a class="btn btn-ghost" href="<?php echo esc_url( home_url( '/#schedule' ) ); ?>">
        Δρομολόγια
      </a>
    </div>

  </div>
</main>
<?php get_footer(); ?>
