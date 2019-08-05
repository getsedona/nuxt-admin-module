<template>
  <div>
    Text block says: {{ text }}
  </div>
</template>

<script>
  import { blockMixin } from '../../..'

  export const meta = {
    title: 'Text',
    description: 'Block for rendering text',
    props: {
      text: {
        type: 'text',
      },
    },
  }

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
