import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router";
import store from "./store";
import { createI18n } from "vue-i18n";

const messages = {
  en: {
    message: {
      welcome: "Welcome to Your Vue.js App",
    },
  },
  de: {
    message: {
      welcome: "Willkommen zu Deiner Vue.js App",
    },
  },
  it: {
    message: {
      welcome: "Benvenuto!",
    },
  },
  el: {
    message: {
      welcome: "Yassas!",
    },
  },
};
const i18n = createI18n({
  locale: "el",
  // fallbackLocale: "en",
  messages,
});

createApp(App).use(router).use(store).use(i18n).mount("#app");
