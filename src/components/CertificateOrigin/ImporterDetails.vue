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
          {{ language === "A" ? "البلد المستورد" : "Importing country" }}
        </label>
        <multiselect
          v-model="CountryID"
          :options="CountriesList"
          :custom-label="countryLabel"
          :placeholder="language === 'A' ? 'اختر' : 'Choice'"
          track-by="id"
          :searchable="true"
          :allow-empty="true"
        />
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
import Multiselect from "vue-multiselect";
import { axiosInstance } from "../../axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "ImporterDetails",
  components: {
    Multiselect,
  },
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
      CountriesList: [],
      CountryID: this.formData.CountryID || null, // استخدام كائن الدولة بالكامل
      selectedCountryName: "", // تخزين اسم الدولة المختارة
    };
  },
  created() {
    this.GetParams();
    this.$emit("height", this.height);
  },
  computed: {
    countryLabel() {
      return (country) => {
        if (country && country.DscrpA && country.DscrpE) {
          return this.language === "A" ? country.DscrpA : country.DscrpE;
        }
        return this.language === "A" ? "غير موجود" : "Not Available";
      };
    },
  },
  watch: {
    CountryID(newCountry) {
      if (newCountry) {
        this.selectedCountryName =
          this.language === "A" ? newCountry.DscrpA : newCountry.DscrpE;
        console.log("تم تحديث اسم الدولة:", this.selectedCountryName);
        this.$emit("country-name", this.selectedCountryName);
      }
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
      if (!this.CountryID) {
        toast.error("الرجاء اختيار البلد المستورد");
        return;
      }

      this.isLoading = true;

      this.$emit("importer-info", {
        TargetName: this.importerName,
        TargetAddress: this.importerAddress,
        CountryID: this.CountryID.id, // تمرير ID الدولة فقط
      });

      this.$emit("country-name", this.selectedCountryName);

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
        console.log("تم تحميل قائمة الدول:", this.CountriesList);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
@import "../../assets/Css/OriginCertificate.css";

/* ستايل المكونات */
.vue-multiselect {
  width: 100%;
}
.multiselect__tags{
  border: 2px solid var(--secondary) !important;
}
.vue-multiselect .multiselect__input {
  padding: 10px;
  font-size: 14px;
  border: 2px solid var(--secondary);
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}

.vue-multiselect .multiselect__option {
  font-size: 14px;
}

.vue-multiselect .multiselect__single {
  padding: 10px;
  font-size: 14px;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
}

.vue-multiselect .multiselect__tag {
  background-color: #e0e0e0;
  padding: 2px 5px;
  border-radius: 4px;
}

.vue-multiselect .multiselect__clear {
  color: #3498db;
}
</style>
