<template>
  <div class="stream-overlay-notifications mt-2 px-3">
    <div class="notifications-title w-full text-2xl font-bold mt-2">
      Last events
    </div>
    <div class="w-24 background-special-color mt-2 mb-4" style="height: 3px;"></div>
    <div class="events-content" :key="'lastevents-' + lastEvents.length">
      <div class="event my-2 py-1" v-for="(evt, idx) in lastEvents" v-if="idx < 3">
        <div>{{ evt.time }} - <span class="special-color">{{ evt.sender }}</span>:</div>
        <div class="font-normal">{{ getEventLabel(evt) }}</div>
      </div>
    </div>
  </div>
</template>
<script>
  import ModalGif from '~/components/ModalGif.vue'

  export default {
    name: 'stream-overlay-notifications',

    components: {
      ModalGif
    },


    data () {
      return {
        lastEvents: [],
        processed: [],
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
      getEventLabel (evt) {
        switch (evt.type) {
          case 'wtf':
            return 'ALERT: Ruudniew, please explain to ' + evt['sender'] + ' what you are doing!';
          case 'flw':
            return 'New follower(s): ' + evt['followers'].map(flw => flw['from_name']).join(', ');
          case '5plus':
            return 'There are currently more than 5 viewers. Hurray! Fantastic!';
          case '10plus':
            return 'There are currently more than 10 viewers. Hurray! Fantastic!';
          default:
            return 'Unknown event just happened'
        }
      },


      async notificationUpdate () {
        try {
          const notificationUpdateRequest = await this.$axios.get('/events');
          let chatbotEvents = notificationUpdateRequest.data;

          chatbotEvents.forEach(evnt => {
            console.log(evnt);
            if (this.processed.indexOf(evnt.time) === -1) {
              if (evnt['type'] === 'wtf') {
                this.currentNotification = 'ALERT: Ruudniew, please explain to ' + evnt['sender'] + ' what you are doing!';
                this.audio = new Audio('/alert.wav');
                this.audio.play();
                evnt.gif = '/little-helper.png';
                this.$emit('newEventHappened', evnt)
              }

              if (evnt['type'] === 'flw') {
                this.currentNotification = 'New follower(s): ' + evnt['followers'].map(flw => flw['from_name']).join(', ');
                this.audio = new Audio('/spp.mp3');
                this.audio.play();
                evnt.gif = '/follower.gif';
                this.$emit('newEventHappened', evnt)
              }

              if (evnt['type'] === '5plus') {
                this.currentNotification = 'There are currently more than 5 viewers. Hurray! Fantastic!';
                this.audio = new Audio('/spp.mp3');
                this.audio.play();
                evnt.gif = '/russians-dancing.gif';
                this.$emit('newEventHappened', evnt)
              }

              if (evnt['type'] === '10plus') {
                this.currentNotification = 'There are currently more than 10 viewers. Hurray! Fantastic!';
                this.audio = new Audio('/spp.mp3');
                this.audio.play();
                evnt.gif = '/classic-dancing.gif';
                this.$emit('newEventHappened', evnt)
              }

              this.processed.push(evnt.time);
              this.processed.splice(0,0); // This is just to make sure that vue updates the variable properly
              this.lastEvents.splice(0,0,evnt); // This is just to make sure that vue updates the variable properly
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
  .special-color {
    color: #c5f7ff;
  }

  .border-special-color {
    border-color: #c5f7ff;
  }

  .background-special-color {
    background-color: #c5f7ff;
  }

  .stream-overlay-notifications {
    background-color: rgba(0,0,0, 0.7);
    width: 350px;
    @apply text-white px-5 py-3 font-bold fixed top-0 right-0 rounded shadow-lg
  }

</style>
