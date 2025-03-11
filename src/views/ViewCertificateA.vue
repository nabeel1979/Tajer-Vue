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
          <span><font-awesome-icon :icon="['fas', 'user']" /></span>
          {{ Language === "A" ? "تسجيل الدخول" : "Sign In" }}
        </router-link>
      </div>
      <div class="btn_container">
        <a href="https://bcc.iq" class="btn_style">
          <span><font-awesome-icon :icon="['fas', 'phone']" /></span>
          {{ Language === "A" ? "اتصل بنا" : "Call Us" }}
        </a>
      </div>
      <div class="btn_container">
        <button class="btn_style">
          <span><font-awesome-icon :icon="['fab', 'google-play']" /></span>
          GooglePlay
        </button>
      </div>
      <div class="btn_container">
        <button class="btn_style">
          <span><font-awesome-icon :icon="['fab', 'apple']" /></span>
          AppStore
        </button>
      </div>
    </div>
  </header>
  <main>
    <div class="container_fluid">
      <div class="certificate_wrapperA">
        <div class="show_tableA">
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
                  <p>
                    <span>تاريخها</span> : <span>{{ CertificateDate }}</span>
                  </p>
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
              <p class="info_data">
                <span style="display: inline-block; width: 200px">{{
                  BookInfo.MangerName
                }}</span>
                <span>{{ BookInfo.SourceAddress }}</span>
              </p>
            </div>
            <div class="cell_left_6">
              <p><span>2-</span> المنتج وعنوانه كامل :</p>
              <p class="info_data">{{ BookInfo.ProductDscrp }}</p>
            </div>
          </div>
          <div class="tr_info">
            <div class="cell_right_6 full_height">
              <p><span>3-</span> المستورد وعنوانه كاملا :</p>
              <p class="info_data">
                <span style="display: inline-block; width: 400px">{{
                  BookInfo.TargetName
                }}</span
                ><span>{{ BookInfo.TargetAddress }}</span>
              </p>
            </div>
            <div class="cell_left_6" style="padding: 0">
              <div
                class="inside_cell"
                style="
                  border-bottom: 2px solid black;
                  padding: 5px 15px;
                  height: max-content;
                "
              >
                <p><span>4-</span> بلد المنشأ :</p>
                <p class="info_data">{{ BookInfo.SourceCountry }}</p>
              </div>
              <div
                class="inside_cell"
                style="padding: 10px 15px; height: max-content"
              >
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
              <p class="info_data">{{ BookInfo.Notes }}</p>
            </div>
          </div>
          <div class="tr_info">
            <div class="right_cell_8">
              <p>
                <span>8-</span> وصف السلع العلامة التجارية (إن وجدت) عدد ونوع
                وأرقام الطرود :
              </p>
              <h3 class="info_data">
                <span class="descrp_details_span">
                  {{ BookInfo.DetailsDscrp }}</span
                ><span>{{ BookInfo.DetailsTypeDscrp }}</span>
              </h3>
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
                <p class="info_data">{{ InvoiceDate }}</p>
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
                للشروط و المعايير اللازمة لأكتساب صفة المكان بغداد
              </p>
              <p>التاريخ :</p>
            </div>
            <div class="middle_cell_4">
              <p><span>12-</span> توقيع وختم الجهة المصدرة للشهادة :</p>
              <p style="margin-bottom: 35px">التوقيع :</p>
              <p style="margin-bottom: 35px">الخاتم :</p>
              <p style="margin-bottom: 35px">التاريخ :</p>
            </div>
            <div class="left_cell_4">
              <p><span>13-</span> تصديق الجهة الحكومية المختصة :</p>
              <p style="margin-bottom: 35px">التوقيع :</p>
              <p style="margin-bottom: 35px">الخاتم :</p>
              <p style="margin-bottom: 35px">التاريخ :</p>
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
        DetailsTypeDscrp: "",
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
      return `${dayjs(this.BookInfo.ReferenceDate).format("YYYY")}/${
        this.BookInfo.ReferenceNo
      }`;
    },
    CertificateDate() {
      return dayjs(this.BookInfo.ReferenceDate).format("YYYY-MM-DD");
    },
    InvoiceDate() {
      return dayjs(this.BookInfo.CertificateDate).format("YYYY-MM-DD");
    },
    RegDate() {
      return dayjs(this.BookInfo.RegDate).format("YYYY-MM-DD");
    },
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
          this.BookInfo.Wigth =
            response.data.WigthNum + "" + response.data.Wigth;
          this.BookInfo.CertificateNo = response.data.CertificateNo;
          this.BookInfo.CertificateDate = response.data.CertificateDate;
          this.BookInfo.RegNo = response.data.RegNo;
          this.BookInfo.RegDate = response.data.RegDate;
          this.BookInfo.ReferenceNo = response.data.ReferenceNo;
          this.BookInfo.ReferenceDate = response.data.ReferenceDate;
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
@import url("https://fonts.googleapis.com/css2?family=Changa:wght@200..800&family=Readex+Pro:wght@160..700&display=swap");
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-weight: 400;
}

