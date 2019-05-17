<template>
  <div class="full-width">
    <admin-menu />
  </div>
</template>

<script>
  import AdminMenu from './admin-menu'

  export default {
    name: 'AdminRouterView',
    components: {
      AdminMenu,
    },
  }
</script>
