<template>
  <div class="flex flex-col justify-center items-center mb-2">
    <base-input
      id="search"
      v-model="searchByTitle"
      placeholder="Search by title"
      type="search"
      label-text="Search NFT by Title"
      :label-hidden="true"
      class="w-full max-w-xl mt-2"
    ></base-input>
  </div>

  <div class="mt-2 grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <nft-card v-for="nft in allNFT" :key="nft.id" :nft="nft"></nft-card>
    <router-link
      v-if="canCreate"
      status="success"
      class="
        w-16
        h-16
        bg-green-500
        hover:bg-green-600
        text-white
        font-bolder
        text-3xl
        rounded-full
        flex
        items-center
        justify-center
        fixed
        bottom-10
        right-10
        shadow-xl
      "
      :to="{ path: '/nft/add' }"
    >
      <PlusIcon class="h-8 w-8 text-white" />
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from "vue";
import NftCard from "../components/NFTCard.vue";
import BaseInput from "../components/BaseInput.vue";
import { useStore } from "vuex";
import { PlusIcon } from "@heroicons/vue/solid";
import { useRoute } from "vue-router";

export default defineComponent({
  components: {
    NftCard,
    PlusIcon,
    BaseInput,
  },
  async setup() {
    const store = useStore();
    const route = useRoute();
    await store.dispatch("nft/fetchAll", route.query);
    const currentRole = computed(() => store.getters["auth/getCurrentRole"]);

    watch(currentRole, async () => {
      await store.dispatch("nft/fetchAll", route.query);
    });

    const searchByTitle = ref("");
    const allNFT = computed(() => {
      return store.getters["nft/byTitle"](searchByTitle.value);
    });
    const canCreate = computed(() => store.getters["auth/isBrandWorker"]);

    return { allNFT, searchByTitle, canCreate };
  },
});
</script>
