<template>
  <div class="profile-view">
    <Profile :user="user"/>
  </div>
</template>

<script>
import Profile from "@/components/Profile";
import {mapGetters, mapMutations} from "vuex";
import {getProfile} from "@/api";
export default {
  name: 'ProfileView',
  components: {Profile},
  computed: {
    ...mapGetters({
      user: "user",
      userUid: "userUid"
    })
  },
  methods: {
    ...mapMutations({
      saveUser: "saveUser",
      saveKey: "saveKey",
      loadingOn: "loadingOn",
      loadingOff: "loadingOff"
    })
  },
  async mounted() {
    this.loadingOn()
    const data = await getProfile(this.userUid);
    this.saveUser(data.profile);
    this.saveKey(data.key);
    this.loadingOff()
  }
}
</script>

<style lang="scss" scoped>
.profile-view {
  padding-top: 50px;
}
</style>