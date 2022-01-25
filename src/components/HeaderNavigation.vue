<template>
  <header class="sticky top-0 z-50 flex-1 flex flex-col">
    <nav
      :class="{
        'bg-cyan-400': isBrandWorker,
        'bg-cyan-600': isBrandManager,
        'bg-purple-600': isAdminWorker,
        'bg-amber-500': isPublic,
      }"
      class="px-4 flex justify-between h-16 shadow"
    >
      <ul class="flex items-center">
        <li class="h-12 w-12 mr-2">
          <img
            class="h-full w-full mx-auto"
            src="@/assets/img/logopeerkat.png"
            alt="Peerkat logo"
          />
        </li>
        <li class="mr-2">
          <span class="text-lg uppercase font-bold">nft Test</span>
        </li>
      </ul>

      <ul class="flex items-center">
        <li>
          <h1 class="pl-8 lg:pl-0 uppercase font-semibold text-lg">
            {{ title }}
          </h1>
        </li>
      </ul>
      <div class="flex items-center">
        <base-select
          id="role"
          v-model="currentRole"
          :choices="roles"
          label-text="Select Role"
          :as-val="true"
          :label-hidden="true"
        ></base-select>
        <div></div>
        <base-button
          v-if="route.path == '/media'"
          class="pr-6 uppercase text-lg ml-2"
          @click="logOut"
        >
          LOGOUT
        </base-button>
      </div>
    </nav>
  </header>
</template>
<script lang="ts">
import { useRoute, useRouter } from "vue-router";
import { defineComponent, computed } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    BaseButton,
    BaseSelect,
  },
  setup: () => {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const currentRole = computed({
      get(): string {
        return store.getters["auth/getCurrentRole"];
      },
      set(role: string): void {
        store.dispatch("auth/setCurrentRole", role);
      },
    });
    const isBrandWorker = computed(() => store.getters["auth/isBrandWorker"]);
    const isBrandManager = computed(() => store.getters["auth/isBrandManager"]);
    const isAdminWorker = computed(() => store.getters["auth/isAdminWorker"]);
    const isPublic = computed(() => store.getters["auth/isPublic"]);

    const getTitle = () =>
      isBrandWorker.value
        ? "BRAND WORKER"
        : isBrandManager.value
        ? "BRAND MANAGER"
        : isAdminWorker.value
        ? "ADMIN WORKER"
        : isPublic.value
        ? "PUBLIC"
        : "";

    const title = computed(() => getTitle());

    return {
      roles: [
        { label: "Select User", value: null },
        { label: "Brand Worker", value: "brand/worker" },
        { label: "Brand Manager", value: "brand/manager" },
        { label: "Admin", value: "admin/worker" },
        { label: "Public", value: "public" },
      ],
      currentRole,
      title,
      route,
      isBrandWorker,
      isBrandManager,
      isAdminWorker,
      isPublic,
      logOut() {
        localStorage.removeItem("token");
        router.push({ path: "/" });
      },
    };
  },
  methods: {
    changeLanguage(lang: string) {
      if (this.$root) this.$root.$i18n.locale = lang;
    },
  },
});
</script>
