<?php
/**
 * Villa Lefki — Secure Custom Fields registration.
 *
 * All groups are registered inside acf/init (never at top level). One options
 * page holds the site-wide chrome (wordmark, contact, nav list, languages,
 * socials); every content section is a field group attached to the static
 * front page, so an editor edits the whole site from two screens:
 * Settings > "Villa Options" and Pages > the front page.
 *
 * @package villa-lefki
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

require_once get_template_directory() . '/inc/icons.php';

/**
 * Register the options page.
 */
add_action(
	'acf/init',
	function () {
		if ( ! function_exists( 'acf_add_options_page' ) ) {
			return;
		}
		acf_add_options_page(
			array(
				'page_title' => 'Villa Options',
				'menu_title' => 'Villa Options',
				'menu_slug'  => 'villa-options',
				'capability' => 'edit_posts',
				'position'   => 2,
				'icon_url'   => 'dashicons-palmtree',
				'redirect'   => false,
			)
		);
	}
);

/**
 * Location rule shared by every per-section group: the static front page.
 *
 * @return array
 */
function villa_front_page_location() {
	return array(
		array(
			array(
				'param'    => 'page_type',
				'operator' => '==',
				'value'    => 'front_page',
			),
		),
	);
}

/**
 * Register all field groups.
 */
