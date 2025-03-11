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
          @paste="handlePaste($event)"
          type="tel"
          maxlength="1"
          :id="index"
          ref="otpInput"
        />
      </div>

      <div class="resend_time" v-if="timeLeft">
        {{ formattedTime }}
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

    <!-- <transition name="fade">
      <div v-if="loading" class="loading-overlay">
        <div class="spinner"></div>
      </div>
    </transition> -->
  </form>
</template>

<script>
import { axiosInstance } from "../../axios";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "OTPInput",
  props: {
    OtpLength: {
      type: Number,
      default: 6, // عدد خانات رمز التحقق
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
    // عند الإدخال، الانتقال للحقل التالي تلقائياً
    handleInput(event, index) {
      let value = event.target.value.replace(/\D/g, ""); // منع الأحرف غير الرقمية
      this.otpValues[index] = value;

      if (value && index < this.OtpLength - 1) {
        this.$refs.otpInput[index + 1].focus();
      }
    },

    // التنقل للخلف عند الضغط على Backspace
    moveToPrevious(event, index) {
      if (event.key === "Backspace" && index > 0 && !event.target.value) {
        this.$refs.otpInput[index - 1].focus();
      }
    },

    // دعم اللصق الكامل للكود
    handlePaste(event) {
      event.preventDefault();
      const pasteData = event.clipboardData.getData("text").trim();

      if (!/^\d+$/.test(pasteData)) {
        return;
      }

      const chars = pasteData.slice(0, this.OtpLength).split("");
      chars.forEach((char, index) => {
        this.otpValues[index] = char;
      });

      if (chars.length < this.OtpLength) {
        this.$refs.otpInput[chars.length]?.focus();
      }
    },

    // بدء المؤقت الزمني
    startTimer() {
      this.timer = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft -= 1;
        } else {
          clearInterval(this.timer);
        }
      }, 1000);
    },

    // إعادة إرسال كود OTP
    resendCode() {
      this.otpValues = Array(this.OtpLength).fill("");
      this.timeLeft = 120;
      this.startTimer();
      this.$refs.otpInput[0].focus();
      this.resendOTP();
    },

    // إرسال رمز OTP إلى السيرفر للتحقق
    async sendOTP() {
      this.loading = true;
      try {
        const response = await axiosInstance.post("/auth/confirm_order", {
          Code: this.otpCombined,
          Email: this.registerData.Email,
        });
        if (response.data) {
          toast.success("تم تسجيل طلبك بنجاح");
          setTimeout(() => {
            this.loading = false;
            this.router.push("/login");
          }, 5000);
        }
      } catch (error) {
        this.loading = false;
        if (error.response.data.Message === "Code Expired") {
          toast.warning("لقد انتهت صلاحية هذا الرمز الرجاء ادخل الرمز الجديد");
        } else if (error.response.data.Message === "Wrong Code") {
          toast.error("ان الرمز الذي ادخلته خاطئ");
        } else {
          console.error("Error:", error.response.data.Message);
        }
      }
    },

    // إرسال رمز جديد
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
.section_form {
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

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 500px) {
  input {
    width: 50px;
    height: 50px;
  }
}

@media (max-width: 390px) {
  input {
    width: 40px;
    height: 40px;
  }
}
</style>
