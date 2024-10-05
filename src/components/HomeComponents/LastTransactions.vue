<template>
  <div class="transactions_container">
    <h3>اخر المعاملات</h3>
    <div class="card_wrapper">
        <TransactionsCard v-for="Transaction in TransactionsList" :key="Transaction.id" :transaction="Transaction" />
    </div>
  </div>
</template>

<script>
import { axiosInstance } from '@/axios';
import TransactionsCard from './TransactionsCard.vue'
export default {
    name: 'TransactionList',
    components:{
        TransactionsCard
    },
    data(){
      return{
        TransactionsList:""
      }
    },
    created(){
      this.GetTransactions();
    },
    methods:{
      async GetTransactions(){
        try{
          const response = await axiosInstance.get('/home/home-data',{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
          });
          this .TransactionsList= response.data.CertificateData.Certificates
        } catch(error) {
          console.error(error);
        }
      }
    }
}
</script>

<style scoped>
  .card_wrapper{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 15px;
    padding: 15px;
  }

  @media (max-width: 768px) {
        .card_wrapper{
        gap: 25px;
        padding: 1px;
        flex-direction: column;
        justify-content: center;
    }
  }
</style>