/* Header Styles */

.main_header {
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  background-color: #060c3b;
  color: white;
}

.main_header .ar_title,
.main_header .eng_title {
  text-align: center;
  width: fit-content;
}

.main_header .ar_title p,
.main_header .eng_title p {
  font-family: "Changa", sans-serif;
  line-height: 26px;
  size: 18px;
}

.main_header .img_title img {
  width: 80px;
  height: 80px;
}

.btn_header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  padding: 5px 0;
  background-color: #ffffff;
}

.btn_header .btn_container {
  flex: 0 0 auto;
  width: 25%;
  text-align: center;
}

.btn_container .btn_style {
  text-decoration: none;
  display: block;
  width: 90%;
  text-align: center;
  margin: 2px;
  padding: 15px 5px;
  background-color: #202329;
  border: 1px solid #fff;
  border-radius: 15px;
  color: #fff;
  font-family: "Changa", sans-serif;
  cursor: pointer;
  font-size: 24px;
  font-weight: 700;
  line-height: 21px;
}

.btn_container .btn_style:hover {
  box-shadow: 0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);
  transform: translateY(-1px);
}

.btn_style span {
  font-size: 12px;
  margin: 0 10px;
}

main {
  background-color: #060c3b;
  height: 100%;
}

.container_fluid {
  width: 99.5%;
  margin: 0 auto;
}

.container_fluid .certificate_wrapperA {
  width: 75%;
  padding: 35px 10px;
  margin: 0 auto;
}

.certificate_wrapperA .show_tableA {
  width: 100%;
  margin: 15px auto;
  background: repeating-linear-gradient(
    to right,
    #c5e6d5 0px,
    #a6f8c8 5px,
    #def3dc 5px,
    #d8f8e0 10px
  );
  border-radius: 25px;
}

.show_table .head_section {
  width: 100%;
}

.head_section .row {
  padding: 25px 0;
  margin-left: 0;
}

