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
    props: {
      variant: {
        type: 'radio-group',
        label: 'Variants',
        options: [
          'red',
          'blue',
          { label: 'Green variant', value: 'green' },
        ],
      },
    },
  }

  export default {
    name: 'TeaserBlock',
    mixins: [blockMixin],
    props: {
      variant: {
        type: String,
        default: 'red',
      },
    },
  }
</script>
