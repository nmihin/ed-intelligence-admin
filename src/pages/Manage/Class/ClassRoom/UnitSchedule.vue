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
              { title: 'Event 1', date: '2021-02-12' },
              { title: 'Event 2', date: '2021-02-22' }
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
              this.events.push(
                {
                  title: eventData[0] +' '+ eventData[1],
                  date: this.selectedDate.dateStr
                }
              )
            }
        },
        created() {
          this.loadMore();
        }
    }
</script>
