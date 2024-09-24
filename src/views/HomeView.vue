<template>
  <div class="container_fluid">
    <QuickAccess />
  </div>
</template>

<script>
import QuickAccess from '../components/HomeComponents/QuickAccess.vue';

export default {
  components:{
    QuickAccess
  }
}
</script>

<style scoped>
  .container_fluid{
    position: relative;
    width: 95%;
    min-height: 90vh;
    margin: 0 auto;
    padding: 35px;
  }


</style>
