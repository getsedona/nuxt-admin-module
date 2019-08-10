<template>
  <header class="scene  header">
    <div class="header__wrap">
      <div class="header__list">
        <div class="header__fold">
          <ul class="header__menu">
            <li>
              <nuxt-link to="/">
                Example Site
              </nuxt-link>
            </li>
          </ul>
        </div>

        <div class="header__collapse">
          <nav class="header__nav">
            <ul class="header__menu">
              <li>
                <nuxt-link to="/blog">
                  Blog
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/contact">
                  Contacts
                </nuxt-link>
              </li>
              <li>
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
  export default {
    name: 'TheHeader',
    methods: {
      login() {
        this.$store.commit('auth/SET_LOGGED')
      },
    },
  }
</script>
