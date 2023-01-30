<template>
  <label class="base-date-picker">
    <span
        v-if="required"
        class="base-date-picker__required"
        v-text="`*`"/>
    <span
        v-if="label"
        class="base-date-picker__label"
        v-text="label"
    />
    <div class="base-date-picker__input" :class="{'base-date-picker__input--focus': focus}">
      <input
          v-model="modelValue"
          ref="datepicker"
          type="date"
          class="base-date-picker__input__field"
          @focus="focus=true"
          @blur="focus=false"
      >
      <BaseBtn after-icon="calendar" class="base-date-picker__input__btn" @click="showPicker" />
    </div>
  </label>
</template>

<script>
import BaseBtn from "@/components/UI/BaseBtn";
import BaseIcon from "@/components/UI/BaseIcon";
export default {
  name: "BaseDatePicker",
  components: {BaseIcon, BaseBtn},
  props: {
    value: {
      type: [String, Number, null],
      default: null
    },
    required: {
      type: Boolean,
      required: false
    },
    label: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      focus: false
    }
  },
  computed: {
    modelValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    showPicker() {
      const control = this.$refs.datepicker;
      control.showPicker()
    },
  }
}
</script>

<style lang="scss" scoped>

.base-date-picker {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  font-size: 18px;

  &__required {
    color: #ed161f;
    margin-right: 5px;
    line-height: 22px;
  }

  &__label {
    font-size: 16px;
    line-height: 22px;
    font-weight: bold;
    color: $teal-darken-3;
  }

  &__input {
    height: 52px;
    width: 100%;
    border: 1px solid $blue-grey-lighten-3;
    border-radius: 10px;
    display: flex;
    align-items: center;
    transition: all 0.2s;

    &--focus {
      border-color: $teal-darken-2;
      background-color: $teal-lighten-5;
      transition: all 0.2s;
    }

    &__field {
      width: 100%;
      margin: 0 14px;
      height: 100%;
      cursor: text;
      color: $blue-grey-darken-2;

      &:focus +.base-date-picker__input__btn{
        color: $teal-darken-3;
        transition: all 0.2s;
      }

      &::-webkit-calendar-picker-indicator {
        display: none;
      }
    }

    &__btn {
      color: $blue-grey-lighten-3;
      margin: 0 14px 0 0;
      transition: all 0.2s;

      :hover {
        color: $teal-darken-3;
        transition: all 0.2s;
      }
    }
  }

  &__icon {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}

</style>