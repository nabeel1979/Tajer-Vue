<template>
  <div>
    <h2>طريقة الدفع</h2>
    <form>
      <div class="form_container">
        <div class="input_wrap">
          <div class="d-flex justify-content-around">
            <div class="form-check">
              <input
                class="form-check-input"
                type="radio"
                checked
                name="flexRadioDefault"
                id="zaincash"
              />
              <label class="form-check-label" for="zaincash">
                <img src="../../assets/Image/mastercard.png" width="100" />
              </label>
            </div>
          </div>
        </div>
        <h3 class="text-center">سيتم استقطاع مبلغ ({{ Amount }}) من حسابك</h3>
        <br />
        <h3 class="text-center">رقم الطلب الخاص بك هو</h3>
        <h3 class="text-center">({{ OrderNO }})</h3>
      </div>
    </form>
    <transition name="fade">
      <div v-if="loading" class="loading-overlay">
        <div class="spinner"></div>
      </div>
    </transition>
    <div class="btn_wrapper">
      <button class="next_btn" @click="GoHome">أدفع</button>
    </div>
  </div>
</template>

<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "PaymentsComponent",
  props: {
    OrderNO: {
      type: String,
      required: true,
    },
    Amount: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      height: 600,
      loading: false,
    };
  },
  created() {
    this.$emit("height", this.height);
  },
  computed: {
    iframeSrc() {
      return `/orderinvoice/${this.OrderNO}`;
    },
  },
  methods: {
    GoHome() {
      this.loading = true;
      toast.warning(
        "عملية الدفع الالكتروني متوقفة حالياً,يرجى مراجعة غرفة تجارة بغداد لدفع المبلغ واستكمال المعاملة"
      );

      setTimeout(() => {
        window.open(this.iframeSrc, '_blank')
      }
      , 4000)

      setTimeout(() => {
        this.$router.push("/");
      }, 10000);
    },
  },
};
</script>

<style scoped>
fieldset {
  border: 1px solid #ccc;
  text-align: center;
  padding: 10px;
  border-radius: 10px;
}

fieldset legend {
  padding: 0 7px;
  float: none;
  width: fit-content;
  text-align: start;
  font-size: 20px;
}

fieldset .data_container {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.data_container .data_row {
  display: flex;
  justify-content: start;
  align-items: start;
}

.data_row .data_col {
  width: 48%;
  text-align: start;
}

.data_col span {
  color: rgb(173, 17, 0);
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
</style>
