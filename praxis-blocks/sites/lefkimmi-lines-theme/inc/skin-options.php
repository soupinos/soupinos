<?php
/**
 * Lefkimmi Lines — Skin picker Customizer integration
 *
 * Adds a "Χρωματισμός" section in Appearance → Customise.
 * The selected skin is injected as a localStorage seed before
 * skin-picker.js runs, so first-load uses the admin choice.
 * A visitor's own selection is still persisted per-session.
 */

/* ── Customizer panel ────────────────────────────────────── */
function ll_customizer_register( $wp_customize ) {

    $wp_customize->add_section( 'll_skin_section', [
        'title'       => 'Χρωματισμός (Skin)',
        'description' => 'Επιλέξτε την προεπιλεγμένη χρωματική παλέτα. Ο επισκέπτης μπορεί να την αλλάξει μέσω του widget στη γωνία.',
        'priority'    => 130,
    ] );

    $wp_customize->add_setting( 'll_default_skin', [
        'default'           => 'caldera',
        'sanitize_callback' => 'll_sanitize_skin',
        'transport'         => 'refresh',
    ] );

    $wp_customize->add_control( 'll_default_skin_control', [
        'label'    => 'Προεπιλεγμένο skin',
        'section'  => 'll_skin_section',
        'settings' => 'll_default_skin',
        'type'     => 'select',
        'choices'  => [
            'caldera'       => 'Caldera — Navy + Gold (default)',
            'red'           => 'Red — Classic Greek Red',
            'mediterranean' => 'Mediterranean — Aegean Blue',
            'midnight'      => 'Midnight — Deep Dark',
            'sand'          => 'Sand — Warm Coastal',
        ],
    ] );
}
add_action( 'customize_register', 'll_customizer_register' );

function ll_sanitize_skin( $input ) {
    $valid = [ 'caldera', 'red', 'mediterranean', 'midnight', 'sand' ];
    return in_array( $input, $valid, true ) ? $input : 'caldera';
}

/* ── Inject localStorage seed in <head> ─────────────────── */
function ll_skin_seed_script() {
    $skin = ll_sanitize_skin( get_theme_mod( 'll_default_skin', 'caldera' ) );
    // Only sets the localStorage value if the visitor hasn't already chosen one.
    echo '<script>(function(){if(!localStorage.getItem("ll_skin")){localStorage.setItem("ll_skin",' . wp_json_encode( $skin ) . ');}})();</script>' . "\n";
}
add_action( 'wp_head', 'll_skin_seed_script', 5 );
