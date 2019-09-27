<template>
  <div>
    Teaser block
    <br>
    <b>Caption:</b> {{ caption }}
    <br>
    <b>Variant:</b> {{ variant }}
  </div>
</template>

<script>
  import { blockMixin } from '@getsedona/nuxt-admin-module/lib/mixins'

  export default {
    name: 'TeaserBlock',
    mixins: [blockMixin],
    props: {
      caption: {
        type: String,
        default: '',
      },
      variant: {
        type: String,
        default: 'red',
      },
    },
  }
</script>

<block>
{
  "title": "Teaser block",
  "description": "Teaser block",
  "icon": "image",
  "props": {
    "caption": {
      "type": "text",
      "default": "default text"
    },
    "variant": {
      "type": "radio-group",
      "label": "Variants",
      "default": "red",
      "options": [
        "red",
        "blue",
        { "label": "Green variant", "value": "green" }
      ]
    }
  }
}
</block>
