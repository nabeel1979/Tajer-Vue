<template>
  <div>
    <h3>اخر المعاملات</h3>
    <div>
        <TransactionsCard />
    </div>
  </div>
</template>

<script>
import TransactionsCard from './TransactionsCard.vue'
export default {
    name: 'TransactionList',
    components:{
        TransactionsCard
    }
}
</script>

<style>

</style>