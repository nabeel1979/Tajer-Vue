<template>
  <header>
    <div class="main_header">
      <div class="ar_title">
        <p>جمهورية العراق</p>
        <p>اتـحـاد الـغـرف الـتـجـاريـة</p>
        <p>غرفة تجارة بغداد</p>
      </div>
      <div class="img_title">
        <img src="../assets/Image/logo.png" alt="logo_img" />
      </div>
      <div class="eng_title">
        <p>Republic Of Iraq</p>
        <p>Federation of Chambers of Commerce</p>
        <p>Chambere Of Baghdad</p>
      </div>
    </div>
    <div class="btn_header">
      <div class="btn_container">
        <router-link to="/login" class="btn_style">
          <span
            ><font-awesome-icon :icon="['fas', 'user']" style="font-size: 24px"
          /></span>
          {{ Language === "A" ? "تسجيل الدخول" : "Sign In" }}
        </router-link>
      </div>
      <div class="btn_container">
        <button class="btn_style">
          <span
            ><font-awesome-icon
              :icon="['fas', 'file-arrow-down']"
              style="font-size: 24px"
          /></span>
          {{ Language === "A" ? "حفظ" : "Save" }}
        </button>
      </div>
      <div class="btn_container">
        <button class="btn_style">
          <span
            ><font-awesome-icon
              :icon="['fab', 'google-play']"
              style="font-size: 24px"
          /></span>
          GooglePlay
        </button>
      </div>
      <div class="btn_container">
        <button class="btn_style">
          <span
            ><font-awesome-icon
              :icon="['fab', 'apple']"
              style="font-size: 24px"
          /></span>
          AppStore
        </button>
      </div>
    </div>
  </header>
  <main>
    <div class="container-fluid">
      <div class="certificate_wrapper">
        <div class="show_table">
          <div class="head_section">
            <div class="full_row row">
              <div class="titles_part">
                <div class="a_title">
                  <p>جمهورية العراق</p>
                  <p>اتحاد الغرف التجارية العراقية</p>
                  <p>غرفة تجارة بغداد</p>
                </div>
                <div class="img_section">
                  <img
                    src="../assets/Image/173494.jpg"
                    alt="Iraqi Trade Union Emblem"
                  />
                  <img
                    src="../assets/Image/Coat_of_arms_of_Iraq.svg"
                    alt="Coat of Arms of Iraq"
                  />
                </div>
                <div class="e_title">
                  <p><span>رقم الشهادة</span> : <span>2024/1385</span></p>
                  <p><span>تاريخها</span> : <span>23-5-2024</span></p>
                </div>
              </div>
              <div class="subject_title">
                <p>شهادة منشأ</p>
                <h3>
                  بموجب احكام اتفاقية تيسير وتنمية التبادل التجاري بين الدول
                  العربية
                </h3>
              </div>
            </div>
          </div>
          <div class="tr_info">
            <div class="cell_right_6">
              <p><span>1-</span> المصدر وعنوانه كاملا :</p>
            </div>
            <div class="cell_left_6">
              <p><span>2-</span> المنتج وعنوانه كامل :</p>
            </div>
          </div>
          <div class="tr_info">
            <div class="cell_right_6 full_height">
              <p><span>3-</span> المستورد وعنوانه كاملا :</p>
            </div>
            <div class="cell_left_6">
              <div class="inside_cell">
                <p><span>4-</span> بلد المنشأ :</p>
              </div>
              <div class="inside_cell">
                <p><span>5-</span> كم تطبيق التراكم مع دول اخرى؟</p>
              </div>
            </div>
          </div>
          <div class="tr_info">
            <div class="cell_right_6">
              <p><span>6-</span> تفاصيل الشحن :</p>
            </div>
            <div class="cell_left_6">
              <p><span>7-</span> ملاحظات :</p>
            </div>
          </div>
          <div class="tr_info">
            <div class="right_cell_8">
              <p>
                <span>8-</span> وصف السلع العلامة التجارية (إن وجدت) عدد ونوع
                وأرقام الطرود :
              </p>
            </div>
            <div class="middle_cell_2">
              <p>
                <span>9-</span> الوزن القائم (كجم) مقاييس أخرى (لتر مكعب ,
                الخ.....)
              </p>
            </div>
            <div class="left_cell_2">
              <div>
                <p><span>10-</span> رقم وتاريخ الفاتورة (الفواتير) :</p>
              </div>
              <hr style="width: 90%; margin: 0 auto" />
              <div>
                <p>رقم الأجازة وتاريخها</p>
              </div>
            </div>
          </div>
          <div class="tr_info">
            <div class="right_cell_4">
              <p>
                <span>11-</span> اقرار و تعهد المصدر : أقر بان جميع البيانات
                المذكورة اعلاه صحيحة و ان السلع (الوارد وصفها اعلاه) مستوفاة
                للشروط و المعايير اللازمة لأكتساب صفة المكان بغداد التاريخ:
              </p>
            </div>
            <div class="middle_cell_4">
              <p><span>12-</span> توقيع وختم الجهة المصدرة للشهادة :</p>
            </div>
            <div class="left_cell_4">
              <p><span>13-</span> تصديق الجهة الحكومية المختصة :</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <footer></footer>
</template>
  
  <script>
import { axiosInstance } from "../axios";
import dayjs from "dayjs";

export default {
  name: "BookView",
  data() {
    return {
      Body: "",
      BookNo: "",
      CreationDate: "",
      Language: "A",
    };
  },
  created() {
    this.GetData();
  },
  computed: {
    formattedDate() {
      return this.CreationDate
        ? dayjs(this.CreationDate).format("DD-MM-YYYY")
        : "";
    },
  },
  methods: {
    async GetData() {
      const CertifecateId = this.$route.params.certificateid;
      try {
        const response = await axiosInstance.get(
          `/Archive/get-certificate-data?id=${CertifecateId}`
        );
        this.Body = response.data.body;
        this.BookNo = response.data.bookNo;
        this.CreationDate = response.data.creationDate;

        // Use JavaScript to hide the images after content is rendered
        this.$nextTick(() => {
          const images = document.querySelectorAll(".book_html_content img");
          images.forEach((img) => {
            img.style.display = "none";
          });
        });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
  
  <style scoped>
@import url(../assets/Css/ViewCertificateA.css);
</style>