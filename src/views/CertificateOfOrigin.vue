<template>
  <aside class="profile-card">
    <div class="wrapper1" :style="{ height: PageHeight + 'px' }">
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
          <li :class="{ active: currentStep === 5 }">
            <div>
              <p>5</p>
            </div>
          </li>
          <li :class="{ active: currentStep === 6 }">
            <div>
              <p>6</p>
            </div>
          </li>
          <li :class="{ active: currentStep === 7 }">
            <div>
              <p>7</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="form_wrap">
        <!-- Form 1 -->
        <div v-if="currentStep === 1" class="form_1 data_info">
          <CertificateLanguage
            :formData="formData"
            @height="setHeight"
            @next-step="goToStep(2)"
            @language_data="setlanguage"
          />
        </div>

        <!-- Form 2 -->
        <div v-if="currentStep === 2" class="form_2 data_info">
          <TraderInformation
            @next-step="goToStep(3)"
            @prev-step="goToStep(1)"
            :Language="formData.Lang"
          />
        </div>
        <!-- Form 3 -->
        <div v-if="currentStep === 3" class="form_2 data_info">
          <ShipmentInfo
            :formData="formData"
            @next-step="goToStep(4)"
            @prev-step="goToStep(2)"
            @shipment-info="setShipmentInfo"
            :Language="formData.Lang"
          />
        </div>

        <!-- Form 4 -->
        <div v-if="currentStep === 4" class="form_3 data_info">
          <SubjectDetails
            :formData="formData"
            @height="setHeight"
            @next-step="goToStep(5)"
            @prev-step="goToStep(3)"
            @subject-details="setSubjectDetails"
            @item-class-name="setItemClass"
            :Language="formData.Lang"
          />
        </div>

        <!-- Form 5 -->
        <div v-if="currentStep === 5" class="form_4 data_info">
          <ImporterDetails
            :formData="formData"
            @height="setHeight"
            @prev-step="goToStep(4)"
            @next-step="goToStep(6)"
            @importer-info="setImporterDetails"
            @country-name="setCountry"
            :Language="formData.Lang"
          />
        </div>

        <!-- Form 6 -->
        <div v-if="currentStep === 6" class="form_4 data_info">
          <PreviewData
            @height="setHeight"
            @prev-step="goToStep(5)"
            @complete="submitData"
            @importer-info="setImporterDetails"
            :FormData="formData"
            :Language="formData.Lang"
            :loading="loading"
            :itemClassName="ItemsClassName"
            :CountryName="CountryName"
          />
        </div>

        <!-- Form 7 -->
        <div v-if="currentStep === 7" class="form_4 data_info">
          <Payments
            @height="setHeight"
            @importer-info="setImporterDetails"
            :FormData="formData"
            :Language="formData.Lang"
            :OrderNO="OrderNO"
            :Amount="Amount"
          />
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import { ref, reactive } from "vue";
import CertificateLanguage from "@/components/CertificateOrigin/CertificateLanguage.vue";
import TraderInformation from "@/components/CertificateOrigin/TraderInformation.vue";
import ShipmentInfo from "@/components/CertificateOrigin/ShipmentInfo.vue";
import SubjectDetails from "@/components/CertificateOrigin/SubjectDetails.vue";
import ImporterDetails from "@/components/CertificateOrigin/ImporterDetails.vue";
import PreviewData from "../components/CertificateOrigin/PreviewData.vue";
import Payments from "../components/CertificateOrigin/Payments.vue";
import { axiosInstance } from "../axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
  components: {
    CertificateLanguage,
    TraderInformation,
    ShipmentInfo,
    SubjectDetails,
    ImporterDetails,
    PreviewData,
    Payments,
  },
  data() {
    return {
      PageHeight: "",
      OrderNO: "",
      Amount: "",
      loading: false,
      ItemsClassName: "",
      CountryName: "",
    };
  },
  async created() {
    try {
      const response = await axiosInstance.get("/home/user-data", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      });
      this.userData = response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      localStorage.removeItem("Token");
      this.$router.push("/login");
    }
  },
  methods: {
    setItemClass(itemClass) {
      this.ItemsClassName = itemClass;
    },
    setCountry(country) {
      this.CountryName = country;
    },
    setHeight(height) {
      this.PageHeight = height;
    },
    setShipmentInfo(shipmentInfo) {
      this.formData.CertificateNo = shipmentInfo.CertificateNo;
      this.formData.CertificateDate = shipmentInfo.CertificateDate;
      this.formData.RegNo = shipmentInfo.RegNo;
      this.formData.RegDate = shipmentInfo.RegDate;
      this.formData.ExpDate = shipmentInfo.ExpDate;
    },
    setSubjectDetails(subjectDetails) {
      this.formData.GenerationDscrp = subjectDetails.GenerationDscrp;
      this.formData.ProductDscrp = subjectDetails.ProductDscrp;
      this.formData.DetailsDscrp = subjectDetails.DetailsDscrp;
      this.formData.DetailsTypeDscrp = subjectDetails.DetailsTypeDscrp;
      this.formData.Wigth = subjectDetails.Wigth;
      this.formData.WigthNum = subjectDetails.WigthNum;
      this.formData.Notes = subjectDetails.Notes;
      this.formData.ServiceId = subjectDetails.ServiceId;
      this.formData.ItemsClassID = subjectDetails.ItemsClassID;
    },
    setImporterDetails(importerDetails) {
      console.log(this.formData);
      this.formData.TargetName = importerDetails.TargetName;
      this.formData.TargetAddress = importerDetails.TargetAddress;
      this.formData.CountryID = importerDetails.CountryID;
    },
    async submitData() {
      this.loading = true;
      try {
        const response = await axiosInstance.post(
          "/Certifecate/add-Certifecate",
          this.formData,
          {
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              Accept: "*/*",
              "Accept-Language": `${this.formData.Lang}`,
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
          }
        );
        if (response.data) {
          console.log(response.data);
          this.OrderNO = response.data.OrderNo;
          this.Amount = response.data.Amount;
          this.loading = false;
          this.showModal();
          this.goToStep(7);
        }
      } catch (error) {
        console.error("Error submitting data:", error);
        toast.error("حدث خطأ ما يرجى اعادة المحاولة لاحقاً.");
      }
    },
  },
  setup() {
    const currentStep = ref(1);
    const modalActive = ref(false);
    const formData = reactive({
      Lang: "",
    });

    const goToStep = (step) => {
      currentStep.value = step;
    };

    const showModal = () => {
      modalActive.value = true;
    };

    const hideModal = () => {
      modalActive.value = false;
    };

    const setlanguage = (language) => {
      formData.Lang = language;
    };

    return {
      currentStep,
      modalActive,
      goToStep,
      showModal,
      hideModal,
      setlanguage,
      formData,
    };
  },
};
</script>

<style scoped>
@import "../assets/Css/OriginCertificate.css";
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

@media (max-width: 500px) {
  .back_btn {
    position: absolute;
    top: 1%;
    left: 1%;
  }
}
</style>
