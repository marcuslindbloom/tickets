# tickets

Support desk ticket #4471 ("dates parse mm/dd in eu locales", 412 reports) split into one ticket per problem:

| issue | problem | reports |
|---|---|---|
| [#1](https://github.com/marcuslindbloom/tickets/issues/1) | date parser reads day-first dates month first | 374 |
| [#2](https://github.com/marcuslindbloom/tickets/issues/2) | booking-v3 form hint says MM/DD/YYYY to day-first tenants | 33 |
| [#3](https://github.com/marcuslindbloom/tickets/issues/3) | invite dates move by one day (time zone) | 5 |

## The kb page

- Source: [`kb/src/routes/kb/incidents/4471-split/+page.svx`](kb/src/routes/kb/incidents/4471-split/+page.svx), with its logic in [`kb/src/lib/kb/problems.ts`](kb/src/lib/kb/problems.ts) and [`kb/src/lib/kb/ProblemTable.svelte`](kb/src/lib/kb/ProblemTable.svelte).
- As the desk sees it: [`rendered/kb/incidents/4471-split.html`](rendered/kb/incidents/4471-split.html) (static build of the whole kb) and [`rendered/4471-split.jpg`](rendered/4471-split.jpg).

`kb/` is the support desk's kb export plus a SvelteKit + mdsvex build setup. Build: `cd kb && npm ci && npx vite build`.
