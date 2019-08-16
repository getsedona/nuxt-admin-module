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
      caption: {
        type: 'text',
        default: 'default text',
      },
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
