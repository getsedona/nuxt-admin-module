<template>
  <div class="q-pa-xs">
    <admin-list
      :items="items"
      :columns="columns"
      :actions="actions"
      :hide-full-screen="false"
      :title-field-name="(item) => truncateBody(item.body)"
      subtitle-field-name="title"
      @item-click="onItemClick"
    />
  </div>
</template>

<script>
  import truncate from 'lodash/truncate'
  import { AdminList } from './../../..'

  export default {
    name: 'Posts',
    components: {
      AdminList,
    },
    data() {
      return {
        items: [],
        columns: [
          {
            label: 'Title',
            field: 'title',
            align: 'left',
          },
          {
            label: 'Text',
            field: 'body',
            align: 'left',
          },
        ],
        actions: [
          {
            title: 'Add',
            click: this.actionNew,
            icon: 'add',
          },
          {
            title: 'Save',
            icon: 'save',
          },
        ],
      }
    },
    async mounted() {
      this.items = await this.$axios.$get('https://jsonplaceholder.typicode.com/posts')
    },
    methods: {
      actionNew() {
        console.log('action new')
      },
      onItemClick(item) {
        console.log('item click', item)
      },
      truncateBody(body) {
        return truncate(body, { length: 40 })
      },
    },
  }
</script>
