<template>
  <CheckEmailForget
    v-if="isModalVisible"
    :isVisible="isModalVisible"
    @email-submitted="handleEmailSubmission"
  />
  <CheckOtpForget
    v-else
    :OtpLength="6"
    :isVisible="isOtpVisible"
    @close="closeAll"
    @token-received="handleTokenSubmission"
    :email="email"
    :AzbaraNum="AzparaNum"
    :Whatsapp="whatsapp"
  />
  <ResetPasswordForm :token="token" />
</template>

<script>
import CheckEmailForget from '@/components/SignUp/CheckEmailForget.vue';
import CheckOtpForget from '@/components/SignUp/CheckOtpForget.vue';
import ResetPasswordForm from '@/components/SignUp/ResetPasswordForm.vue';

export default {
  data() {
    return {
      isModalVisible: true,
      isOtpVisible: false,
      email: "",
      whatsapp:"",
      AzparaNum:"",
      token: ""
    }
  },
  components: {
    CheckEmailForget,
    CheckOtpForget,
    ResetPasswordForm
  },
  methods: {
    closeAll() {
      this.isModalVisible = false;
      this.isOtpVisible = false;
    },
    handleEmailSubmission(AzparaNum,Email,Whatsapp) {
      this.AzparaNum = AzparaNum
      this.email = Email;
      this.whatsapp = Whatsapp
      this.isModalVisible = false;
      this.isOtpVisible = true;
    },
    handleTokenSubmission(token) {
      this.token = token;
      this.isOtpVisible = false;
    }
  },
}
</script>

<style scoped>
</style>
