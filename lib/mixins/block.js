export default {
  props: {
    type: String,
    required: true,
  },
  computed: {
    route() {
      return this.$route.fullPath
    },
  },
}
