<template>
  <div class="base-avatar-wrapper">
    <div :class="classes">
      <img v-if="image" :src="imageUrl" class="base-avatar__image">
      <BaseIcon v-else name="avatar-default" :size="size" class="base-avatar__image--default"/>
    </div>
    <div v-if="edit" class="control-edit">
      <base-file-uploader @change="uploadHandler">
        <BaseBtn after-icon="upload" dense class="control-edit__btn" />
      </base-file-uploader>
      <BaseBtn after-icon="delete" dense class="control-edit__btn" @click="removeHandler" />
    </div>
  </div>
</template>

<script>
import BaseIcon from "@/components/UI/BaseIcon";
import BaseFileUploader from "@/components/UI/BaseFileUploader";
import BaseBtn from "@/components/UI/BaseBtn";
export default {
  name: "BaseAvatar",
  components: {BaseBtn, BaseFileUploader, BaseIcon},
  props: {
    image: {
      type: [Object, String, null],
      default: null
    },
    size: {
      type: Number,
      default: 160
    },
    edit: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    imageUrl() {
      if (typeof this.image === 'string' || !this.image) return this.image
      return this.image.url
    },
    classes() {
      const classes = ['base-avatar'];
      if(this.edit) classes.push('base-avatar--edit')
      return classes;
    },
    formattedSize() {
      return `${this.size}px`
    },
  },
  methods: {
    uploadHandler(file) {
      this.$emit('upload', file)
    },
    removeHandler() {
      this.$emit('remove')
    }
  },
}
</script>

<style lang="scss" scoped>
$size: v-bind(formattedSize);
.base-avatar-wrapper {
  border: 2px solid $teal-darken-1;
  width: fit-content;
  min-width: fit-content;
  border-radius: 50%;
  overflow: hidden;
  position: relative;

}
.control-edit {
  position: absolute;
  top: calc(50% - 13px);
  left: calc(50% - 26px);
  display: flex;
  transition: all 0.2s;
  opacity: 0;

  &__btn {
    color: $teal-lighten-5;
    transition: all 0.2s;

    &:hover {
      color: $teal-darken-3;
      transition: all 0.2s;
    }
  }
}
.base-avatar {
  background-color: $teal-lighten-5;
  width: $size;
  height: $size;

  &__image {
    width: 100%;

    &--default {
      color: $teal-lighten-1;
    }
  }
  &--edit::before {
    content: '';
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    position: absolute;
    background-color: initial;
    transition: all 0.2s;
  }
}
.base-avatar-wrapper:hover .control-edit {
  transition: all 0.2s;
  opacity: 1;
}
.base-avatar-wrapper:hover .base-avatar--edit::before {
  background-color: rgba(171, 171, 171, 0.4);
  transition: all 0.2s;
}
</style>