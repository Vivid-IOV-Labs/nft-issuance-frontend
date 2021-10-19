<template>
  <div class="p-1">
    <label
      class="uppercase tracking-wide text-gray-700 text-xs font-bold mr-2"
      :for="name"
      >{{ label }}</label
    >
    <select
      :id="name"
      class="shadow-inner w-full text-gray-700 rounded py-3 px-4 mb-3 "
      @blur="handleChange"

    >
      <option
        v-for="choice in choices"
        :key="choice.label"
        :value="choice.value"
        :selected="choice.value == model"
        @blur="handleChange"
        @change="handleChange"
      >
        {{ choice.label }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
interface Choice {
  label: string;
  value?: string | number;
}
export default defineComponent({
  props: {
    choices: {
      type: Array as PropType<Choice[]>,
      default: () => [],
    },
    name: {
      type: String,
      default: () => "",
    },
    label: {
      type: String,
      default: () => "",
    },
    modelValue: {
      type: Object as PropType<Choice>,
      default: () => undefined,
    },
    asVal:{
      type:Boolean,
      default: () => false,
    },
    labelHidden:{
      type:Boolean,
      default: () => false,
    }
  },
  emits: { "update:modelValue": null },
  setup(props, { emit }) {
    return {
      model:(props.asVal) ? props.modelValue : props.modelValue?.value,
      handleChange(event: Event): void {
        const value = (event.target as HTMLSelectElement).value;
        if (value) {
          const selected = props.choices.find((choice: Choice) => {
            return choice.value == value;
          });
          if(props.asVal){
            emit("update:modelValue", selected?.value);
          } else {
            emit("update:modelValue", selected);
          }
        }
      },
    };
  },
});
</script>
