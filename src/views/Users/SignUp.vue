<template>
  <div class="center-login-box">
    <div class="login-box">
      <b-card>
        <b-row class="mt-1">
          <b-col>
            <h2>Crie sua conta abaixo</h2>
          </b-col>
        </b-row>

        <b-row class="mt-4">
          <b-col>
            <b-form @submit.prevent="signUp" class="form-horizontal form-material">

              <b-form-group id="nameInputGroup" label-for="nameField">
                <b-form-input
                  id="nameField"
                  type="text"
                  v-model="user.name"
                  autocomplete="name"
                  required
                  placeholder="Digite seu nome"
                ></b-form-input>
              </b-form-group>

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

              <b-form-group id="passwordInputGroup" label-for="passwordField">
                <b-form-input
                  id="passwordField"
                  type="password"
                  v-model="user.password"
                  required
                  placeholder="Digite sua senha"
                ></b-form-input>
              </b-form-group>

              <b-form-group id="passwordConfirmationInputGroup" label-for="passwordConfirmationField">
                <b-form-input
                  id="passwordConfirmationField"
                  type="password"
                  v-model="user.password_confirmation"
                  required
                  placeholder="Confirme sua senha"
                ></b-form-input>
              </b-form-group>

              <b-form-group>
                <b-button
                  type="submit"
                  :disabled=allFieldsFilled()
                  variant="btn btn-block btn-lg btn-primary btn-rounded"
                >Registrar</b-button>
              </b-form-group>

                <b-row class="mt-1">
                  <b-col class="text-center">
                    Já tem uma conta? 
                  <b-link :to="{name: 'Login'}">Entrar</b-link>
                  </b-col>
                </b-row>
            </b-form>
          </b-col>
        </b-row>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      }
    };
  },
  methods: {
    signUp() {
      this.$auth.register({
        data: {user: this.user},
        success: function () {
          this.$toasted.success("Usuário criado com sucesso!")
        },
        error: (error) => {
          console.log(error);
        },
        autoLogin: true,
        rememberMe: true,
        redirect: {name: 'DevicesIndex'}
      });
    },
    allFieldsFilled() {
      if (this.user.name && 
          this.user.email && 
          this.user.password && 
          this.user.password_confirmation) {
        return false;
      } else {
        return true;
      }
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
  margin-top: 10vh;
}

</style>