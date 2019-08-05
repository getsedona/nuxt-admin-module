export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    route() {
      return this.$route.fullPath
    },
  },
}
