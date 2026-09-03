# Dashboard

Frontend take-home task for Nevis.

## Running it

```bash
yarn install
yarn dev
```

Starts the API on `localhost:3001` and the client (Vite) on `localhost:5173`, proxying `/api`
to the server. `client/` and `server/` are separate yarn workspaces, but `yarn dev` at the root
runs both.

## Testing

```bash
cd client && yarn test:run
```

Covers expand/collapse (click, keyboard, and that collapsing a branch cascades to its
descendants), tree normalization on non-uniform data (branches with no employees, channels on
only one employee), and the tree to chart data mapping.

## Architecture

- **`Table` owns state, `TableRowTree` is a pure recursive renderer.** `Table` holds
  `expandedIds` and the toggle logic (including cascading a collapse to descendants).
  `TableRowTree` just renders whatever it's given.
- **One-directional data flow.** `App` fetches data, `normalizeTree` normalizes the raw
  `branches`/`employees`/`channels` shape into one uniform `ITreeNode`, everything downstream
  (table, chart) works off that single shape, regardless of which level it came from.
- **Chart is data-agnostic.** `buildChartData` (pure, tested) turns a tree node into recharts'
  shape, `getChannelTotals` is a separate, swappable selection step deciding which node the
  chart looks at. Swapping the chart's data source is a one-line change in `App.tsx`.

## Accessibility

The table isn't a native `<table>`. An arbitrarily deep, animated expand/collapse doesn't work with
real `<tr>` rows. It's built from `display: grid` containers instead, using `subgrid` recursively
so values stay aligned to the right month column at any depth. To compensate for losing native
table semantics, every container carries the matching ARIA role by hand (`table`, `rowgroup`,
`row`, `columnheader`/`rowheader`/`cell`).

`aria-expanded` communicates state; Enter/Space toggle from the keyboard
(`tabIndex={0}` + `onKeyDown`). Collapsed subtrees get the `inert` attribute, removing them from the
tab order and accessibility tree in one line.

**Missing:** depth is only conveyed visually (indentation), not via
`aria-level`/`aria-posinset`/`aria-setsize`. A `role="treegrid"` pattern would be the correct
long-term fix.

## Assumptions and calls I made

- **The chart can't match the reference design's channel breakdown.** The
  design stacks by acquisition channel with company-wide totals, but in this data, channel
  detail only exists for one employee (Anna Blackwood), no branch or the company itself has
  it. Producing a genuine company-wide channel split isn't possible without inventing numbers.
  The chart shows real channel data from whoever has it (`getChannelTotals`), which today means
  only Anna Blackwood's mix. I think the design and data model disagree here.
- **There's a data inconsistency.** Branch values for May 2024 for example sum to 279, but
  `company.values` says 301. I didn't rescale either side, that would mean showing numbers 
  not actually in the source data.
- **No state management library.** The data is a single fetch with no complex cross-component
  state, so a library like Zustand or Redux (both used in production before) would add
  indirection without solving a real problem here.
- **Wide table, horizontal scroll.** Below ~1100px, 12 months can't fit at a readable width,
  so the table scrolls inside its own card. Nothing overflows the page, but for smaller screens
  it's better to make a different design with cards for example.
- **Employees show an initial instead of a photo.** The data has no avatar/photo field for
  people, so `Avatar` falls back to the first letter of the name when no `imageUrl` is passed.
  The component already accepts a real `imageUrl` and renders it as an `<img>` when present.

## What I'd do next

- Move the table to `role="treegrid"` with `aria-level`/`aria-posinset`/`aria-setsize`.
- Style the loading/error states properly and wire up the `refetch` the data hook already
  exposes (currently plain text).
- Resolve the chart-vs-data mismatch with design: either chart by branch (always available
  company-wide) or get channel data plumbed through for everyone.
- Get data inconsistency fixed at the source.
- Build a proper adaptive layout for the table on narrow screens, e.g. a card-per-row view
  below some breakpoint. Right now scroll works and nothing breaks, but it's not a great mobile
  experience for a table this wide.