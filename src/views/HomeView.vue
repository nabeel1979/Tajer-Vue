<template>
  <div class="container_fluid">
    <QuickAccess />
    <LastTransactions />
    <ChartsSection />
  </div>
</template>

<script>
import QuickAccess from "../components/HomeComponents/QuickAccess.vue";
import LastTransactions from "../components/HomeComponents/LastTransactions.vue";
import ChartsSection from "../components/HomeComponents/ChartsSection.vue";

import { useHead } from "@vueuse/head";

useHead({
  title: "منصة التقديم الإلكتروني على شهادة المنشأ", // تحديث العنوان
  meta: [
    {
      name: "التاجر البغدادي",
      content: "منصة التقديم الإلكتروني على شهادة المنشأ",
    }, // إضافة الوصف
  ],
});

export default {
  components: {
    QuickAccess,
    LastTransactions,
    ChartsSection,
  },
};
</script>

<style scoped>
.container_fluid {
  position: relative;
  width: 95%;
  min-height: 90vh;
  margin: 0 auto;
  padding: 35px;
  display: flex;
  flex-direction: column;
  gap: 75px;
}

@media (max-width: 768px) {
  .container_fluid {
    width: 98%;
    padding: 25px;
    gap: 25px;
  }
}
</style>
