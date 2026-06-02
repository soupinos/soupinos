<?php
/**
 * Plugin Name: Lefkimmi Lines Schedule CMS
 * Description: Manages ferry timetables for 4 routes. Admin panel edits departure times. Frontend outputs JSON for schedule-calendar block.
 * Version: 1.0
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

define( 'LL_OPTION_KEY', 'll_schedule_data' );

// ---------------------------------------------------------------------------
// Default schedule (fallback when no data has been saved yet)
// ---------------------------------------------------------------------------

function ll_default_schedule() {
    return [
        'll' => [
            [ 'ship' => 'Αγία Τριάδα',            'dep' => '06:00', 'arr' => '06:50' ],
            [ 'ship' => 'Αγία Τριάδα',            'dep' => '09:00', 'arr' => '09:50' ],
            [ 'ship' => 'Ιωάννης Καποδίστριας',   'dep' => '11:45', 'arr' => '12:35' ],
            [ 'ship' => 'Αγία Τριάδα',            'dep' => '14:00', 'arr' => '14:50' ],
            [ 'ship' => 'Ιωάννης Καποδίστριας',   'dep' => '16:00', 'arr' => '16:50' ],
            [ 'ship' => 'Ιωάννης Καποδίστριας',   'dep' => '19:00', 'arr' => '19:50' ],
        ],
        'hl' => [
            [ 'ship' => 'Λευκίμμη',               'dep' => '07:30', 'arr' => '08:20' ],
            [ 'ship' => 'Αγία Τριάδα',            'dep' => '09:00', 'arr' => '09:50' ],
            [ 'ship' => 'Λευκίμμη',               'dep' => '11:30', 'arr' => '12:20' ],
            [ 'ship' => 'Αγία Τριάδα',            'dep' => '13:00', 'arr' => '13:50' ],
            [ 'ship' => 'Ιωάννης Καποδίστριας',   'dep' => '14:00', 'arr' => '14:50' ],
            [ 'ship' => 'Λευκίμμη',               'dep' => '15:30', 'arr' => '16:20' ],
            [ 'ship' => 'Αγία Τριάδα',            'dep' => '16:30', 'arr' => '17:20' ],
            [ 'ship' => 'Ιωάννης Καποδίστριας',   'dep' => '18:00', 'arr' => '18:50' ],
            [ 'ship' => 'Ιωάννης Καποδίστριας',   'dep' => '21:00', 'arr' => '21:50' ],
        ],
        'lp' => [
            [ 'ship' => 'Δέσποινα Π.', 'dep' => '09:15', 'arr' => '10:00' ],
            [ 'ship' => 'Δέσποινα Π.', 'dep' => '14:30', 'arr' => '15:15' ],
            [ 'ship' => 'Δέσποινα Π.', 'dep' => '17:45', 'arr' => '18:30' ],
        ],
        'pl' => [
            [ 'ship' => 'Δέσποινα Π.', 'dep' => '07:45', 'arr' => '08:30' ],
            [ 'ship' => 'Δέσποινα Π.', 'dep' => '12:00', 'arr' => '12:45' ],
            [ 'ship' => 'Δέσποινα Π.', 'dep' => '16:30', 'arr' => '17:15' ],
        ],
    ];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Load saved schedule or return default.
 *
 * @return array
 */
function ll_get_schedule() {
    $raw = get_option( LL_OPTION_KEY, '' );
    if ( $raw === '' ) {
        return ll_default_schedule();
    }
    $decoded = json_decode( $raw, true );
    if ( ! is_array( $decoded ) ) {
        return ll_default_schedule();
    }
    return $decoded;
}

/**
 * Validate and sanitize a single route array coming from POST data.
 *
 * @param  array $rows Raw POST rows.
 * @return array       Sanitized rows.
 */
function ll_sanitize_route( $rows ) {
    if ( ! is_array( $rows ) ) {
        return [];
    }
    $clean = [];
    foreach ( $rows as $row ) {
        if ( ! is_array( $row ) ) {
            continue;
        }
        $ship = sanitize_text_field( $row['ship'] ?? '' );
        $dep  = sanitize_text_field( $row['dep']  ?? '' );
        $arr  = sanitize_text_field( $row['arr']  ?? '' );
        // Basic HH:MM validation
        if ( ! preg_match( '/^\d{2}:\d{2}$/', $dep ) ) { $dep = '00:00'; }
        if ( ! preg_match( '/^\d{2}:\d{2}$/', $arr ) ) { $arr = '00:00'; }
        $clean[] = [ 'ship' => $ship, 'dep' => $dep, 'arr' => $arr ];
    }
    return $clean;
}

// ---------------------------------------------------------------------------
// Admin menu
// ---------------------------------------------------------------------------

add_action( 'admin_menu', 'll_admin_menu' );

function ll_admin_menu() {
    add_options_page(
        'Δρομολόγια Lefkimmi Lines',
        'Δρομολόγια',
        'manage_options',
        'll-schedule',
        'll_admin_page'
    );
}

