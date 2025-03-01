<template>
  <div class="section_form" :dir="language === 'A' ? 'rtl' : 'ltr'">
    <h2>{{ language === "A" ? "تفاصيل المستورد" : "Importer Details" }}</h2>
    <div class="form_container">
      <div class="input_wrap">
        <label for="origin_activity">{{
          language === "A" ? "اسم المستورد" : "Importer Name"
        }}</label>
        <input
          type="text"
          name="Shipping Details"
          class="input"
          required
          v-model="importerName"
        />
      </div>
      <div class="input_wrap">
        <label for="origin_activity">
          {{ language === "A" ? "البلد المستورد" : "Importing country" }}</label
        >
        <select name="Material Class" class="input" v-model="CountryID">
          <option value="">{{ language === "A" ? "اختر" : "Choice" }}</option>
          <option
            v-for="country in CountriesList"
            :key="country.id"
            :value="country.id"
          >
            {{ language === "A" ? country.DscrpA : country.DscrpE }}
          </option>
        </select>
      </div>
      <div class="input_wrap">
        <label for="origin_activity">{{
          language === "A" ? "عنوان المستورد" : "Importer Address"
        }}</label>
        <input
          type="text"
          name="Product Address"
          class="input"
          required
          v-model="importerAddress"
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
  name: "ImporterDetails",
  props: {
    Language: {
      type: String,
      required: true,
    },
    formData: {
      type: Object,
    },
  },
  data() {
    return {
      height: 800,
      language: this.Language,
      importerName: this.formData.TargetName || "",
      importerAddress: this.formData.TargetAddress || "",
      isLoading: false,
      CountriesList: "",
      CountryID: this.formData.CountryID || "",
    };
  },
  created() {
    this.GetParams();
    this.$emit("height", this.height);
  },
  computed: {
    CountryName() {
      return this.CountriesList.find((item) => item.id === this.CountryID);
    },
  },
  methods: {
    validateAndNext() {
      if (!this.importerName) {
        toast.error("اسم المستورد مطلوب");
        return;
      }
      if (!this.importerAddress) {
        toast.error("عنوان المستورد مطلوب");
        return;
      }

      this.isLoading = true;

      this.$emit("importer-info", {
        TargetName: this.importerName,
        TargetAddress: this.importerAddress,
        CountryID: this.CountryID,
      });
      this.$emit("country-name", this.CountryName);
      this.isLoading = false;
      this.$emit("next-step");
    },
    async GetParams() {
      try {
        const response = await axiosInstance.get(
          "/Certifecate/get-Certifecate-Params",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
              "Accept-Language": `${this.language}`,
            },
          }
        );
        this.CountriesList = response.data.Countries;
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

.loading-spinner {
  border: 2px solid #f3f3f3;
  border-radius: 50%;
  border-top: 2px solid #3498db;
  width: 12px;
  height: 12px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
  display: inline-block;
  margin-right: 5px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@media (max-width: 500px) {
  .en_inputs {
    flex-direction: column;
    gap: 0;
  }
}
</style>
