<template>
  <div id="app">
    <b-navbar type="dark" variant="dark" v-if="$auth.check()">
      <b-navbar-brand href="#">Door-Monit</b-navbar-brand>

      <b-navbar-nav>
        <b-nav-item :to="{name: 'DevicesIndex'}">Dispositivos</b-nav-item>
        <b-nav-item :to="{name: 'MeasurementsIndex'}">Medições</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
    <div class="container" v-if="$auth.ready()">
      <router-view class="router-view"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
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
