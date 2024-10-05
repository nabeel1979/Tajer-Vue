<template>
  <div class="transaction_card">
    <div class="status_section">
      <span
        class="status_value"
        :style="{ borderColor: CheckStatusColor, color: CheckStatusColor }"
        >{{ CheckStatusName }}</span
      >
    </div>
    <div class="content_section">
      <div class="card_part_content">
        <div><font-awesome-icon :icon="['fas', 'scroll' ]"
          /></div>
        <div class="titles_part">
          <div><p>نوع المعاملة</p></div>
          <div><h4>أنشاء شهادة</h4></div>
        </div>
      </div>
      <div class="card_part_content">
        <div><font-awesome-icon :icon="['fas', 'ticket-simple']" /></div>
        <div class="titles_part">
          <div><p>رقم الطلب</p></div>
          <div><h4>{{ transaction.OrderNo }}</h4></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    transaction: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      TransactionData: this.transaction,
    };
  },
  computed: {
    CheckStatusName() {
      if (this.TransactionData.OperationId === 1) {
        return "قيد الانتظار";
      } else if (this.TransactionData.OperationId === 2) {
        return "معلقة";
      } else if (this.TransactionData.OperationId === 3) {
        return "مقبولة";
      } else {
        return "مرفوضة";
      }
    },
    CheckStatusColor() {
      if (this.TransactionData.OperationId === 1) {
        return "#ffa90a";
      } else if (this.TransactionData.OperationId === 2) {
        return "#ad5f00";
      } else if (this.TransactionData.OperationId === 3) {
        return "#13c000";
      } else {
        return "#d60000";
      }
    },
  },
};
</script>

<style scoped>
.transaction_card {
  padding: 25px 30px 15px 30px;
  box-shadow: 0 0 10px 1px rgb(195, 195, 195);
  border-radius: 10px;
  width: 50%;
  gap: 25px;
  text-decoration: none;
}
.transaction_card .status_section{
  text-align: left;
}
.status_section .status_value {
  display: inline-block;
  border: 2px solid;
  border-radius: 10px;
  padding: 0 25px;
  width: 150px;
  text-align: center;
}
.content_section {
  display: flex;
  justify-content: flex-start;
}
.content_section .card_part_content{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;
  width:100%;
}
.card_part_content svg{
  font-size: 28px;
  color: #00459a;
}

.titles_part div p,
.titles_part div h4{
  line-height:0.7;
}

.titles_part div p{
  font-size: 16px;
  color: #a6a6a6;
}

.titles_part div h4{
  font-size: 26px;
  font-weight: 700;
  color: #0073ff;
}

@media (max-width: 768px){
  .transaction_card {
  padding: 15px;
  width: 100%;
}

.status_section .status_value {
  width: 100px;
}

.content_section .card_part_content{
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 5px;
  width:100%;
  padding: 15px 0 0 0;
}

.card_part_content svg{
  font-size: 18px;
  color: #00459a;
}

.titles_part div p,
.titles_part div h4{
  line-height:0.4;
}

.titles_part div p{
  font-size: 14px;
  color: #a6a6a6;
}

.titles_part div h4{
  font-size: 16px;
  font-weight: 700;
  color: #0073ff;
}
}
</style>