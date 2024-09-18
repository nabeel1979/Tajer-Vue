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
                  <p>
                    <span>رقم الشهادة</span> : <span>{{ CertificateNo }}</span>
                  </p>
                  <p><span>تاريخها</span> : <span>{{ CertificateDate }}</span></p>
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
              <p class="info_data">{{ BookInfo.SourceName }}</p>
              <p class="info_data"><span style="display:inline-block; width: 200px;">{{ BookInfo.MangerName }}</span> <span>{{ BookInfo.SourceAddress }}</span></p>
            </div>
            <div class="cell_left_6">
              <p><span>2-</span> المنتج وعنوانه كامل :</p>
              <p class="info_data">{{ BookInfo.ProductDscrp }}</p>
            </div>
          </div>
          <div class="tr_info">
            <div class="cell_right_6 full_height">
              <p><span>3-</span> المستورد وعنوانه كاملا :</p>
              <p class="info_data"><span style="display:inline-block; width: 400px;">{{ BookInfo.TargetName }}</span><span>{{ BookInfo.TargetAddress }}</span></p>
            </div>
            <div class="cell_left_6">
              <div class="inside_cell">
                <p><span>4-</span> بلد المنشأ :</p>
                <p class="info_data">{{ BookInfo.SourceCountry }}</p>
              </div>
              <div class="inside_cell">
                <p><span>5-</span> كم تطبيق التراكم مع دول اخرى؟</p>
              </div>
            </div>
          </div>
          <div class="tr_info">
            <div class="cell_right_6">
              <p><span>6-</span> تفاصيل الشحن :</p>
              <p class="info_data">{{ BookInfo.GenerationDscrp }}</p>
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
              <h3 class="info_data"><span style="width: 400px; display: inline-block;">{{ BookInfo.DetailsDscrp }}</span><span>{{ BookInfo.DetailsTypeDscrp }}</span></h3>
            </div>
            <div class="middle_cell_2">
              <p>
                <span>9-</span> الوزن القائم (كجم) مقاييس أخرى (لتر مكعب ,
                الخ.....)
              </p>
              <p class="info_data">{{ BookInfo.Wigth }}</p>
            </div>
            <div class="left_cell_2">
              <div>
                <p><span>10-</span> رقم وتاريخ الفاتورة (الفواتير) :</p>
                <p class="info_data">{{ BookInfo.CertificateNo }}</p>
                <p class="info_data">{{ BookInfo.DetailsDscrp }}</p>
              </div>
              <hr style="width: 90%; margin: 0 auto" />
              <div>
                <p>رقم الأجازة وتاريخها</p>
                <p class="info_data">{{ BookInfo.RegNo }}</p>
                <p class="info_data">{{ RegDate }}</p>
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
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "BookView",
  data() {
    return {
      Language: "A",
      BookInfo: {
        SourceName: "",
        MangerName: "",
        SourceAddress: "",
        ProductDscrp: "",
        TargetName: "",
        TargetAddress: "",
        SourceCountry: "",
        GenerationDscrp: "",
        Notes: "",
        DetailsDscrp: "",
        DetailsTypeDscrp:"",
        Wigth: "",
        CertificateNo: "",
        CertificateDate: "",
        RegNo: "",
        RegDate: "",
        ReferenceNo: "",
        ReferenceDate: "",
      },
    };
  },
  created() {
    this.GetData();
  },
  computed: {
    CertificateNo() {
      return `${dayjs(Date.now()).format("YYYY")}/${this.BookInfo.ReferenceNo}`;
    },
    CertificateDate() {
      return dayjs(this.BookInfo.ReferenceDate).format("YYYY-MM-DD")
    },
    RegDate(){
      return dayjs(this.BookInfo.RegDate).format("YYYY-MM-DD")
    }
  },
  methods: {
    async GetData() {
      const CertifecateId = this.$route.params.certificateid;
      try {
        const response = await axiosInstance.get(
          `/Archive/get-certificate-data?id=${CertifecateId}`
        );
        if (response.data) {
          this.BookInfo.SourceName = response.data.SourceName;
          this.BookInfo.MangerName = `م.م  ${response.data.ManagerName}`;
          this.BookInfo.SourceAddress = response.data.SourceAdress;
          this.BookInfo.ProductDscrp = response.data.ProductDscrp;
          this.BookInfo.TargetName = response.data.TargetName;
          this.BookInfo.TargetAddress = response.data.TargetAddress;
          this.BookInfo.SourceCountry = response.data.SourceCountry;
          this.BookInfo.GenerationDscrp = response.data.GenerationDscrp;
          this.BookInfo.Notes = response.data.Notes;
          this.BookInfo.DetailsDscrp = response.data.DetailsDscrp;
          this.BookInfo.DetailsTypeDscrp = response.data.DetailsTypeDscrp;
          this.BookInfo.Wigth = response.data.Wigth;
          this.BookInfo.CertificateNo = response.data.CertificateNo;
          this.BookInfo.CertificateDate = response.data.CertificateDate;
          this.BookInfo.RegNo = response.data.RegNo;
          this.BookInfo.RegDate = response.data.RegDate;
          this.BookInfo.ReferenceNo = response.data.ReferenceNo;
          this.BookInfo.ReferenceDate = response.data.ReferenceDate;

          console.log(this.BookInfo)
        } else {
          console.log("no data");
          toast.error("لقد حدث خطأ في جلب البيانات");
        }

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