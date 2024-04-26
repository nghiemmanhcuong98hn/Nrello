<script setup>
const props = defineProps({
      title: {
            type: String
      }
})
</script>
<template>
      <div class="grid lg:grid-cols-2 h-screen">
            <div class="left place-self-center w-full px-8 md:px-16 lg:px-24 2xl:px-52">
                  <div class="flex justify-center">
                        <Logo />
                  </div>
                  <h1 class="text-center font-bold text-xl my-4">{{ props.title }}</h1>
                  <slot />
            </div>
            <div class="right hidden lg:block">
                  <div></div>
            </div>
      </div>
</template>
