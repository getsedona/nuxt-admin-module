<template>
  <div>
    Image block
  </div>
</template>

<script>
  import { blockMixin } from '@getsedona/nuxt-admin-module/lib/mixins'

  export default {
    name: 'ImageBlock',
    mixins: [blockMixin],
  }
</script>

<block>
{
  "title": "Image",
  "description": "Image block",
  "group": "images",
  "icon": "image"
}
</block>
