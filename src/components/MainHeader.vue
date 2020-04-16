<template>
  <b-navbar type="dark" variant="dark" v-if="$auth.check()">
    <b-navbar-brand href="#">Door-Monit</b-navbar-brand>

    <b-navbar-nav>
      <b-nav-item :to="{name: 'DevicesIndex'}">Dispositivos</b-nav-item>
      <b-nav-item :to="{name: 'MeasurementsIndex'}">Medições</b-nav-item>
    </b-navbar-nav>

    <b-navbar-nav class="ml-auto">
    <b-dropdown 
      id="user_dropdown" 
      :text="$auth.user().name" 
      class="m-md-2"
      right
    >
    <b-dropdown-item  @click="logout">Sair
      <font-awesome-icon icon="sign-out-alt" />
    </b-dropdown-item>
    </b-dropdown>

      <!-- <b-nav-item @click="logout">
        Sair
        <font-awesome-icon icon="sign-out-alt" />
      </b-nav-item> -->
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$auth.logout();
    }
  }
}
</script>