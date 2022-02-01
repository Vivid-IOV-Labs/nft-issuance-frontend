<template>
  <div class="rounded-lg border bg-white shadow-lg">
    <div class="w-full rounded-t-lg h-80 overflow-hidden">
      <img
        :class="{
          'object-contain': showQRCode && !invalidQR,
          'object-cover': !showQRCode || invalidQR,
        }"
        class="object-center h-full w-full"
        :src="showQRCode && !invalidQR ? xumnQRCode : posterUrl"
        @error="fallbackImg"
      />
    </div>
    <claiming-timeline :history="claimingHistory"></claiming-timeline>

    <div v-if="canScan" class="flex justify-between h-12 p-3 items-center">
      <a
        v-if="showQRCode && !invalidQR"
        class="
          d-block
          bg-white
          border-2 border-red-600
          uppercase
          font-bold
          text-xs text-red-600
          py-1
          px-2
          rounded
        "
        target="_blank"
        :href="xumnLink"
        >Claim on Xumn App</a
      >
      <a
        v-if="showQRCode && !invalidQR"
        class="
          d-block
          bg-white
          border-2 border-red-600
          uppercase
          font-bold
          text-xs text-red-600
          py-1
          px-2
          rounded
          cursor-pointer
        "
        @click="showQRCode = false"
        >x</a
      >
      <a
        v-if="!showQRCode || invalidQR"
        class="
          d-block
          bg-white
          border-2 border-red-600
          uppercase
          font-bold
          text-xs text-red-600
          py-1
          px-2
          rounded
          cursor-pointer
        "
        @click="showQRCode = true"
      >
        <QrcodeIcon class="h-4 w-4 text-red-600" />
      </a>
    </div>
    <div class="w-full flex justify-between p-3">
      <div class="flex w-full flex-col justify-between">
        <h2 class="font-bold text-xl">
          {{ title }}
          <small class="text-sm text-gray-600">{{ brand_name }}</small>
        </h2>
        <div class="flex mt-2">
          <span
            v-if="nft.current_status"
            class="
              inline-flex
              items-center
              justify-center
              px-2
              py-1
              mr-2
              text-xs
              font-bold
              leading-none
              text-red-100
              bg-red-600
              rounded-full
            "
            >{{ nft.current_status }}</span
          >
        </div>
      </div>
    </div>
    <div class="px-3 pb-2 h-20 overflow-y-auto">
      <div class="pt-2">
        <span class="text-sm text-gray-400 font-medium"
          >Categories: {{ categories }}</span
        >
      </div>
      <div class="pt-2">
        <span class="text-sm text-gray-400 font-medium">Tags:{{ tags }}</span>
      </div>
    </div>
    <div
      v-if="
        canDelete ||
        canApprove ||
        canClaim ||
        canReject ||
        canIssue ||
        canUpdate
      "
      class="border-t-2 p-4 flex justify-end"
    >
      <base-button v-if="canUpdate" class="mr-2" status="info" @click="editNFT"
        >Edit</base-button
      >
      <base-button
        v-if="canDelete"
        class="mr-2"
        status="danger"
        @click="confirmDeleteNFT"
        >Delete</base-button
      >
      <async-button
        v-if="canApprove"
        class="mr-2"
        status="success"
        :on-click="approveNFT"
        >Approve</async-button
      >
      <async-button
        v-if="canIssue"
        class="mr-2"
        status="success"
        :on-click="issueNFT"
        >Issue</async-button
      >
      <async-button
        v-if="canClaim"
        class="mr-2"
        status="success"
        :on-click="claimNFT"
        >Claim</async-button
      >
      <async-button
        v-if="canReject"
        class="mr-2"
        status="warning"
        :on-click="rejectNFT"
        >Reject</async-button
      >
    </div>
    <base-dialog
      :show="isDeleteDialogOpen"
      title="Delete Media"
      @close="isDeleteDialogOpen = false"
    >
      <template #body>
        <p>
          Do you want to delete <strong>{{ nft.details.title }}</strong> ?
        </p>
      </template>
      <template #footer>
        <async-button status="danger" class="ml-2" :on-click="deleteNFT">
          Delete
        </async-button>
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
  </div>
