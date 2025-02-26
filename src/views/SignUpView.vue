<template>
  <router-link class="back_btn" to="/login" title="العودة لتسجيل الدخول">
    <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
  </router-link>
  <aside class="profile-card">
    <div class="wrapper1">
      <div class="header" dir="ltr">
        <ul>
          <li :class="{ active: currentStep === 1 }">
            <div>
              <p>1</p>
            </div>
          </li>
          <li :class="{ active: currentStep === 2 }">
            <div>
              <p>2</p>
            </div>
          </li>
          <li :class="{ active: currentStep === 3 }">
            <div>
              <p>3</p>
            </div>
          </li>
          <li :class="{ active: currentStep === 4 }">
            <div>
              <p>4</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="form_wrap">
        <!-- Form 1 -->
        <div v-if="currentStep === 1" class="form_1 data_info">
          <CheckAzparaSignUp :formData="formData" @update-data="updateData" @next-step="goToStep(2)" />
        </div>

        <!-- Form 2 -->
        <div v-if="currentStep === 2" class="form_2 data_info">
          <component :formData="formData" :is="selectedGovernorate === 3 ? 'PersonalInfoSignUp' : 'PersonalInfoGove'" @update-data="updateData" @next-step="goToStep(3)" @prev-step="goToStep(1)" />
        </div>

        <!-- Form 3 -->
        <div v-if="currentStep === 3" class="form_3 data_info">
          <RequiredImageSignUp  @update-data="updateData" @next-step="handleNextStep" @prev-step="goToStep(2)" />
        </div>

        <!-- Form 4 -->
        <div v-if="currentStep === 4" class="form_4 data_info">
          <OTPEmail :OtpLength="6" :registerData="registerData" @update-data="updateData" @complete="submitOTP" />
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import { ref } from "vue";
import {axiosInstance} from "../axios";
import CheckAzparaSignUp from "@/components/SignUp/CheckAzparaSignUp.vue";
import PersonalInfoSignUp from "@/components/SignUp/PersonalInfoSignUp.vue";
import PersonalInfoGove from "@/components/SignUp/PersonalInfoGove.vue";
import RequiredImageSignUp from "@/components/SignUp/RequiredImageSignUp.vue";
import OTPEmail from "@/components/SignUp/OTPEmail.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  components: {
    CheckAzparaSignUp,
    PersonalInfoSignUp,
    PersonalInfoGove,
    RequiredImageSignUp,
    OTPEmail,
  },
  setup() {
    const currentStep = ref(1);
    const modalActive = ref(false);
    const formData = ref({});
    const registerData = ref({});
    const selectedGovernorate = ref('');

    const goToStep = (step) => {
      currentStep.value = step;
    };

    const showModal = () => {
      modalActive.value = true;
    };

    const hideModal = () => {
      modalActive.value = false;
    };

    const updateData = (data) => {
      formData.value = { ...formData.value, ...data };
      if (data.GoveId !== undefined) {
        selectedGovernorate.value = data.GoveId;
      }
    };

    const handleNextStep = async () => {
      await submitForm();
    };

    const submitForm = async () => {
  try {
    const response = await axiosInstance.post('/auth/sendOrder', formData.value, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data);
    registerData.value = response.data; // Store response data in registerData
    if (response.data) {
      goToStep(4);
      showModal();
    }
  } catch (error) {
    if (error.response && error.response.data.Message === 'User already exists') {
      toast.error('هذا الايميل مستخدم سابقاً');
    } else {
      toast.error('حدث خطأ أثناء إرسال النموذج');
      console.log(error);
    }
  }
};

    return {
      currentStep,
      modalActive,
      formData,
      registerData,
      selectedGovernorate,
      goToStep,
      showModal,
      hideModal,
      updateData,
      handleNextStep,
      submitForm,
    };
  },
};
</script>

<style scoped>
@import "../assets/Css/SignUp.css";
.back_btn {
  position: absolute;
  top: 5%;
  left: 5%;
  background-color: var(--primary-color);
  padding: 10px 15px;
  color: #fff;
  border-radius: 50%;
  font-size: 20px;
}

.back_btn:hover {
  background-color: var(--primary-color-hover);
}

@media(max-width:500px){
  .back_btn {
  position: absolute;
  top: 1%;
  left: 1%;
}
}
</style>