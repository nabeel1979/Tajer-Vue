<template>
  <form @submit.prevent="sendOTP">
    <div class="section_form">
      <h3>قم بإدخال رمز الـ OTP المرسل إلى بريدك الإلكتروني</h3>
      <div dir="ltr">
        <input
          v-for="(value, index) in otpValues"
          :key="index"
          v-model="otpValues[index]"
          @input="handleInput($event, index)"
          @keydown="moveToPrevious($event, index)"
          type="tel"
          maxlength="1"
          :id="index"
          ref="otpInput"
        />

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
    </div>
    <div class="btn_wrapper">
      <button type="submit" class="next_btn">تأكيد</button>
    </div>
    <transition name="fade">
      <div v-if="loading" class="loading-overlay">
        <div class="spinner"></div>
      </div>
    </transition>
  </form>
</template>

<script>
import {axiosInstance} from "../../axios";
import { useRouter } from 'vue-router';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "OTPInput",
  props: {
    OtpLength: {
      type: Number,
      default: 4,
    },
    registerData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      otpValues: Array(this.OtpLength).fill(""),
      otpCombined: "",
      timer: null,
      timeLeft: 200,
      loading: false,
    };
  },
  computed: {
    
    formattedTime() {
      const minutes = Math.floor(this.timeLeft / 60);
      const seconds = this.timeLeft % 60;
      return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    },
    
  },
  emits: ["update:otpCombined"],
  mounted() {
    this.$refs.otpInput[0].focus();
    this.startTimer();
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
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
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
    startTimer() {
      this.timer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft -= 1;
        } else {
          clearInterval(this.timer);
        }
      }, 1000);
    },
    resendCode() {
      this.otpValues = Array(this.OtpLength).fill("");
      this.timeLeft = 120;
      this.startTimer();
      this.$refs.otpInput[0].focus();
      this.resendOTP();
    },
    async sendOTP() {
      this.loading = true;
      try {
        const response = await axiosInstance.post("/auth/confirm_order", {
          Code: this.otpCombined,
          Email: this.registerData.Email,
        });
        if (response.data) {
          toast.success('تم تسجيل طلبك بنجاح');
          setTimeout(() => {
            this.loading = false;
            this.router.push('/login');
          }, 5000); // Show success message for 5 seconds before redirecting
        }
      } catch (error) {
        this.loading = false;
        if (error.response.data.Message === 'Code Expired') {
          toast.warning('لقد انتهت صلاحية هذا الرمز الرجاء ادخل الرمز الجديد');
        } else if (error.response.data.Message === 'Wrong Code') {
          toast.error('ان الرمز الذي ادخلته خاطئ');
        } else {
          console.error("Error:", error.response.data.Message);
        }
        console.error("Error:", error);
      }
    },
    async resendOTP() {
      try {
        const response = await axiosInstance.post("/auth/resend-code", {
          Email: this.registerData.Email,
        });
        if (response.data) {
          console.log("Success:", response.data);
        }
      } catch (error) {
        console.error("Error:", error);
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
@import "../../assets/Css/SignUp.css";

.section_form{
  text-align: center;
}

h3 {
  margin: 20px 0;
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

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #09f;
  animation: spin 1s linear infinite;
}

p{
  margin-bottom: 0;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 500px) {
  h3 {
    font-size: 16px;
    font-weight: 700;
  }
  input {
    width: 50px;
    height: 50px;
  }
}

@media (max-width: 390px){
  input {
    width: 40px;
    height: 40px;
  }
}
</style>