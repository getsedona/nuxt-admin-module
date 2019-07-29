<template>
  <div>
    <admin-form
      :schema="schema"
      :data="data"
      @submit="submit"
      @reset="reset"
    />
  </div>
</template>

<script>
  import get from 'lodash/get'
  import { AdminForm } from '../../..'
  import PostFormSchema from './post.form.json'

  export default {
    name: 'PostView',
    components: {
      AdminForm,
    },
    props: {
      item: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        schema: PostFormSchema,
      }
    },
    computed: {
      data() {
        return {
          title: get(this.item, 'title', ''),
          body: get(this.item, 'body', ''),
        }
      },
    },
    methods: {
      submit() {
        console.log('submit')
      },
      reset() {
        console.log('reset')
      },
    },
  }
</script>
