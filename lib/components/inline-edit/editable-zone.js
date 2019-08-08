import Vue from 'vue'
import { Editor, EditorContent } from 'tiptap'

import './index.css'

export default Vue.extend({
  name: 'EditableZone',
  components: {
    EditorContent,
  },
  props: {
    value: {
      type: [Array, String],
      required: true,
    },
    tag: {
      type: String,
      default: 'div',
    },
  },
  data() {
    return {
      editor: null,
    }
  },
  computed: {
    field() {
      if (typeof this.value === 'string') {
        return JSON.parse(this.value)
      }
      return this.value
    },
  },
  mounted() {
    this.editor = new Editor({
      content: '<p>This is just a boring paragraph</p>',
    })
  },
  render(h) {
    return h('div', { props: { editor: this.editor } })
  },
})
