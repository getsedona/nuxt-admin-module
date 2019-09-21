<template>
  <div>
    Image block
  </div>
</template>

<script>
  import { blockMixin } from '@getsedona/nuxt-admin-module/mixins'

  export const meta = {
    title: 'Image',
    description: 'Image block',
    group: 'images',
    icon: 'image',
  }

  export default {
    name: 'ImageBlock',
    mixins: [blockMixin],
  }
</script>
