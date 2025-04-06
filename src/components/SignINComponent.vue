<template>
  <div class="col-lg-5 col-sm-10 login_inputs">
    <div class="logo_section">
      <img src="../assets/Image/logo.png" class="logo-img" alt="logo" />
      <h1>تسجيل الدخول</h1>
    </div>

    <!-- عرض اللودينج إذا كان جاري تسجيل الدخول -->
    <div v-if="loading" class="loading-container">
      <Vue3Spinner.ScaleLoader color="#42b883" />
      <p>جاري تسجيل الدخول...</p>
    </div>

    <form v-else @submit.prevent="login">
      <div class="m-auto">
        <div class="form-group text-end">
          <label>رقم الصنف</label>
          <input
            type="text"
            class="form-control"
            v-model="azparaNum"
            @input="validateAzparaNum"
            required
            :class="emailClass"
          />
          <p class="wrong_msg" v-if="ErrorMessage === 'User not found'">
            رقم الصنف غير موجود
          </p>
        </div>
      </div>

      <div class="m-auto">
        <div class="form-group text-end">
          <label>كلمة المرور</label>
          <div class="password_section">
            <input
              :type="passwordFieldType"
              class="form-control"
              v-model="password"
              :class="PassClass"
              required
            />
            <a class="show_password" @click="togglePasswordVisibility">
              <font-awesome-icon :icon="passwordFieldIcon" />
            </a>
          </div>
          <p class="wrong_msg" v-if="ErrorMessage === 'Wrong password'">
            كلمة المرور خاطئة
          </p>
        </div>
      </div>

      <div class="m-auto">
        <div class="form-group text-end">
          <input type="checkbox" class="form-check-input ms-2" />
          <label>تذكر كلمة المرور</label>
        </div>
      </div>

      <div class="m-auto">
        <button
          type="submit"
          class="form-control login-btn"
          :disabled="loading"
        >
          تسجيل الدخول
        </button>
      </div>

      <div class="m-auto">
        <div class="login-links">
          <router-link to="/signup">إنشاء حساب</router-link>
          <router-link to="/resetpassword">نسيت كلمة المرور؟</router-link>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { axiosInstance } from "../axios";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "SignINComponent",
  data() {
    return {
      azparaNum: "",
      password: "",
      showPassword: false,
      ErrorMessage: "",
      Token: "",
      loading: false, // ✅ حالة اللودينج
      emailClass: "", // ✅ تخزين الكلاس هنا بدلاً من computed
      PassClass: "", // ✅ تخزين كلاس كلمة المرور
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },

  watch: {
    ErrorMessage(newValue) {
      if (newValue === "User not found") {
        this.emailClass = "wrong";
        toast.error("رقم الصنف غير موجود، يرجى التحقق وإعادة المحاولة.");
      } else {
        this.emailClass = "";
      }

      if (newValue === "Wrong password") {
        this.PassClass = "wrong";
        toast.error("كلمة المرور غير صحيحة، حاول مرة أخرى.");
      }
    },
  },

  computed: {
    passwordFieldType() {
      return this.showPassword ? "text" : "password";
    },
    passwordFieldIcon() {
      return this.showPassword ? "eye" : "eye-slash";
    },
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },

    validateAzparaNum() {
      if (/[٠-٩]/.test(this.azparaNum)) {
        toast.error(
          "لا يُسمح بإدخال الأرقام العربية. الرجاء استخدام الأرقام الإنجليزية فقط."
        );
      }
      this.azparaNum = this.azparaNum.replace(/[^ء-ي0-9\s]/g, "");
    },

    async login() {
      this.loading = true;
      this.ErrorMessage = "";

      // ✅ **التحقق من طول كلمة المرور فقط عند الضغط على زر تسجيل الدخول**
      if (this.password.length < 8) {
        this.PassClass = "wrong";
        toast.error("كلمة المرور يجب أن تكون 8 أحرف على الأقل.");
        this.loading = false;
        return; // ❌ لا تتابع تنفيذ الطلب إذا كانت كلمة المرور قصيرة
      } else {
        this.PassClass = ""; // ✅ إزالة الإطار الأحمر إذا كان صحيحًا
      }

      try {
        const response = await axiosInstance.post("/auth/login", {
          AzbaraNum: this.azparaNum,
          Password: this.password,
        });

        console.log(response.data);
        const token = response.data.Token;
        this.Token = token;
        localStorage.setItem("Token", token);
        this.router.push("/");
      } catch (error) {
        console.error(error);
        if (error.response && error.response.data) {
          this.ErrorMessage = error.response.data.Message;
          if (this.ErrorMessage === "User is not active") {
            toast.error(
              "لقد تم ارسال طلبك للجهة المعنية بأنتظار الموافقة على تسجيل حسابك"
            );
          }
        } else {
          this.ErrorMessage = "An error occurred";
          toast.error("حدث خطأ قم بمراجعة المصدر أو السيرفر");
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
/* ✅ تصميم عنصر التحميل */
.loading-container {
  text-align: center;
  margin: 20px 0;
}

/* ✅ منع المستخدم من النقر أثناء التحميل */
.login-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.logo_section {
  text-align: center;
}

.logo-img {
  width: 95px;
  height: 95px;
  margin-top: 30px;
}

.login-btn {
  margin-top: 10px;
  background-color: var(--primary-color);
  font-size: 18px;
  font-weight: 900;
  color: var(--font-color);
}

.login-btn:hover {
  background-color: #2e72cc;
  font-size: 20px;
}

.login-links {
  margin-top: 5px;
  display: flex;
  justify-content: space-between;
}

.login-links a {
  font-size: 16px;
  text-decoration: none;
}

.login-links a:hover {
  color: var(--secondary-color);
}

.password_section {
  position: relative;
  display: flex;
  align-items: center;
}

.password_section .show_password {
  position: absolute;
  left: 10px;
  top: 9px;
  cursor: pointer;
  color: black;
}

.password_section .show_password:hover {
  color: rgb(62, 62, 62);
}

.wrong {
  border: 2px solid rgb(175, 0, 0);
}

.wrong_msg {
  color: rgb(175, 0, 0);
  font-size: 12px;
  font-weight: 700;
}

@media (max-width: 500px) {
  .logo-img {
    width: 75px;
    height: 75px;
    margin-top: 20px;
  }

  .login-btn {
    font-size: 16px;
  }

  .login-links a {
    font-size: 14px;
  }
}
</style>
