<?php
/**
 * inc/scf-fields.php — All SCF local field groups for praxis-web.
 *
 * Rules:
 *  • acf/init hook, function_exists guard — safe when SCF absent.
 *  • Front-page content → location: page_type == front_page.
 *  • Global fields (header nav) → Options page 'pw-options'.
 *  • SEO fields → all WP pages (post_type == page), sidebar position.
 *  • Contact modal → handled by block #35/block.php (not here).
 *
 * Admin navigation landmarks (Iggy-friendly labels):
 *   🔝 Header & Navigation
 *   🦸 Hero Section
 *   🃏 Κάρτες Υπηρεσιών
 *   📜 Manifesto
 *   📊 Stats / Αριθμοί
 *   🎯 CTA Section
 *   🔍 SEO & OG
 */

defined( 'ABSPATH' ) || exit;

add_action( 'acf/init', function () {

	if ( ! function_exists( 'acf_add_local_field_group' ) ) {
		return;
	}

	/* Options page for global (header/nav) fields.
	   Block #35 may already create 'acf-options' — we create a SEPARATE
	   'pw-options' page to avoid collision. */
	if ( function_exists( 'acf_add_options_page' ) ) {
		acf_add_options_page( [
			'page_title' => 'Praxis Web — Ρυθμίσεις',
			'menu_title' => 'Praxis Web',
			'menu_slug'  => 'pw-options',
			'capability' => 'manage_options',
			'redirect'   => false,
			'icon_url'   => 'dashicons-admin-generic',
		] );
	}

	/* Shared location: fields shown only on the WP front page. */
	$front_loc = [ [ [
		'param'    => 'page_type',
		'operator' => '==',
		'value'    => 'front_page',
	] ] ];

	/* ── 🔝 HEADER & NAVIGATION (Options page) ───────────────── */
	acf_add_local_field_group( [
		'key'    => 'group_pw_header',
		'title'  => '🔝 Header & Navigation',
		'fields' => [
			[
				'key'           => 'field_pw_logo_text',
				'label'         => 'Logo Text',
				'name'          => 'pw_logo_text',
				'type'          => 'text',
				'default_value' => 'PRAXIS',
				'instructions'  => 'Πρώτο γράμμα → champagne dot. Υπόλοιπο → logo text.',
			],
			[
				'key'           => 'field_pw_header_cta_text',
				'label'         => 'CTA Button (header/nav)',
				'name'          => 'pw_header_cta_text',
				'type'          => 'text',
				'default_value' => 'Επικοινωνία',
			],
			[
				'key'          => 'field_pw_nav_items',
				'label'        => 'Σύνδεσμοι Πλοήγησης',
				'name'         => 'pw_nav_items',
				'type'         => 'repeater',
				'max'          => 6,
				'layout'       => 'table',
				'button_label' => 'Προσθήκη Συνδέσμου',
				'sub_fields'   => [
					[ 'key' => 'field_pw_nav_label', 'label' => 'Ετικέτα', 'name' => 'label', 'type' => 'text', 'column_width' => '40' ],
					[ 'key' => 'field_pw_nav_url',   'label' => 'URL',     'name' => 'url',   'type' => 'url',  'column_width' => '60' ],
				],
			],
		],
		'location'   => [ [ [ 'param' => 'options_page', 'operator' => '==', 'value' => 'pw-options' ] ] ],
		'menu_order' => 5,
	] );

	/* ── 🦸 HERO SECTION ─────────────────────────────────────── */
	acf_add_local_field_group( [
		'key'    => 'group_pw_hero',
		'title'  => '🦸 Hero Section',
		'fields' => [
			[
				'key'           => 'field_pw_hero_headline',
				'label'         => 'Headline (HTML OK — &nbsp; για αλλαγή γραμμής)',
				'name'          => 'pw_hero_headline',
				'type'          => 'text',
				'default_value' => 'Χτίζουμε&nbsp;το&nbsp;Digital&nbsp;σας&nbsp;Αύριο',
			],
			[
				'key'           => 'field_pw_hero_subline',
				'label'         => 'Υπότιτλος',
				'name'          => 'pw_hero_subline',
				'type'          => 'textarea',
				'rows'          => 2,
				'default_value' => 'Web design, e-commerce και performance marketing που παράγουν αποτελέσματα.',
			],
			[
				'key'           => 'field_pw_hero_cta1_txt',
				'label'         => 'CTA Κύριο — Κείμενο',
				'name'          => 'pw_hero_cta1_txt',
				'type'          => 'text',
				'default_value' => 'Δείτε το Portfolio',
			],
			[
				'key'           => 'field_pw_hero_cta1_url',
				'label'         => 'CTA Κύριο — URL',
				'name'          => 'pw_hero_cta1_url',
				'type'          => 'url',
				'default_value' => '/portfolio',
			],
			[
				'key'           => 'field_pw_hero_cta2_txt',
				'label'         => 'CTA Δεύτερο — Κείμενο',
				'name'          => 'pw_hero_cta2_txt',
				'type'          => 'text',
				'default_value' => 'Επικοινωνία',
			],
			[
				'key'           => 'field_pw_hero_cta2_url',
				'label'         => 'CTA Δεύτερο — URL (#contact ή data-open-modal)',
				'name'          => 'pw_hero_cta2_url',
				'type'          => 'url',
				'default_value' => '#contact',
			],
			[
				'key'          => 'field_pw_hero_video',
				'label'        => 'Video URL (.mp4 — άδειο → εικόνα μόνο)',
				'name'         => 'pw_hero_video',
				'type'         => 'text',
				'placeholder'  => 'https://praxisweb.gr/assets/hero.mp4',
				'instructions' => 'Self-hosted MP4. Αφήστε κενό για image-only hero.',
			],
			[
				'key'           => 'field_pw_hero_poster',
				'label'         => 'Hero Image / Video Poster',
				'name'          => 'pw_hero_poster',
				'type'          => 'image',
				'return_format' => 'url',
				'preview_size'  => 'medium',
				'instructions'  => '1920×1080px ελάχιστο. Εμφανίζεται πριν φορτώσει το video και σε mobile.',
			],
		],
		'location'   => $front_loc,
		'menu_order' => 10,
	] );

	/* ── 🃏 ΚΆΡΤΕΣ ΥΠΗΡΕΣΙΏΝ ─────────────────────────────────── */
	acf_add_local_field_group( [
		'key'    => 'group_pw_cards',
		'title'  => '🃏 Κάρτες Υπηρεσιών',
		'fields' => [
			[
				'key'          => 'field_pw_cards',
				'label'        => 'Κάρτες (3 συνήθως)',
				'name'         => 'pw_cards',
				'type'         => 'repeater',
				'min'          => 1,
				'max'          => 6,
				'button_label' => 'Προσθήκη Κάρτας',
				'sub_fields'   => [
					[
						'key'           => 'field_pw_card_tag',
						'label'         => 'Tag (UPPERCASE από px_gr_upper)',
						'name'          => 'tag',
						'type'          => 'text',
						'default_value' => 'WEB DESIGN',
						'column_width'  => '20',
					],
					[
						'key'           => 'field_pw_card_num',
						'label'         => 'Αρ. (π.χ. 01)',
						'name'          => 'num',
						'type'          => 'text',
						'default_value' => '01',
						'column_width'  => '10',
					],
					[
						'key'           => 'field_pw_card_title',
						'label'         => 'Τίτλος',
						'name'          => 'title',
						'type'          => 'text',
						'default_value' => 'Τίτλος Υπηρεσίας',
						'column_width'  => '25',
					],
					[
						'key'          => 'field_pw_card_desc',
						'label'        => 'Περιγραφή',
						'name'         => 'desc',
						'type'         => 'textarea',
						'rows'         => 3,
						'column_width' => '30',
					],
					[
						'key'          => 'field_pw_card_link',
						'label'        => 'Link',
						'name'         => 'link',
						'type'         => 'url',
						'column_width' => '15',
					],
				],
			],
		],
		'location'   => $front_loc,
		'menu_order' => 20,
	] );

	/* ── 📜 MANIFESTO (Statement List) ───────────────────────── */
	acf_add_local_field_group( [
		'key'    => 'group_pw_manifesto',
		'title'  => '📜 Manifesto',
		'fields' => [
			[
				'key'           => 'field_pw_manifesto_eyebrow',
				'label'         => 'Eyebrow',
				'name'          => 'pw_manifesto_eyebrow',
				'type'          => 'text',
				'default_value' => 'Τι πιστεύουμε',
			],
			[
				'key'          => 'field_pw_manifesto_items',
				'label'        => 'Δηλώσεις',
				'name'         => 'pw_manifesto_items',
				'type'         => 'repeater',
				'min'          => 1,
				'max'          => 8,
				'button_label' => 'Προσθήκη Δήλωσης',
				'sub_fields'   => [
					[
						'key'          => 'field_pw_stmt_text',
						'label'        => 'Κείμενο (χρησιμοποίησε <strong> για τόνισμα λέξεων)',
						'name'         => 'text',
						'type'         => 'wysiwyg',
						'tabs'         => 'text',
						'toolbar'      => 'basic',
						'media_upload' => 0,
						'instructions' => 'GSAP θα κάνει word-by-word reveal αυτόματα. Wrap τονισμένες λέξεις με <strong>.',
					],
				],
			],
		],
		'location'   => $front_loc,
		'menu_order' => 30,
	] );

	/* ── 📊 STATS / ΑΡΙΘΜΟΊ ──────────────────────────────────── */
	acf_add_local_field_group( [
		'key'    => 'group_pw_stats',
		'title'  => '📊 Stats / Αριθμοί',
		'fields' => [
			[
				'key'           => 'field_pw_stats_heading',
				'label'         => 'Τίτλος Section',
				'name'          => 'pw_stats_heading',
				'type'          => 'text',
				'default_value' => 'Αποτελέσματα σε αριθμούς',
			],
			[
				'key'          => 'field_pw_stats',
				'label'        => 'Stats (2–4)',
				'name'         => 'pw_stats',
				'type'         => 'repeater',
				'min'          => 2,
				'max'          => 4,
				'layout'       => 'table',
				'button_label' => 'Προσθήκη Stat',
				'sub_fields'   => [
					[
						'key'           => 'field_pw_stat_num',
						'label'         => 'Αριθμός (π.χ. 180)',
						'name'          => 'num',
						'type'          => 'text',
						'default_value' => '180',
						'column_width'  => '25',
						'instructions'  => 'Μόνο ο αριθμός — suffix χωριστά.',
					],
					[
						'key'           => 'field_pw_stat_suffix',
						'label'         => 'Suffix (π.χ. +, %)',
						'name'          => 'suffix',
						'type'          => 'text',
						'default_value' => '+',
						'column_width'  => '20',
					],
					[
						'key'           => 'field_pw_stat_label',
						'label'         => 'Ετικέτα',
						'name'          => 'label',
						'type'          => 'text',
						'default_value' => 'Projects',
						'column_width'  => '55',
					],
				],
			],
		],
		'location'   => $front_loc,
		'menu_order' => 40,
	] );

	/* ── 🎯 CTA SECTION ──────────────────────────────────────── */
	acf_add_local_field_group( [
		'key'    => 'group_pw_cta',
		'title'  => '🎯 CTA Section',
		'fields' => [
			[
				'key'           => 'field_pw_cta_heading',
				'label'         => 'Τίτλος',
				'name'          => 'pw_cta_heading',
				'type'          => 'text',
				'default_value' => 'Ξεκινήστε σήμερα',
			],
			[
				'key'           => 'field_pw_cta_text',
				'label'         => 'Υπότιτλος',
				'name'          => 'pw_cta_text',
				'type'          => 'textarea',
				'rows'          => 2,
				'default_value' => 'Μία συζήτηση αρκεί για να δούμε αν ταιριάζουμε.',
			],
			[
				'key'           => 'field_pw_cta_btn_txt',
				'label'         => 'CTA Button Κείμενο (ανοίγει modal)',
				'name'          => 'pw_cta_btn_txt',
				'type'          => 'text',
				'default_value' => 'Κλείστε Ραντεβού',
			],
			[
				'key'          => 'field_pw_cta_phone',
				'label'        => 'Τηλέφωνο (για ghost CTA "ή καλέστε μας")',
				'name'         => 'pw_cta_phone',
				'type'         => 'text',
				'default_value'=> '+30 210 123 4567',
			],
		],
		'location'   => $front_loc,
		'menu_order' => 50,
	] );

	/* ── 🔍 SEO & OG (όλες οι σελίδες — sidebar) ────────────── */
	acf_add_local_field_group( [
		'key'    => 'group_pw_seo',
		'title'  => '🔍 SEO & OG',
		'fields' => [
			[
				'key'          => 'field_pw_seo_title',
				'label'        => 'SEO Title (override)',
				'name'         => 'pw_seo_title',
				'type'         => 'text',
				'instructions' => 'Αφήστε κενό για default WP title.',
			],
			[
				'key'  => 'field_pw_seo_desc',
				'label'=> 'Meta Description (≤160 χαρ.)',
				'name' => 'pw_seo_desc',
				'type' => 'textarea',
				'rows' => 2,
				'maxlength' => 160,
			],
			[
				'key'           => 'field_pw_seo_og_image',
				'label'         => 'OG Image (1200×630px)',
				'name'          => 'pw_seo_og_image',
				'type'          => 'image',
				'return_format' => 'url',
				'preview_size'  => 'medium',
			],
		],
		'location'   => [ [ [ 'param' => 'post_type', 'operator' => '==', 'value' => 'page' ] ] ],
		'menu_order' => 95,
		'position'   => 'side',
	] );

} );
