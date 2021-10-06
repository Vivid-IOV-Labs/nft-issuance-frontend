import { createI18n } from "vue-i18n";
import locizer from "locizer";

const namespace = "messages"; // your namespace name added in locize
locizer.init({
  projectId: "07545257-8108-40bb-8cf5-5606685ae665",
  apiKey: "f655c66e-3abb-4a57-bf7d-6f13f845aec8",
});
export const i18n = createI18n({
  locale: locizer.lng, // set locale
  fallbackLocale: "en",
  messages: {
    en: {
      message: {
        welcome: "Welcome",
      },
    },
    de: {
      message: {
        welcome: "Wilkommen",
      },
    },
  },
});
export const loadMessagesPromise = new Promise((resolve, reject) => {
  locizer.loadAll(namespace, (err: string, messages: string) => {
    if (err) return reject(err);
    Object.keys(messages).forEach((l) => {
      i18n.global.setLocaleMessage(l, messages[l]);
    });
    resolve(messages);
  });
});

export function handleMissing(locale, key) {
  if (!apiKey) return;
  if (locale !== locizer.referenceLng) return;
  locizer.add(namespace, key, key);
}
