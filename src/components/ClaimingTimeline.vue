<template>
  <div class="p-2 my-1">
    <div class="flex flex-col md:grid grid-cols-12 text-gray-50">
      <div v-for="status in history.filter((x, y) => history.indexOf(x) == y)" class="flex md:contents">
        <div class="col-start-2 col-end-4 mr-10 md:mx-auto relative">
          <div class="h-full w-4 flex items-center justify-center">
            <div
              :class="{
                'bg-green-500': status.type === 'success',
                'bg-red-500': status.type === 'error',
              }"
              class="h-full w-1 bg-green-500 pointer-events-none"
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
              bg-green-500
              shadow
              text-center
            "
          >
            <i class="fas fa-check-circle  text-white"></i>
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
          "
        >
          <h3 class="font-bold text-sm mb-1">{{ status.title }}</h3>
          <!-- <p class="leading-tight text-sm w-full">{{ status.message }}</p> -->
        </div>
      </div>

      <!-- <div class="flex md:contents">
          <div class="col-start-2 col-end-4 mr-10 md:mx-auto relative">
            <div class="h-full w-4 flex items-center justify-center">
              <div class="h-full w-1 bg-green-500 pointer-events-none"></div>
            </div>
            <div class="w-4 h-4 absolute top-1/2 -mt-3 rounded-full bg-green-500 shadow text-center">
              <i class="fas fa-check-circle text-white"></i>
            </div>
          </div>
          <div class="bg-green-500 col-start-4 col-end-12 p-3 rounded-xl my-4 mr-auto shadow-md w-full">
            <h3 class="font-semibold mb-1">Out for Delivery</h3>
            <p class="leading-tight text-sm ">
              22 July 2021, 01:00 PM
            </p>
          </div>
        </div>

        <div class="flex md:contents">
          <div class="col-start-2 col-end-4 mr-10 md:mx-auto relative">
            <div class="h-full w-4 flex items-center justify-center">
              <div class="h-full w-1 bg-red-500 pointer-events-none"></div>
            </div>
            <div class="w-4 h-4 absolute top-1/2 -mt-3 rounded-full bg-red-500 shadow text-center">
              <i class="fas fa-times-circle text-white"></i>
            </div>
          </div>
          <div class="bg-red-500 col-start-4 col-end-12 p-3 rounded-xl my-4 mr-auto shadow-md w-full">
            <h3 class="font-semibold mb-1 text-gray-50">Cancelled</h3>
            <p class="leading-tight text-sm ">
              Customer cancelled the order
            </p>
          </div>
        </div>

        <div class="flex md:contents">
          <div class="col-start-2 col-end-4 mr-10 md:mx-auto relative">
            <div class="h-full w-4 flex items-center justify-center">
              <div class="h-full w-1 bg-gray-300 pointer-events-none"></div>
            </div>
            <div class="w-4 h-4 absolute top-1/2 -mt-3 rounded-full bg-gray-300 shadow text-center">
              <i class="fas fa-exclamation-circle text-gray-400"></i>
            </div>
          </div>
          <div class="bg-gray-300 col-start-4 col-end-12 p-3 rounded-xl my-4 mr-auto shadow-md w-full">
            <h3 class="font-semibold mb-1 text-gray-400">Delivered</h3>
            <p class="leading-tight text-sm ">

            </p>
          </div>
      </div>-->
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
