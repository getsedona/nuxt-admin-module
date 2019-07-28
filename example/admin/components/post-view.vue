<template>
  <div>
    <admin-form
      :schema="schema"
      @submit="submit"
      @reset="reset"
    />
  </div>
</template>

<script>
  import { AdminForm } from '../../..'
  import PostFormSchema from './post.form.json'

  export default {
    name: 'PostView',
    components: {
      AdminForm,
    },
    data() {
      return {
        schema: PostFormSchema,
      }
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
