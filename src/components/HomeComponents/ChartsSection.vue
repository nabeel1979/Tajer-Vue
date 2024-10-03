<template>
  <div>
    <div class="container_section">
      <div class="gauge-container">
        <GaugeChart :value="10" :status="'accepted'" :total="17" />
        <p>مقبولة</p>
      </div>
      <div class="gauge-container">
        <GaugeChart :value="0" :status="'rejected'" :total="17" />
        <p>مرفوضة</p>
      </div>
      <div class="gauge-container">
        <GaugeChart :value="4" :status="'pending'" :total="17" />
        <p>قيد الانتظار</p>
      </div>
      <div class="gauge-container">
        <GaugeChart :value="3" :status="'suspended'" :total="17" />
        <p>معلقة</p>
      </div>
    </div>
    <div class="books_sending">
      <p>عدد الكتب المصدرة</p>
      <h2>0</h2>
    </div>
  </div>
</template>
  
  <script>
// import { axiosInstance } from "../../axios";
import GaugeChart from "./GaugeChart.vue";

export default {
  name: "DashboardPart",
  components: {
    GaugeChart,
  },
  // methods:{
  //   async GetData(){
  //     const response = axiosInstance.get("/home/home-data")
  //   }
  // }
};
</script>

<style scoped>
.container_section {
  display: flex;
  gap: 20px;
  margin-bottom: 12px;
}

.gauge-container {
  width: 25%;
  text-align: center;
  border-radius: 15px;
  box-shadow: 0 0 10px 1px rgb(195, 195, 195);
}

.books_sending {
  width: 100%;
  text-align: center;
  border-radius: 15px;
  box-shadow: 0 0 10px 1px rgb(195, 195, 195);
  padding: 25px 0 10px 0;
}
</style>