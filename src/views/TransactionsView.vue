<template>
  <div class="container_origin">
    <h1>طلبات المعاملات</h1>
    <div class="table_container">
      <h5 v-if="TransactionsData.length === 0" style="text-align: center">
        لا توجد معاملات مسجلة حالياً
      </h5>
      <table v-else>
        <thead>
          <th>NO.</th>
          <th>نوع المعاملة</th>
          <th>الحالة</th>
          <th>رقم الطلب</th>
          <th>الطلب</th>
          <th>البيانات</th>
          <th>الشهادة</th>
          <th>الوثائق</th>
        </thead>
        <tbody>
          <OriginCertificateCard
            v-for="(Transactions, index) in TransactionsData"
            :key="Transactions.id"
            :Transactions="Transactions"
            :index="calculateIndex(index)"
          />
        </tbody>
      </table>
    </div>
    <nav dir="ltr" aria-label="..." class="d-flex">
      <ul class="pagination m-auto">
        <li class="page-item" :class="{ disabled: CurrentPage === 1 }">
          <a
            class="page-link"
            href="javascript:void(0);"
            @click="changePage(CurrentPage - 1)"
            >Previous</a
          >
        </li>
        <li
          v-for="page in TotalPages"
          :key="page"
          class="page-item"
          :class="{ active: page === CurrentPage }"
        >
          <a
            class="page-link"
            href="javascript:void(0);"
            @click="changePage(page)"
            >{{ page }}</a
          >
        </li>
        <li class="page-item" :class="{ disabled: CurrentPage === TotalPages }">
          <a
            class="page-link"
            href="javascript:void(0);"
            @click="changePage(CurrentPage + 1)"
            >Next</a
          >
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import OriginCertificateCard from "../components/Transactions/OriginCertificateCard.vue";
import { axiosInstance } from "../axios";

export default {
  components: {
    OriginCertificateCard,
  },
  data() {
    return {
      transactionName: "",
      TransactionsData: [],
      CurrentPage: 1,
      PageSize: 10,
      TotalPages: 1,
    };
  },
  created() {
    this.GetTransactions();
  },
  methods: {
    async GetTransactions(page = 1) {
      try {
        const response = await axiosInstance.get(
          `/Certifecate/get-Certifecate-List?PageNumber=${page}&PageSize=${this.PageSize}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
          }
        );

        this.TransactionsData = response.data.Data;
        this.CurrentPage = response.data.CurrentPage;
        this.TotalPages = response.data.TotalPages;
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    },
    changePage(page) {
      if (page > 0 && page <= this.TotalPages) {
        this.GetTransactions(page);
      }
    },
    calculateIndex(index) {
      return (this.CurrentPage - 1) * this.PageSize + index;
    },
  },
  computed: {
    reversedTransactions() {
      return this.TransactionsData;
    },
  },
};
</script>

<style scoped>
.container_origin {
  margin: 35px 45px;
  padding: 35px 45px;
}

.container_origin h1 {
  text-align: center;
  margin-bottom: 55px;
}

.container_origin .table_container {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  text-align: center;
  overflow-y: scroll;
  margin: 0 auto;
}

table thead {
  border-bottom: 2px solid #ccc;
}

table thead th {
  height: 45px;
  width: fit-content;
}

table tbody tr {
  height: 75px;
}

table tbody tr:nth-child(odd) {
  background-color: #f2f2f2;
}

table tbody tr:nth-child(even) {
  background-color: #ffffff;
}

.page-link {
  cursor: pointer;
}

@media (max-width: 1366px) {
  .container_origin {
    margin: 10px 15px;
    padding: 10px 15px;
  }
}

@media (max-width: 768px) {
  table {
    width: 1000px;
    text-align: center;
    overflow-y: scroll;
    margin: 0 auto;
  }

  .container_origin {
    margin: 5px 5px;
    padding: 5px 5px;
  }
}
</style>
