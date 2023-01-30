<template>
  <section class="profile-information" >
    <div v-if="formattedDob" class="profile-information__dob" >
      <span class="profile-information__dob__label profile-information-label">Дата рождения: </span>
      <span v-text="formattedDob" class="profile-information__dob__text profile-information-text" />
    </div>
    <div v-if="user.city" class="profile-information__city" >
      <span class="profile-information__city__label profile-information-label">Город: </span>
      <span v-text="user.city" class="profile-information__city__text profile-information-text" />
    </div>
    <div v-if="formattedLanguages" class="profile-information__languages" >
      <span class="profile-information__languages__label profile-information-label">Языки: </span>
      <span v-text="formattedLanguages" class="profile-information__languages__text profile-information-text" />
    </div>
    <div v-if="formattedPhone" class="profile-information__phone" >
      <span class="profile-information__phone__label profile-information-label">Номер телефона: </span>
      <span v-text="formattedPhone" class="profile-information__phone__text profile-information-text" />
    </div>
    <div v-if="user.email" class="profile-information__email" >
      <span class="profile-information__email__label profile-information-label">Адесс электронной почты: </span>
      <span v-text="user.email" class="profile-information__email__text profile-information-text" />
    </div>
  </section>
</template>

<script>
export default {
  name: "ProfileInformation",
  props: {
    user: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    formattedDob() {
      return this.user.dob.split('-').reverse().join('. ')
    },
    formattedLanguages() {
      const languages = this.user.languages
      if(!Array.isArray(languages)) return languages
      const formattedLanguages = languages.join(', ')
      return formattedLanguages
    },
    formattedPhone() {
      if(!this.user.phone) return null
      const {code, number } = this.user.phone
      return `${code} ${number}`
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-information {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 0 30px;
  text-align: left;
  font-family: 'Montserrat', sans-serif;

  &-label {
    font-weight: bold;
    color: $teal-darken-3;
  }
  &-text {
    color: $blue-grey-lighten-1;
  }

}
@media (min-width: 400px) {
  .profile-information {
    padding: 0 60px;
  }
}
</style>