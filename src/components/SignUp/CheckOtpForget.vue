<template>
  <div class="modal" v-if="isVisible">
    <div class="modal-content">
      <router-link to="/login">
        <span class="close" @click="closeAll">&times;</span>
      </router-link>
      <div class="logo_section">
        <img src="../../assets/Image/logo.png" alt="logo" />
      </div>
      <h2>أدخل رمز التحقق</h2>
      <p>تم إرسال رمز التحقق إلى {{ Whatsapp === null ? email : Whatsapp }}</p>

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
              @paste="handlePaste($event)"
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
import { axiosInstance } from "../../axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  props: {
    isVisible: Boolean,
    email: String,
    AzbaraNum: String,
    OtpLength: {
      type: Number,
      default: 6,
    },
    Whatsapp: {
      type: Boolean,
      default: null,
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
      handler(newValues) {
        this.otpCombined = newValues.join("");
        if (this.otpCombined.length === this.OtpLength) {
          this.submitOtp(); // تحقق تلقائي عند اكتمال الكود
        }
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
        if (error.response && error.response.data) {
          const errorMessage = error.response.data.Message;

          if (errorMessage === "User not found") {
            toast.error("البريد الإلكتروني الذي أدخلته غير مرتبط بحساب");
          } else if (errorMessage === "Wrong Code") {
            toast.error("الرمز الذي أدخلته غير صحيح، يرجى المحاولة مرة أخرى");
          } else {
            toast.error("الرمز غير صحيح يرجئ المحاول مره اخرئ");
          }
        } else {
          toast.error("تعذر الاتصال بالخادم، يرجى التحقق من الإنترنت");
        }
      }
    },
    closeAll() {
      this.$emit("close");
    },
    handleInput(event, index) {
      if (event.target.value.length >= 1 && index < this.OtpLength - 1) {
        this.$refs.otpInput[index + 1].focus();
      }
    },
    moveToPrevious(event, index) {
      if (event.key === "Backspace" && index > 0 && !event.target.value) {
        this.$refs.otpInput[index - 1].focus();
      }
    },
    handlePaste(event) {
      event.preventDefault();
      const pasteData = event.clipboardData.getData("text").trim();
      if (pasteData.length === this.OtpLength) {
        this.otpValues = pasteData.split("");
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
      try {
        const response = await axiosInstance.post("/auth/resend-code", {
          azbaraNumber: this.email,
        });
        if (response.data) {
          this.timeLeft = 60;
          this.startTimer();
          toast.success(
            "تم إعادة إرسال رمز التحقق، يرجى التحقق من البريد الإلكتروني"
          );
        }
      } catch (error) {
        console.log(error);
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
}

.logo_section {
  text-align: center;
}

.logo_section img {
  width: 95px;
  height: 95px;
}

.otp_section {
  margin: 20px 0;
}

.otp_section input {
  padding: 8px;
  text-align: center;
  width: 60px;
  height: 60px;
  margin-right: 0.5em;
  border: 2px solid #ccc;
  border-radius: 5px;
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

label {
  margin-bottom: 15px;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

@media (max-width: 500px) {
  input {
    width: 40px;
    height: 40px;
  }
}
</style>
