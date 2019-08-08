<template>
  <div>
    <editable-zone
      :value="[{text: 'asd'}]"
    />
    <editor-content
      class="edit"
      :editor="editor"
    />
  </div>
</template>

<script>
  import { Editor, EditorContent } from 'tiptap'
  import { blockMixin, EditableZone } from '../../..'

  export const meta = {
    title: 'Teaser block',
    description: 'Teaser block',
    group: 'images',
    icon: 'image',
  }

  export default {
    name: 'TeaserBlock',
    components: {
      EditorContent,
      EditableZone,
    },
    mixins: [blockMixin],
    data() {
      return {
        editor: null,
      }
    },
    mounted() {
      this.editor = new Editor({
        content: '<p>This is just a boring paragraph</p>',
        useBuiltInExtensions: true,
      })
    },
  }
</script>
