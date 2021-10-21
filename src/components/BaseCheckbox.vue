<template>
  <div class="inline-flex items-center">
    <input
      :id="id"
      type="checkbox"
      class="rounded w-5 h-5 border-grey-200 text-red-600 focus:ring-red-400"
      :checked="modelValue"
      :required="isRequeired"
      :aria-required="isRequeired"
      :aria-invalid="isInvalid"
      v-bind="describedBy"
      @input="handleChange"
    /><label
      :for="id"
      class="ml-2 block uppercase tracking-wide text-gray-700 text-xs font-bold"
      >      <span v-if="!labelHidden"> {{ labelText }}</span>
</label
    >
    <base-alert       
      v-if="errors.length"
      :id="`alert-${id}`"
      :messages="errors"
      role="alert"
      status="danger">
    </base-alert>
  </div>
</template>

<script lang="ts">
import BaseAlert from "@/components/BaseAlert.vue";
import { defineComponent, computed } from "vue";

function getValue(event: Event): boolean | undefined {
  const checked = (event.target as HTMLInputElement).checked;
  return checked;
}

export default defineComponent({
  components: {
    BaseAlert,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    labelText: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Boolean,
      required: true,
    },
    errors: {
      type: Array,
      default: (): Array<unknown> => [],
    },
    isRequeired: {
      type: Boolean,
      default: false,
    },
    isInvalid: {
      type: Boolean,
      default: false,
    },
    labelHidden: { type: Boolean, default: () => false },
  },
  emits: ["update:modelValue"],
    setup(props, { emit }) {
    const describedBy = computed(() => {
      return props.isInvalid ? { ariaDescribedby: `alert-${props.id}` } : {};
    });
    return {
      describedBy,
      handleChange(event: Event): void {
        const checked = getValue(event);
        emit("update:modelValue", checked);
      },
    };
  },
});
</script>
