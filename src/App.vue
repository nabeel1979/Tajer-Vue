<template>
  <NavBar v-if="!$route.meta.hideNavBar"/>
  <router-view/>
</template>

<script>
import NavBar from './components/NavBar.vue';
export default {
  name: 'App',
  components: {
    NavBar,
  },
  data() {
    return {
      
    }
  },
  computed: {
    shouldShowNavBar() {
      return !this.$route.meta.hideNavBar;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.toast-content{
  font-weight: 900;
}
</style>
