<?php
/**
 * Villa Lefki — amenity + social icon registry.
 *
 * The design system allows decorative icons in exactly two places
 * (praxis-design-system/docs/principles.md "Icon restraint"): the DB-16
 * amenities grid and the DB-12 footer social row. Both must be inline SVG,
 * stroke-width 1.5, fill:none, single accent stroke.
 *
 * To keep that rule un-break-able by editors, amenity/social icons are NOT a
 * free SVG upload — they are a fixed picker of pre-approved glyphs, exactly
 * the ones in the source markup. The SCF select field offers these keys; the
 * renderer maps a key to its verbatim source SVG.
 *
 * @package villa-lefki
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Amenity icon SVGs, keyed. Paths copied verbatim from the source .dc.html.
 *
 * @return array<string,array{label:string,svg:string}>
 */
function villa_amenity_icons() {
	return array(
		'pool'     => array(
			'label' => 'Pool / Πισίνα',
			'svg'   => '<svg class="db-amenities-quiet__icon" viewBox="0 0 24 24"><path d="M3 14c1.5 0 1.5 1.5 3 1.5S10.5 14 12 14s1.5 1.5 3 1.5S19.5 14 21 14"/><path d="M3 18c1.5 0 1.5 1.5 3 1.5S10.5 18 12 18s1.5 1.5 3 1.5S19.5 18 21 18"/><path d="M8 14V6a2 2 0 0 1 4 0"/></svg>',
		),
		'bedrooms' => array(
			'label' => 'Bedrooms / Υπνοδωμάτια',
			'svg'   => '<svg class="db-amenities-quiet__icon" viewBox="0 0 24 24"><path d="M3 18v-3a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3"/><path d="M5 13V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v5"/><path d="M3 18v2M21 18v2"/></svg>',
		),
		'kitchen'  => array(
			'label' => 'Kitchen / Κουζίνα',
			'svg'   => '<svg class="db-amenities-quiet__icon" viewBox="0 0 24 24"><path d="M12 3v6M5 9h14M6 9c0 5 2.5 9 6 9s6-4 6-9"/></svg>',
		),
		'ac'       => array(
			'label' => 'Air-conditioning / Κλιματισμός',
			'svg'   => '<svg class="db-amenities-quiet__icon" viewBox="0 0 24 24"><path d="M9.5 4 8 6M14.5 4 13 6M4 11h16M5 11v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/></svg>',
		),
		'wifi'     => array(
			'label' => 'Wi-Fi',
			'svg'   => '<svg class="db-amenities-quiet__icon" viewBox="0 0 24 24"><path d="M5 12.55a11 11 0 0 1 14 0"/><path d="M8.5 16.05a6 6 0 0 1 7 0"/><path d="M12 19.5h.01"/></svg>',
		),
		'parking'  => array(
			'label' => 'Parking / Στάθμευση',
			'svg'   => '<svg class="db-amenities-quiet__icon" viewBox="0 0 24 24"><path d="M5 13l1.6-4.5A2 2 0 0 1 8.5 7h7a2 2 0 0 1 1.9 1.5L19 13"/><path d="M4 13h16v4H4z"/><circle cx="7.5" cy="17.5" r="1.2"/><circle cx="16.5" cy="17.5" r="1.2"/></svg>',
		),
	);
}

/**
 * SCF select choices for the amenity icon picker.
 *
 * @return array<string,string>
 */
function villa_amenity_icon_choices() {
	$choices = array();
	foreach ( villa_amenity_icons() as $key => $data ) {
		$choices[ $key ] = $data['label'];
	}
	return $choices;
}

/**
 * Output an amenity icon SVG by key (already-safe, verbatim source markup).
 *
 * @param string $key Icon key.
 * @return string SVG markup or ''.
 */
function villa_amenity_icon_svg( $key ) {
	$icons = villa_amenity_icons();
	return isset( $icons[ $key ] ) ? $icons[ $key ]['svg'] : '';
}

/**
 * Social icon SVGs, keyed by network. Verbatim from the source footer.
 *
 * @return array<string,string>
 */
function villa_social_icons() {
	return array(
		'instagram' => '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none"/></svg>',
		'facebook'  => '<svg viewBox="0 0 24 24"><path d="M15 8.5h-2a1.5 1.5 0 0 0-1.5 1.5v11"/><path d="M9 13.5h5"/><path d="M15 3.5V8.5"/></svg>',
		'whatsapp'  => '<svg viewBox="0 0 24 24"><path d="M4 20l1.3-4A8 8 0 1 1 8 18.7z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5.7 0 1-.5 1-1s-.4-.9-1-1.2c-.5-.2-.9 0-1.2.3-1-.4-1.8-1.2-2.2-2.2.3-.3.5-.7.3-1.2C11.4 9 11 8.5 10.5 8.5S9 8.8 9 9.5z" fill="currentColor" stroke="none"/></svg>',
	);
}

/**
 * SCF choices for the social network select.
 *
 * @return array<string,string>
 */
function villa_social_choices() {
	return array(
		'instagram' => 'Instagram',
		'facebook'  => 'Facebook',
		'whatsapp'  => 'WhatsApp',
	);
}

/**
 * Output a social icon SVG by network key.
 *
 * @param string $key Network key.
 * @return string
 */
function villa_social_icon_svg( $key ) {
	$icons = villa_social_icons();
	return isset( $icons[ $key ] ) ? $icons[ $key ] : '';
}
