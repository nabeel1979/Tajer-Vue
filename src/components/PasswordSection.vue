<template>
  <div class="edit_password_container">
    <h2 style="text-align: center">تغيير كلمة المرور</h2>
    <div class="inputs_fields">
      <label>كلمة المرور الحالية</label>
      <div class="password_section">
        <input
          :type="CurrentPasswordFieldType"
          class="form-control"
          name="CurrentPassword"
          :class="PassClass"
          v-model="CurrentPassword"
        />
        <a class="show_password" @click="toggleCurrentPasswordVisibility">
          <font-awesome-icon :icon="CurrentPasswordFieldIcon" />
        </a>
      </div>
    </div>
    <div class="inputs_fields">
      <label>كلمة المرور الجديدة</label>
      <div class="password_section">
        <input
          :type="NewPasswordFieldType"
          class="form-control"
          name="NewPassword"
          v-model="NewPassword"
        />
        <a class="show_password" @click="toggleNewPasswordVisibility">
          <font-awesome-icon :icon="NewPasswordFieldIcon" />
        </a>
      </div>
    </div>
    <div class="inputs_fields">
      <label>تأكيد كلمة المرور الجديدة</label>
      <div class="password_section">
        <input
          :type="ConfirmNewPasswordFieldType"
          name="ConfirmNewPassword"
          class="form-control"
          v-model="ConfirmNewPassword"
        />
        <a class="show_password" @click="toggleConfirmNewPasswordVisibility">
          <font-awesome-icon :icon="ConfirmNewPasswordFieldIcon" />
        </a>
      </div>
      <div style="margin-top: 10px; line-height: 0.5">
        <p v-if="!passwordsMatch" class="wrong_msg">كلمات المرور غير متطابقة</p>
        <p v-if="!passwordsLength" class="wrong_msg">
          كلمات المرور يجب ان تكون اكثر من 5 حقول
        </p>
      </div>
      <div class="m-auto">
        <button
          type="button"
          @click="EditPassword"
          :disabled="!passwordsMatch || !passwordsLength"
          :class="[
            'form-control',
            'login-btn',
            { disabled: !passwordsMatch || !passwordsLength },
          ]"
        >
          تغيير كلمة المرور
        </button>
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
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { axiosInstance } from "../axios";

export default {
  data() {
    return {
      CurrentPassword: "",
      NewPassword: "",
      ConfirmNewPassword: "",
      showCurrentPassword: false,
      showNewPassword: false,
      showConfirmNewPassword: false,
      ErrorMessage: "",
      loading: "",
    };
  },
  computed: {
    CurrentPasswordFieldType() {
      return this.showCurrentPassword ? "text" : "password";
    },
    CurrentPasswordFieldIcon() {
      return this.showCurrentPassword ? "eye" : "eye-slash";
    },
    NewPasswordFieldType() {
      return this.showNewPassword ? "text" : "password";
    },
    NewPasswordFieldIcon() {
      return this.showNewPassword ? "eye" : "eye-slash";
    },
    ConfirmNewPasswordFieldType() {
      return this.showConfirmNewPassword ? "text" : "password";
    },
    ConfirmNewPasswordFieldIcon() {
      return this.showConfirmNewPassword ? "eye" : "eye-slash";
    },
    PassClass() {
      return this.ErrorMessage === "Wrong password" ? "wrong" : "";
    },
    passwordsMatch() {
      return this.NewPassword === this.ConfirmNewPassword;
    },
    passwordsLength() {
      return this.NewPassword.length >= 5;
    },
  },
  methods: {
    toggleCurrentPasswordVisibility() {
      this.showCurrentPassword = !this.showCurrentPassword;
    },
    toggleNewPasswordVisibility() {
      this.showNewPassword = !this.showNewPassword;
    },
    toggleConfirmNewPasswordVisibility() {
      this.showConfirmNewPassword = !this.showConfirmNewPassword;
    },

    async EditPassword() {
  this.loading = true; // Indicate loading state
  this.ErrorMessage = ""; // Clear previous error messages

  try {
    const response = await axiosInstance.post("/auth/edit-password", {
      Password: this.CurrentPassword,
      NewPassword: this.NewPassword,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    });

    if (response.data === true) {
      toast.success("تم تغيير كلمة المرور بنجاح");
      setTimeout(() => {
            this.loading = false;
            this.$router.push('/');
          }, 2000);
    }
  } catch (error) {
    if (error.response.data.Message === "Wrong password") {
        toast.error("كلمة المرور الحالية غير صحيحة");
        this.ErrorMessage = "Wrong password";
      } else {
        toast.error(error.response.data.Message || "حدث خطأ غير متوقع");
      }
  } finally {
    this.loading = false; // Reset loading state
  }
}

  },
};
</script>

<style scoped>
.edit_password_container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: max-content;
  box-shadow: 0 0 10px 1px rgb(195, 195, 195);
  padding: 50px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  border-radius: 15px;
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

.login-btn:disabled {
  background-color: #c9c9c9;
  font-size: 20px;
}

.disabled {
  opacity: 0.5;
  cursor: not-allowed;
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
  .login-img {
    display: none;
  }
}
</style>