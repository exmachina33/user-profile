<template>
  <div :class="classes">
    <span
        v-if="error && errorText"
        class="input-phone__error-text"
        v-text="errorText"
    />
    <BaseSelect v-model="code" :options="phoneCodes" :border="false" before-icon="arrow-bottom" class="input-phone__code"/>
    <div class="input-phone__slot slot-before">
      <slot name="before" :focus="focus">
        <BaseIcon
            v-if="beforeIcon"
            class="slot-before__icon"
            :name="beforeIcon"
        />
      </slot>
    </div>
    <input
        :id="id"
        ref="phone"
        v-model="modelValue"
        class="input-phone__control"
        :placeholder="placeholder"
        :readonly="readonly"
        :disabled="disabled"
        :type="type"
        @focus="focusHandler"
        @blur="blurHandler"
        @change="changeHandler"
        @keyup="keyupHandler"
        :autocomplete="autocomplete"
    >
    <div class="input-phone__slot slot-after">
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
import BaseSelect from "@/components/UI/BaseSelect";
import {phoneCodes} from "@/api/composables/phoneCodes";
import {languages} from "@/api/composables/lamguages";

export default {
  name: "InputPhone",
  components: {BaseSelect, BaseIcon},
  props: {
    value: {
      type: [String, Number, Object],
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
      default: true
    },
    error: {
      type: Boolean,
      required: false
    },
    errorText: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      focus: false,
      code: '',
      number: ''
    }
  },
  computed: {
    classes() {
      const classes = ['input-phone'];
      if(this.focus) {
        classes.push('input-phone--focus')
      }
      if(this.disabled) {
        classes.push('input-phone--disabled')
      }
      if(this.border) {
        classes.push('input-phone--border')
      }
      if(this.error) {
        classes.push('input-phone--error')
      }
      return classes;
    },
    phoneCodes() {
      return phoneCodes;
    },
    mask() {
      const phoneCode = this.phoneCodes.find(code => code.value === this.code)
      return phoneCode.mask
    },
    modelValue: {
      get() {
        return this.number
      },
      set(value) {
        this.number = value
        const phone = { code: this.code, number: value }
        this.$emit('input', phone)
      }
    }
  },
  methods: {
    validate(value) {
      const mask = this.mask || '(###)###-##-##' ;
      let dividedMask = mask.split(/[-()]/g).filter(Boolean);
      let maxNumber = 0;
      dividedMask.forEach(e => maxNumber += e.length);
      const numberValue =  value.replace(/\D/g, '').slice(0, maxNumber);
      let phoneVale = '';
      let passedMaskLength = 0;

      for(let i = 0; i < dividedMask.length; i++) {
        let prevPassedMaskLength = passedMaskLength;
        const maskPart = dividedMask[i];
        passedMaskLength += maskPart.length;

        for(let j = prevPassedMaskLength; j < passedMaskLength; j++) {
          if(j >= numberValue.length) break;
          if(i === 0 && j === 0) phoneVale += '(';
          if(i === 1 && j === prevPassedMaskLength) phoneVale += ') ';
          if(i > 1 && j === prevPassedMaskLength) phoneVale += '-';
          phoneVale += numberValue[j];
        }
      }
      return phoneVale
    },
    keyupHandler(event) {
      const phone = this.$refs.phone;
      phone.value = this.validate(this.number);
      phone.dispatchEvent(new Event('input'))
    },
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
    }
  },
  mounted() {
    if (this.value) {
      this.code = this.value.code;
      this.number = this.value.number;
    }
  },
  watch: {
    code() {
      this.keyupHandler()
    }
  }
}
</script>

<style lang="scss" scoped>
.input-phone {
  height: 52px;
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid $blue-grey-lighten-3;
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
  &--focus .input-phone__slot {
    color: $teal-darken-2;
  }

  &__error-text {
    position: absolute;
    top: 50px;
    left: 0;
    color: $error-red;
    font-size: 14px;
  }

  &__code {
    display: flex;
    width: fit-content;
    max-width: 115px;
  }

  &__control {
    margin: 0 14px 0 0;
    outline: none;
    border: none;
    height: 100%;
    background-color: rgba(0, 0, 0, 0) !important;
    font-size: 18px;
    width: 100%;
    color: $blue-grey-darken-2;
    transition: background-color 0.2s;;

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
.input-phone__control:-webkit-autofill {
  transition: background-color 5000s ease-in-out 0s;
}
</style>