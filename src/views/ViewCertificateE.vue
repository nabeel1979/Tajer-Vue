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
        <a href="https://bcc.iq" class="btn_style">
          <span
            ><font-awesome-icon
              :icon="['fas', 'phone']"
              style="font-size: 24px"
          /></span>
          {{ Language === "A" ? "اتصل بنا" : "Call Us" }}
        </a>
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
    <div v-if="ResponseStatus === 'not_found'" class="container_fluid">
      <h1 style="text-align: center; padding: 45px; color: white;">هذه المعلومات غير متوفرة</h1>
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
              <p class="info_data">{{ Wigth }}</p>
            </div>
            <div class="cell_1">
              <p>6. Marks and numbers of packages</p>
            </div>
            <div class="cell_6">
              <p>7. Number and kind of packages : description of goods.</p>
              <p class="info_data">{{ DetailsDscrp }}</p>
            </div>
            <div class="cell_1">
              <p>8. Origin criterion (see Notes overleat)</p>
              <p class="info_data">{{ SourceCountry }}</p>
            </div>
            <div class="cell_1">
              <p>9. Gross weight or other quantity</p>
              <p class="info_data">{{ DetailsTypeDscrp }}</p>
            </div>
            <div class="cell_1_last">
              <p>10. Number and date of invoices</p>
              <p class="info_data">{{ CertificateNo }}</p>
              <p class="info_data">{{ CertificatesDate }}</p>
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
      ResponseStatus:'',
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
      DetailsDscrp: "",
      SourceCountry: "",
      DetailsTypeDscrp: "",
      CertificateNo: "",
      CertificateDate: "",
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
            this.DetailsDscrp = response.data.DetailsDscrp;
            this.SourceCountry = response.data.SourceCountry;
            this.DetailsTypeDscrp = response.data.DetailsTypeDscrp;
            this.CertificateNo = response.data.CertificateNo;
            this.CertificateDate = response.data.CertificateDate;
          }
        } else {
          this.ResponseStatus = 'not_found';
        }
      } catch (error) {
        console.error;
      }
    },
  },
};
</script>
    
    <style scoped>
@import url(../assets/Css/ViewCertificateE.css);
</style>