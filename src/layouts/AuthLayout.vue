<template>
  <HeaderNavigation />
  <main class="container m-auto px-6 pt-4 pb-6">
    <slot></slot>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderNavigation from "@/components/HeaderNavigation.vue";
export default defineComponent({
  components: {
    HeaderNavigation,
  },
});
</script>
