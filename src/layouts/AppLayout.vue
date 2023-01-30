<template>
  <div class="app-layout">
    <BaseLoading :loading="loading"/>
    <main class="app-layout__content">
      <router-view/>
    </main>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import BaseLoading from "@/components/UI/BaseLoadig";

export default {
  name: "AppLayout",
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
  min-height: 100vh;

  &__content {
    padding: 0 calc(50% - 410px);
    margin: 0 8px;
  }
}
@media (min-width: 450px) {
  .app-layout__content {
    margin: 0 40px;
  }
  .app-layout__header {
    margin: 0 40px;
  }
}

</style>