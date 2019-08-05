<template>
  <div>
    Teaser block
  </div>
</template>

<script>
  import { blockMixin } from '../../..'

  export const meta = {
    title: 'Teaser block',
    description: 'Teaser block',
    group: 'images',
    icon: 'image',
  }

  export default {
    name: 'TeaserBlock',
    mixins: [blockMixin],
  }
</script>
