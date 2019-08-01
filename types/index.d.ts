import { Component } from "vue";

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
  props?: any
}

export interface BlockMeta {
  title?: string
  description?: string
  icon?: string // default is 'extension'
  group?: string // default is 'general'
}
