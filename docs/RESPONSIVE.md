# Responsive layout validation

The responsive improvements take precedence over the original reference's
layout at smaller widths. Copy, brand artwork, desktop styling and animation
timings are retained.

## Improvements

- Narrow phone product panes have smaller outer padding. Checkout headers,
  barcode scanning, payment banners and cash-summary rows wrap instead of
  clipping. Empty barcode rows do not reserve space.
- Dashboard KPIs use one column on screens up to 360px. Mobile chart labels and
  bars use matching gaps to stay aligned and readable.
- Sinhala step titles can wrap long words. The story diagram keeps a readable
  minimum width on tablets and scrolls within its own region, as it already
  does on phones. Wide product tables also keep their local scroll wrappers.
- Promotional ad text has minimum readable font sizes on small phones, including
  footer and brand text. The stacked container-query layout remains in use.
- Language buttons, product tabs and ad controls have 44px minimum touch targets
  for coarse pointers. Compact navigation spacing supports narrow phones,
  including 280px foldable viewports, without shrinking the touch targets.
- The mobile menu is limited to the available viewport height and scrolls in
  landscape. It closes when resizing into desktop navigation, with its media
  listener removed on unmount.
- Buttons stay within their available width. The product window's decorative
  dots retain their size when its URL caption truncates.

## Checks performed

All five product tabs in EN and SI were checked at:

280, 320, 360, 390, 440, 480, 600, 640, 680, 768, 820, 880, 900, 960, 1024,
1060, 1280, 1440, 1920 and 2560 CSS pixels.

That is 200 width/language/tab combinations. No unexpected offscreen elements,
text overflow, navigation overlap or application console errors were detected.
The illustration, wide tables and decorative scanner beam are intentionally
contained by their own clipping or scrolling regions.

Touch-device emulation additionally covers 280x653, 320x568, 390x844, 844x390,
768x1024, 1024x1366 and 1366x1024, in both languages at device scale factor 2.
These checks exercise the actual pointer media queries, 44px controls, landscape
menu scrolling, scanner text, table panes and portrait-to-landscape menu reset.
The layout checks use reduced motion for stable measurements.

Local measurements and screenshots are retained in .qa/responsive/;
.qa/audit-responsive.mjs and .qa/responsive-devices.mjs reproduce these checks.

npm run build passes without warnings.
