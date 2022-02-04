<template>
  <div class="p-2">
    <a href="#" class="block float-right" @click="pushToMediaList">
      <ArrowLeftIcon class="h-8 w-8 text-gray-700" />
    </a>
    <hr class="clear-both my-6 border-none" />
    <form class="w-full max-w-lg space-y-5 mx-auto">
      <div>
        <base-input
          id="token_name"
          v-model="formData.token_name"
          label-text="token_name"
          type="text"
          placeholder="Media ID"
          :is-required="'required' in v$.token_name"
          :is-invalid="v$.token_name?.$dirty && v$.token_name.$invalid"
          :errors="formatVuelidateErrors(v$.token_name.$errors)"
        ></base-input>
      </div>
      <div>
        <base-input
          id="title"
          v-model="formData.title"
          label-text="title"
          type="text"
          placeholder="Title"
          :is-required="'required' in v$.title"
          :is-invalid="v$.title.$dirty && v$.title.$invalid"
          :errors="formatVuelidateErrors(v$.title.$errors)"
        ></base-input>
      </div>
      <div>
        <base-input
          id="subtitle"
          v-model="formData.subtitle"
          label-text="subtitle"
          type="text"
          placeholder="subtitle"
          :is-required="'required' in v$.subtitle"
          :is-invalid="v$.subtitle?.$dirty && v$.subtitle.$invalid"
          :errors="formatVuelidateErrors(v$.subtitle.$errors)"
        ></base-input>
      </div>
      <div>
        <base-select
          id="domain_protocol"
          v-model="formData.domain_protocol"
          label-text="Protocol"
          :choices="protocols"
          placeholder="domain_protocol"
          :as-val="true"
          :is-required="'required' in v$.domain_protocol"
          :is-invalid="
            v$.domain_protocol?.$dirty && v$.domain_protocol.$invalid
          "
          :errors="formatVuelidateErrors(v$.domain_protocol.$errors)"
        ></base-select>
      </div>
      <div>
        <base-text-area
          id="description"
          v-model="formData.description"
          label-text="description"
          placeholder="Publisher description"
          :is-required="'required' in v$.description"
          :is-invalid="v$.description?.$dirty && v$.description.$invalid"
          :errors="formatVuelidateErrors(v$.description.$errors)"
        ></base-text-area>
      </div>
      <div>
        <base-input
          id="brand_name"
          v-model="formData.brand_name"
          label-text="brand_name"
          type="text"
          placeholder="brand_name"
          :is-required="'required' in v$.brand_name"
          :is-invalid="v$.brand_name?.$dirty && v$.brand_name.$invalid"
          :errors="formatVuelidateErrors(v$.brand_name.$errors)"
        ></base-input>
      </div>
      <div>
        <base-multi-select
          v-model="formData.categories"
          id="categories"
          label-text="categories"
          label="value"
          :is-required="'required' in v$.categories"
          :is-invalid="v$.categories?.$dirty && v$.categories.$invalid"
          :errors="
            v$.categories.$errors &&
            formatVuelidateErrors(v$.categories.$errors)
          "
        ></base-multi-select>
      </div>
      <div>
        <base-multi-select
          v-model="formData.tags"
          id="tags"
          label-text="tags"
          :is-required="'required' in v$.tags"
          :is-invalid="v$.tags?.$dirty && v$.tags.$invalid"
          :errors="v$.tags.$errors && formatVuelidateErrors(v$.tags.$errors)"
        ></base-multi-select>
      </div>
      <div>
        <base-checkbox
          id="transferable_copyright"
          v-model="formData.transferable_copyright"
          text="Is transferable_copyright"
          label-text="transferable_copyright"
          :is-required="'required' in v$.transferable_copyright"
          :is-invalid="
            v$.transferable_copyright?.$dirty &&
            v$.transferable_copyright.$invalid
          "
          :errors="
            v$.transferable_copyright.$errors &&
            formatVuelidateErrors(v$.transferable_copyright.$errors)
          "
        ></base-checkbox>
      </div>
      <base-dialog
        :show="showSuccess"
        title="Success"
        @close="showSuccess = false"
      >
        <template #body>
          <p>Media added successfully</p>
        </template>
        <template #footer>
          <base-button class="ml-2" @click="pushToMediaList"> OK </base-button>
        </template>
      </base-dialog>
      <base-dialog :show="showError" title="Error" @close="showError = false">
        <template #body>
          <p>{{ errorMessage }}</p>
        </template>
        <template #footer>
          <base-button status="success" class="ml-2" @click="showError = false">
            OK
          </base-button>
        </template>
      </base-dialog>
      <async-button status="success" class="w-full" :on-click="submit"
        >Submit</async-button
      >
    </form>
  </div>
</template>

<script lang="ts">
import BaseInput from "@/components/BaseInput.vue";
import BaseTextArea from "@/components/BaseTextArea.vue";
import BaseButton from "@/components/BaseButton.vue";
import AsyncButton from "@/components/AsyncButton.vue";
import BaseCheckbox from "@/components/BaseCheckbox.vue";
import BaseDialog from "@/components/BaseDialog.vue";
import BaseMultiSelect from "@/components/BaseMultiSelect.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import { reactive, defineComponent, computed, ref, Ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";
import { required, url, maxLength } from "@vuelidate/validators";
import { ArrowLeftIcon } from "@heroicons/vue/solid";

export interface ErrorObject {
  $propertyPath: string;
  $property: string;
  $validator: string;
  $message: string | Ref<string>;
  $params: Record<string, unknown>;
  $pending: boolean;
  $response: unknown;
  $uid: string;
}

export default defineComponent({
  components: {
    BaseInput,
    BaseTextArea,
    BaseButton,
    AsyncButton,
    BaseCheckbox,
    BaseDialog,
    BaseMultiSelect,
    BaseSelect,
    ArrowLeftIcon,
  },
  setup: () => {
    const store = useStore();
    const router = useRouter();

    const formData = reactive({
      token_name: "",
      title: "",
      subtitle: "",
      description: "",
      tags: [],
      domain_protocol: "",
      categories: [],
      brand_name: "",
      transferable_copyright: false,
    });
    const showError = ref(false);
    const errorMessage = ref<string>("");
    const showSuccess = ref(false);
    const rules = computed(() => ({
      title: { required },
      token_name: { required, maxLength: maxLength(18) },
      domain_protocol: { required },
      subtitle: {},
      description: {},
      brand_name: {},
      transferable_copyright: {},
      tags: {},
      categories: {},
    }));
    const v$ = useVuelidate(rules, formData, { $autoDirty: true });
    return {
      formData,
      v$,
      showError,
      showSuccess,
      errorMessage,
      protocols: [
        { value: "http", label: "http" },
        { value: "https", label: "https" },
      ],
      async submit() {
        const isFormCorrect = await v$.value.$validate();
        if (!isFormCorrect) return;
        try {
          await store.dispatch("nft/create", formData);
          showSuccess.value = true;
        } catch (error) {
          console.log(errror)
          errorMessage.value = String(message);
          showError.value = true;
        }
      },
      pushToMediaList() {
        showSuccess.value = false;
        router.go(-1);
      },
      formatVuelidateErrors(errors: any[]) {
        return errors.map((error) => {
          return { text: error.$message, key: error.$uid };
        });
      },
    };
  },
});
</script>
