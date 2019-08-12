# Nuxt Admin Module

Admin Panel for Nuxt.js sites

## Work in progress. Do not use in production

## Features

* Hierarchical menu
* Data lists for content management
* Easy configurable forms
* Block editor
* Inline editor

## Requirements

* Nuxt.js :-)
* Vuex store

## Installation

```
npm i nuxt-admin-module@git+https://git@github.com/getsedona/nuxt-admin-module.git
```

## Setup

1. Register module in `nuxt.config.js`

```js
modules: ['nuxt-admin-module'],
```

2. Confire a menu

2. Add `AdminPanel` component to layout

```vue
<template>
...
  <template v-if="loaded">
    <no-ssr>
      <admin-panel />
    </no-ssr>
  </template>
...
</template>

<script>
  import { mapState } from 'vuex'
  import { AdminPanel } from 'nuxt-admin-module'

  export default {
    name: 'DefaultLayout',
    components: {
      AdminPanel,
    },
    computed: {
      ...mapState('admin', ['loaded']),
    },
  }
</script>
```

4. Add auth system. E.g. nuxt-auth

5. Add login action

```js
  methods: {
    async login() {
      // add here a method for login

      // load dependencies for admin panel (vuex modules, ui components and other)
      await this.$store.dispatch('admin/load')
    },
    async logOut() {
      // add here a method for logout

      // unregister vuex modules
      await this.$store.dispatch('admin/unload')
    },
  },
```

## Usage

## Settings

### Main toolbar

Main toolbar has two default buttons: Home button and Hide button. Their can be hiding via an admin config.

Example:

```json
{
  "showHome": true,
  "showHide": false,
}
```

There are adding custom buttons to panel.

Example:

```json
"buttons": [
  {
    "title": "SEO",
    "icon": "folder",
    "component": "components/post-seo"
  }
]
```


There are adding title after Home button and custom buttons.

Example:

```json
"toolbar": {
  "title": "Admin Panel"
},
```

Default config for toolbar:

```json
"toolbar": {
  "showHome": true,
  "showHide": false,
  "buttons": []
},
```

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
