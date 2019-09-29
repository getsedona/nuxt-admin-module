<template>
  <header class="scene  header">
    <div class="header__wrap">
      <div class="header__list">
        <div class="header__fold">
          <ul class="header__menu">
            <li>
              <nuxt-link :to="{ path: '/', query: { loggedIn } }">
                Example Site
              </nuxt-link>
            </li>
          </ul>
        </div>

        <div class="header__collapse">
          <nav class="header__nav">
            <ul class="header__menu">
              <li>
                <nuxt-link :to="{ path: '/blog', query: { loggedIn } }">
                  Blog
                </nuxt-link>
              </li>
              <li>
                <nuxt-link :to="{ path: '/contact', query: { loggedIn } }">
                  Contacts
                </nuxt-link>
              </li>
              <li v-if="loggedIn">
                <a
                  href="#"
                  @click.prevent="logOut"
                >
                  Logout
                </a>
              </li>
              <li v-if="!loggedIn">
                <a
                  href="#"
                  @click.prevent="login"
                >
                  Login
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'TheHeader',
    computed: {
      ...mapState('auth', ['loggedIn']),
    },
    methods: {
      async login() {
        await this.$store.dispatch('auth/login')
        location.reload()
        // await this.$adminLoader.load()
      },
      async logOut() {
        await this.$store.dispatch('auth/logOut')
        await this.$store.dispatch('admin/unload')
      },
    },
  }
</script>
