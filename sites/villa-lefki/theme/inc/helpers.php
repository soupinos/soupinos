<?php
/**
 * Villa Lefki — content helpers.
 *
 * @package villa-lefki
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Greek-safe uppercasing.
 *
 * The design system's hard rule (praxis-design-system/docs/principles.md,
 * "Greek content rule"): uppercase Greek display copy must NOT be produced
 * with CSS `text-transform: uppercase`, because that keeps the tonos on
 * accented source text (ΆΝΝΑ instead of ΑΝΝΑ) and reads as a typo. Copy is
 * authored already-uppercase without tonos in the fields.
 *
 * This helper exists for the rare case where a value must be uppercased
 * programmatically (e.g. a language code, or defensively normalising a
 * field that an editor typed in lower case). It uppercases with mb_strtoupper
 * and then strips the Greek tonos that mb_strtoupper introduces, while
 * KEEPING the dialytika (diaeresis) — exactly the convention in principles.md
 * (`ΑΫΛΟΣ` keeps its diaeresis). Latin diacritics are left untouched.
 *
 * @param string $str Text to uppercase.
 * @return string Uppercased, tonos-stripped text.
 */
function px_gr_upper( $str ) {
	if ( null === $str || '' === $str ) {
		return '';
	}
	$upper = function_exists( 'mb_strtoupper' ) ? mb_strtoupper( $str, 'UTF-8' ) : strtoupper( $str );

	// Map tonos/oxia-bearing uppercase Greek vowels back to their plain
	// uppercase form. Dialytika-only forms (Ϊ Ϋ) are deliberately preserved.
	$map = array(
		'Ά' => 'Α',
		'Έ' => 'Ε',
		'Ή' => 'Η',
		'Ί' => 'Ι',
		'Ό' => 'Ο',
		'Ύ' => 'Υ',
		'Ώ' => 'Ω',
		// dialytika + tonos -> dialytika only (keep the diaeresis, drop tonos)
		'Ϊ́' => 'Ϊ',
		'Ϋ́' => 'Ϋ',
	);

	return strtr( $upper, $map );
}

/**
 * Fetch an SCF field, falling back to a default when SCF is inactive or the
 * field is empty. Keeps templates readable and null-safe.
 *
 * @param string $selector Field name.
 * @param mixed  $default  Fallback value.
 * @param mixed  $post_id  Post ID or 'option'.
 * @return mixed
 */
function px_field( $selector, $default = '', $post_id = false ) {
	if ( ! function_exists( 'get_field' ) ) {
		return $default;
	}
	$val = get_field( $selector, $post_id );
	if ( null === $val || '' === $val || ( is_array( $val ) && empty( $val ) ) ) {
		return $default;
	}
	return $val;
}

/**
 * Site-wide option field (from the SCF options page).
 *
 * @param string $selector Field name.
 * @param mixed  $default  Fallback value.
 * @return mixed
 */
function px_opt( $selector, $default = '' ) {
	return px_field( $selector, $default, 'option' );
}

/**
 * Render an image field as a background-image style for an FX media layer.
 *
 * The design's media layers (hero kenburns, editorial/reviews parallax) are
 * `role="img"` divs whose photo is a CSS background — NOT an <img>. FX-02/06
 * animate transform on these exact nodes, so we must keep them as divs and
 * only set background-image, never inject an <img> that would change the
 * transformed element. Returns an inline style string ('' when no image, so
 * the design's gradient placeholder from the block CSS shows through).
 *
 * @param array|int|false $image SCF image (array format).
 * @return string Inline style attribute value (may be empty).
 */
function px_bg_style( $image ) {
	$url = px_image_url( $image, 'full' );
	if ( ! $url ) {
		return '';
	}
	return 'background-image:url(' . esc_url( $url ) . ');background-size:cover;background-position:center;';
}

/**
 * Resolve an SCF image field (array / id / url) to a URL at a given size.
 *
 * @param mixed  $image SCF image value.
 * @param string $size  Registered image size.
 * @return string URL or '' .
 */
function px_image_url( $image, $size = 'large' ) {
	if ( empty( $image ) ) {
		return '';
	}
	if ( is_array( $image ) ) {
		if ( ! empty( $image['sizes'][ $size ] ) ) {
			return $image['sizes'][ $size ];
		}
		return isset( $image['url'] ) ? $image['url'] : '';
	}
	if ( is_numeric( $image ) ) {
		$src = wp_get_attachment_image_url( (int) $image, $size );
		return $src ? $src : '';
	}
	return (string) $image; // already a URL
}

/**
 * Whether a languages repeater has an explicit default row.
 *
 * @param array $languages Languages repeater rows.
 * @return bool
 */
function villa_has_default_lang( $languages ) {
	foreach ( (array) $languages as $lang ) {
		if ( ! empty( $lang['is_default'] ) ) {
			return true;
		}
	}
	return false;
}

/**
 * Resolve an SCF image field to its alt text.
 *
 * The source encodes real content in the media layer's aria-label; every
 * image field is paired so the editor supplies both the photo and its
 * description. Falls back to the attachment's own alt, then ''.
 *
 * @param mixed  $image        SCF image value.
 * @param string $alt_override Explicit alt from a paired text field.
 * @return string
 */
function px_image_alt( $image, $alt_override = '' ) {
	if ( '' !== $alt_override && null !== $alt_override ) {
		return $alt_override;
	}
	if ( is_array( $image ) && ! empty( $image['alt'] ) ) {
		return $image['alt'];
	}
	if ( is_numeric( $image ) ) {
		$alt = get_post_meta( (int) $image, '_wp_attachment_image_alt', true );
		return $alt ? $alt : '';
	}
	return '';
}
