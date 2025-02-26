<template>
  <div>
    <h3>حالات الشهادات</h3>
    <div class="container_section">
      <div class="gauge-container">
        <GaugeChart
          :value="AcceptedCounter"
          :status="'accepted'"
          :total="CertificatesCounter"
        />
        <p>مقبولة</p>
      </div>
      <div class="gauge-container">
        <GaugeChart
          :value="RejectedCounter"
          :status="'rejected'"
          :total="CertificatesCounter"
        />
        <p>مرفوضة</p>
      </div>
      <div class="gauge-container">
        <GaugeChart
          :value="PendingCounter"
          :status="'pending'"
          :total="CertificatesCounter"
        />
        <p>قيد الانتظار</p>
      </div>
      <div class="gauge-container">
        <GaugeChart
          :value="SuspendedCounter"
          :status="'suspended'"
          :total="CertificatesCounter"
        />
        <p>معلقة</p>
      </div>
    </div>
    <div class="books_sending">
      <p>عدد الكتب المصدرة</p>
      <h2>{{ BooksCounter }}</h2>
    </div>
  </div>
</template>
  
  <script>
import { axiosInstance } from "../../axios";
import GaugeChart from "./GaugeChart.vue";

export default {
  name: "DashboardPart",
  components: {
    GaugeChart,
  },
  data() {
    return {
      AcceptedCounter: "",
      RejectedCounter: "",
      PendingCounter: "",
      SuspendedCounter: "",
      CertificatesCounter: 0,
      BooksCounter: 0,
    };
  },
  created() {
    this.GetData();
  },
  methods: {
    async GetData() {
      try {
        const response = await axiosInstance.get("/home/home-data", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        });
        const path = response.data.CertificateData;
        this.AcceptedCounter = path.AcceptedCount;
        this.RejectedCounter = path.RejectedCount;
        this.PendingCounter = path.PendingCount;
        this.SuspendedCounter = path.SuspendedCount;
        this.CertificatesCounter = path.CertificatesCount;
        this.BooksCounter = response.data.BooksCount === 0 ? 0 : response.data.BooksCount;
      } catch (error) {
        console.log(error);
      }
    },
  },
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

@media (max-width: 768px) {
  .container_section {
    flex-wrap: wrap;
    justify-content: center;
  }

  .gauge-container {
    width: 45%;
  }
}
</style>