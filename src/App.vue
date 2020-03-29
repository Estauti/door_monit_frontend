<template>
  <div id="app">
    <MainHeader />
    <div class="container" v-if="$auth.ready()">
      <router-view class="router-view"/>
    </div>
  </div>
</template>

<script>
import MainHeader from '@/components/MainHeader'

export default {
  name: 'App',
  components: {
    MainHeader
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.router-view {
  margin-top: 30px;;
}
</style>
