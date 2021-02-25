<template>
  <FullCalendar :options="calendarOptions" />
</template>

<script>
  import FullCalendar from '@fullcalendar/vue'
  import dayGridPlugin from '@fullcalendar/daygrid'
  import interactionPlugin from '@fullcalendar/interaction'

  export default {
    name: 'calendar',
    components: {
      FullCalendar
    },
    data() {
        return {
        eventsData:[],
        calendarOptions: {
          plugins: [ dayGridPlugin, interactionPlugin ],
          initialView: 'dayGridMonth',
          dateClick: this.handleDateClick,
          events: this.parentDataEvents
        }
        }
    },
    props: {
      parentDataEvents: Array,
    },
    watch: {
      parentData: function() {
        this.eventsData = this.parentDataEvents;
      }
    },
    methods: {
      handleDateClick: function(arg) {
        this.$emit('openUnitModal', arg)
      }
    }
  }

</script>