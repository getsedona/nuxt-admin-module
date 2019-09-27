<template>
  <div>
    Feature B~lock
  </div>
</template>

<script>
  import { blockMixin } from '@getsedona/nuxt-admin-module/lib/mixins'

  export default {
    name: 'FeatureBlock',
    mixins: [blockMixin],
    props: {
      text: {
        type: String,
        default: 'AA',
      },
    },
  }
</script>
