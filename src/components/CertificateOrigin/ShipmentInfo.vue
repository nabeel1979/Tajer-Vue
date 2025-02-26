<template>
  <div class="section_form" :dir="language === 'A' ? 'rtl' : 'ltr'">
    <h2>{{ language === 'A' ? 'معلومات الشحنة' : 'Shipment Information' }}</h2>
    <div class="form_container">
      <div class="input_wrap">
        <label for="origin_activity"
          > {{ language === 'A' ? 'رقم الفاتورة' : 'Invoice Number' }}</label
        >
        <input
          type="number"
          name="Pill Number"
          class="input"
          required
          v-model="InvoiceNumber"
        />
      </div>
      <div class="input_wrap">
        <label for="origin_activity"
          >{{ language === 'A' ? 'تاريخ الفاتورة' : 'Invoice Date' }} </label
        >
        <input
          type="date"
          name="Pill Date"
          class="input"
          required
          v-model="InvoiceDate"
        />
      </div>
      <div class="input_wrap">
        <label for="origin_activity">
          {{ language === 'A' ? 'رقم الاجازة' : 'License Number' }}</label
        >
        <input
          type="text"
          name="Certificate Number"
          class="input"
          required
          v-model="LicenseNumber"
        />
      </div>
      <div class="input_wrap">
        <label for="origin_activity">
          {{ language === 'A' ? 'تاريخ انشاء الاجازة' : 'License Create Date' }}</label
        >
        <input
          type="date"
          name="Certificate Date"
          class="input"
          required
          v-model="LicenseDate"
        />
      </div>
      <div class="input_wrap">
        <label for="origin_activity">
          {{ language === 'A' ? 'تاريخ انتهاء الاجازة' : 'License Expire Date' }}</label
        >
        <input
          type="date"
          name="Certificate Exp"
          class="input"
          required
          v-model="LicenseExp"
        />
      </div>
    </div>
  </div>
  <div class="btn_wrapper">
    <button class="next_btn" @click="validateAndNext">{{ language === 'A' ? 'التالي' : 'Next' }}</button>
    <button class="back_btn" @click="$emit('prev-step')">{{ language === "A" ? "السابق" : "Previous" }}</button>
  </div>
</template>

<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "PersonalInfo",
  props:{
    Language:{
      type:String,
      required:true
    },
    formData:{
      type:Object
    }
  },
  data() {
    return {
      language:this.Language,
      InvoiceNumber:this.formData.CertificateNo || '',
      InvoiceDate:this.formData.CertificateDate || '',
      LicenseNumber:this.formData.RegNo || '',
      LicenseDate:this.formData.RegDate || '',
      LicenseExp:this.formData.ExpDate || ''
    };
  },
  methods: {
    validateAndNext() {
      if (!this.InvoiceNumber) {
        toast.error("رقم الفاتورة مطلوب");
        return;
      }
      if (!this.InvoiceDate) {
        toast.error("تاريخ الفاتورة مطلوب");
        return;
      }
      if (!this.LicenseNumber) {
        toast.error("رقم الاجازة مطلوب");
        return;
      }
      if (!this.LicenseDate) {
        toast.error("تاريخ انشاء الاجازة مطلوب");
        return;
      }
      if (!this.LicenseExp) {
        toast.error("تاريخ انتهاء الاجازة مطلوب");
        return;
      }

      const LicenseExpDate = new Date(this.LicenseExp)

      if(LicenseExpDate < Date.now()){
        toast.error("!! تاريخ صلاحية الاجازة منتهي");
        return;
      }
      this.$emit('shipment-info',{
        CertificateNo:this.InvoiceNumber.toString(),
        CertificateDate:this.InvoiceDate,
        RegNo:this.LicenseNumber.toString(),
        RegDate:this.LicenseDate,
        ExpDate:this.LicenseExp
      })
      this.$emit("next-step");
    },
    },
  };
</script>

<style scoped>
@import "../../assets/Css/OriginCertificate.css";

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance:textfield;
}

@media(max-width:500px){
  .en_inputs{
  flex-direction: column;
  gap: 0;
}
}
</style>