// ---------------------------------------------------------------------------
// Handle form submissions (must run before headers are sent)
// ---------------------------------------------------------------------------

add_action( 'admin_init', 'll_handle_save' );

function ll_handle_save() {
    if ( ! isset( $_POST['ll_action'] ) ) {
        return;
    }
    if ( ! current_user_can( 'manage_options' ) ) {
        wp_die( 'Δεν έχετε δικαίωμα.' );
    }

    // ---- Manual table save ----
    if ( $_POST['ll_action'] === 'll_save_schedule' ) {
        check_admin_referer( 'll_save_schedule_nonce' );

        $schedule = [
            'll' => ll_sanitize_route( $_POST['ll'] ?? [] ),
            'hl' => ll_sanitize_route( $_POST['hl'] ?? [] ),
            'lp' => ll_sanitize_route( $_POST['lp'] ?? [] ),
            'pl' => ll_sanitize_route( $_POST['pl'] ?? [] ),
        ];
        update_option( LL_OPTION_KEY, wp_json_encode( $schedule, JSON_UNESCAPED_UNICODE ) );

        wp_safe_redirect( add_query_arg(
            [ 'page' => 'll-schedule', 'tab' => sanitize_key( $_POST['active_tab'] ?? 'll' ), 'saved' => '1' ],
            admin_url( 'options-general.php' )
        ) );
        exit;
    }

    // ---- JSON import ----
    if ( $_POST['ll_action'] === 'll_import_json' ) {
        check_admin_referer( 'll_import_json_nonce' );

        $raw     = stripslashes( $_POST['ll_json_import'] ?? '' );
        $decoded = json_decode( $raw, true );

        if ( ! is_array( $decoded ) ) {
            wp_safe_redirect( add_query_arg(
                [ 'page' => 'll-schedule', 'tab' => 'll', 'json_error' => '1' ],
                admin_url( 'options-general.php' )
            ) );
            exit;
        }

        $schedule = [
            'll' => ll_sanitize_route( $decoded['ll'] ?? [] ),
            'hl' => ll_sanitize_route( $decoded['hl'] ?? [] ),
            'lp' => ll_sanitize_route( $decoded['lp'] ?? [] ),
            'pl' => ll_sanitize_route( $decoded['pl'] ?? [] ),
        ];
        update_option( LL_OPTION_KEY, wp_json_encode( $schedule, JSON_UNESCAPED_UNICODE ) );

        wp_safe_redirect( add_query_arg(
            [ 'page' => 'll-schedule', 'tab' => 'll', 'imported' => '1' ],
            admin_url( 'options-general.php' )
        ) );
        exit;
    }
}

// ---------------------------------------------------------------------------
// Admin page HTML
// ---------------------------------------------------------------------------

