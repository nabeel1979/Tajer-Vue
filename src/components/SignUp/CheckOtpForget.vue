<template>
  <div class="modal" v-if="isVisible">
    <div class="modal-content">
      <router-link to="/login"><span class="close" @click="closeAll">&times;</span></router-link>
      <div class="logo_section">
        <img src="../../assets/Image/logo.png" alt="" />
      </div>
      <h2>أدخل رمز التحقق</h2>
      <p>تم إرسال رمز التحقق إلى {{ email }}</p>
      <form @submit.prevent="submitOtp" class="form_information">
        <div class="otp_section">
          <label for="otp">رمز التحقق</label>
          <div class="input_wrapper">
            <input
              v-for="(value, index) in otpValues"
              :key="index"
              v-model="otpValues[index]"
              @input="handleInput($event, index)"
              @keydown="moveToPrevious($event, index)"
              type="number"
              maxlength="1"
              ref="otpInput"
            />
          </div>
          <div class="resend_time" v-if="timeLeft">
              {{ formattedTime }}
          </div>
        </div>
        <div class="resend_section">
          <p>لم تقم باستلام الرمز؟</p>
          <a
            href="#"
            @click="timeLeft ? null : resendCode"
            :class="{ disabled: timeLeft }"
          >
            قم بإعادة الإرسال
          </a>
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
  props: {
    isVisible: {
      type: Boolean,
    },
    email: {
      type: String,
    },
    AzbaraNum: {
      type: String,
    },
    OtpLength: {
      type: Number,
      default: 6,
    },
  },
  data() {
    return {
      otpValues: Array(this.OtpLength).fill(""),
      otpCombined: "",
      timer: null,
      timeLeft: 200,
    };
  },
  computed: {
    formattedTime() {
      const minutes = Math.floor(this.timeLeft / 60);
      const seconds = this.timeLeft % 60;
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    },
  },
  watch: {
    otpValues: {
      handler() {
        this.otpCombined = this.otpValues.join("");
        this.$emit("update:otpCombined", this.otpCombined);
      },
      deep: true,
    },
  },
  emits: ["update:otpCombined", "token-received"],
  mounted() {
    this.focusFirstInput();
    this.startTimer();
  },
  methods: {
    async submitOtp() {
      try {
        const response = await axiosInstance.post("/auth/otp-verify", {
          Code: this.otpCombined,
          AzbaraNumber: this.AzbaraNum,
        });
        if (response.data) {
          this.$emit("token-received", response.data);
          this.$emit("close");
        }
      } catch (error) {
        if (error.response.data.Message === 'User not found') {
          toast.error('البريد الالكتروني الذي ادخلته غير مرتبط بحساب');
        } else if (error.response.data.Message === 'Wrong Code') {
          toast.error('الرمز الذي ادخلته غير صحيح');
        }
      }
    },
    closeAll() {
      this.$emit("close");
    },
    handleInput(event, index) {
      const inputLength = event.target.value.length;
      const maxLength = event.target.maxLength;
      if (inputLength >= maxLength && index < this.OtpLength - 1) {
        this.$refs.otpInput[index + 1].focus();
      }
      if (inputLength === 0 && index > 0) {
        this.$refs.otpInput[index - 1].focus();
      }
    },
    moveToPrevious(event, index) {
      if (event.key === "Backspace" && index > 0 && !event.target.value) {
        this.$refs.otpInput[index - 1].focus();
      }
    },
    focusFirstInput() {
      this.$nextTick(() => {
        if (this.$refs.otpInput[0]) {
          this.$refs.otpInput[0].focus();
        }
      });
    },
    startTimer() {
      this.timer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft -= 1;
        } else {
          clearInterval(this.timer);
        }
      }, 1000);
    },
    async resendCode() {
      try{
        const response = await axiosInstance.post('/auth/resend-code',{
          azbaraNumber : this.email
        })
        if(response.data){
          this.timeLeft = 60
          this.startTimer()
          toast.success('تم اعادة ارسال رمز الـOTP تحقق من البريد الالكتروني')
        }
      } catch(error) {
        console.log(error)
      }
    },
  },
  beforeUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
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

.otp_section {
  margin: 20px 0;
  direction: ltr;
}

.otp_section label {
  display: block;
  margin-bottom: 5px;
}

.otp_section input {
  direction: ltr;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #afafaf;
  border-radius: 8px;
}

.otp_section input:focus {
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
  transition: box-shadow 1s ease-in;
}

.number_input {
  position: relative;
}

.number_input input {
  text-indent: 80px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.number_input span {
  direction: ltr;
  position: absolute;
  left: -1px;
  padding: 9px 20px;
  background-color: #c6c6c6;
  border-radius: 9px 0 0 9px;
}

.form_information {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input_wrapper {
  display: flex;
  justify-content: center;
}

input {
  width: 60px;
  height: 60px;
  margin-right: 0.5em;
  text-align: center;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: clamp(16px, 4vm, 20px);
  font-weight: 700;
}

.resend_time {
  margin: 25px 0;
}

.resend_section {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 15px 0;
}

.disabled {
  pointer-events: none;
  color: grey;
  text-decoration: none;
}

@media(max-width:500px){
  input {
  width: 40px;
  height: 40px;
}
}
</style>
