<template>
  <div class="p-2 my-1">
    <div class="flex flex-col md:grid grid-cols-12 text-gray-50">
      <div
        v-for="status in history.filter(
          (a, i) => history.findIndex((s) => a.title === s.title) === i
        )"
        class="flex md:contents"
      >
        <div class="col-start-2 col-end-4 mr-10 md:mx-auto relative">
          <div class="h-full w-4 flex items-center justify-center">
            <div
              :class="{
                'bg-green-500': status.type === 'success',
                'bg-red-500': status.type === 'error',
              }"
              class="h-full w-1 bg-grey-500 pointer-events-none"
            ></div>
          </div>
          <div
            :class="{
              'bg-green-500': status.type === 'success',
              'bg-red-500': status.type === 'error',
            }"
            class="
              w-4
              h-4
              absolute
              top-1/2
              -mt-2
              rounded-full
              bg-grey-500
              shadow
              text-center
            "
          >
            <i class="fas fa-check-circle text-white"></i>
          </div>
        </div>
        <div
          :class="{
            'bg-green-500': status.type === 'success',
            'bg-red-500': status.type === 'error',
          }"
          class="
            col-start-4 col-end-12
            p-2
            rounded-xl
            my-2
            mr-auto
            shadow-md
            w-full
            bg-grey-500
          "
        >
          <h3 class="font-bold text-sm mb-1">{{ status.title }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { PropType } from "vue";

interface Status {
  title: string;
  message: string;
  type: string;
}
export default defineComponent({
  props: {
    history: { type: Array as PropType<Status[]>, default: () => [] },
  },
});
</script>
