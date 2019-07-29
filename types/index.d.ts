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
