<template>
  <div class="app-layout">
    <BaseLoading :loading="loading" />
    <main class="app-layout__content">
      <router-view/>
    </main>
  </div>
</template>

<script>
import BaseLoading from "@/components/UI/BaseLoadig";
import {mapGetters} from "vuex";
export default {
  name: "EmptyLayout",
  components: {BaseLoading},
  computed: {
    ...mapGetters({
      loading: "loading"
    })
  }
}
</script>

<style lang="scss" scoped>
.app-layout {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;

  &__content {
    padding: 0 calc(50% - 520px);
  }
}
</style>