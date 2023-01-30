<template>
  <div class="about">
    <ProfileForm v-if="user" :user="user" />
  </div>
</template>
<script>
import ProfileForm from "@/components/Forms/ProfileForm";
import {mapGetters, mapMutations} from "vuex";
import {getProfile} from "@/api";
export default {
  components: {ProfileForm},
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
    this.loadingOn();
    const data = await getProfile(this.userUid);
    this.saveUser(data.profile);
    this.saveKey(data.key);
    this.loadingOff();
  }
}
</script>