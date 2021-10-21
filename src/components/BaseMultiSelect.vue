<template>
  <div>
    <label
      class="uppercase w-full tracking-wide text-gray-700 text-xs font-bold mr-2"
      :for="id"
      ><span v-if="!labelHidden"> {{ labelText }}</span>
    <VueMultiselect
      :id="id"
      :model-value="modelValue"
      :options="tags"
      mode="tags"
      :multiple="true"
      :taggable="true"
      :aria-label="labelText"
      :required="isRequeired"
      :aria-required="isRequeired"
      :aria-invalid="isInvalid"
      aria-expanded="true"
      v-bind="describedBy"
      @tag="addTag"
      @update:model-value="$emit('update:modelValue', $event)"
    >
    </VueMultiselect>
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
import { defineComponent, ref, computed } from "vue";
import BaseAlert from "@/components/BaseAlert.vue";
import VueMultiselect from "vue-multiselect";

export default defineComponent({
  components: {
    VueMultiselect,
    BaseAlert,
  },
  props: {
    id: {
      type: String,
      default: () => "",
    },
    labelText: {
      type: String,
      default: () => "",
    },
    label: {
      type: String,
      default: () => "",
    },
    modelValue: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: () => "",
    },
    errors: {
      type: Array,
      default: (): Array<unknown> => [],
    },
    options: {
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
  emits: { "update:modelValue": null },
  setup(props, { emit }) {
    const tags = ref(props.options);
    const describedBy = computed(() => {
      return props.isInvalid ? { ariaDescribedby: `alert-${props.id}` } : {};
    });
    return {
      tags,
      describedBy,
      addTag(newTag: string) {
        tags.value.push(newTag);
        emit("update:modelValue", [...props.modelValue, newTag]);
      },
    };
  },
});
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
