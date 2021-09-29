<template>
  <button
    :class="{
      'bg-green-500 hover:bg-green-600': status == 'success',
      'bg-amber-500 hover:bg-amber-600': status == 'warning',
      'bg-red-500 hover:bg-red-600': status == 'danger',
      'bg-cyan-500 hover:bg-cyan-600': status == 'info',
    }"
    class="text-white font-bold py-2 px-4 rounded-md shadow-sm"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    status: { type: String, default: () => "success" },
  },
});
</script>
