<template>
  <div class="shadow-lg bg-white rounded login-container container-fluid">
    <div class="row m-auto">
      <div class="col-lg-5 col-sm-10 forget_continer">
        <div class="text-center">
          <img src="../../assets/Image/logo.png" class="logo-img" alt="logo" />
          <h1>تغيير كلمة المرور</h1>
        </div>
        <form @submit.prevent="changePassword">
          <div class="m-auto">
            <div class="form-group">
              <label>كلمة المرور الجديدة</label>
              <input
                type="password"
                class="form-control"
                v-model="newPassword"
              />
            </div>
          </div>
          <div class="m-auto">
            <div class="form-group">
              <label>تأكيد كلمة المرور </label>
              <input
                type="password"
                class="form-control"
                v-model="confirmPassword"
              />
              <p v-if="!passwordsMatch" class="wrong_msg">
                كلمات المرور غير متطابقة
              </p>
            </div>
          </div>
          <div class="m-auto">
            <button
              class="form-control login-btn"
              :disabled="!passwordsMatch || !newPassword || !confirmPassword"
            >
              تغيير كلمة المرور
            </button>
          </div>
        </form>
      </div>
      <div class="col-lg-7 col-sm-0">
        <div class="img-col">
          <div class="login-img">
            <h1 class="heading-name">غرفة تجارة بغداد</h1>
            <img src="../../assets/Image/logo.png" alt="LoginPhoto" />
            <p>BAGHDAD CHAMBER OF COMMERCE</p>
            <p>IRAQ - 1926</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <transition name="fade">
      <div v-if="loading" class="loading-overlay">
        <div class="spinner"></div>
      </div>
    </transition>
</template>

<script>
import {axiosInstance} from '../../axios';
import { useRouter } from 'vue-router';
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  props: {
    token: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      newPassword: "",
      confirmPassword: "",
      loading:"",
    };
  },
  computed: {
    passwordsMatch() {
      return this.newPassword === this.confirmPassword;
    },
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    async changePassword() {
      this.loading = true;
      if (this.passwordsMatch) {
        try {
          const response = await axiosInstance.post(
            "/auth/change-password",
            { password: this.newPassword },
            {
              headers: {
                Authorization: `Bearer ${this.token}`,
              },
            }
          );
          if (response.status === 200) {
            toast.success("تم تحديث كلمة المرور بنجاح")
            setTimeout(() => {
            this.loading = false;
            this.router.push('/login');
          }, 5000);

          } else {
            toast.error("حدث حطأ, لم يتم تحديث كلمة المرور")
          }
        } catch (error) {
          console.error(error);
          toast.warning("An error occurred while changing the password.")
        }
      } else {
        toast.info("كلمات المرور غير متطابقة")
      }
    },
  },
};
</script>

  <style scoped>
.login-container {
  margin-top: 120px;
  border-radius: 40px !important;
  height: 70vh;
  width: 90%;
}

.forget_continer {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.heading-name {
  font-family: "Thulith";
  color: var(--font-color);
  text-align: center;
  font-size: 72px;
  padding-top: 80px;
}

.login-img {
  width: 102%;
  height: 100%;
  border-radius: 40px 0 0 40px;
  background: var(--primary-color);
  text-align: center;
  color: var(--font-color);
}

.login-img img {
  width: 250px;
  opacity: 90%;
  margin-bottom: 30px;
}

.login-img p {
  font-weight: 900;
}

.img-col {
  height: 70vh;
}

.logo-img {
  width: 95px;
  height: 95px;
  margin-top: 30px;
}

.login-btn {
  margin-top: 40px;
  background-color: var(--primary-color);
  font-size: 18px;
  font-weight: 900;
  color: var(--font-color);
}

.login-btn:hover {
  background-color: #2e72cc;
  transform: translateY(-2px);
  box-shadow: 0 0 12px 1px #6d6d6d;
  transition: box-shadow 1s ease-in;
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

@media(max-width:500px){
  .login-img {
  display: none;
}
}
</style>
  