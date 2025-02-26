<template>
  <div class="section_form">
    <h2>المعلومات الشخصية</h2>
    <div class="form_container">
      <div class="en_inputs">
        <div class="input_wrap">
          <label for="origin_name"
            >الاسم الثلاثي</label
          >
          <input
            type="text"
            id="origin_name"
            name="Full Name"
            class="input"
            v-model="personalInfo.AFullName"
            required
          />
        </div>
        <div class="input_wrap" dir="ltr">
          <label for="origin_name_e"
            >Full Name</label
          >
          <input
            type="text"
            id="origin_name_e"
            name="Full Name E"
            class="input"
            v-model="personalInfo.EFullName"
            required
          />
        </div>
      </div>
      <div class="en_inputs">
        <div class="input_wrap">
          <label for="trade_name"
            >الاسم التجاري</label
          >
          <input
            type="text"
            id="trade_name"
            name="Trade Name A"
            class="input"
            v-model="personalInfo.ATradeName"
            required
          />
        </div>
        <div class="input_wrap" dir="ltr">
          <label for="trade_name_e"
            >Trade Name</label
          >
          <input
            type="text"
            id="trade_name_e"
            name="Trade Name E"
            class="input"
            v-model="personalInfo.ETradeName"
            required
          />
        </div>
      </div>
      <div class="en_inputs">
        <div class="input_wrap">
          <label for="activity"
            >النشاط</label
          >
          <input
            type="text"
            id="activity"
            name="Activity"
            class="input"
            v-model="personalInfo.AActivityName"
            required
          />
        </div>
        <div class="input_wrap" dir="ltr">
          <label for="activity_e"
            >Activity</label
          >
          <input
            type="text"
            id="activity_e"
            name="Activity E"
            class="input"
            v-model="personalInfo.EActivityName"
            required
          />
        </div>
      </div>
      <div class="input_wrap">
        <label for="origin_activity"
          >البريد الالكتروني <span>(مفعل)</span></label
        >
        <input
          type="email"
          name="Email"
          class="input"
          v-model="personalInfo.Email"
          required
        />
      </div>
      <div class="input_wrap">
        <label for="origin_permit"
          >رقم الهاتف <span>(يحتوي واتساب)</span></label
        >
        <input
          type="tel"
          name="Phone Number"
          class="input"
          v-model="personalInfo.PhoneNumber"
          required
        />
      </div>
      <div class="input_wrap">
        <label for="origin_permitdate"
          >عنوان السكن <span>(التفصيلي)</span></label
        >
        <input
          type="text"
          name="Home Address"
          class="input"
          v-model="personalInfo.Address"
          required
        />
      </div>
      <div class="input_wrap">
        <label for="origin_permitdate"
          >عنوان العمل <span>(التفصيلي)</span></label
        >
        <input
          type="text"
          name="Job Address"
          class="input"
          v-model="personalInfo.JobAdress"
          required
        />
      </div>
      <div class="en_inputs">
        <div class="input_wrap">
          <label for="ex_date"
            >تاريخ صلاحية الهوية</label
          >
          <input
            type="date"
            id="ex_date"
            name="EXPIRE DATE"
            class="input"
            v-model="personalInfo.RegistrationDate"
            required
          />
        </div>
        <div class="input_wrap">
          <label for="activity_e"
            >نوع الفئة</label
          >
          <select class="input" v-model="ClassType">
            <option value="ممتاز">ممتاز</option>
            <option value="اولى">اولى</option>
            <option value="ثانية">ثانية</option>
            <option value="ثالثة">ثالثة</option>
            <option value="رابعة">رابعة</option>
          </select>
        </div>
      </div>
    </div>
  </div>
  <div class="btn_wrapper">
    <button class="next_btn" @click="validateAndNext">التالي</button>
    <button class="back_btn" @click="$emit('prev-step')">السابق</button>
  </div>
</template>

<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  props:['formData'],
  name: "PersonalInfo",
  data() {
    return {
      personalInfo: {
        AFullName: this.formData.AFullName || "",
        EFullName: this.formData.EFullName || "",
        ATradeName: this.formData.ATradeName || "",
        ETradeName: this.formData.ETradeName || "",
        AActivityName: this.formData.AActivityName || "",
        EActivityName: this.formData.EActivityName || "",
        RegistrationDate: this.formData.RegistrationDate || "",
        Email: this.formData.Email || "",
        PhoneNumber: this.formData.PhoneNumber || "",
        Address: this.formData.Address || "",
        JobAdress: this.formData.JobAdress || "",
        ClassType: this.formData.ClassType || ""
      },
    };
  },
  methods: {
    validateAndNext() {
      if (!this.personalInfo.AFullName) {
        toast.error("الاسم الثلاثي مطلوب");
        return;
      }
    //   if (!this.personalInfo.tradeName) {
    //     toast.error("الاسم التجاري مطلوب");
    //     return;
    //   }
    //   if (!this.personalInfo.email) {
    //     toast.error("البريد الالكتروني مطلوب");
    //     return;
    //   }
    //   if (!this.personalInfo.phoneNumber) {
    //     toast.error("رقم الهاتف مطلوب");
    //     return;
    //   }
    //   if (!this.personalInfo.homeAddress) {
    //     toast.error("عنوان السكن مطلوب");
    //     return;
    //   }
    //   if (!this.personalInfo.jobAddress) {
    //     toast.error("عنوان العمل مطلوب");
    //     return;
    //   }
      this.$emit("update-data", this.personalInfo);
      this.$emit("next-step");
    },
  },
};
</script>

<style scoped>
@import "../../assets/Css/SignUp.css";

.en_inputs{
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
}

@media(max-width:500px){
  .en_inputs{
  flex-direction: column;
  gap: 0;
}
}
</style>
