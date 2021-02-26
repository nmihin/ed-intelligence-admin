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
          initialView: this.parentDatadayGridType,
          dateClick: this.handleDateClick,
          events: this.parentDataEvents
        }
        }
    },
    props: {
      parentDataEvents: Array,
      parentDatadayGridType: String
    },
    watch: {
      parentDataEvents: function() {
        this.eventsData = this.parentDataEvents;
      },
      parentDatadayGridType: function() {
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