</template>
<script lang="ts">
import ClaimingTimeline from "../components/ClaimingTimeline.vue";
import BaseButton from "../components/BaseButton.vue";
import BaseDialog from "../components/BaseDialog.vue";
import AsyncButton from "../components/AsyncButton.vue";

import { computed, PropType } from "vue";
import { NFT } from "../models/NFT";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref, defineComponent, reactive } from "vue";
import webSocket from "../utils/websocketAdaptor";
import { QrcodeIcon } from "@heroicons/vue/solid";

function getRole() {
  return localStorage.getItem("user-role");
}
function withRole(roles: string[]) {
  roles.includes(getRole() || "");
  return roles.includes(getRole() || "");
}
interface Status {
  title: string;
  message: string;
  type: string;
}
export default defineComponent({
  components: {
    BaseButton,
    BaseDialog,
    QrcodeIcon,
    AsyncButton,
    ClaimingTimeline,
  },
  props: {
    nft: { type: Object as PropType<NFT>, required: true },
  },
  setup: (props) => {
    const store = useStore();
    const router = useRouter();
    const showError = ref(false);
    const errorMessage = ref<string>("");
    const isDeleteDialogOpen = ref(false);
    const showQRCode = ref(false);
    const invalidQR = ref(false);
    const claimingHistory = reactive<Status[]>([]);
    const isBrandWorker = computed(() => store.getters["auth/isBrandWorker"]);
    const isBrandManager = computed(() => store.getters["auth/isBrandManager"]);
    const isAdminWorker = computed(() => store.getters["auth/isAdminWorker"]);
    const isPublic = computed(() => store.getters["auth/isPublic"]);
    const canUpdate = computed(() => {
      return (
        ["created", "rejected"].includes(props.nft.current_status) &&
        ["created", ""].includes(props.nft.previous_status) &&
        isBrandWorker.value
      );
    });
    const canDelete = computed(() => {
      return (
        ["created", "rejected"].includes(props.nft.current_status) &&
        isBrandWorker.value
      );
    });
    const canApprove = computed(() => {
      return (
        ["created"].includes(props.nft.current_status) && isBrandManager.value
      );
    });
    const canReject = computed(() => {
      return (
        (["created"].includes(props.nft.current_status) &&
          isBrandManager.value) ||
        (["approved"].includes(props.nft.current_status) && isAdminWorker.value)
      );
    });
    const canIssue = computed(() => {
      return (
        ["approved"].includes(props.nft.current_status) && isAdminWorker.value
      );
    });
    const canClaim = computed(() => {
      return ["issued"].includes(props.nft.current_status) && isPublic.value;
    });
    const xumnQRCode = computed(() => {
      const { length, [length - 1]: last } = props.nft.xumm;
      return length ? last.details.refs.qr_png : "";
    });
    const canScan = computed(() => {
      return ["claiming"].includes(props.nft.current_status) && xumnQRCode;
    });
    const xumnLink = computed(() => {
      const { length, [length - 1]: last } = props.nft.xumm;
      return length ? last.details.next.always : "";
    });
    const tokenName = computed(() => props.nft.details.token_name);
    const posterUrl = computed(
      () =>
        props.nft.details.domain_protocol + "://" + props.nft.details.token_name
    );
    const title = computed(() =>
      props.nft && props.nft.details && props.nft.details.title
        ? props.nft.details.title
        : ""
    );
    const brand_name = computed(() =>
      props.nft && props.nft.details && props.nft.details.brand_name
        ? props.nft.details.brand_name
        : ""
    );
    const tags = computed(() =>
      props.nft && props.nft.details && props.nft.details.tags
        ? props.nft.details.tags
            .reduce((acc, tag) => {
              acc += ` #${tag},`;
              return acc;
            }, "")
            .slice(1, -1)
        : ""
    );
    const categories = computed(() =>
      props.nft && props.nft.details && props.nft.details.categories
        ? props.nft.details.categories
            .reduce((acc, tag) => {
              acc += `${tag},`;
              return acc;
            }, "")
            .slice(1, -1)
        : ""
    );
    const subtitle = computed(() =>
      props.nft && props.nft.details && props.nft.details.subtitle
        ? props.nft.details.subtitle
        : ""
    );
    const description = computed(() =>
      props.nft && props.nft.details && props.nft.details.description
        ? props.nft.details.description
        : ""
    );

    function onClaim() {
      webSocket.socket.on("expired", (data) => {
        console.log("expired", data);
        invalidQR.value = true;
        claimingHistory.push({
          title: "Expired",
          message: "expired",
          type: "error",
        });
      });
      webSocket.socket.on("scanned", (data) => {
        claimingHistory.push({
          title: "Scanned",
          message: "scanned suyccessfully",
          type: "success",
        });
      });
      webSocket.socket.on("signed", (data) => {
        claimingHistory.push({
          title: "signed",
          message: "signed suyccessfully",
          type: "success",
        });
        store.commit("nft/setStatus", { id: props.nft.id, status: "signed" });
        invalidQR.value = true;
      });
      webSocket.socket.on("delivered", (data) => {
        claimingHistory.push({
          title: "delivered",
          message: "delivered suyccessfully",
          type: "success",
        });
        store.commit("nft/setStatus", {
          id: props.nft.id,
          status: "delivered",
        });
        invalidQR.value = true;
      });
      webSocket.socket.on("rejected", (data) => {
        claimingHistory.push({
          title: "rejected",
          message: "rejected suyccessfully",
          type: "error",
        });
        invalidQR.value = true;
      });
      webSocket.socket.on("unverified", (data) => {
        claimingHistory.push({
          title: "unverified",
          message: "unverified suyccessfully",
          type: "error",
        });
        invalidQR.value = true;
      });
    }
    if (
      props.nft.xumm &&
      props.nft.xumm.length &&
      props.nft.xumm[0].details.refs.qr_png &&
      ["issued", "claiming"].includes(props.nft.current_status)
    ) {
      showQRCode.value = true;
    }
    if (
      ["issued", "claiming"].includes(props.nft.current_status) &&
      withRole(["public"])
    ) {
      onClaim();
    }

    return {
      isDeleteDialogOpen,
      showQRCode,
      invalidQR,
      claimingHistory,
      fallbackImg(event: Event): void {
        (event.target as HTMLImageElement).src = "thumbnail.jpg";
      },
      confirmDeleteNFT() {
        isDeleteDialogOpen.value = true;
      },
      async deleteNFT(): Promise<void> {
        try {
          isDeleteDialogOpen.value = false;
          store.dispatch("nft/remove", [props.nft.id]);
        } catch ({ message }) {
          errorMessage.value = String(message);
          showError.value = true;
        }
      },
      approveNFT(): void {
        try {
          store.dispatch("nft/approve", props.nft);
        } catch ({ message }) {
          errorMessage.value = String(message);
          showError.value = true;
        }
      },
      async rejectNFT(): Promise<void> {
        try {
          store.dispatch("nft/reject", props.nft);
        } catch ({ message }) {
          errorMessage.value = String(message);
          showError.value = true;
        }
      },
      async issueNFT(): Promise<void> {
        try {
          await store.dispatch("nft/issue", props.nft);
        } catch ({ message }) {
          errorMessage.value = String(message);
          showError.value = true;
        }
      },
      async claimNFT(): Promise<void> {
        try {
          await store.dispatch("nft/claim", props.nft);
          showQRCode.value = true;
          onClaim();
        } catch ({ message }) {
          errorMessage.value = String(message);
          showError.value = true;
        }
      },
      editNFT() {
        router.push({ path: `/nft/edit/${props.nft.id}` });
      },
      showError,
      errorMessage,
      canUpdate,
      canDelete,
      canApprove,
      canReject,
      canIssue,
      canClaim,
      canScan,
      xumnQRCode,
      xumnLink,
      tokenName,
      posterUrl,
      title,
      brand_name,
      tags,
      categories,
      subtitle,
      description,
    };
  },
});
</script>
