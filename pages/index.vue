<template>
  <div class="stream-overlay-container">
    <notifications v-on:newEventHappened="eventHappened"/>
    <stream-modal-gif v-bind:currentModalGif="currentModalGif"/>
  </div>
</template>

<script>
  import notifications from '~/components/Notifications.vue'
  import StreamModalGif from "~/components/ModalGif";

  export default {
    components: {
      StreamModalGif,
      notifications
    },

    data () {
      return {
        currentModalGif: '',
        currentModalGifTimeout: null,
      }
    },


    methods: {
      eventHappened (evt) {
        this.currentModalGif = evt.gif;

        if (this.currentModalGifTimeout !== null) {
          clearTimeout(this.currentModalGifTimeout)
        }

        this.currentModalGifTimeout = setTimeout(() => {
          this.currentModalGif = ''
        }, 3000)
      }
    }
  }
</script>
