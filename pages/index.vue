<template>
  <div class="stream-overlay-container">
    <div class="stream-overlay-notifications">
      {{ currentNotification }}
    </div>
  </div>
</template>

<script>

export default {
  name: 'ruudniew-stream-overlay',

  components: {
  },

  data () {
    return {
      processedUntil: -1,
      currentNotification: 'Notifications',
      audio: null,
    }
  },

  mounted () {
      setInterval(() => {
        this.notificationUpdate()
      }, 1000)
  },

  methods: {
    async notificationUpdate () {
      try {
        const notificationUpdateRequest = await this.$axios.get('/events');
        let chatbotEvents = notificationUpdateRequest.data;

        if (this.processedUntil === -1) {
          this.processedUntil = chatbotEvents.length - 1;
          return
        }

        chatbotEvents.forEach((ev, idx) => {
          if (idx > this.processedUntil) {
            if (ev['type'] === 'wtf') {
              this.currentNotification = 'ALERT: Ruudniew, please explain to ' + ev['sender'] + ' what you are doing!';
              this.audio = new Audio('/alert.wav');
              this.audio.play();
            }

            if (ev['type'] === 'flw') {
              this.currentNotification = 'New follower(s): ' + ev['followers'].map(flw => flw['from_name']).join(', ');
              this.audio = new Audio('/leeroy-jenkins.mp3');
              this.audio.play();
            }

            this.processedUntil = idx;
          }
        })

      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style>
  .stream-overlay-notifications {
    background-color: rgba(0,0,0, 0.7);
    @apply text-white italic px-5 py-3 font-bold
  }
</style>
