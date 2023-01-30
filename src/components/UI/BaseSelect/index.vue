<template>
  <div ref="baseSelect" class="base-select" @click="switchOptions" v-click-away="clickAwayHandler">
    <div>
      <BaseInput
          v-model="searchValue"
          :label="label"
          :required="required"
          :placeholder="placeholder"
          :border="border"
          :before-icon="beforeIcon"
          :after-icon="afterIcon"
          class="base-select__search"
          @focus="resetSearchValue"
          @click="switchOptions"
      />
      <ul v-if="isShow" class="base-select__options-list">
        <li
            v-for="option in filteredOptions"
            v-text="option.label"
            class="base-select__options-list__option"
            @click="selectOption(option)"
        />
      </ul>
    </div>
    <div v-if="multiple" class="base-select__selected-options" @click.stop>
      <BaseTag
          v-for="option in selectedOptions"
          :key="option.value"
          :label="option.label"
          @close="removeOption(option)"
      />
    </div>
  </div>
</template>

<script>
import BaseInput from "@/components/UI/BaseInput";
import BaseTag from "@/components/UI/BaseTag";
export default {
  name: 'BaseSelect',
  components: {BaseTag, BaseInput},
  props: {
    options: {
      type: Array,
      required: true
    },
    value: {
      type: [Array, Number, String],
      required: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
      required: false
    },
    placeholder: {
      type: String,
      required: false
    },
    required: {
      type: Boolean,
      required: false
    },
    border: {
      type: Boolean,
      default: true
    },
    beforeIcon: {
      type: String,
      required: false
    },
    afterIcon: {
      type: String,
      required: false
    },
  },
  data() {
    return {
      selectedOptions: this.multiple ? this.options.filter(option => this.value.includes(option.value)) : [this.options.find(option => option.value === this.value)],
      showOptions: false,
      searchValue: null
    }
  },
  computed: {
    filteredOptions() {
      if(!this.searchValue) return this.options
      return this.options.filter(option => option.label.toLowerCase().includes(this.searchValue.toLowerCase()) && option.label !== this.searchValue)
    },
    isShow() {
      return this.showOptions && this.filteredOptions.length
    }
  },
  methods: {
    resetSearchValue() {
      this.searchValue = ''
    },
    clickAwayHandler() {
      if(!this.showOptions) return
      if(!this.multiple) this.searchValue = Array.isArray(this.value) ?  this.value[0] : this.value
      this.showOptions = false
    },
    switchOptions() {
      this.showOptions = !this.showOptions
    },
    selectOption(option) {
      if (!this.multiple) {
        this.selectedOptions = [option];
        this.searchValue = option.value;
        // this.$emit('input', option.value);
        this.inputHandler(option.value)
        return;
      }
      if (!this.isSelected(option)) this.selectedOptions.push(option);
      this.inputHandler();
    },
    removeOption(option) {
      this.selectedOptions = this.selectedOptions.filter(selectedOption => selectedOption.value !== option.value);
      this.inputHandler();
    },
    inputHandler(option) {
      const options = option || this.selectedOptions.map(selectedOption => selectedOption.value)
      this.$emit('input', options);
    },
    isSelected(option) {
      return this.selectedOptions.find(selectedOption => selectedOption.value === option.value);
    }
  },
  watch: {
    value(value) {
      this.searchValue = this.multiple ? '' : String(value);
    }
  }
}
</script>


<style lang="scss" scoped>
.base-select {
  cursor: pointer;
  position: relative;

  &__options-list {
    list-style: none;
    position: absolute;
    background-color: white;
    width: 100%;
    font-size: 18px;
    border: 1px solid $teal-darken-2;
    border-top: none;
    border-radius: 10px;
    z-index: 99;
    text-align: left;
    overflow-y: auto;
    max-height: 200px;
    min-width: 200px;

    &::-webkit-scrollbar {
      width: 0;
    }

    &__option {
      padding: 5px 20px;

      &:hover {
        background-color: $teal-lighten-5;
      }
    }
  }

  &__selected-options {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-top: 5px;
    cursor: default;
  }
}
</style>
