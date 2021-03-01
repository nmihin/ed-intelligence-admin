<template>
  <!-- Main Content START -->
  <div class="main-content">
    <!-- START UNIT MODAL -->
    <UnitScheduleModal
        ref="openUnitModal"
        @eventAdded="eventAddedChild"
    />
    <!-- END UNIT MODAL -->
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
            <!-- options apply to dayGridMonth, dayGridWeek, and dayGridDay views -->
            <Calendar 
              @openUnitModal="onClickChild"             
              :parentDataEvents="events"
              parentDatadayGridType="dayGridWeek"
            />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Scheduler from '../../../../components/features/scheduler/Scheduler.vue';
    import Calendar from '../../../../components/features/calendar/Calendar.vue';
    import UnitScheduleModal from '../ClassRoom/modals/UnitScheduleModal.vue';
    
    export default {
        name: 'unit-schedule',
        components: {
          Scheduler,
          Calendar,
          UnitScheduleModal
        },
        // DATA
        data: () => ({
           subject:'',
           grade:'',
           student:'',
           selectedDate:'',
           events: [
              { 
                id:1,
                title: 'Event 1111', 
                date: '2021-03-02',
                description: 'This is a cool event'
              },
              { 
                id:2,
                title: 'Event 2222', 
                date: '2021-03-22', 
                description: 'This is a cool event'
              }
           ]
        }),
        methods: {
            loadMore() {
              this.subject = this.$route.query.subject;
              this.grade = this.$route.query.grade;
              this.student = this.$route.query.student;
            },
            onClickChild (date) {
              this.selectedDate = date;
              this.$refs.openUnitModal.openModal(this.subject,this.grade,this.student,date);
            },
            eventAddedChild(eventData){
              //MAX ID
              const idx = Math.max(...this.events.map(el => el.id));

              this.events.push(
                {
                  id: idx+1,
                  title: eventData[0] +' '+ eventData[1],
                  date: this.selectedDate.dateStr,
                  description: "Event text..."
                }
              )
            }
        },
        created() {
          this.loadMore();
        }
    }
</script>
