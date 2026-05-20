# HCP Terraform/TFC UI Reference Integration

Use this reference when a request needs grounding in existing HCP Terraform UI structure, navigation, and page patterns.

This is optional Terraform-specific context. It is not required for unrelated products, and it should not be used as their navigation model. For another app, crawl or capture that app and create an app-specific UI reference with the same kind of route, zone, clickable-element, and ASCII page-map detail.

## Local path

`reference/hcp-tf-ui-for-agents/`

Setup clones or updates this repo automatically.

If missing, run:

```bash
./setup.sh
```

or:

```bash
just hcp-ui-ref-sync
```

## Recommended loading order

1. `reference/hcp-tf-ui-for-agents/quick-reference.md`
2. `reference/hcp-tf-ui-for-agents/pages/_index.md` (for global navigation context)
3. Specific page docs in `reference/hcp-tf-ui-for-agents/pages/*.md`

## What to extract

- Route patterns (`/app/{org}/...`)
- Layout zones and extents
- Existing UI patterns and controls
- Click/navigation relationships
- Extensibility notes for feature placement

## Good prompt examples

- `Use the HCP Terraform UI reference to map where workspace drift and validation live.`
- `Based on the HCP Terraform pages, where should a new run-risk summary card go?`
- `Compare the runs list and run detail page zones before proposing a new status control.`

## Playwright capture relationship

Use `help ui capture` for live-page capture workflows.

`dev-browser` provides browser automation and is Playwright-based. It is for capturing live UI state. The HCP Terraform UI reference docs are for fast static grounding.
