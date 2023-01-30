<template>
  <div v-if="user" class="profile">
    <ProfileHeader :user="user" />
    <ProfileInformation :user="user" />
    <BaseBtn
        label="Редактировать"
        dense
        before-icon="edit"
        class="profile__edit-btn"
        @click="edit"
    />
  </div>
</template>

<script>
import ProfileHeader from "@/components/Profile/ProfileHeader";
import ProfileInformation from "@/components/Profile/ProfileInformation";
import BaseBtn from "@/components/UI/BaseBtn";
export default {
  name: "Profile",
  components: {BaseBtn, ProfileInformation, ProfileHeader},
  props: {
    user: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    edit() {
      this.$router.push('/change')
    }
  }
}
</script>

<style lang="scss" scoped>
.profile {
  font-family: 'Montserrat', sans-serif;

  &__edit-btn {
    margin: 10px 0 0 auto;
    font-size: 12px;

    &:hover {
      color: $teal-darken-3;
    }
  }
}
</style>