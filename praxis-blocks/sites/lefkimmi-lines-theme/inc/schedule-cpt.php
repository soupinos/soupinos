<?php
/**
 * Lefkimmi Lines — Schedule CPT
 *
 * Registers the "ferry_schedule" Custom Post Type, admin metaboxes,
 * and a REST endpoint compatible with block #21 (schedule-calendar).
 *
 * Admin: Δρομολόγια → Προσθήκη Δρομολογίου
 * REST:  GET /wp-json/ll/v1/schedule
 */

/* ── 1. Register CPT ─────────────────────────────────────── */
function ll_register_schedule_cpt() {
    register_post_type( 'ferry_schedule', [
        'labels' => [
            'name'               => 'Δρομολόγια',
            'singular_name'      => 'Δρομολόγιο',
            'add_new'            => 'Προσθήκη Δρομολογίου',
            'add_new_item'       => 'Νέο Δρομολόγιο',
            'edit_item'          => 'Επεξεργασία Δρομολογίου',
            'new_item'           => 'Νέο Δρομολόγιο',
            'view_item'          => 'Προβολή Δρομολογίου',
            'search_items'       => 'Αναζήτηση Δρομολογίων',
            'not_found'          => 'Δεν βρέθηκαν δρομολόγια.',
            'not_found_in_trash' => 'Κανένα δρομολόγιο στον κάδο.',
            'menu_name'          => 'Δρομολόγια',
        ],
        'public'              => false,
        'show_ui'             => true,
        'show_in_menu'        => true,
        'show_in_rest'        => false, // we expose data via custom REST endpoint
        'menu_icon'           => 'dashicons-ferry',
        'supports'            => [ 'title' ],
        'menu_position'       => 26,
        'capability_type'     => 'post',
        'exclude_from_search' => true,
        'has_archive'         => false,
        'rewrite'             => false,
    ] );
}
add_action( 'init', 'll_register_schedule_cpt' );

/* ── 2. Admin metabox ────────────────────────────────────── */
function ll_schedule_add_metabox() {
    add_meta_box(
        'll_schedule_fields',
        'Στοιχεία Δρομολογίου',
        'll_schedule_metabox_html',
        'ferry_schedule',
        'normal',
        'high'
    );
}
add_action( 'add_meta_boxes', 'll_schedule_add_metabox' );

