<template>
  <base-button
    :status="status"
    :outline="outline"
    :size="size"
    @click.prevent="click"
    :disabled="loading"
  >
    <div v-if="loading" class="flex justify-center items-center">
      <div class="flex justify-center items-center"><spinner></spinner></div>
    </div>
    <slot v-else />
  </base-button>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import Spinner from "@/components/Spinner.vue";
import { delay } from "../utils/delay";

export default defineComponent({
  components: {
    BaseButton,
    Spinner,
  },
  props: {
    onClick: { type: Function, required: true },
    status: { type: String, default: () => "primary" },
    outline: { type: Boolean, default: () => false },
    size: { type: String, default: () => "medium" },
    element: { type: String, default: () => "button" },
  },
  setup(props) {
    const loading = ref(false);
    return {
      loading,
      async click() {
        try {
          loading.value = true;
          await props.onClick();
          await delay(1200);
        } finally {
          loading.value = false;
        }
      },
    };
  },
});
</script>