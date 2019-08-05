# Nuxt Admin Module

## Work in progress. Do not use in production

## Events

Is used global event bus `this.$admin`

 * `this.$admin.$emit('admin:view-change', MenuItem | string)` – change view. Provide menu item object or menu id

## Blocks

### Defaults

* `~/components/blocks` – directory for blocks. Subdirectories not supported yet

### Create a new block

A block is a vue component (vue or js file).

1. Create vue component in the blocks folder
2. Add `blockMixin` to block (required)
3. Add export const `meta` object. Is used for admin panel (optional) – see interface `BlockMeta`
