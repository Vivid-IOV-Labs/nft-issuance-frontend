import { createI18n } from "vue-i18n";
import locizer from "locizer";

const apiKey = "f655c66e-3abb-4a57-bf7d-6f13f845aec8";

const namespace = "translations"; // your namespace name added in locize
locizer.init({
  projectId: "07545257-8108-40bb-8cf5-5606685ae665",
  apiKey,
});
export const i18n = createI18n({
  locale: locizer.lng, // set locale
  fallbackLocale: "en",
});
export const loadMessagesPromise = new Promise((resolve, reject) => {
  locizer.loadAll(namespace, (err:Record<string,string>, messages:Record<string,string>) => {
    if (err) return reject(err);
    Object.keys(messages).forEach((l) => {
      i18n.global.setLocaleMessage(l, messages[l]);
    });
    resolve(messages);
  });
});

export function handleMissing(locale: string, key: string):void{
  if (!apiKey) return;
  if (locale !== locizer.referenceLng) return;
  locizer.add(namespace, key, key);
}
