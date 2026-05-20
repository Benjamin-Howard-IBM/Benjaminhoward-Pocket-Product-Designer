---
name: hashi-designer
description: Compatibility alias for product-designer. New work should use product-designer.
---

# hashi-designer compatibility alias

`hashi-designer` is retained for old prompts and existing muscle memory.

Route the request to `product-designer` and load:

- `skill/product-designer/SKILL.md`
- `skill/product-designer/resources/`

If the request is actually about method selection, route through `designer` or `design-method-finder` first. If it is about polished UI craft, route to external `impeccable` when installed.
