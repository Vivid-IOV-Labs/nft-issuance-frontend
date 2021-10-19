declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "@heroicons/*";
declare module "locizer";
declare module "vue-axe";