.head_section .titles_part {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.titles_part .img_section {
  width: 30%;
  text-align: center;
}

.titles_part .a_title {
  text-align: center;
  width: 30%;
}

.titles_part .e_title {
  text-align: start;
  width: 30%;
}

p,
p span {
  font-size: 16px;
  font-weight: 700;
}

.img_section img {
  width: 75px;
  margin: 0 5px;
}

.head_section .subject_title {
  text-align: center;
  padding: 25px 0;
  line-height: 2.5;
}

.subject_title p {
  font-weight: 700;
  text-decoration: underline;
}

.subject_title h3 {
  font-weight: 600;
}

.head_section td {
  border-bottom: 2px solid black;
}

.tr_info {
  width: 100%;
  text-align: start;
  display: flex;
}

.tr_info .cell_right_6,
.tr_info .cell_left_6 {
  width: 50%;
  min-height: 130px;
  border-top: 2px solid black;
  padding: 5px 15px;
  text-align: start;
  vertical-align: top;
}

.tr_info .cell_left_6 {
  border-right: 2px solid black;
}

.tr_info .full_height {
  height: 100%;
}

.cell_left_6 .inside_cell {
  height: 130px;
}

.tr_info .right_cell_8 {
  width: 60%;
  min-height: 130px;
  border-top: 2px solid black;
  padding: 5px 15px;
  text-align: start;
  vertical-align: top;
}

.tr_info .middle_cell_2,
.tr_info .left_cell_2 {
  width: 20%;
  min-height: 130px;
  border-top: 2px solid black;
  border-right: 2px solid black;
  padding: 5px 15px;
  text-align: start;
  vertical-align: top;
}

.tr_info .right_cell_4,
.tr_info .middle_cell_4,
.tr_info .left_cell_4 {
  width: 33.3%;
  min-height: 130px;
  border-top: 2px solid black;
  padding: 5px 15px;
  text-align: start;
  vertical-align: top;
}

.tr_info .middle_cell_4,
.tr_info .left_cell_4 {
  border-right: 2px solid black;
}

.info_data {
  color: #3c4fdd;
}

.info_data .descrp_details_span {
  display: inline-block;
  width: 400px;
}

.btn_style svg {
  font-size: 24px;
}

h3 {
  font-size: 26px;
}

@media (max-width: 600px) {
  .main_header {
    padding: 15px 5px;
    display: flex;
    justify-content: space-between;
  }

  .main_header .ar_title p,
  .main_header .eng_title p {
    line-height: 15px;
    font-size: 9px;
    width: 150px;
    font-weight: 700;
    margin-bottom: 0;
  }

  .main_header .img_title img {
    width: 60px;
    height: 60px;
  }

  .btn_header {
    width: 97%;
    margin: 0 auto;
    border-radius: 10px;
    padding: 5px;
  }

  .btn_header .btn_container {
    width: 50%;
  }

  .btn_container .btn_style {
    font-size: 20px;
    line-height: 14px;
  }

  .btn_style span {
    font-size: 8px;
    margin: 0 10px;
  }
  /* Main Styles */

  .btn_container .btn_style {
    padding: 5px;
    font-size: 12px;
  }

  .container_fluid {
    width: 99.5%;
    margin: 0 auto;
    padding: 5px;
  }
  .container_fluid .certificate_wrapperA {
    width: 100%;
    padding: 5px 0;
    margin: 0 auto;
  }
  .a_title p,
  .e_title p,
  .e_title p span {
    font-size: 9px;
    font-weight: 700;
    margin: 0;
  }
  .img_section img {
    width: 40px;
  }
  .head_section .row {
    padding: 25px 0 0 0;
  }
  .head_section .subject_title {
    text-align: center;
    padding: 15px 0;
    line-height: 2.5;
  }
  .subject_title p {
    font-weight: 700;
    font-size: 10px;
    margin: 0;
  }
  .subject_title h3 {
    font-weight: 600;
    font-size: 14px;
  }
  .tr_info .right_cell_8 h3 {
    font-size: 18px;
  }
  .tr_info .middle_cell_2 p,
  .tr_info .left_cell_2 p {
    font-size: 9px;
  }

  p,
  span,
  p span {
    font-size: 8px;
  }

  .a_title p,
  .e_title p,
  .subject_title p {
    font-size: 8px;
  }

  .img_section img {
    width: 20px;
  }

  .subject_title h3 {
    font-size: 9px;
  }

  .cell_left_6 .inside_cell {
    height: 30px;
  }

  .tr_info .cell_right_6,
  .tr_info .cell_left_6 {
    min-height: 30px;
  }

  .tr_info .right_cell_8 {
    min-height: 30px;
  }

  .tr_info .middle_cell_2,
  .tr_info .left_cell_2 {
    min-height: 30px;
  }

  .tr_info .right_cell_4,
  .tr_info .middle_cell_4,
  .tr_info .left_cell_4 {
    min-height: 30px;
  }

  .btn_style svg {
    font-size: 12px;
  }

  .info_data .descrp_details_span {
    display: inline-block;
    width: 150px;
  }

  .info_data span {
    font-weight: 700;
  }
}
</style>
