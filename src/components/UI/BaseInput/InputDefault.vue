<template>
  <div :class="classes">
    <span
        v-if="error && errorText"
        class="input-default__error-text"
        v-text="errorText"
    />
    <div class="input-default__slot slot-before">
      <slot name="before" :focus="focus" @click="focusHandler">
        <BaseIcon
            v-if="beforeIcon"
            class="slot-before__icon"
            :name="beforeIcon"
            @click="clickHandler"
        />
      </slot>
    </div>
   <input
       v-model="modelValue"
       :id="id"
       class="input-default__control"
       :placeholder="placeholder"
       :readonly="readonly"
       :disabled="disabled"
       :type="type"
       @focus="focusHandler"
       @blur="blurHandler"
       @change="changeHandler"
       :autocomplete="autocomplete"
   >
    <div class="input-default__slot slot-after">
      <slot name="after" :focus="focus">
        <BaseIcon
            v-if="afterIcon"
            class="slot-after__icon"
            :name="afterIcon"
        />
      </slot>
    </div>
  </div>
</template>

<script>
import BaseIcon from "@/components/UI/BaseIcon";
export default {
  name: "InputDefault",
  components: {BaseIcon},
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    id: {
      type: [String, Number],
      required: false
    },
    type: {
      type: String,
      default: 'text'
    },
    beforeIcon: {
      type: String,
      required: false
    },
    afterIcon: {
      type: String,
      required: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      required: false
    },
    readonly: {
      type: Boolean,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false
    },
    autocomplete: {
      type: String,
      required: false
    },
    border: {
      type: Boolean,
      required: true
    },
    error: {
      type: Boolean,
      default: false
    },
    errorText: {
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
    classes() {
      const classes = ['input-default'];
      if(this.focus) {
        classes.push('input-default--focus')
      }
      if(this.disabled) {
        classes.push('input-default--disabled')
      }
      if(this.border) {
        classes.push('input-default--border')
      }
      if(this.error) {
        classes.push('input-default--error')
      }
      return classes;
    },
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
    focusHandler(event) {
      this.focus = true
      this.$emit('focus', event)
    },
    blurHandler(event) {
      this.focus = false
      this.$emit('blur', event)
    },
    changeHandler(event) {
      this.$emit('change', event)
    },
    clickHandler(event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang="scss" scoped>
.input-default {
  height: 52px;
  display: flex;
  align-items: center;
  width: 100%;
  color: $blue-grey-lighten-3;
  border-radius: 10px;
  position: relative;
  transition: background-color 0.2s;

  &--border {
    border: 1px solid $blue-grey-lighten-3;
  }

  &--error {
    border-color: $error-red;
  }

  &--disabled {
    background-color: $blue-grey-lighten-5;
  }

  &--focus {
    border-color: $teal-darken-2;
    color: $blue-grey-darken-4;
    background-color: $teal-lighten-5;
    transition: background-color 0.2s;
  }
  &--focus .input-default__slot {
    color: $teal-darken-2;
  }

  &__error-text {
    position: absolute;
    top: 50px;
    left: 0;
    color: $error-red;
    font-size: 14px;
  }

  &__control {
    margin: 0 14px;
    outline: none;
    border: none;
    height: 100%;
    background-color: rgba(0, 0, 0, 0) !important;
    font-size: 18px;
    width: 100%;
    color: $blue-grey-darken-2;
    transition: background-color 0.2s;

  }
}

.slot-after__icon {
  margin-right: 14px;
}
.slot-before__icon {
  margin-left: 14px;
}
::placeholder {
  color: $blue-grey-lighten-4;
  font-size: 16px;
}
.input-default__control:-webkit-autofill {
  transition: background-color 5000s ease-in-out 0s;
}
</style>