add_action(
	'acf/init',
	function () {
		if ( ! function_exists( 'acf_add_local_field_group' ) ) {
			return;
		}

		/* ─────────────────────────────────────────────────────────────
		 * SITE OPTIONS (options page)
		 * ───────────────────────────────────────────────────────────── */
		acf_add_local_field_group(
			array(
				'key'      => 'group_villa_options',
				'title'    => 'Site-wide — Wordmark, Contact, Navigation, Languages',
				'fields'   => array(
					villa_tab( 'opt_tab_brand', 'Brand & Contact' ),
					villa_text( 'field_wordmark', 'wordmark', 'Wordmark (Greek, uppercase, no tonos)' ),
					villa_text( 'field_locality_nav', 'locality_nav', 'Locality — nav bar (short)' ),
					villa_text( 'field_locality_full', 'locality_full', 'Locality — overlay & footer (full)' ),
					villa_text( 'field_contact_email', 'contact_email', 'Contact email' ),
					villa_text( 'field_phone', 'phone', 'Phone (display)' ),
					villa_text( 'field_phone_tel', 'phone_tel', 'Phone (tel: href, digits/+ only)' ),
					villa_text( 'field_address', 'address', 'Postal address' ),

					villa_tab( 'opt_tab_chrome', 'Nav chrome labels' ),
					villa_text( 'field_menu_label', 'menu_label', 'Menu trigger label' ),
					villa_text( 'field_close_label', 'close_label', 'Overlay close label' ),
					villa_text( 'field_booking_label', 'booking_label', 'Booking link label' ),
					villa_text( 'field_booking_target', 'booking_target', 'Booking link target (#anchor)' ),

					villa_tab( 'opt_tab_nav', 'Navigation items' ),
					villa_repeater(
						'field_nav_items',
						'nav_items',
						'Nav / pages (used by the menu overlay and the footer pages list)',
						'label',
						array(
							villa_text( 'field_nav_num', 'number', 'Number (e.g. 01)' ),
							villa_text( 'field_nav_label', 'label', 'Label' ),
							villa_text( 'field_nav_target', 'target', 'Target (#anchor)' ),
						)
					),

					villa_tab( 'opt_tab_socials', 'Social links' ),
					villa_repeater(
						'field_socials',
						'socials',
						'Social links (icon fixed per network)',
						'network',
						array(
							villa_select( 'field_social_network', 'network', 'Network', villa_social_choices() ),
							villa_text( 'field_social_url', 'url', 'URL' ),
						)
					),

					villa_tab( 'opt_tab_langs', 'Languages (decorative switcher)' ),
					villa_repeater(
						'field_languages',
						'languages',
						'Language codes (visual switcher only — no translation)',
						'label',
						array(
							villa_text( 'field_lang_code', 'code', 'Code (e.g. el)' ),
							villa_text( 'field_lang_label', 'label', 'Label (e.g. EL)' ),
							villa_true_false( 'field_lang_default', 'is_default', 'Default (active) language' ),
						)
					),
				),
				'location' => array(
					array(
						array(
							'param'    => 'options_page',
							'operator' => '==',
							'value'    => 'villa-options',
						),
					),
				),
			)
		);

		/* ─────────────────────────────────────────────────────────────
		 * HERO (DB-01)
		 * ───────────────────────────────────────────────────────────── */
		acf_add_local_field_group(
			array(
				'key'      => 'group_villa_hero',
				'title'    => 'Section 01 — Hero (DB-01)',
				'fields'   => array(
					villa_text( 'field_hero_eyebrow', 'hero_eyebrow', 'Eyebrow (uppercase, no tonos)' ),
					villa_text( 'field_hero_title', 'hero_title', 'Title / H1 (uppercase, no tonos)' ),
					villa_textarea( 'field_hero_lede', 'hero_lede', 'Lede' ),
					villa_text( 'field_hero_cta_label', 'hero_cta_label', 'CTA label' ),
					villa_text( 'field_hero_cta_target', 'hero_cta_target', 'CTA target (#anchor)' ),
					villa_image( 'field_hero_image', 'hero_image', 'Hero image (kenburns background)' ),
					villa_text( 'field_hero_image_alt', 'hero_image_alt', 'Hero image alt / aria-label' ),
				),
				'location' => villa_front_page_location(),
			)
		);

		/* ─────────────────────────────────────────────────────────────
		 * TENSION (DB-03)
		 * ───────────────────────────────────────────────────────────── */
		acf_add_local_field_group(
			array(
				'key'      => 'group_villa_tension',
				'title'    => 'Section 02 — Tension statement (DB-03)',
				'fields'   => array(
					villa_text( 'field_tension_kicker', 'tension_kicker', 'Kicker (uppercase, no tonos)' ),
					villa_textarea( 'field_tension_statement', 'tension_statement', 'Statement line' ),
				),
				'location' => villa_front_page_location(),
			)
		);

		/* ─────────────────────────────────────────────────────────────
		 * MANIFESTO (DB-04)
		 * ───────────────────────────────────────────────────────────── */
		acf_add_local_field_group(
			array(
				'key'      => 'group_villa_manifesto',
				'title'    => 'Section 03 — Manifesto (DB-04)',
				'fields'   => array(
					villa_wysiwyg( 'field_manifesto_body', 'manifesto_body', 'Body copy' ),
					villa_textarea( 'field_manifesto_quote', 'manifesto_quote', 'Pull-quote' ),
					villa_text( 'field_manifesto_citation', 'manifesto_citation', 'Citation (uppercase, no tonos)' ),
				),
				'location' => villa_front_page_location(),
			)
		);

		/* ─────────────────────────────────────────────────────────────
		 * EDITORIAL (DB-05) — repeating rows
		 * ───────────────────────────────────────────────────────────── */
		acf_add_local_field_group(
			array(
				'key'      => 'group_villa_editorial',
				'title'    => 'Section 04 — Editorial split rows (DB-05)',
				'fields'   => array(
					villa_repeater(
						'field_editorial_rows',
						'editorial_rows',
						'Rows (alternating image/text is automatic by position)',
						'title',
						array(
							villa_text( 'field_ed_eyebrow', 'eyebrow', 'Eyebrow (e.g. 01 · Ο ΤΟΠΟΣ)' ),
							villa_text( 'field_ed_title', 'title', 'Title / H3' ),
							villa_textarea( 'field_ed_body', 'body', 'Body' ),
							villa_image( 'field_ed_image', 'image', 'Image (parallax layer)' ),
							villa_text( 'field_ed_image_alt', 'image_alt', 'Image alt / aria-label' ),
						)
					),
				),
				'location' => villa_front_page_location(),
			)
		);

		/* ─────────────────────────────────────────────────────────────
		 * AMENITIES (DB-16)
		 * ───────────────────────────────────────────────────────────── */
		acf_add_local_field_group(
			array(
				'key'      => 'group_villa_amenities',
				'title'    => 'Section 05 — Amenities (DB-16)',
				'fields'   => array(
					villa_text( 'field_amen_eyebrow', 'amenities_eyebrow', 'Eyebrow (uppercase, no tonos)' ),
					villa_text( 'field_amen_title', 'amenities_title', 'Title / H2' ),
					villa_repeater(
						'field_amenities_items',
						'amenities_items',
						'Amenity rows',
						'label',
						array(
							villa_select( 'field_amen_icon', 'icon', 'Icon (pre-approved set)', villa_amenity_icon_choices() ),
							villa_text( 'field_amen_label', 'label', 'Label' ),
						)
					),
				),
				'location' => villa_front_page_location(),
			)
		);

		/* ─────────────────────────────────────────────────────────────
		 * PROOF STRIP (DB-07)
		 * ───────────────────────────────────────────────────────────── */
		acf_add_local_field_group(
			array(
				'key'      => 'group_villa_proof',
				'title'    => 'Section 06 — Proof strip (DB-07)',
				'fields'   => array(
					villa_repeater(
						'field_proof_stats',
						'proof_stats',
						'Stats (count-up targets)',
						'label',
						array(
							villa_text( 'field_proof_number', 'number', 'Number (final value, e.g. 1908 or 9.8)' ),
							villa_text( 'field_proof_label', 'label', 'Label (uppercase, no tonos)' ),
						)
					),
				),
				'location' => villa_front_page_location(),
			)
		);

		/* ─────────────────────────────────────────────────────────────
		 * REVIEWS (DB-15)
		 * ───────────────────────────────────────────────────────────── */
		acf_add_local_field_group(
			array(
				'key'      => 'group_villa_reviews',
				'title'    => 'Section 07 — Reviews carousel (DB-15)',
				'fields'   => array(
					villa_text( 'field_rev_eyebrow', 'reviews_eyebrow', 'Eyebrow (uppercase, no tonos)' ),
					villa_text( 'field_rev_title', 'reviews_title', 'Title / H2' ),
					villa_image( 'field_rev_bg', 'reviews_bg_image', 'Background image (parallax)' ),
					villa_text( 'field_rev_bg_alt', 'reviews_bg_alt', 'Background image alt' ),
					villa_repeater(
						'field_reviews_items',
						'reviews_items',
						'Reviews (slide 0 renders as the static card AND all slides feed the carousel JSON)',
						'name',
						array(
							villa_textarea( 'field_rev_quote', 'quote', 'Quote (no surrounding quotation marks)' ),
							villa_text( 'field_rev_name', 'name', 'Name' ),
							villa_text( 'field_rev_loc', 'loc', 'Location (uppercase, no tonos)' ),
						)
					),
				),
				'location' => villa_front_page_location(),
			)
		);

		/* ─────────────────────────────────────────────────────────────
		 * FAQ (DB-14)
		 * ───────────────────────────────────────────────────────────── */
		acf_add_local_field_group(
			array(
				'key'      => 'group_villa_faq',
				'title'    => 'Section 08 — FAQ cards (DB-14)',
				'fields'   => array(
					villa_text( 'field_faq_eyebrow', 'faq_eyebrow', 'Eyebrow (uppercase, no tonos)' ),
					villa_text( 'field_faq_title', 'faq_title', 'Title / H2' ),
					villa_textarea( 'field_faq_lead', 'faq_lead', 'Lead' ),
					villa_repeater(
						'field_faq_items',
						'faq_items',
						'FAQ items (auto-distributed across the two columns)',
						'question',
						array(
							villa_text( 'field_faq_q', 'question', 'Question' ),
							villa_wysiwyg( 'field_faq_a', 'answer', 'Answer' ),
						)
					),
				),
				'location' => villa_front_page_location(),
			)
		);

		/* ─────────────────────────────────────────────────────────────
		 * CTA + MODAL (DB-11)
		 * ───────────────────────────────────────────────────────────── */
		acf_add_local_field_group(
			array(
				'key'      => 'group_villa_cta',
				'title'    => 'Section 09 — CTA & booking modal (DB-11)',
				'fields'   => array(
					villa_text( 'field_cta_eyebrow', 'cta_eyebrow', 'Eyebrow (uppercase, no tonos)' ),
					villa_text( 'field_cta_button', 'cta_button_label', 'Button label' ),
					villa_text( 'field_cta_modal_title', 'cta_modal_title', 'Modal title' ),
					villa_text( 'field_cta_name_label', 'cta_name_label', 'Name field label (sr-only) / placeholder' ),
					villa_text( 'field_cta_email_label', 'cta_email_label', 'Email field label / placeholder' ),
					villa_text( 'field_cta_dates_label', 'cta_dates_label', 'Dates field label (sr-only)' ),
					villa_text( 'field_cta_dates_ph', 'cta_dates_placeholder', 'Dates placeholder' ),
					villa_text( 'field_cta_submit', 'cta_submit_label', 'Submit button label' ),
					villa_text( 'field_cta_success', 'cta_success_message', 'Success message' ),
				),
				'location' => villa_front_page_location(),
			)
		);

		/* ─────────────────────────────────────────────────────────────
		 * FOOTER (DB-12)
		 * ───────────────────────────────────────────────────────────── */
		acf_add_local_field_group(
			array(
				'key'      => 'group_villa_footer',
				'title'    => 'Section 10 — Footer (DB-12)',
				'fields'   => array(
					villa_textarea( 'field_footer_epigraph', 'footer_epigraph', 'Epigraph' ),
					villa_textarea( 'field_footer_summary', 'footer_summary', 'Summary' ),
					villa_text( 'field_footer_pages_head', 'footer_pages_heading', 'Pages column heading (uppercase)' ),
					villa_text( 'field_footer_contact_head', 'footer_contact_heading', 'Contact column heading (uppercase)' ),
					villa_text( 'field_footer_copyright', 'footer_copyright', 'Copyright line' ),
					villa_text( 'field_footer_legal', 'footer_legal', 'Legal links line' ),
				),
				'location' => villa_front_page_location(),
			)
		);
	}
);

