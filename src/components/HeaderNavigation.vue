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
      <!-- top bar left -->
      <ul class="flex items-center">
        <!-- add button -->
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
        <!-- add button -->
        <li>
          <h1 class="pl-8 lg:pl-0 uppercase font-semibold text-lg">
            {{ title }}
          </h1>
        </li>
      </ul>

      <!-- to bar right  -->
      <!-- to bar right  -->
      <div class="flex items-center">
        <div>
          <div class="locale-changer">
            <base-select
              id="lang"
              v-model="$i18n.locale"
              :choices="languages"
              :label-text="$t('Select Language')"
              :as-val="true"
              :label-hidden="true"
            ></base-select>
          </div>
          <!-- <div>
            <a v-if="$i18n.locale !== 'de'" @click="changeLanguage('de')">DE</a>
            <strong v-if="$i18n.locale === 'de'">DE</strong>
            &nbsp;|&nbsp;
            <a v-if="$i18n.locale !== 'el'" @click="changeLanguage('el')">EL</a>
            <strong v-if="$i18n.locale === 'el'">EL</strong>
            &nbsp;|&nbsp;
            <a v-if="$i18n.locale !== 'it'" @click="changeLanguage('it')">IT</a>
            <strong v-if="$i18n.locale === 'it'">IT</strong>
            &nbsp;|&nbsp;
            <a v-if="$i18n.locale !== 'en'" @click="changeLanguage('en')">EN</a>
            <strong v-if="$i18n.locale === 'en'">EN</strong>
          </div> -->
        </div>
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
/**
 Brand worker - lighter shade of the peerkat green
Brand manager - darker shade of the peerkat green
Admin worker - purple
Public User - amber
 */
const apiUrl = import.meta.env.VITE_API_URL;
const isProduction =
  apiUrl == "https://media.peerkat.live" ||
  apiUrl == "https://vivid-media.herokuapp.com";
import { useRoute, useRouter } from "vue-router";
import { defineComponent, computed } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseSelect from "@/components/BaseSelect.vue";

function getRole() {
  return localStorage.getItem("user-role");
}
function withRole(roles: string[]) {
  roles.includes(getRole() || "");
  return roles.includes(getRole() || "");
}

export default defineComponent({
  components: {
    BaseButton,
    BaseSelect
  },
  setup: () => {
    const route = useRoute();
    const router = useRouter();
    const isBrandWorker = withRole(["brand/worker"]);
    const isBrandManager = withRole(["brand/manager"]);
    const isAdminWorker = withRole(["admin/worker"]);
    const isPublic = withRole(["public"]);

    const getTitle = () =>
      isBrandWorker
        ? "BRAND WORKER"
        : isBrandManager
        ? "BRAND MANAGER"
        : isAdminWorker
        ? "ADMIN WORKER"
        : "PUBLIC";

    const title = computed(() => getTitle());

    return {
      languages: [
        { label: "EN", value: "en" },
        { label: "EL", value: "el" },
        { label: "DE", value: "de" },
        { label: "IT", value: "it" },
      ],
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
    changeLanguage(lang:string) {
     if(this.$root) this.$root.$i18n.locale = lang;
    },
  },
});
</script>
