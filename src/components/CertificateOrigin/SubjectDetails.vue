<template>
  <div class="section_form" :dir="language === 'A' ? 'rtl' : 'ltr'">
    <h2>{{ language === "ar" ? "تفاصيل المادة" : "Subject Details" }}</h2>
    <div class="form_container">
      <div class="input_wrap">
        <label for="origin_activity"
          >{{ language === "A" ? "تفاصيل الشحن" : "Shipping Details" }}
        </label>
        <select class="input" v-model="ShippingDetails">
          <option value="">{{ language === "A" ? "اختر" : "Choice" }}</option>
          <option
            v-for="detail in ShippingDetailsList"
            :key="detail.Id"
            :value="detail.Dscrp"
          >
            {{ detail.Dscrp }}
          </option>
        </select>
      </div>
      <div class="input_wrap">
        <label for="origin_activity">
          {{
            language === "A"
              ? "المنتج وعنوانة كاملاً"
              : "Product and Full address"
          }}</label
        >
        <select name="" id="" class="input" v-model="ProductAddress">
          <option value="">{{ language === "A" ? "اختر" : "Choice" }}</option>
          <option v-for="product in ProductAddressList" :key="product.Id" :value="product.Dscrp">{{ product.Dscrp }}</option>
        </select>
      </div>
      <div class="en_inputs">
        <div class="input_wrap">
          <label for="origin_activity">{{
            language === "A" ? "بلد المنشأ" : "Country of Origin"
          }}</label>
          <input
            type="text"
            name="Country"
            class="input disabled"
            required
            disabled
            v-model="Country"
          />
        </div>
        <div class="input_wrap">
          <label for="origin_activity">
            {{ language === "A" ? "المكان" : "Place" }}</label
          >
          <input
            type="text"
            name="Place"
            class="input disabled"
            required
            disabled
            v-model="Place"
          />
        </div>
      </div>
      <div class="input_wrap">
        <label for="origin_activity">
          {{ language === "A" ? "وصف السلع" : "Product Description" }}</label
        >
        <input
          type="text"
          name="Product Description"
          class="input"
          required
          v-model="ProductDescription"
        />
      </div>
      <div class="input_wrap">
        <label for="origin_activity">{{
          language === "A" ? "نوع التعبئة" : "Packing type"
        }}</label>
        <input
          type="text"
          name="Product Type"
          class="input"
          required
          v-model="PackingType"
        />
      </div>
      <div
        :class="[
          'input_wrap',
          language === 'A' ? 'drop_input' : 'en_drop_input',
        ]"
      >
        <div style="width: 30%">
          <label for="origin_activity">{{
            language === "A" ? "نوع الكمية" : "Quantity Type"
          }}</label>
          <select name="" id="" class="input" v-model="QuantityType">
            <option value="">
              {{ language === "A" ? "اختر" : "Choice" }}
            </option>
            <option v-for="Quantity in QuantityTypeList" :key="Quantity.Id" :value="Quantity.Dscrp">{{ Quantity.Dscrp }}</option>
          </select>
        </div>
        <div style="width: 70%">
          <label for="origin_activity">{{
            language === "A" ? "الوزن القائم" : "Weight"
          }}</label>
          <input
            type="number"
            name="Weight number"
            class="input"
            required
            v-model="Weight"
          />
        </div>
      </div>
      <div class="input_wrap">
        <label for="origin_activity">{{
          language === "A" ? "الملاحظات" : "Notes"
        }}</label>
        <input
          type="text"
          name="Notes"
          class="input"
          required
          multiple
          v-model="Notes"
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
import {axiosInstance} from "../../axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "PersonalInfo",
  props: {
    Language: {
      type: String,
      required: true,
    },
    formData:{
      type:Object
    }
  },
  data() {
    return {
      height: 900,
      language: this.Language,
      ShippingDetails: this.formData.GenerationDscrp || "",
      ShippingDetailsList: "",
      ProductAddress: this.formData.ProductDscrp || "",
      ProductAddressList: "",
      Country: "",
      Place: "",
      ProductDescription: this.formData.DetailsDscrp || "",
      PackingType: this.formData.DetailsTypeDscrp || "",
      QuantityType: this.formData.Wigth || "",
      QuantityTypeList: "",
      Weight: this.formData.WigthNum || "",
      Notes: this.formData.Notes || "",
      ServiceId: 1
    };
  },
  created() {
    this.CountryData();
    this.GetParams();
    this.$emit("height", this.height);
  },
  methods: {
    validateAndNext() {
      if (!this.ShippingDetails) {
        toast.error("يرجى اختيار تفاصيل الشحن");
        return;
      }
        if (!this.ProductAddress) {
          toast.error("يرجى اختيار المنتج وعنوانه كاملاً");
          return;
        }
        if (!this.ProductDescription) {
          toast.error("يرجى ملئ وصف السلع");
          return;
        }
        if (!this.PackingType) {
          toast.error("يرجى ملئ نوع التعبئة");
          return;
        }
        if (!this.Weight && !this.QuantityType) {
          toast.error("يرجى ملئ الوزن ونوع كميته");
          return;
        }
      this.$emit("subject-details", {
        GenerationDscrp: this.ShippingDetails,
        ProductDscrp: this.ProductAddress,
        DetailsDscrp: this.ProductDescription,
        DetailsTypeDscrp: this.PackingType,
        Wigth: this.QuantityType,
        WigthNum: this.Weight.toString(),
        Notes: this.Notes,
        ServiceId: this.ServiceId
      });
      this.$emit("next-step");
    },
    CountryData() {
      if (this.language === "A") {
        this.Country = "العراق";
        this.Place = "بغداد";
      } else {
        this.Country = "Iraq";
        this.Place = "Baghdad";
      }
    },
    async GetParams() {
      try {
        const response = await axiosInstance.get(
          "/Certifecate/get-Certifecate-Params",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
              'Accept-Language': `${this.language}`
            },
          }
        );
        this.ShippingDetailsList = response.data.GenerationTypes;
        this.ProductAddressList = response.data.ProductTypes;
        this.QuantityTypeList = response.data.StockUnits;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
@import "../../assets/Css/OriginCertificate.css";

.en_inputs {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.disabled {
  background: #dedede;
}

.drop_input {
  display: flex;
  width: 100%;
}

.en_drop_input {
  display: flex;
  width: 100%;
}

.drop_input select {
  padding: 6px 5px !important;
  border-radius: 0 10px 10px 0 !important;
  width: 20%;
}

.en_drop_input select {
  padding: 6px 5px !important;
  border-radius: 10px 0 0 10px !important;
  width: 20%;
}

.drop_input input {
  border-radius: 10px 0 0 10px !important;
  width: 80%;
}

.en_drop_input input {
  border-radius: 0 10px 10px 0 !important;
  width: 80%;
}

@media (max-width: 500px) {
  .en_inputs {
    flex-direction: column;
    gap: 0;
  }
}
</style>