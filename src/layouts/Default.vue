<template>
  <div class="layout">
    
    <header class="header">
      <div class="header__left">
        <Logo v-if="showLogo" />
      </div>
    </header>
    
    <slot/>

    <footer>
      <p class="text-small text-center">
        <a href="https://github.com/kissmygritts">GitHub</a> :: everything here is 
        <a href="https://unlicense.org/">Unlicensed</a>
      </p>
    </footer>
  
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import Logo from '~/components/Logo.vue'

export default {
  props: {
    showLogo: { default: true }
  },
  components: {
    Logo
  }
}
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 4em;
  padding: 0 2em;
  top: 0;
  z-index: 10;
}

.header__left {
  display: flex;
  align-items: center;
}

footer {
  color: var(--gray);
  margin: 3em auto 1em auto;
}
</style>
