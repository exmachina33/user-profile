<template>
  <div v-if="loading" class="loading">
    <span class="loading__loader"></span>
  </div>
</template>

<script>
export default {
  name: 'BaseLoading',
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  width: 100%;
  z-index: 999999;
  height: 100vh;
  top: 0;

  &__loader {
    width: 48px;
    height: 48px;
    border: 5px solid $teal-darken-2;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
  }
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>