function ll_schedule_metabox_html( $post ) {
    wp_nonce_field( 'll_schedule_save', 'll_schedule_nonce' );

    $line   = get_post_meta( $post->ID, '_ll_line',   true ) ?: 'll';
    $ship   = get_post_meta( $post->ID, '_ll_ship',   true );
    $dep    = get_post_meta( $post->ID, '_ll_dep',    true );
    $arr    = get_post_meta( $post->ID, '_ll_arr',    true );
    $active = get_post_meta( $post->ID, '_ll_active', true );
    if ( $active === '' ) { $active = '1'; } // default active

    $lines = [
        'll' => 'Λευκίμμη → Ηγουμενίτσα',
        'hl' => 'Ηγουμενίτσα → Λευκίμμη',
        'lp' => 'Λευκίμμη → Παξοί',
        'pl' => 'Παξοί → Λευκίμμη',
    ];
    ?>
    <style>
      .ll-mb-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px 24px;margin-top:12px;}
      .ll-mb-full{grid-column:1/-1;}
      .ll-mb-grid label{display:block;font-weight:600;font-size:12px;text-transform:uppercase;
        letter-spacing:.06em;color:#555;margin-bottom:5px;}
      .ll-mb-grid select,.ll-mb-grid input[type="text"],.ll-mb-grid input[type="time"]{
        width:100%;padding:8px 10px;border:1px solid #ddd;border-radius:4px;font-size:14px;}
      .ll-mb-grid input[type="text"]:focus,.ll-mb-grid select:focus,
      .ll-mb-grid input[type="time"]:focus{border-color:#2271b1;outline:none;box-shadow:0 0 0 2px rgba(34,113,177,.15);}
      .ll-mb-active{display:flex;align-items:center;gap:8px;font-size:14px;margin-top:4px;}
      .ll-mb-active input{width:16px;height:16px;}
    </style>
    <div class="ll-mb-grid">

      <div class="ll-mb-full">
        <label for="ll_line">Γραμμή</label>
        <select id="ll_line" name="ll_line">
          <?php foreach ( $lines as $val => $lbl ) : ?>
            <option value="<?php echo esc_attr( $val ); ?>" <?php selected( $line, $val ); ?>>
              <?php echo esc_html( $lbl ); ?>
            </option>
          <?php endforeach; ?>
        </select>
      </div>

      <div class="ll-mb-full">
        <label for="ll_ship">Πλοίο</label>
        <input type="text" id="ll_ship" name="ll_ship"
               value="<?php echo esc_attr( $ship ); ?>"
               placeholder="π.χ. Αγία Τριάδα" />
      </div>

      <div>
        <label for="ll_dep">Αναχώρηση</label>
        <input type="time" id="ll_dep" name="ll_dep" value="<?php echo esc_attr( $dep ); ?>" />
      </div>

      <div>
        <label for="ll_arr">Άφιξη</label>
        <input type="time" id="ll_arr" name="ll_arr" value="<?php echo esc_attr( $arr ); ?>" />
      </div>

      <div class="ll-mb-full">
        <label>Κατάσταση</label>
        <div class="ll-mb-active">
          <input type="checkbox" id="ll_active" name="ll_active" value="1"
                 <?php checked( $active, '1' ); ?> />
          <label for="ll_active" style="font-weight:400;text-transform:none;letter-spacing:0;">
            Ενεργό (εμφανίζεται στο πρόγραμμα)
          </label>
        </div>
      </div>

    </div>
    <?php
}

/* ── 3. Save metabox ─────────────────────────────────────── */
function ll_schedule_save_meta( $post_id ) {
    if ( ! isset( $_POST['ll_schedule_nonce'] )
         || ! wp_verify_nonce( $_POST['ll_schedule_nonce'], 'll_schedule_save' ) ) {
        return;
    }
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) { return; }
    if ( ! current_user_can( 'edit_post', $post_id ) ) { return; }

    $allowed_lines = [ 'll', 'hl', 'lp', 'pl' ];

    $line = isset( $_POST['ll_line'] ) && in_array( $_POST['ll_line'], $allowed_lines, true )
            ? $_POST['ll_line'] : 'll';
    $ship   = sanitize_text_field( $_POST['ll_ship']   ?? '' );
    $dep    = sanitize_text_field( $_POST['ll_dep']    ?? '' );
    $arr    = sanitize_text_field( $_POST['ll_arr']    ?? '' );
    $active = isset( $_POST['ll_active'] ) ? '1' : '0';

    update_post_meta( $post_id, '_ll_line',   $line );
    update_post_meta( $post_id, '_ll_ship',   $ship );
    update_post_meta( $post_id, '_ll_dep',    $dep );
    update_post_meta( $post_id, '_ll_arr',    $arr );
    update_post_meta( $post_id, '_ll_active', $active );
}
add_action( 'save_post_ferry_schedule', 'll_schedule_save_meta' );

/* ── 4. Admin list columns ───────────────────────────────── */
function ll_schedule_columns( $cols ) {
    return [
        'cb'        => $cols['cb'],
        'title'     => 'Τίτλος',
        'll_line'   => 'Γραμμή',
        'll_ship'   => 'Πλοίο',
        'll_dep'    => 'Αναχώρηση',
        'll_arr'    => 'Άφιξη',
        'll_active' => 'Ενεργό',
    ];
}
add_filter( 'manage_ferry_schedule_posts_columns', 'll_schedule_columns' );

function ll_schedule_column_content( $col, $post_id ) {
    $line_labels = [ 'll' => 'Λευκ→Ηγ', 'hl' => 'Ηγ→Λευκ', 'lp' => 'Λευκ→Παξ', 'pl' => 'Παξ→Λευκ' ];
    switch ( $col ) {
        case 'll_line':
            $l = get_post_meta( $post_id, '_ll_line', true );
            echo esc_html( $line_labels[ $l ] ?? $l );
            break;
        case 'll_ship':
            echo esc_html( get_post_meta( $post_id, '_ll_ship', true ) );
            break;
        case 'll_dep':
            echo esc_html( get_post_meta( $post_id, '_ll_dep', true ) );
            break;
        case 'll_arr':
            echo esc_html( get_post_meta( $post_id, '_ll_arr', true ) );
            break;
        case 'll_active':
            echo get_post_meta( $post_id, '_ll_active', true ) === '1' ? '✅' : '⏸';
            break;
    }
}
add_action( 'manage_ferry_schedule_posts_custom_column', 'll_schedule_column_content', 10, 2 );

/* ── 5. REST endpoint ────────────────────────────────────── */
function ll_register_schedule_rest() {
    register_rest_route( 'll/v1', '/schedule', [
        'methods'             => 'GET',
        'callback'            => 'll_rest_schedule_response',
        'permission_callback' => '__return_true',
    ] );
}
add_action( 'rest_api_init', 'll_register_schedule_rest' );

function ll_rest_schedule_response() {
    return rest_ensure_response( ll_get_schedule_json() );
}
