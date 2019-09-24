<template>
  <div>
    Text block says: {{ text }}
  </div>
</template>

<script>
  import { blockMixin } from '@getsedona/nuxt-admin-module/mixins'

  export default {
    name: 'TextBlock',
    mixins: [blockMixin],
    props: {
      text: {
        type: String,
        default: '',
      },
    },
  }
</script>

<block>
{
  "title": "Text",
  "description": "Block for rendering text",
  "props": {
    "text": {
      "type": "text"
    },
    "isDark": {
      "type": "checkbox"
    }
  }
}
</block>
