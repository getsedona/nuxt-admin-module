<template>
  <div class="q-pa-xs">
    <admin-list
      :items="items"
      :columns="columns"
      :actions="actions"
      :hide-full-screen="false"
      :title-field-name="(item) => truncateBody(item.body)"
      subtitle-field-name="title"
      @item-click="itemClick"
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
        this.$admin.goTo({
          id: 'post-tools',
          title: 'Create new post',
          type: 'section',
          items: [
            {
              title: 'Regular Post',
              icon: 'add',
              component: 'components/post-view',
            },
            {
              title: 'News Post',
              icon: 'add',
              component: 'components/post-view',
            },
          ],
        })
      },
      itemClick(item) {
        this.$admin.goTo({ id: 'post-form', title: 'Post edit', component: 'components/post-view' }, { item })
      },
      truncateBody(body = '') {
        return truncate(body, { length: 40 })
      },
    },
  }
</script>
