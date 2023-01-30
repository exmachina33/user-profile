<template>
  <header class="profile-header" >
    <div class="profile-header__control">
      <BaseBtn after-icon="exit" dense class="profile-header__control__btn" @click="logout" />
    </div>
    <div class="profile-header__content">
      <BaseAvatar :image="user.avatar"/>
      <div class="profile-header__content__name-field">
        <span v-text="user.surname" class="profile-header__content__name__surname"/>
        <span v-text="user.name" class="profile-header__content__name-field__name"/>
        <span v-if="user.patronymic" v-text="user.patronymic" class="profile-header__content__name__patronymic"/>
      </div>
    </div>
  </header>
</template>

<script>
import BaseAvatar from "@/components/UI/BaseAvatar";
import BaseBtn from "@/components/UI/BaseBtn";
import {logoutUser} from "@/api";
import {mapMutations} from "vuex";
export default {
  name: "ProfileHeader",
  components: {BaseBtn, BaseAvatar},
  props: {
    user: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    ...mapMutations({
      clearUserData: "clearUserData",
      loadingOn: "loadingOn",
      loadingOff: "loadingOff"
    }),
    async logout() {
      this.loadingOn()
      await logoutUser()
      this.clearUserData()
      this.loadingOff()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.profile-header {
  border-top: 40px solid $teal-darken-3;

  &__control {
    display: flex;
    justify-content: flex-end;
    padding: 5px 20px;
    gap: 5px;

    &__btn:hover {
      color: $teal-darken-2;
    }
  }

  &__content{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px 20px 10px;
    font-family: 'Russo One', sans-serif;
    font-size: 20px;
    color: $blue-grey-darken-2;
    gap: 10px;

    &__name-field {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 10px;
      width: 100%;
      padding: 0 20px;
      text-transform: uppercase;
    }
  }
}
@media (min-width: 570px) {
  .profile-header__content {
    flex-direction: row;
    font-size: 24px;
    padding: 0 40px 20px 40px;
  }
}
</style>