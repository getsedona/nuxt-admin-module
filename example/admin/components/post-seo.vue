<template>
  <div>
    <admin-form
      :schema="schema"
      @submit="submit"
    />
  </div>
</template>

<script>
  import { AdminForm } from '@getsedona/nuxt-admin-module/components'
  import SeoFormSchema from './seo.form.json'

  export default {
    name: 'PostSeo',
    components: {
      AdminForm,
    },
    data() {
      return {
        schema: SeoFormSchema,
      }
    },
    methods: {
      submit({ form }) {
        console.log(form)
      },
    },
  }
</script>