function ll_admin_page() {
    if ( ! current_user_can( 'manage_options' ) ) {
        return;
    }

    $schedule   = ll_get_schedule();
    $active_tab = sanitize_key( $_GET['tab'] ?? 'll' );
    $valid_tabs = [ 'll', 'hl', 'lp', 'pl' ];
    if ( ! in_array( $active_tab, $valid_tabs, true ) ) {
        $active_tab = 'll';
    }

    $tab_labels = [
        'll' => 'ΛΕΥ → ΗΓΟ',
        'hl' => 'ΗΓΟ → ΛΕΥ',
        'lp' => 'ΛΕΥ → ΠΑΞΟΙ',
        'pl' => 'ΠΑΞΟΙ → ΛΕΥ',
    ];
    ?>
    <div class="wrap">
        <h1>Δρομολόγια Lefkimmi Lines</h1>

        <?php if ( isset( $_GET['saved'] ) ) : ?>
            <div class="notice notice-success is-dismissible"><p>Οι αλλαγές αποθηκεύτηκαν.</p></div>
        <?php endif; ?>
        <?php if ( isset( $_GET['imported'] ) ) : ?>
            <div class="notice notice-success is-dismissible"><p>Το JSON εισήχθη επιτυχώς.</p></div>
        <?php endif; ?>
        <?php if ( isset( $_GET['json_error'] ) ) : ?>
            <div class="notice notice-error is-dismissible"><p>Σφάλμα: το JSON δεν είναι έγκυρο.</p></div>
        <?php endif; ?>

        <!-- Tab navigation -->
        <nav class="nav-tab-wrapper">
            <?php foreach ( $tab_labels as $key => $label ) : ?>
                <a href="<?php echo esc_url( add_query_arg( [ 'page' => 'll-schedule', 'tab' => $key ], admin_url( 'options-general.php' ) ) ); ?>"
                   class="nav-tab <?php echo $active_tab === $key ? 'nav-tab-active' : ''; ?>">
                    <?php echo esc_html( $label ); ?>
                </a>
            <?php endforeach; ?>
        </nav>

        <!-- Schedule table form -->
        <form method="post" action="">
            <?php wp_nonce_field( 'll_save_schedule_nonce' ); ?>
            <input type="hidden" name="ll_action"   value="ll_save_schedule">
            <input type="hidden" name="active_tab"  value="<?php echo esc_attr( $active_tab ); ?>">

            <table class="widefat fixed striped" style="margin-top:16px;">
                <thead>
                    <tr>
                        <th>Πλοίο</th>
                        <th>Αναχώρηση (HH:MM)</th>
                        <th>Άφιξη (HH:MM)</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="ll-rows-<?php echo esc_attr( $active_tab ); ?>">
                    <?php foreach ( $schedule[ $active_tab ] as $i => $row ) : ?>
                        <tr class="ll-row">
                            <td><input type="text"  name="<?php echo esc_attr( $active_tab ); ?>[<?php echo $i; ?>][ship]" value="<?php echo esc_attr( $row['ship'] ); ?>" class="regular-text"></td>
                            <td><input type="text"  name="<?php echo esc_attr( $active_tab ); ?>[<?php echo $i; ?>][dep]"  value="<?php echo esc_attr( $row['dep'] ); ?>"  class="small-text" placeholder="HH:MM"></td>
                            <td><input type="text"  name="<?php echo esc_attr( $active_tab ); ?>[<?php echo $i; ?>][arr]"  value="<?php echo esc_attr( $row['arr'] ); ?>"  class="small-text" placeholder="HH:MM"></td>
                            <td><button type="button" class="button ll-delete-row">Διαγραφή</button></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>

            <p>
                <button type="button" class="button" id="ll-add-row" data-route="<?php echo esc_attr( $active_tab ); ?>">
                    + Προσθήκη δρομολογίου
                </button>
                &nbsp;
                <input type="submit" class="button button-primary" value="Αποθήκευση">
            </p>
        </form>

        <hr>

        <!-- JSON import -->
        <h2>Εισαγωγή JSON</h2>
        <p style="color:#555;">Επικολλήστε JSON με κλειδιά <code>ll</code>, <code>hl</code>, <code>lp</code>, <code>pl</code> για να αντικαταστήσετε ολόκληρο το πρόγραμμα.</p>
        <form method="post" action="">
            <?php wp_nonce_field( 'll_import_json_nonce' ); ?>
            <input type="hidden" name="ll_action" value="ll_import_json">
            <textarea name="ll_json_import" rows="10" style="width:100%;font-family:monospace;font-size:12px;" placeholder='{"ll":[...],"hl":[...],"lp":[...],"pl":[...]}'></textarea>
            <p><input type="submit" class="button button-secondary" value="Εισαγωγή JSON"></p>
        </form>

        <hr>

        <!-- Current JSON preview -->
        <h2>Τρέχοντα δεδομένα (JSON)</h2>
        <textarea rows="12" style="width:100%;font-family:monospace;font-size:11px;" readonly><?php echo esc_textarea( wp_json_encode( $schedule, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT ) ); ?></textarea>
    </div>

    <script>
    (function () {
        // Counter per route so new rows get unique indices
        var counters = {};

        document.getElementById('ll-add-row').addEventListener('click', function () {
            var route  = this.dataset.route;
            var tbody  = document.getElementById('ll-rows-' + route);
            var rows   = tbody.querySelectorAll('.ll-row');

            // Next index = current row count (deleted rows leave gaps, but PHP re-indexes on save)
            if ( ! counters[route] ) {
                counters[route] = rows.length;
            }
            var idx = counters[route]++;

            var tr = document.createElement('tr');
            tr.className = 'll-row';
            tr.innerHTML =
                '<td><input type="text"  name="' + route + '[' + idx + '][ship]" value="" class="regular-text"></td>' +
                '<td><input type="text"  name="' + route + '[' + idx + '][dep]"  value="" class="small-text" placeholder="HH:MM"></td>' +
                '<td><input type="text"  name="' + route + '[' + idx + '][arr]"  value="" class="small-text" placeholder="HH:MM"></td>' +
                '<td><button type="button" class="button ll-delete-row">Διαγραφή</button></td>';
            tbody.appendChild(tr);
        });

        document.addEventListener('click', function (e) {
            if ( e.target && e.target.classList.contains('ll-delete-row') ) {
                e.target.closest('tr').remove();
            }
        });
    })();
    </script>
    <?php
}

// ---------------------------------------------------------------------------
// REST API endpoint  GET /wp-json/ll/v1/schedule
// ---------------------------------------------------------------------------

add_action( 'rest_api_init', 'll_register_rest_routes' );

function ll_register_rest_routes() {
    register_rest_route( 'll/v1', '/schedule', [
        'methods'             => 'GET',
        'callback'            => 'll_rest_schedule',
        'permission_callback' => '__return_true',
    ] );
}

function ll_rest_schedule( WP_REST_Request $request ) {
    $schedule = ll_get_schedule();

    $response = new WP_REST_Response( $schedule, 200 );
    $response->header( 'Access-Control-Allow-Origin', '*' );
    $response->header( 'Cache-Control', 'public, max-age=300' );

    return $response;
}
