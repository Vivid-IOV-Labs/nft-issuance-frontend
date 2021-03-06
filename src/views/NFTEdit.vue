<template>
  <div class="p-2">
    <a href="#" class="block float-right" @click="pushToMediaList">
      <arrow-left-icon class="h-8 w-8 text-gray-700" />
    </a>
    <hr class="clear-both my-6 border-none" />
    <form class="w-full max-w-lg space-y-5 mx-auto">
      <div>
        <base-input
          id="token_name"
          v-model="v$.token_name.$model"
          label-text="token_name"
          type="text"
          placeholder="Media ID"
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
          :errors="formatVuelidateErrors(v$.subtitle.$errors)"
        ></base-input>
      </div>
      <div>
        {{ formData.domain_protocol }}
        <base-select
          id="domain_protocol"
          v-model="formData.domain_protocol"
          label="Protocol"
          :choices="protocols"
          placeholder="domain_protocol"
          :as-val="true"
          :errors="formatVuelidateErrors(v$.domain_protocol.$errors)"
        ></base-select>
      </div>
      <!-- <div>
        <base-input
          id="media_url"
          v-model="formData.media_url"
          label-text="media_url"
          type="text"
          placeholder="media_url"
          :errors="formatVuelidateErrors(v$.media_url.$errors)"
        ></base-input>
      </div> -->
      <div>
        <base-text-area
          id="description"
          v-model="formData.description"
          label-text="description"
          placeholder="Publisher description"
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
          :errors="formatVuelidateErrors(v$.brand_name.$errors)"
        ></base-input>
      </div>
      <div>
        <base-multi-select
          v-model="formData.categories"
          name="categories"
          label-text="categories"
          label="value"
          :errors="
            v$.categories.$errors &&
            formatVuelidateErrors(v$.categories.$errors)
          "
        ></base-multi-select>
      </div>
      <div>
        <base-multi-select
          v-model="formData.tags"
          name="tags"
          label-text="tags"
          :errors="v$.tags.$errors && formatVuelidateErrors(v$.tags.$errors)"
        ></base-multi-select>
      </div>
      <div>
        <base-checkbox
          id="transferable_copyright"
          v-model="formData.transferable_copyright"
          text="Is transferable_copyright"
          label-text="transferable_copyright"
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
          <p>Updated successfully</p>
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
      <async-button status="info" class="w-full" :on-click="submit"
        >Update</async-button
      >
    </form>
  </div>
</template>

<script lang="ts">
import BaseInput from "@/components/BaseInput.vue";
import BaseTextArea from "@/components/BaseTextArea.vue";
import BaseButton from "../components/BaseButton.vue";
import AsyncButton from "../components/AsyncButton.vue";
import BaseCheckbox from "../components/BaseCheckbox.vue";
import BaseDialog from "../components/BaseDialog.vue";
import BaseMultiSelect from "@/components/BaseMultiSelect.vue";
import BaseSelect from "@/components/BaseSelect.vue";
import { defineComponent, reactive, ref, computed, toRef } from "vue";
import { ArrowLeftIcon } from "@heroicons/vue/solid";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import useVuelidate from "@vuelidate/core";
import { required, url, maxLength } from "@vuelidate/validators";
import NFTService from "../services/NFTService";
import { ApiError } from "../services/ApiService";

export default defineComponent({
  components: {
    BaseInput,
    BaseButton,
    AsyncButton,
    BaseCheckbox,
    BaseDialog,
    ArrowLeftIcon,
    BaseMultiSelect,
    BaseTextArea,
    BaseSelect,
  },
  async setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const nft = await NFTService.findById(route.params.nftId as string);
    const formData = reactive(nft.details);
    const showError = ref(false);
    const errorMessage = ref<string>("");
    const showSuccess = ref(false);
    const rules = computed(() => ({
      title: { required },
      token_name: { required },
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
      showSuccess,
      showError,
      errorMessage,
      v$,
      protocols: [
        { value: "http", label: "http" },
        { value: "https", label: "https" },
      ],
      async submit() {
        const isFormCorrect = await v$.value.$validate();
        if (!isFormCorrect) return;
        try {
          await store.dispatch("nft/update", { id: nft.id, details: formData });
          showSuccess.value = true;
        } catch (error: any | ApiError) {
          errorMessage.value =
            error && error.message ? String(error.message) : "No message";
          showError.value = true;
        }
      },
      formatVuelidateErrors(errors: any[]) {
        return errors.map((error) => {
          return { text: error.$message, key: error.$uid };
        });
      },
      pushToMediaList() {
        router.go(-1);
      },
    };
  },
});
</script>
