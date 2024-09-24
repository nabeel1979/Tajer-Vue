<template>
  <div class="modal" v-if="isVisible">
    <div class="modal-content">
      <router-link to="/login"><span class="close" @click="closeAll">&times;</span></router-link>
      <div class="logo_section">
        <img src="../../assets/Image/logo.png" alt="" />
      </div>
      <h2>نسيت كلمة المرور ؟</h2>
      <label>أختر طريقة الاسترجاع</label>
      <div class="radio-section">
        <label>
          <input type="radio" v-model="contactMethod" :value= true />
          واتساب
          <font-awesome-icon :icon="['fab', 'whatsapp']" style="color: green" />
        </label>
        <label>
          <input type="radio" v-model="contactMethod" checked :value= false />
            البريد الالكتروني
          <font-awesome-icon :icon="['fas', 'envelope']" style="color: #2c5ef1" />
        </label>
      </div>
      <form @submit.prevent="submitEmail">
        <div class="email_section">
          <label for="text">رقم الاضبارة</label>
          <input type="text" v-model="AzparaNum" required />
        </div>
        <button type="submit">تحقق</button>
      </form>
    </div>
  </div>
</template>

<script>
import {axiosInstance} from '../../axios';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  props: ["isVisible"],
  data() {
    return {
      AzparaNum: "",
      whatsapp: "",
      contactMethod: false,
      email:""
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    async submitEmail() {
      try {
        let response;
          response = await axiosInstance.post('/auth/forget-password', {
            AzbaraNumber: this.AzparaNum,
            IsWhatsApp: this.contactMethod
          });
          this.email=response.data.email
          this.whatsapp = response.data.phone

        if (response.data) {
          this.$emit("email-submitted", this.AzparaNum , this.email , this.whatsapp);
        } else {
          console.log('Error:', response.data.message);
        }
      } catch (error) {
        if (error.response.data.Message === 'User not found') {
          toast.error('رقم الاضبارة الذي ادخلته غير مرتبط بحساب');
        }
      }
    },
    checkLength() {
      if (this.whatsapp.toString().length > 11) {
        this.whatsapp = this.whatsapp.toString().slice(0, 11);
      }
    }
  },
};
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  text-align: center;
}

.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 550px;
  border-radius: 20px;
  height: auto;
}

.logo_section {
  width: 100%;
  text-align: center;
}

.logo_section img {
  width: 95px;
  height: 95px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  text-align: right;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.radio-section {
  margin: 10px 0;
  display: flex;
  justify-content: space-around;
}

.radio-section label {
  font-size: 16px;
  cursor: pointer;
}

.email_section,
.whatsapp_section {
  margin: 20px 0;
  text-align: right;
}

.email_section label,
.whatsapp_section label {
  display: block;
  margin-bottom: 5px;
}

.email_section input,
.whatsapp_section input {
  direction: ltr;
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #afafaf;
  border-radius: 8px;
  text-indent: 10px;
}

.whatsapp_section input:focus {
  border: 1px solid #c6c6c6;
  outline: 1px solid #c6c6c6;
}

label {
  font-size: 18px;
  font-weight: 700;
}

button[type="submit"] {
  padding: 10px 45px;
  border-radius: 10px;
  background-color: var(--primary-color);
  font-size: 18px;
  font-weight: 900;
  color: var(--font-color);
  border: none;
}
button[type="submit"]:hover {
  background-color: #2e72cc;
  transform: translateY(-2px);
  box-shadow: 0 0 12px 1px #6d6d6d;
  transition:box-shadow 1s ease-in ;
}

.number_input{
  position: relative;
}

.number_input input{
  text-indent: 80px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance:textfield;
}

.number_input span{
  direction: ltr;
  position: absolute;
  left: -1px;
  padding: 9px 20px;
  background-color: #c6c6c6;
  border-radius: 9px 0 0 9px;
}
</style>
