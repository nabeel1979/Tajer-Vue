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
    <div v-if="ResponseStatus === 'not_found'" class="container_fluid">
      <h1 style="text-align: center; padding: 45px; color: white">
        هذه المعلومات غير متوفرة
      </h1>
    </div>
    <div v-else class="container_fluid">
      <div class="certificate_wrapper">
        <div class="show_table">
          <div class="row_section">
            <div class="cell_left_6_2">
              <div class="upper_info">
                <p>
                  1. Good consigned from (Export's business name, address ,
                  country )
                </p>
                <p class="info_data">
                  <span>{{ SourceName }}</span>
                  <span style="margin-left: 15px">{{ ManagerName }}</span>
                </p>
                <p class="info_data">{{ SourceAddress }}</p>
              </div>
              <div class="last_info">
                <p>
                  2. Goods consigned to (Consignee's name, address , country )
                </p>
                <p class="info_data">{{ TargetName }}</p>
                <p class="info_data">{{ TargetAddress }}</p>
              </div>
            </div>
            <div class="cell_right_6">
              <p>
                <b
                  >Reference No.A
                  <span class="info_data" style="margin-left: 15px">{{
                    ReferencesNo
                  }}</span></b
                >
              </p>
              <div class="book_data">
                <div>
                  <p>GENERALIZED SYSTEM OF PREFERNCES</p>
                  <p>CERTIFICATE OF ORIGIN</p>
                  <p>(combned declaration and certificate )</p>
                  <p>FORMA</p>
                  <div>
                    <div class="line_description">
                      <span>issued in </span>
                      <span class="extension">
                        <p><b>REPUBLIC OF IRAQ</b></p>
                        <p>
                          .....................................................................
                        </p>
                        <p>(COUNTRY)</p>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="bottom_row_info">
                  <div>
                    <p>BAGHDAD CHAMBER OF COMMERCE</p>
                    <p>BAGHDAD -REPUBLIC OF IRAQ</p>
                  </div>
                  <img src="@/assets/Image/logo2.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div class="row_section">
            <div class="cell_left_6">
              <p>3. Means of transport and route (as far as known)</p>
              <p class="info_data">{{ GenerationDscrp }}</p>
            </div>
            <div class="cell_right_6">
              <p>4. For official use</p>
              <p class="info_data">{{ ReferencesDate }}</p>
            </div>
          </div>
          <div class="row_section">
            <div class="cell_1">
              <p>5. Item number</p>
              <p class="info_data">{{ WigthNumber }}</p>
              <p class="info_data">{{ Wigth }}</p>
            </div>
            <div class="cell_1">
              <p>6. Marks and numbers of packages</p>
            </div>
            <div class="cell_6">
              <div style="height: 50%">
                <p>7. Number and kind of packages : description of goods.</p>
                <p class="info_data">{{ DetailsDscrp }}</p>
              </div>
              <div style="border-top: 1px solid #000">
                <p>Notes :</p>
                <p class="info_data">{{ Notes }}</p>
              </div>
            </div>
            <div class="cell_1">
              <p>8. Origin criterion (see Notes overleat)</p>
              <p class="info_data">Iraq</p>
            </div>
            <div class="cell_1">
              <p>9. Gross weight or other quantity</p>
              <p class="info_data">{{ DetailsTypeDscrp }}</p>

              <p>Wigth Details</p>
              <p class="info_data"></p>
            </div>
            <div class="cell_1_last">
              <p>10. Number and date of invoices</p>
              <p class="info_data">{{ CertificateNo }}</p>
              <p class="info_data">{{ CertificatesDate }}</p>
              <hr style="border: 1px dashed; margin: 20px 0" />
              <p>Leave number and date</p>
              <p class="info_data">{{ regNo }}</p>
              <p class="info_data">{{ regDate }}</p>
            </div>
          </div>
          <div class="row_section">
            <div class="cell_left_6" style="border-bottom: none">
              <div style="height: 80%">
                <p>11. Certification</p>
                <p>
                  it is hereby certified , on the basis of control carried out ,
                  that the declaration by the exporter is correct
                </p>
              </div>
              <hr style="border: none; border-bottom: 2px dashed black" />
              <p>place and data , sigature and stamp of</p>
            </div>
            <div class="cell_right_6" style="border-bottom: none">
              <p>12. Declaration by the exporter</p>
              <p>
                the undersigned hereby declaes that the above details and
                statements are correct; that all the goods were produced in
              </p>
              <hr style="border: none; border-bottom: 2px dashed black" />
              <p style="padding: 10px; text-align: center">(country)</p>
              <p style="text-align: center">
                and that they comply with the orgin requirements specified for
                those goods in the Generailzed System of Preferences for goods
                exported to .
              </p>
              <hr style="border: none; border-bottom: 2px dashed black" />
              <p style="padding: 10px; text-align: center">
                (importing country)
              </p>
              <hr style="border: none; border-bottom: 2px dashed black" />
              <p>place and data signature of authorised signatory</p>
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
  name: "CertificateEView",
  data() {
    return {
      ResponseStatus: "",
      Language: "E",
      SourceName: "",
      ManagerName: "",
      SourceAddress: "",
      TargetName: "",
      TargetAddress: "",
      ReferenceNo: "",
      ReferenceDate: "",
      GenerationDscrp: "",
      Wigth: "",
      WigthNumber: "",
      regNo: "",
      regData: "",
      DetailsDscrp: "",
      SourceCountry: "",
      DetailsTypeDscrp: "",
      CertificateNo: "",
      CertificateDate: "",
      Notes: "",
    };
  },
  created() {
    this.GetData();
  },
  computed: {
    ReferencesNo() {
      return `${this.ReferenceNo} / ${dayjs(this.ReferenceDate).format(
        "YYYY"
      )}`;
    },
    ReferencesDate() {
      return dayjs(this.ReferenceDate).format("YYYY-MM-DD");
    },
    CertificatesDate() {
      return dayjs(this.CertificateDate).format("YYYY-MM-DD");
    },
    regDate() {
      return dayjs(this.regData).format("YYYY-MM-DD");
    },
  },
  methods: {
    async GetData() {
      const CertifecateId = this.$route.params.certificateid;

      try {
        const response = await axiosInstance.get(
          `/Archive/get-certificate-data?id=${CertifecateId}`
        );
        if (CertifecateId !== null) {
          if (this.Language === response.data.Lang) {
            this.SourceName = response.data.SourceName;
            this.ManagerName = `MM. ${response.data.ManagerName}`;
            this.SourceAddress = response.data.SourceAdress;
            this.TargetName = response.data.TargetName;
            this.TargetAddress = response.data.TargetAddress;
            this.ReferenceNo = response.data.ReferenceNo;
            this.ReferenceDate = response.data.ReferenceDate;
            this.GenerationDscrp = response.data.GenerationDscrp;
            this.Wigth = response.data.Wigth;
            this.WigthNumber = response.data.WigthNum;
            this.regNo = response.data.RegNo;
            this.regData = response.data.RegDate;
            this.DetailsDscrp = response.data.DetailsDscrp;
            this.SourceCountry = response.data.SourceCountry;
            this.DetailsTypeDscrp = response.data.DetailsTypeDscrp;
            this.CertificateNo = response.data.CertificateNo;
            this.CertificateDate = response.data.CertificateDate;
            this.Notes = response.data.Notes;
          }
        } else {
          this.ResponseStatus = "not_found";
        }
      } catch (error) {
        console.error;
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
  font-size: 16px !important;
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
  border-top: 1px solid gray;
  border-bottom: 1px solid gray;
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

.container_fluid .certificate_wrapper {
  width: 60%;
  padding: 35px 10px;
  margin: 0 auto;
}

.certificate_wrapper .show_table {
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
  direction: ltr;
}

.show_table .row_section {
  width: 100%;
  text-align: start;
  display: flex;
}

.row_section .cell_right_6,
.row_section .cell_left_6 {
  width: 50%;
  min-height: 130px;
  padding: 10px 25px;
  border-bottom: 2px solid black;
  text-align: start;
  vertical-align: top;
}

.row_section .cell_left_6 {
  border-right: 2px solid black;
}

.row_section .cell_left_6_2 {
  width: 50%;
  min-height: 130px;
  text-align: start;
  vertical-align: top;
}

.row_section .cell_left_6_2 {
  border-right: 2px solid black;
  border-bottom: 2px solid black;
}

.row_section .cell_left_6_2 .upper_info {
  border-bottom: 2px solid;
  height: max-content;
}

.cell_left_6_2 .upper_info,
.cell_left_6_2 .last_info {
  padding: 10px 25px;
}

.cell_right_6 .book_data {
  text-align: center;
  line-height: 1;
}

.book_data .line_description {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: 5px 25px 5px 0;
}

.line_description .extension {
  display: flex;
  flex-direction: column;
  line-height: 1;
}

.book_data .bottom_row_info {
  display: flex;
  justify-content: center;
  align-items: end;
  gap: 25px;
}

.bottom_row_info img {
  width: 120px;
}

.row_section .cell_1,
.row_section .cell_1_last,
.row_section .cell_6 {
  min-height: 350px;
  padding: 10px 25px;
  border-bottom: 2px solid black;
  text-align: start;
  vertical-align: top;
}

.row_section .cell_1 {
  width: 15%;
  border-right: 2px solid black;
}

.row_section .cell_6 {
  width: 50%;
  border-right: 2px solid black;
}

.info_data {
  color: #3c4fdd;
}

.btn_style svg {
  font-size: 24px;
}

@media (max-width: 1369px) {
  .row_section .cell_1,
  .row_section .cell_1_last,
  .row_section .cell_6 {
    min-height: 350px;
    padding: 10px 5px;
    border-bottom: 2px solid black;
    text-align: start;
    vertical-align: top;
  }
}

@media (max-width: 600px) {
  /* Header Styles */
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

  .btn_container .btn_style {
    padding: 5px;
    font-size: 12px;
  }

  .btn_header .btn_container {
    width: 50%;
  }

  .btn_style span {
    font-size: 8px;
    margin: 0 10px;
  }
  /* Main Styles */

  .container_fluid .certificate_wrapper {
    width: 95%;
    padding: 15px 5px;
    margin: 0 auto;
  }

  .row_section .cell_right_6,
  .row_section .cell_left_6 {
    min-height: 30px;
    padding: 10px 5px;
  }

  .bottom_row_info img {
    width: 50px;
  }

  .row_section .cell_1,
  .row_section .cell_1_last,
  .row_section .cell_6 {
    min-height: 150px;
    padding: 10px 5px;
  }

  p,
  span {
    font-size: 8px;
  }

  .row_section .cell_left_6_2 .upper_info {
    border-bottom: 2px solid;
    height: max-content;
  }

  .btn_style svg {
    font-size: 12px;
  }
}
</style>
