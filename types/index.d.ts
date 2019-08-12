import Vue, { Component, ComponentOptions } from "vue";

export interface MenuItem {
  id?: string
  title?: string
  subTitle?: string
  component?: string | Component
  type?: 'item' | 'section'
  items?: MenuItem[]
  params?: any // dynamic props for compoennt
}

export type SchemaForm = Component

export interface Block {
  id?: string
  component?: string
}

export interface BlockProp {
  type?: string | 'text' | 'textarea'
  default?: any
}

export interface BlockMeta {
  title?: string
  description?: string
  icon?: string // default is 'extension'
  group?: string // default is 'general'
  props?: {
    [key: string]: BlockProp
  }
}

export interface FormField {
  label?: string
  name: string
}

export interface Admin {
  goHome: () => void,
  goTo: (item: MenuItem) => void,
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    block?: BlockMeta
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $admin: Admin
  }
}
