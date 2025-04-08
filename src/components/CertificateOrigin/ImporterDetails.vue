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
        <input
          list="countries"
          v-model="CountryName"
          aria-required="true"
          class="input"
          required
          @input="updateCountryID"
        />
        <datalist id="countries">
          <option
            v-for="country in CountriesList"
            :key="country.id"
            :value="language === 'A' ? country.DscrpA : country.DscrpE"
          />
        </datalist>
      </div>

      <!-- <div class="input_wrap">
        <label for="origin_activity">
          {{ language === "A" ? "محطة الوقوف" : "Stop station" }}
        </label>
        <input
          list="stations"
          v-model="StopStation"
          class="input"
          aria-required="true"
        />
        <datalist id="stations">
          <option
            v-for="station in CountriesList"
            :key="station.id"
            :value="language === 'A' ? station.DscrpA : station.DscrpE"
          />
        </datalist>
      </div> -->

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
      CountriesList: [],
      CountryID: this.formData.CountryID || "",
      CountryName: this.formData.CountryName || "",
      // StopStation: this.formData.StopStation || "", // تغيير إلى قيمة نصية
    };
  },

  created() {
    this.GetParams();
    this.$emit("height", this.height);
  },

  methods: {
    updateCountryID() {
      const selectedCountry = this.CountriesList.find(
        (country) =>
          (this.language === "A" ? country.DscrpA : country.DscrpE) ===
          this.CountryName
      );
      if (selectedCountry) {
        this.CountryID = selectedCountry.id;
      }
    },

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
        CountryID: this.CountryID,
        CountryName: this.CountryName,
      });

      console.log("name", this.CountryName);
      console.log("id", this.CountryID);

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
.multiselect__tags {
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

input[type="text"] {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 2px solid var(--secondary);
  border-radius: 4px;
  box-sizing: border-box;
}

input[list] {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 2px solid var(--secondary);
  border-radius: 4px;
  box-sizing: border-box;
}

datalist {
  width: 100%;
}

.datalist-option {
  font-size: 14px;
}
</style>
