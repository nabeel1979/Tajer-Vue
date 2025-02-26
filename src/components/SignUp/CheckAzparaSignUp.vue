<template>
  <form @submit.prevent="handleSubmit">
    <div class="section_form">
      <h2>واجهة التحقق</h2>
      <section>
        <div class="text-center">
          <img src="../../assets/Image/logo.png" alt="" width="200" />
        </div>
      </section>
      <div>
        <h4>قم بأدخال رقم الصنف</h4>
      </div>
      <!-- <div>
        <select
          id="governorate-select"
          class="dropdown2 dropdown-toggle"
          v-model="selectedGovernorate"
          required
        >
          <option disabled value="">اختر محافظة</option>
          <option
            v-for="governorate in governorates"
            :key="governorate.id"
            :value="governorate.id"
          >
            {{ governorate.Dscrp }}
          </option>
        </select>
      </div> -->
      <div class="azpara_section" v-if="selectedGovernorate === 3">
        <div class="h4">
          <p>ادخل رقم الصنف الموجود في هوية غرفة تجارة بغداد</p>
        </div>
        <div class="input_wrap">
          <div class="input-group mb-3" dir="ltr">
            <input
              type="number"
              dir="rtl"
              class="form-control input2"
              aria-label="Text input with dropdown button"
              placeholder="رقم"
              v-model="azbaraNumber"
              @input="updateAzbaraSereal"
            />
            <select
              class="dropdown_char dropdown-toggle"
              v-model="selectedLatter"
              @change="updateAzbaraSereal"
            >
              <option value="" disabled selected>الحرف</option>
              <option v-for="char in letters" :key="char" :value="char">
                {{ char }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="btn_wrapper">
      <button class="next_btn" v-if="selectedGovernorate === 3" type="submit">
        التالي
      </button>
      <button
        class="next_btn"
        v-else-if="selectedGovernorate != ''"
        type="button"
        @click="handleNextStep"
      >
        التالي
      </button>
    </div>
  </form>
</template>

<script>
import {axiosInstance} from "../../axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  props:['formData'],
  name: "VerifyComponent",
  data() {
    return {
      selectedGovernorate: 3,
      selectedLatter: "",
      AzbaraNumber: "",
      azbaraSereal: "",
      governorates: [],
      letters: [
        "ا",
        "ب",
        "ت",
        "ث",
        "ج",
        "ح",
        "خ",
        "د",
        "ذ",
        "ر",
        "ز",
        "س",
        "ش",
        "ص",
        "ض",
        "ط",
        "ظ",
        "ع",
        "غ",
        "ف",
        "ق",
        "ك",
        "ل",
        "م",
        "ن",
        "ه",
        "و",
        "ي",
      ],
    };
  },
  created() {
    this.fetchGovernorates();
  },
  methods: {
    async handleSubmit() {
      if (this.selectedGovernorate === 3) {
        await this.checkAzbara();
      } else {
        this.emitData();
        this.$emit("next-step");
      }
    },
    handleNextStep() {
      if (this.selectedGovernorate === "") {
        toast.error("الرجاء اختيار محافظة");
      } else {
        this.emitData();
        this.$emit("next-step");
      }
    },
    async checkAzbara() {
      try {
        const response = await axiosInstance.post("/auth/check-azbara", {
          AzbararNum: this.azbaraSereal,
<<<<<<< HEAD
         
=======
>>>>>>> 8643cab6c9ae81e16d1a8603ded1d7acbee21e18
        });
        if(response.data){
          this.emitData();
          this.$emit("next-step");
        }
<<<<<<< HEAD
        
=======
>>>>>>> 8643cab6c9ae81e16d1a8603ded1d7acbee21e18
      } catch (error) {
        console.error(error);
        if (
          error.response.data.Message === "Not Found"
        ) {
          toast.error("رقم الاضبارة غير موجود");
        } else if(error.response.data.Message === "This Number Is Used") {
          toast.error("رقم الاضبارة هذا مستخدم سابقاً");
        } else {
          toast.error("حدث خطأ في الاتصال")
        }
      }
    },
    async fetchGovernorates() {
      try {
        const response = await axiosInstance.get("/Governurates");
        this.governorates = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    updateAzbaraSereal() {
      this.azbaraSereal = this.selectedLatter + this.azbaraNumber;
    },
    emitData() {
      this.$emit('update-data', {
        GoveId: this.selectedGovernorate,
        AzbaraNum: this.azbaraSereal,
      });
    },
  },
};
</script>

<style scoped>
@import "../../assets/Css/SignUp.css";
.toast-content {
  font-weight: 900;
}
</style>
