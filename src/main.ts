import { createApp, h, Fragment } from "vue";
import App from "./App.vue";
import "./index.css";
import router from "./router";
import store from "./store";
import VueAxe, { VueAxePopup } from "vue-axe";
import VueAnnouncer from "@vue-a11y/announcer";

if (process.env.NODE_ENV === "development") {
    createApp({
        render: () => h(Fragment, [h(App), h(VueAxePopup)]),
    })
        .use(VueAxe)
        .use(VueAnnouncer)
        .use(router)
        .use(store)
        .mount("#app");
} else {
    createApp(App)
        .use(VueAnnouncer)
        .use(router)
        .use(store)
        .mount("#app");
}
