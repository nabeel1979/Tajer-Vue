<template>
  <div class="section_form">
    <h2>إنشاء شهادة منشأ</h2>
    <section>
      <div class="text-center">
        <img src="../../assets/Image/logo.png" alt="Logo" width="200" />
      </div>
    </section>
    <div>
      <h4 style="text-align: center;">قم بأختيار لغة شهادة المنشأ</h4>
    </div>
    <div>
      <select
        id="language-select"
        class="dropdown2 dropdown-toggle"
        v-model="selectLanguage"
        required
      >
        <option disabled value="">اختر اللغة</option>
        <option value="A">اللغة العربية</option>
        <option value="E">English</option>
      </select>
    </div>
    <span>
      <p>*عزيزي المصّدر اذا كنت تصدر منتوجك الى الدول الاجنبية أختر اللغة الانكليزية واذا كنت تصدر منتوجك الى الدول العربية أختر اللغة العربية</p>
    </span>
  </div>
  <div class="btn_wrapper">
    <button
      class="next_btn"
      type="button"
      @click="handleNextStep"
    >
      التالي
    </button>
  </div>
</template>

<script>
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
export default {
  name: 'CertificateLanguage',
  props:['formData'],
  data() {
    return {
      selectLanguage: this.formData.Lang || '',
      height:800
    };
  },
  created(){
    this.$emit('height',this.height)
  },
  methods: {
    handleNextStep() {
      if (this.selectLanguage === '') {
        toast.warning('يرجى إختيار لغة شهادة المنشأ')
      } else {
        this.$emit('language_data', this.selectLanguage);
        this.$emit('next-step');
      }
    },
  },
};
</script>

<style scoped>
  span{
    display: flex;
    color: red;
    padding: 25px 0;
    font-size: 17px;
    font-weight: 600;
  }
</style>