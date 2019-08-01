<template>
  <div>
    Text block
    <br>
    {{ text }}
  </div>
</template>

<script>
  import { blockMixin } from '../../..'

  export const meta = {
    title: 'Text',
    description: 'Block for rendering text',
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
