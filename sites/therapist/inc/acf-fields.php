<?php
/**
 * Praxis Therapist — ACF local field group registration.
 * All content-editable fields for the front page.
 * Requires ACF Free ≥ 6.x.
 */
/* Registration τρέχει στο acf/init ώστε το ACF να είναι πλήρως φορτωμένο. */
add_action( 'acf/init', function () {

	if ( ! function_exists( 'acf_add_local_field_group' ) ) {
		return;
	}

/* ── GLOBAL SETTINGS ── */
acf_add_local_field_group( [
	'key'      => 'group_global',
	'title'    => '⚙️ Καθολικές Ρυθμίσεις',
	'fields'   => [
		[ 'key' => 'field_global_site_name',   'label' => 'Όνομα Ιστοσελίδας (Nav)', 'name' => 'acf_global_site_name',   'type' => 'text', 'default_value' => 'Δημήτρης Κουκούλης' ],
		[ 'key' => 'field_global_phone',        'label' => 'Τηλέφωνο',                 'name' => 'acf_global_phone',        'type' => 'text', 'default_value' => '[ΤΗΛΕΦΩΝΟ]' ],
		[ 'key' => 'field_global_email',        'label' => 'Email',                     'name' => 'acf_global_email',        'type' => 'email', 'default_value' => '[EMAIL]' ],
		[ 'key' => 'field_global_city',         'label' => 'Πόλη / Τοποθεσία',         'name' => 'acf_global_city',         'type' => 'text', 'default_value' => '[ΠΟΛΗ]' ],
		[ 'key' => 'field_global_price',        'label' => 'Τιμή Συνεδρίας',           'name' => 'acf_global_price',        'type' => 'text', 'default_value' => '[ΤΙΜΗ]' ],
		[ 'key' => 'field_global_linkedin',     'label' => 'LinkedIn URL',              'name' => 'acf_global_linkedin',     'type' => 'url',  'default_value' => '[LINKEDIN_URL]' ],
		[ 'key' => 'field_global_instagram',    'label' => 'Instagram URL',             'name' => 'acf_global_instagram',    'type' => 'url',  'default_value' => '[INSTAGRAM_URL]' ],
	],
	'location' => [ [ [ 'param' => 'page_type', 'operator' => '==', 'value' => 'front_page' ] ] ],
	'menu_order' => 0,
] );

/* ── HERO ── */
acf_add_local_field_group( [
	'key'      => 'group_hero',
	'title'    => '🦸 Hero',
	'fields'   => [
		[ 'key' => 'field_hero_eyebrow',   'label' => 'Eyebrow',               'name' => 'acf_hero_eyebrow',   'type' => 'text', 'default_value' => 'Δημήτρης Κουκούλης — Ψυχολόγος | Ψυχοθεραπευτής' ],
		[ 'key' => 'field_hero_hl1',       'label' => 'Headline 1 (bold)',      'name' => 'acf_hero_hl1',       'type' => 'text', 'default_value' => '«Δεν θα σου πω ότι όλα θα πάνε καλά.' ],
		[ 'key' => 'field_hero_hl2',       'label' => 'Headline 2 (italic gold)','name' => 'acf_hero_hl2',      'type' => 'text', 'default_value' => 'Θα σου πω: κάτσε να δούμε γιατί δεν πάνε.»' ],
		[
			'key'        => 'field_hero_sub_lines',
			'label'      => 'Sub lines',
			'name'       => 'acf_hero_sub_lines',
			'type'       => 'repeater',
			'min'        => 0,
			'layout'     => 'table',
			'button_label' => 'Προσθήκη γραμμής',
			'sub_fields' => [
				[ 'key' => 'field_hero_sub_line', 'label' => 'Γραμμή', 'name' => 'line', 'type' => 'text' ],
			],
		],
		[ 'key' => 'field_hero_cta_text',  'label' => 'CTA Κείμενο',           'name' => 'acf_hero_cta_text',  'type' => 'text', 'default_value' => 'Κλείσε ένα ραντεβού — χωρίς δέσμευση' ],
		[ 'key' => 'field_hero_image',     'label' => 'Εικόνα Hero',           'name' => 'acf_hero_image',     'type' => 'image', 'return_format' => 'array' ],
		[ 'key' => 'field_hero_figtag',    'label' => 'Figtag (desktop label)', 'name' => 'acf_hero_figtag',   'type' => 'text', 'default_value' => '' ],
	],
	'location'   => [ [ [ 'param' => 'page_type', 'operator' => '==', 'value' => 'front_page' ] ] ],
	'menu_order' => 10,
] );

/* ── STATEMENT ── */
acf_add_local_field_group( [
	'key'      => 'group_statement',
	'title'    => '💬 Statement',
	'fields'   => [
		[ 'key' => 'field_stmt_kicker', 'label' => 'Kicker',     'name' => 'acf_stmt_kicker', 'type' => 'text',     'default_value' => 'Η προσέγγιση' ],
		[ 'key' => 'field_stmt_text',   'label' => 'Κείμενο',    'name' => 'acf_stmt_text',   'type' => 'textarea', 'default_value' => 'Δεν είμαι εδώ για να σε διορθώσω. Δεν είμαι εδώ για να σου μάθω πώς να γίνεις μια καλύτερη εκδοχή του εαυτού σου. Είμαι εδώ για να ακούσω την ιστορία σου, να καταλάβουμε μαζί τι σε δυσκολεύει και να δώσουμε χώρο σε όσα μέχρι τώρα έμεναν χωρίς λόγια.' ],
	],
	'location'   => [ [ [ 'param' => 'page_type', 'operator' => '==', 'value' => 'front_page' ] ] ],
	'menu_order' => 20,
] );

/* ── ABOUT ── */
acf_add_local_field_group( [
	'key'      => 'group_about',
	'title'    => '👤 Σχετικά',
	'fields'   => [
		[ 'key' => 'field_about_kicker',     'label' => 'Kicker',         'name' => 'acf_about_kicker',     'type' => 'text',     'default_value' => 'Σχετικά' ],
		[ 'key' => 'field_about_title',      'label' => 'Τίτλος',         'name' => 'acf_about_title',      'type' => 'text',     'default_value' => 'Με λένε Δημήτρη Κουκούλη και είμαι ψυχολόγος – ψυχοθεραπευτής.' ],
		[ 'key' => 'field_about_lead',       'label' => 'Lead (italic)',   'name' => 'acf_about_lead',       'type' => 'text',     'default_value' => 'Δεν πιστεύω ότι η ψυχοθεραπεία είναι προϊόν.' ],
		[ 'key' => 'field_about_body',       'label' => 'Κείμενο',        'name' => 'acf_about_body',       'type' => 'wysiwyg',  'default_value' => "<p>Ξέρω τι ίσως σκέφτεσαι: «Άλλος ένας ψυχολόγος». Το σκέφτομαι κι εγώ — κάθε φορά που βλέπω την ψυχοθεραπεία να παρουσιάζεται σαν συνδρομή γυμναστηρίου. Πακέτα. Προσφορές. Εγγυημένα αποτελέσματα. Εύκολες υποσχέσεις.</p><p>Δεν είμαι εδώ για να σε διορθώσω. Είμαι εδώ για να σε ακούσω. Πραγματικά.</p>" ],
		[ 'key' => 'field_about_signature',  'label' => 'Υπογραφή',       'name' => 'acf_about_signature',  'type' => 'text',     'default_value' => 'Δημήτρης Κουκούλης' ],
		[ 'key' => 'field_about_credential', 'label' => 'Τίτλος σπουδών', 'name' => 'acf_about_credential', 'type' => 'text',     'default_value' => 'Ψυχολόγος – Ψυχοθεραπευτής' ],
		[ 'key' => 'field_about_photo_main', 'label' => 'Φωτογραφία κύρια','name' => 'acf_about_photo_main','type' => 'image',    'return_format' => 'array' ],
		[ 'key' => 'field_about_photo_acc',  'label' => 'Φωτογραφία accent','name' => 'acf_about_photo_acc', 'type' => 'image',    'return_format' => 'array' ],
		[ 'key' => 'field_about_photo_alt',  'label' => 'Alt Κύρια',       'name' => 'acf_about_photo_alt',  'type' => 'text',    'default_value' => '' ],
	],
	'location'   => [ [ [ 'param' => 'page_type', 'operator' => '==', 'value' => 'front_page' ] ] ],
	'menu_order' => 30,
] );

/* ── SERVICES ── */
acf_add_local_field_group( [
	'key'      => 'group_services',
	'title'    => '🩺 Υπηρεσίες',
	'fields'   => [
		[ 'key' => 'field_svc_kicker', 'label' => 'Kicker',    'name' => 'acf_svc_kicker', 'type' => 'text', 'default_value' => 'Υπηρεσίες' ],
		[ 'key' => 'field_svc_title',  'label' => 'Τίτλος',    'name' => 'acf_svc_title',  'type' => 'text', 'default_value' => 'Τομείς εξειδίκευσης.' ],
		[ 'key' => 'field_svc_sub',    'label' => 'Υπότιτλος', 'name' => 'acf_svc_sub',    'type' => 'text', 'default_value' => 'Ψυχοθεραπεία ενηλίκων — ατομική, πρόσωπο με πρόσωπο ή εξ αποστάσεως.' ],
		[
			'key'        => 'field_svc_cards',
			'label'      => 'Κάρτες Υπηρεσιών',
			'name'       => 'acf_svc_cards',
			'type'       => 'repeater',
			'min'        => 0,
			'layout'     => 'block',
			'button_label' => 'Προσθήκη γραμμής',
			'sub_fields' => [
				[ 'key' => 'field_svc_card_num',   'label' => 'Αριθμός', 'name' => 'num',   'type' => 'text' ],
				[ 'key' => 'field_svc_card_title', 'label' => 'Τίτλος',  'name' => 'title', 'type' => 'text' ],
				[ 'key' => 'field_svc_card_desc',  'label' => 'Κείμενο', 'name' => 'desc',  'type' => 'textarea' ],
				[ 'key' => 'field_svc_card_image', 'label' => 'Εικόνα',  'name' => 'image', 'type' => 'image', 'return_format' => 'array' ],
			],
		],
	],
	'location'   => [ [ [ 'param' => 'page_type', 'operator' => '==', 'value' => 'front_page' ] ] ],
	'menu_order' => 40,
] );

/* ── PHILOSOPHY (WHY) ── */
acf_add_local_field_group( [
	'key'      => 'group_philosophy',
	'title'    => '🌿 Φιλοσοφία',
	'fields'   => [
		[ 'key' => 'field_philo_kicker', 'label' => 'Kicker',    'name' => 'acf_philo_kicker', 'type' => 'text', 'default_value' => 'Φιλοσοφία' ],
		[ 'key' => 'field_philo_title',  'label' => 'Τίτλος',    'name' => 'acf_philo_title',  'type' => 'text', 'default_value' => 'Η φιλοσοφία μου.' ],
		[ 'key' => 'field_philo_intro',  'label' => 'Intro (italic)', 'name' => 'acf_philo_intro','type' => 'textarea','default_value' => 'Η θεραπεία δεν είναι ένας δρόμος που περπατάς μόνος σου. Είναι μια συνεργασία όπου χτίζουμε μαζί τη διαδρομή από την αρχή.' ],
		[
			'key'        => 'field_philo_items',
			'label'      => 'Φιλοσοφία Items',
			'name'       => 'acf_philo_items',
			'type'       => 'repeater',
			'min'        => 0,
			'layout'     => 'table',
			'button_label' => 'Προσθήκη γραμμής',
			'sub_fields' => [
				[ 'key' => 'field_philo_item_text', 'label' => 'Κείμενο', 'name' => 'text', 'type' => 'text' ],
			],
		],
	],
	'location'   => [ [ [ 'param' => 'page_type', 'operator' => '==', 'value' => 'front_page' ] ] ],
	'menu_order' => 50,
] );

/* ── FAQ ── */
acf_add_local_field_group( [
	'key'      => 'group_faq',
	'title'    => '❓ FAQ',
	'fields'   => [
		[ 'key' => 'field_faq_kicker', 'label' => 'Kicker',    'name' => 'acf_faq_kicker', 'type' => 'text', 'default_value' => 'Συχνές ερωτήσεις' ],
		[ 'key' => 'field_faq_title',  'label' => 'Τίτλος',    'name' => 'acf_faq_title',  'type' => 'text', 'default_value' => 'Ό,τι ίσως αναρωτιέσαι.' ],
		[
			'key'        => 'field_faq_items',
			'label'      => 'Ερωτήσεις',
			'name'       => 'acf_faq_items',
			'type'       => 'repeater',
			'min'        => 0,
			'layout'     => 'block',
			'button_label' => 'Προσθήκη γραμμής',
			'sub_fields' => [
				[ 'key' => 'field_faq_q', 'label' => 'Ερώτηση', 'name' => 'question', 'type' => 'text' ],
				[ 'key' => 'field_faq_a', 'label' => 'Απάντηση', 'name' => 'answer',   'type' => 'wysiwyg' ],
			],
		],
	],
	'location'   => [ [ [ 'param' => 'page_type', 'operator' => '==', 'value' => 'front_page' ] ] ],
	'menu_order' => 60,
] );

/* ── CTA BANNER ── */
acf_add_local_field_group( [
	'key'      => 'group_cta',
	'title'    => '📣 CTA Banner',
	'fields'   => [
		[ 'key' => 'field_cta_eyebrow',  'label' => 'Eyebrow',      'name' => 'acf_cta_eyebrow',  'type' => 'text',  'default_value' => 'Ραντεβού' ],
		[ 'key' => 'field_cta_title',    'label' => 'Τίτλος',       'name' => 'acf_cta_title',    'type' => 'text',  'default_value' => 'Η πρώτη γνωριμία' ],
		[ 'key' => 'field_cta_subtitle', 'label' => 'Υπότιτλος',    'name' => 'acf_cta_subtitle', 'type' => 'text',  'default_value' => '15 λεπτά κουβέντα, χωρίς χρέωση.' ],
		[ 'key' => 'field_cta_btn',      'label' => 'CTA Κείμενο',  'name' => 'acf_cta_btn',      'type' => 'text',  'default_value' => 'Κλείσε τα πρώτα 15 λεπτά — δωρεάν' ],
		[ 'key' => 'field_cta_image',    'label' => 'Εικόνα φόντου','name' => 'acf_cta_image',    'type' => 'image', 'return_format' => 'array' ],
	],
	'location'   => [ [ [ 'param' => 'page_type', 'operator' => '==', 'value' => 'front_page' ] ] ],
	'menu_order' => 70,
] );

/* ── CONTACT ── */
acf_add_local_field_group( [
	'key'      => 'group_contact',
	'title'    => '📞 Επικοινωνία',
	'fields'   => [
		[ 'key' => 'field_contact_kicker',  'label' => 'Kicker',      'name' => 'acf_contact_kicker',  'type' => 'text',  'default_value' => 'Επικοινωνία' ],
		[ 'key' => 'field_contact_title',   'label' => 'Τίτλος',      'name' => 'acf_contact_title',   'type' => 'text',  'default_value' => 'Ας μιλήσουμε.' ],
		[ 'key' => 'field_contact_sub',     'label' => 'Υποτίτλος',   'name' => 'acf_contact_sub',     'type' => 'textarea','default_value' => 'Δεν χρειάζεται να ξέρεις τι ακριβώς ψάχνεις. Αρκεί να νιώθεις ότι κάτι δεν κυλάει όπως θα ήθελες. Στείλε μήνυμα ή κάλεσε — εντελώς χωρίς δέσμευση.' ],
		[ 'key' => 'field_contact_note',    'label' => 'Σημείωση',    'name' => 'acf_contact_note',    'type' => 'textarea','default_value' => "Όλα όσα μοιράζεσαι παραμένουν απολύτως εμπιστευτικά.\nΔημήτρης Κουκούλης — Ψυχολόγος – Ψυχοθεραπευτής\nΣυνεδρίες δια ζώσης & εξ αποστάσεως (βιντεοκλήση)" ],
		[ 'key' => 'field_contact_cta_text','label' => 'CTA Κείμενο', 'name' => 'acf_contact_cta_text','type' => 'text',  'default_value' => 'Κλείσε ένα ραντεβού — χωρίς δέσμευση' ],
		[ 'key' => 'field_contact_image',   'label' => 'Φωτογραφία',  'name' => 'acf_contact_image',   'type' => 'image', 'return_format' => 'array' ],
	],
	'location'   => [ [ [ 'param' => 'page_type', 'operator' => '==', 'value' => 'front_page' ] ] ],
	'menu_order' => 80,
] );

/* ── CONTACT MODAL ── */
acf_add_local_field_group( [
	'key'      => 'group_modal',
	'title'    => '🪟 Modal Φόρμας',
	'fields'   => [
		[ 'key' => 'field_modal_eyebrow', 'label' => 'Eyebrow',   'name' => 'acf_modal_eyebrow', 'type' => 'text', 'default_value' => 'Ραντεβού' ],
		[ 'key' => 'field_modal_title',   'label' => 'Τίτλος',    'name' => 'acf_modal_title',   'type' => 'text', 'default_value' => 'Η πρώτη γνωριμία' ],
		[ 'key' => 'field_modal_sub',     'label' => 'Υποτίτλος', 'name' => 'acf_modal_sub',     'type' => 'text', 'default_value' => '15 λεπτά κουβέντα, χωρίς χρέωση. Άφησε τα στοιχεία σου και επικοινωνώ σύντομα.' ],
		[ 'key' => 'field_modal_success', 'label' => 'Μήνυμα επιτυχίας', 'name' => 'acf_modal_success', 'type' => 'text', 'default_value' => 'Ευχαριστώ — θα επικοινωνήσω σύντομα.' ],
	],
	'location'   => [ [ [ 'param' => 'page_type', 'operator' => '==', 'value' => 'front_page' ] ] ],
	'menu_order' => 90,
] );

/* ── FOOTER ── */
acf_add_local_field_group( [
	'key'      => 'group_footer',
	'title'    => '🦶 Footer',
	'fields'   => [
		[ 'key' => 'field_footer_brand_name', 'label' => 'Όνομα brand',      'name' => 'acf_footer_brand_name', 'type' => 'text',     'default_value' => 'Δημήτρης Κουκούλης' ],
		[ 'key' => 'field_footer_brand_desc', 'label' => 'Περιγραφή brand',  'name' => 'acf_footer_brand_desc', 'type' => 'text',     'default_value' => 'Ψυχολόγος – Ψυχοθεραπευτής. Συνεδρίες δια ζώσης & εξ αποστάσεως.' ],
		[ 'key' => 'field_footer_hours_wd',   'label' => 'Ωράριο Εβδομάδας', 'name' => 'acf_footer_hours_wd',   'type' => 'text',     'default_value' => 'Δευτέρα – Παρασκευή' ],
		[ 'key' => 'field_footer_hours_wd_t', 'label' => 'Ώρες Εβδομάδας',  'name' => 'acf_footer_hours_wd_t', 'type' => 'text',     'default_value' => '09:00 – 21:00' ],
		[ 'key' => 'field_footer_hours_we',   'label' => 'Σαββατοκύριακο',   'name' => 'acf_footer_hours_we',   'type' => 'text',     'default_value' => 'Σάββατο – Κυριακή' ],
		[ 'key' => 'field_footer_hours_we_t', 'label' => 'Ώρες Σ/Κ',         'name' => 'acf_footer_hours_we_t', 'type' => 'text',     'default_value' => 'Κλειστά' ],
		[ 'key' => 'field_footer_copyright',  'label' => 'Copyright',         'name' => 'acf_footer_copyright',  'type' => 'text',     'default_value' => '© 2026 Δημήτρης Κουκούλης' ],
		[ 'key' => 'field_footer_role_label', 'label' => 'Ρόλος footer',     'name' => 'acf_footer_role_label', 'type' => 'text',     'default_value' => 'Ψυχολόγος – Ψυχοθεραπευτής' ],
	],
	'location'   => [ [ [ 'param' => 'page_type', 'operator' => '==', 'value' => 'front_page' ] ] ],
	'menu_order' => 100,
] );

} );
