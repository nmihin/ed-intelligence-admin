<template>
  <!-- Main Content START -->
  <div class="main-content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
            <Scheduler />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Scheduler from '../../../../components/features/scheduler/Scheduler.vue';
    
    export default {
        name: 'unit-schedule',
        components: {
          Scheduler
        }
    }
</script>
