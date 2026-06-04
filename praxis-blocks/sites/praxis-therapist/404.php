<?php
/**
 * 404 — calm, on-brand not-found page.
 */
get_header(); ?>

<section class="section paper" style="min-height:70vh;display:flex;align-items:center;">
  <div class="wrap">
    <div class="section-head center reveal">
      <span class="eyebrow"><span class="ln"></span><span>404</span></span>
      <h2 class="h2">Αυτή η σελίδα δεν υπάρχει.</h2>
      <p class="lede" style="margin:0 auto 28px;">Ίσως ο σύνδεσμος άλλαξε ή γράφτηκε λάθος. Ας επιστρέψουμε σε σταθερό έδαφος.</p>
      <a class="btn btn-gold" href="<?php echo esc_url( home_url( '/' ) ); ?>">Στην αρχική</a>
    </div>
  </div>
</section>

<?php get_footer(); ?>
