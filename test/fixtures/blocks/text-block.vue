<template>
  <div>
    Text Block
    <br>
    {{ text }}
  </div>
</template>

<script>
  export default {
    name: 'TextBlock',
    props: {
      text: {
        type: String,
        default: '',
      },
    },
  }
</script>
