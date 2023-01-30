<template>
  <label class="base-input" :for="id" >
    <span
        v-if="required"
        class="base-input__required"
        v-text="`*`"/>
    <span
        v-if="label"
        class="base-input__label"
        v-text="label"
    />
    <component
        :is="localType"
        :id="id"
        v-model="modelValue"
        :before-icon="beforeIcon"
        :after-icon="afterIcon"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :autocomplete="autocomplete"
        :border="border"
        :error="error"
        :error-text="errorText"
        @focus="focusHandler"
        @click="clickHandler"
    >
      <template v-slot:before>
        <slot name="before"/>
      </template>
      <template v-slot:after>
        <slot name="after"/>
      </template>
    </component>
  </label>
</template>

<script>
export default {
  name: "BaseInput",
  components: {
    inputPassword: () => import('./InputPassword.vue'),
    inputDefault: () => import('./InputDefault.vue'),
    inputPhone: () => import('./InputPhone.vue')
  },
  props: {
    value: {
      type: [String, Number, Object],
      default: ''
    },
    label: {
      type: String,
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
      id: Math.floor((Math.random() * Date.now()))
    }
  },
  computed: {
    localType() {
      switch (this.type) {
        case 'password':
          return 'inputPassword';
        case 'phone':
          return 'inputPhone';
        default:
          return 'inputDefault';
      }
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
      this.$emit('focus', event)
    },
    clickHandler(event) {
      this.$emit('click', event)
    }
  },
}
</script>


<style lang="scss" scoped>
.base-input {
  display: block;
  text-align: left;

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
}
</style>