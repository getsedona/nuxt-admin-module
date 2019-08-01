import Vue from 'vue'

export default Vue.extend({
  name: 'BlocksPaletteSearch',
  data() {
    return {
      search: '',
    }
  },
  methods: {
    focus() {
      this.$refs.input.focus()
    },
    clear() {
      this.search = ''
      this.$emit('change', '')
    },
  },
  render(h) {
    let clearBtn
    if (this.search !== '') {
      clearBtn = h('q-icon', {
        props: { name: 'close' },
        class: 'cursor-pointer',
        on: {
          click: this.clear,
        },
      })
    }

    return h('q-input', {
      ref: 'input',
      props: { filled: true, dark: true, label: 'Search', value: this.search },
      scopedSlots: { append: () => [...(clearBtn ? [clearBtn] : []), h('q-icon', { props: { name: 'search' } })] },
      on: {
        input: (value) => {
          this.search = value
          this.$emit('change', value.trim())
        },
      },
    })
  },
})
