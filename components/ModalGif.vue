<template>
  <div class="stream-modal-gif" v-if="currentModalGif !== ''">
   <img :src="currentModalGif" />
  </div>
</template>

<script>
  export default {
    name: 'stream-modal-gif',

    props: ['currentModalGif']

  }
</script>

<style>
  .stream-modal-gif {

    @apply fixed top-0 left-0 w-full h-full flex items-center justify-center
  }
</style>