/* ───────────────────────────────────────────────────────────────────────
 * Small field-builder helpers (keep the group definitions readable).
 * ─────────────────────────────────────────────────────────────────────── */

/**
 * @param string $key
 * @param string $name
 * @param string $label
 * @return array
 */
function villa_text( $key, $name, $label ) {
	return array(
		'key'   => $key,
		'label' => $label,
		'name'  => $name,
		'type'  => 'text',
	);
}

function villa_textarea( $key, $name, $label ) {
	return array(
		'key'   => $key,
		'label' => $label,
		'name'  => $name,
		'type'  => 'textarea',
		'rows'  => 3,
	);
}

function villa_wysiwyg( $key, $name, $label ) {
	return array(
		'key'          => $key,
		'label'        => $label,
		'name'         => $name,
		'type'         => 'wysiwyg',
		'tabs'         => 'all',
		'toolbar'      => 'full',
		'media_upload' => 0,
	);
}

function villa_image( $key, $name, $label ) {
	return array(
		'key'           => $key,
		'label'         => $label,
		'name'          => $name,
		'type'          => 'image',
		'return_format' => 'array',
		'preview_size'  => 'medium',
		'library'       => 'all',
	);
}

function villa_select( $key, $name, $label, $choices ) {
	return array(
		'key'     => $key,
		'label'   => $label,
		'name'    => $name,
		'type'    => 'select',
		'choices' => $choices,
		'ui'      => 1,
	);
}

function villa_true_false( $key, $name, $label ) {
	return array(
		'key'   => $key,
		'label' => $label,
		'name'  => $name,
		'type'  => 'true_false',
		'ui'    => 1,
	);
}

function villa_tab( $key, $label ) {
	return array(
		'key'       => $key,
		'label'     => $label,
		'type'      => 'tab',
		'placement' => 'top',
	);
}

/**
 * @param string $key
 * @param string $name
 * @param string $label
 * @param string $layout_title Sub-field name used as the row title.
 * @param array  $sub_fields
 * @return array
 */
function villa_repeater( $key, $name, $label, $layout_title, $sub_fields ) {
	return array(
		'key'          => $key,
		'label'        => $label,
		'name'         => $name,
		'type'         => 'repeater',
		'layout'       => 'block',
		'button_label' => 'Add row',
		'sub_fields'   => $sub_fields,
	);
}
