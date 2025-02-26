<template>
  <div class="container_fluid">
    <QuickAccess />
    <LastTransactions />
    <ChartsSection />
    <ExpireUser />
  </div>
</template>

<script>
import QuickAccess from '../components/HomeComponents/QuickAccess.vue';
import LastTransactions from '../components/HomeComponents/LastTransactions.vue';
import ChartsSection from '../components/HomeComponents/ChartsSection.vue';
import ExpireUser from '../components/HomeComponents/ExpireUser.vue';

export default {
  components:{
    QuickAccess,
    LastTransactions,
    ChartsSection,
    ExpireUser
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
    display: flex;
    flex-direction: column;
    gap: 75px;
  }

@media (max-width: 768px){
  .container_fluid{
    width: 98%;
    padding: 25px;
    gap: 25px;
  }
}
</style>
