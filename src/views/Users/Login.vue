<template>
  <div class="center-login-box">
    <div class="login-box">
      <b-card>
        <div class="mb-4">
          <font-awesome-icon icon="door-open" size=4x />
        </div>

        <b-form @submit.prevent="login" class="form-horizontal form-material">

          <b-form-group id="emailInputGroup" label-for="emailField">
            <b-form-input
              id="emailField"
              type="email"
              v-model="user.email"
              autocomplete="email"
              required
              placeholder="Digite seu e-mail"
            ></b-form-input>
          </b-form-group>
          <b-form-group id="exampleInputGroup3" label-for="passwordField">
            <b-form-input
              id="passwordField"
              type="password"
              v-model="user.password"
              autocomplete="current-password"
              required
              placeholder="Digite sua senha"
            ></b-form-input>
          </b-form-group>

          <b-form-group>
            <b-button
              type="submit"
              variant="btn btn-block btn-lg btn-primary btn-rounded"
            >Entrar</b-button>
          </b-form-group>
        </b-form>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      this.$auth.login({
        params: this.user,
        success: function() {
          // this.$toasted.info(this.$t('user_login')).goAway(1500)
        },
        error: function() {
          this.$toasted.error("Ocorreu um erro").goAway(1500);
        },
        rememberMe: true
      });
    }
  }
};
</script>

<style>

.center-login-box {
  display: flex;
  justify-content: center;
  width: 100%;
}

.login-box {
  width: 40%;
  margin-top: 15vh;
}

</style>