<template>
  <div class="base-file-uploader">
    <input
        ref="fileUploader"
        type="file"
        @click.stop
        @change="selectFile"
        class="base-file-uploader__input"
    />
    <div v-if="$slots.default" class="" @click="inputClickHandler" >
      <slot />
    </div>
  </div>
</template>

<script>
import BaseBtn from "@/components/UI/BaseBtn";
export default {
  name: "BaseFileUploader",
  components: {BaseBtn},
  model: {
    prop: 'file',
    event: 'change'
  },
  props: {
    file: {
      type: [File, null],
      default: null
    }
  },
  methods: {
    inputClickHandler() {
      this.$refs.fileUploader.click()
    },
    selectFile(event) {
      const file = event.target.files[0]
      this.$refs.fileUploader.value = ''
      this.$emit('change', file)
    }
  }
}
</script>

<style lang="scss" scoped>
.base-file-uploader__input {
  display: none;
}
</style>