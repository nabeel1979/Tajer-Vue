<template>
  <tr>
    <td>{{ index + 1 }}</td>
    <td>شهادة منشأ</td>
    <td v-if="Transactions.OperationId === 1">
      <p class="witting">{{ Transactions.OperationName }}</p>
    </td>
    <td v-if="Transactions.OperationId === 2">
      <p class="hangout">{{ Transactions.OperationName }}</p>
    </td>
    <td v-if="Transactions.OperationId === 3">
      <p class="accept">{{ Transactions.OperationName }}</p>
    </td>
    <td v-if="Transactions.OperationId === 4">
      <p class="reject">{{ Transactions.OperationName }}</p>
    </td>
    <td>{{ Transactions.OrderNo }}</td>
    <td>
      <router-link
        v-if="Transactions.OperationId === 3 || Transactions.OperationId === 1"
        :to="`/orderinvoice/${Transactions.OrderNo}`"
        :class="{ disabled: false }"
        target="_blank"
        >عرض</router-link
      >
      <span v-else class="disabled">عرض</span>
    </td>
    <td>
      <router-link
      :to="`/showorder/${Transactions.Id}`"
      target="_blank"
        >عرض</router-link
      >
    </td>
    <td>
      <router-link
        v-if="Transactions.OperationId === 3"
        :to="Transactions.Lang === 'E' ? `/viewcertificateE/${Transactions.CertificateId}` : `/viewcertificate/${Transactions.CertificateId}`"
        target="_blank"
        >عرض</router-link
      >
      <span v-else class="disabled">عرض</span>
    </td>
    <td>
      <a
      v-if="Transactions.OperationId === 3 && Transactions.Document !== null"
      :href="`${appSetting.imagesUrl}/${Transactions.Document}`"
      target="_blank"
      >عرض</a>
      <span v-else class="disabled">عرض</span>
    </td>
  </tr>
</template>

<script>
import appSetting from '../../appSetting';
export default {
  name: "OriginCertificateCard",
  props: {
    Transactions: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
    },
  },
  data() {
    return {
      CertificateId: null,
    };
  },
  computed:{
    appSetting() {
      return appSetting
    }
  }
};
</script>

<style scoped>
a,
span {
  display: block;
  width: 120px;
  text-decoration: none;
  color: white !important;
  background-color: #327dff;
  padding: 5px 10px;
  border-radius: 10px;
  cursor: pointer;
  align-content: center;
  margin: 0 auto;
}

td {
  width: fit-content;
  text-align: center;
}

.disabled {
  color: rgb(86, 86, 86);
  background-color: #ccc;
  cursor: not-allowed;
}

.disabled:hover {
  color: rgb(86, 86, 86);
  background-color: #ccc;
  cursor: not-allowed;
}

p {
  padding: 5px;
  border-radius: 10px;
}

a:hover {
  background-color: #1146a1;
}

.witting {
  border: 2px solid #ffa90a;
  color: #ffa90a;
  width: 150px;
  align-content: center;
  margin: 0 auto;
}

.accept {
  border: 2px solid #13c000;
  color: #13c000;
  width: 150px;
  align-content: center;
  margin: 0 auto;
}

.hangout {
  border: 2px solid #d67600;
  color: #ad5f00;
  width: 150px;
  align-content: center;
  margin: 0 auto;
}

.reject {
  border: 2px solid #d60000;
  color: #d60000;
  width: 150px;
  align-content: center;
  margin: 0 auto;
}
</style>
