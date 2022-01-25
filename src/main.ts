import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router";
import store from "./store";
import VueAnnouncer from "@vue-a11y/announcer";

createApp(App)
    .use(VueAnnouncer)
    .use(router)
    .use(store)
    .mount("#app");
