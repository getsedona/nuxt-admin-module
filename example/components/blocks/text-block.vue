<template>
  <div>
    Block
  </div>
</template>

<script>
  import { blockMixin } from '../../..'

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
