# OZGamingRigs

Responsive storefront demo for custom gaming PCs, components, peripherals, and gaming-room gear.

## Run locally

```sh
npm install
npm run dev
```

Create a production bundle with `npm run build`, then preview it with `npm run preview`.

## Included

- Dark industrial-tech storefront with an 11-department mega-menu, search suggestions, filters, sorting, and a 221-item mock catalog. Product image URLs are stored per product in the catalog data.
- Product detail overlays, saved items, up-to-four product comparisons, and a persistent cart.
- PC builder with socket, memory-generation, and GPU-clearance checks; estimated power draw, PSU headroom warnings, and resolution-based FPS estimates.
- Performance Lab benchmarks and tuning guides, plus customer and store-admin dashboard views.
- Currency display options and localStorage persistence for cart, wishlist, comparison tray, builder, and currency.

## Demo data and integrations

Catalog, benchmark, account, order, and admin data are local mock data. Checkout, authentication, payment processing, fulfillment, inventory writes, live exchange rates, and warranty services are not connected; integrate those with the store's production APIs before launch. The exchange rates are illustrative display conversions, not live financial rates.

Refresh product image mappings from Wikimedia Commons (requires network access):

```sh
node scripts/fetch-product-images.mjs
```

The script writes only unique image URLs that pass its format and HTTP checks, and stops without changing the map if any product lookup is unresolved.
