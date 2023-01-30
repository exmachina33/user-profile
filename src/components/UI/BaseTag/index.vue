<template>
  <div class="base-tag">
    <span v-text="label" class="base-tag__label" />
    <BaseIcon name="close" :size="18" class="base-tag__btn" @click="closeHandler" />
  </div>
</template>

<script>
import BaseIcon from "@/components/UI/BaseIcon";
export default {
  name: "BaseTag",
  components: {BaseIcon},
  props: {
    label: {
      type: String,
      default: () => ({})
    }
  },
  methods: {
    closeHandler() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
$height: 30px;
.base-tag {
  background-color: $teal-lighten-2;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: $height;
  height: $height;

  &__btn {
    cursor: pointer;

    &:hover {
      color: $blue-grey-lighten-5;
    }
  }
}
</style>