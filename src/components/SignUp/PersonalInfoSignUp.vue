<template>
  <div class="section_form">
    <h2>المعلومات الشخصية</h2>
    <div class="form_container">
      <div class="input_wrap">
        <label for="origin_name">الاسم الثلاثي <span>(باللغة العربية)</span></label>
        <input
          type="text"
          name="Full Name"
          class="input"
          v-model="personalInfo.Name"
          required
        />
      </div>
      <div class="input_wrap">
        <label for="origin_activity">البريد الالكتروني <span>(مفعل)</span></label>
        <input
          type="email"
          name="Email"
          class="input"
          v-model="personalInfo.Email"
          required
        />
      </div>
      <div class="input_wrap">
        <label for="origin_permit">رقم الهاتف <span>(يحتوي واتساب)</span></label>
        <input
          type="tel"
          name="Phone Number"
          class="input"
          v-model="personalInfo.PhoneNumber"
          required
        />
      </div>
      <div class="input_wrap">
        <label for="origin_permitdate">عنوان السكن <span>(التفصيلي)</span></label>
        <input
          type="text"
          name="Home Address"
          class="input"
          v-model="personalInfo.Address"
          required
        />
      </div>
      <div class="input_wrap">
        <label for="origin_permitdate">عنوان العمل <span>(التفصيلي)</span></label>
        <input
          type="text"
          name="Job Address"
          class="input"
          v-model="personalInfo.JobAdressA"
          required
        />
      </div>
      <div class="input_wrap">
        <label for="origin_permitdate">عنوان العمل <span>(الانكليزي)</span></label>
        <input
          type="text"
          name="EJob Address"
          class="input"
          v-model="personalInfo.JobAdressE"
          required
        />
      </div>
    </div>
  </div>
  <div class="btn_wrapper">
    <button class="next_btn" @click="CheckEmail">التالي</button>
    <button class="back_btn" @click="$emit('prev-step')">السابق</button>
  </div>
</template>

<script>
import {axiosInstance} from "../../axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  props:['formData'],
  name: "PersonalInfo",
  data() {
    return {
      personalInfo: {
        Name: this.formData.Name || "",
        Email: this.formData.Email || "",
        PhoneNumber: this.formData.PhoneNumber || "",
        Address: this.formData.Address || "",
        JobAdressA: this.formData.JobAdressA || "",
        JobAdressE: this.formData.JobAdressE || ""
      },
    };
  },
  methods: {
    validateAndNext() {
      if (!this.personalInfo.Name) {
        toast.error("الاسم الثلاثي مطلوب");
        return;
      }
      if (!this.personalInfo.Email) {
        toast.error("البريد الالكتروني مطلوب");
        return;
      }
      if (!this.personalInfo.PhoneNumber) {
        toast.error("رقم الهاتف مطلوب");
        return;
      }
      if (!this.personalInfo.Address) {
        toast.error("عنوان السكن مطلوب");
        return;
      }
      if (!this.personalInfo.JobAdressA) {
        toast.error("عنوان العمل مطلوب");
        return;
      }
      if (!this.personalInfo.JobAdressE) {
        toast.error("عنوان العمل مطلوب");
        return;
      }
      this.$emit("update-data", this.personalInfo);
      this.$emit("next-step");
    },
    async CheckEmail(){
      try{
        const response = await axiosInstance.post('/Auth/user-validate',{
        Email: this.personalInfo.Email,
        PhoneNumber : this.personalInfo.PhoneNumber
      })

      if(response.status === 200){
        this.validateAndNext()
      }
      } catch(error){
        console.log(error);
        if(error.response.data.Message === 'Email and Phone Number already exists'){
          toast.error('البريد الالكتروني و رقم الهاتف موجودين مسبقاً')
        } else {
          if(error.response.data.Message === 'Email already exists'){
          toast.error('البريد الالكتروني موجود مسبقاً')
        } else if(error.response.data.Message === 'Phone Number already exists'){
          toast.error(' رقم الهاتف موجود مسبقاً')
        }
        }
      }
    }
  },
};
</script>

<style scoped>
@import "../../assets/Css/SignUp.css";

.section_form{
  height: max-content;
}
</style>
