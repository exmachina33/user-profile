<template>
  <form class="auth-form" @submit.prevent="auth">
    <h1 class="auth-form__label" v-text="`Вход`"/>
    <BaseInput
        v-model="email"
        class="auth-form__input"
        label="Почта"
        type="text"
        placeholder="Введите логин"
        :error="emailError"
        :error-text="emailErrorText"
    />
    <BaseInput
        v-model="password"
        class="auth-form__input"
        label="Пароль"
        type="password"
        placeholder="Введите пароль"
        :error="passwordError"
        :error-text="passwordErrorText"
    />
    <article class="auth-form__article">Войдите или <router-link class="auth-form__article__link" to="/registration">зарегистрируйтесь</router-link></article>
    <BaseBtn
        class="auth-form__btn"
        color="primary"
        label="Войти"
    />
  </form>
</template>

<script>
import BaseInput from "@/components/UI/BaseInput";
import BaseIcon from "@/components/UI/BaseIcon";
import BaseBtn from "@/components/UI/BaseBtn";
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength } from '@vuelidate/validators';
import {loginUser} from "@/api";
import {mapMutations} from "vuex";

export default {
  name: "AuthForm",
  components: {BaseBtn, BaseIcon, BaseInput},
  data() {
    return {
      email: '',
      password: '',
      error: false
    }
  },
  setup () {
    return { v$: useVuelidate() }
  },
  validations() {
    return {
      email: { required, $autoDirty: true, email },
      password: { required, $autoDirty: true, minLength: minLength(6) }
    }
  },
  computed: {
    emailError() {
      if(!this.v$.email.$dirty) return false
      return this.v$.email.required.$invalid || this.v$.email.email.$invalid || this.error
    },
    passwordError() {
      if(!this.v$.password.$dirty) return false
      return this.v$.password.required.$invalid || this.v$.password.minLength.$invalid || this.error
    },
    emailErrorText() {
      switch (true) {
        case this.v$.email.required.$invalid:
          return 'Поле не должно быть пустым';
        case this.v$.email.email.$invalid:
          return 'Неверный email';
        case this.error:
          return 'Неверный email или пароль';
      }
    },
    passwordErrorText() {
      switch (true) {
        case this.v$.password.required.$invalid:
          return 'Поле не должно быть пустым';
        case this.v$.password.minLength.$invalid:
          return 'Пароль должен содержать минимум 6 символов';
        case this.error:
          return 'Неверный email или пароль';
      }
    }
  },
  methods: {
    ...mapMutations({
      saveUserUid: "saveUserUid",
      loadingOn: "loadingOn",
      loadingOff: "loadingOff"
    }),
    async auth() {
      this.loadingOn()
      const isFormCorrect = await this.v$.$validate()
      if (!isFormCorrect) {
        this.loadingOff();
        return;
      }
      const authUser = await loginUser({email: this.email, password: this.password})
      if (!authUser) {
        this.loadingOff()
        this.error = true
        return
      }
      this.saveUserUid(authUser.uid)
      this.loadingOff()
      this.$router.push('/')
    }
  },
  watch: {
    email() {
      this.error = false
    },
    password() {
      this.error = false
    },
  }
}
</script>

<style lang="scss" scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  max-width: 510px;
  padding: 60px 10px;
  margin: auto;
  font-family: 'Montserrat', sans-serif;
  color: $blue-grey-darken-2;

  &__label {
    font-size: 20px;
    letter-spacing: 0.1em;
    color: $blue-grey-darken-2;
    font-family: 'Russo One', sans-serif;
    text-transform: uppercase;
  }

  &__input {
    width: 100%;
  }

  &__article {
    font-size: 18px;

    &__link {
      color: $teal-darken-1;
    }
  }

  &__btn {
    width: 176px;
    margin-top: 15px;
  }
}
@media (min-width: 450px) {
  .auth-form {
    padding: 60px 88px;
  }
}
</style>