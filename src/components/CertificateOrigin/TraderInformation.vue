<template>
  <div class="section_form" :dir="language === 'A' ? 'rtl' : 'ltr'">
    <h2>{{ language === "ar" ? "تفاصيل المصدر" : "Source details" }}</h2>
    <div class="form_container">
      <div class="input_wrap">
        <label for="azpara_number">{{
          language === "A" ? "رقم الاضبارة" : "File number"
        }}</label>
        <input
          type="text"
          name="Azbara Number"
          class="input disabled"
          v-model="azpara_number"
          required
          disabled
        />
      </div>
      <div class="input_wrap">
        <label for="company_name">{{
          language === "A" ? "الاسم التجاري" : "Trade Name"
        }}</label>
        <input
          type="text"
          name="Company Name"
          class="input disabled"
          v-model="company_name"
          required
          disabled
        />
      </div>
      <div class="input_wrap">
        <label for="manger_name">{{
          language === "A" ? "المدير المفوض" : "Managing Director"
        }}</label>
        <input
          type="text"
          name="Manger Name"
          class="input disabled"
          v-model="manger_name"
          required
          disabled
        />
      </div>
      <div class="input_wrap">
        <label for="company_address">{{
          language === "A" ? "عنوان المصدر" : "Address"
        }}</label>
        <input
          type="text"
          name="Address"
          class="input disabled"
          v-model="company_address"
          required
          disabled
        />
      </div>
    </div>
  </div>
  <div class="btn_wrapper">
    <button class="next_btn" @click="validateAndNext">
      {{ language === "A" ? "التالي" : "Next" }}
    </button>
    <button class="back_btn" @click="$emit('prev-step')">
      {{ language === "A" ? "السابق" : "Previous" }}
    </button>
  </div>
</template>

<script>
import { axiosInstance } from "../../axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "PersonalInfo",
  props: {
    Language: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      azpara_number: "",
      company_name: "",
      manger_name: "",
      company_address: "",
      language: this.Language,
    };
  },
  created() {
    this.getData();
  },

  methods: {
    async getData() {
      try {
        const response = await axiosInstance.get(
          "/Certifecate/get-Tajer-Data",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
              "Accept-Language": `${this.language}`,
            },
          }
        );
        const userData = response.data;
        this.azpara_number = userData.AzbaraNumber;
        this.company_name = userData.CompanyName;
        this.manger_name = userData.ManagerName;
        console.log(userData.ManagerName);
        this.company_address = userData.CompanyAddress;
      } catch (error) {
        console.log("Error fetching user data:", error);
        this.$router.push("/login");
      }
    },
    validateAndNext() {
      if (!this.azpara_number) {
        toast.error("يجب ملئ رقم الاضبارة");
        return;
      }
      if (!this.company_name) {
        toast.error("يجب ملئ الاسم التجاري");
        return;
      }
      if (!this.manger_name) {
        toast.error("يجب ملء حقل المدير المفوض");
        return;
      }

      if (this.manger_name === "لا يوجد") {
        toast.error("لا يمكنك المتابعة لأن المدير المفوض غير موجود.");
        return;
      }

      if (!this.company_address) {
        toast.error("يجب ملئ عنوان المصدر");
        return;
      }

      this.$emit("next-step");
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

@media (max-width: 500px) {
  .en_inputs {
    flex-direction: column;
    gap: 0;
  }
}
</style>
