<template>
  <full-calendar :options="calendarOptions" />
</template>

<script>
  import FullCalendar from '@fullcalendar/vue'
  import dayGridPlugin from '@fullcalendar/daygrid'
  import interactionPlugin from '@fullcalendar/interaction'

  import { BPopover } from 'bootstrap-vue'

  export default {
    name: 'calendar',
    components: {
      FullCalendar,
      BPopover
    },
    data() {
      return {
        eventsData: [],
        calendarOptions: {
          plugins: [dayGridPlugin, interactionPlugin],
          initialView: this.parentDatadayGridType,
          dateClick: this.handleDateClick,
          selectable: false,
          editable: true,
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
      },
      showEvent(arg){
        console.log(arg)

        let titleStr = arg.el.innerText;
        //let contentStr = 'this is test event'
        let contentStr = arg.event.extendedProps.description;

        new BPopover({propsData: {
          title: titleStr,
          content: contentStr,
          placement: 'auto',
          boundary: 'scrollParent',
          boundaryPadding: 5,
          offset: 0,
          triggers: 'hover',
          html: true,
          target: arg.el,
        }}).$mount()
        //console.log(arg.jsEvent.target)
      }
    },
    created() {
       this.calendarOptions.eventMouseEnter=this.showEvent;
    }
  }

</script>
