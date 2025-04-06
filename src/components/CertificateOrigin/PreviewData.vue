<template>
  <div>
    <fieldset>
      <legend>
        {{ language === "A" ? "تفاصيل المصدر" : "Source details" }}
      </legend>
      <div class="data_container">
        <div class="data_row">
          <div class="data_col">
            <p>{{ language === "A" ? "رقم الاضبارة:" : "File number:" }}</p>
            <p>
              <span>{{ userData.AzbaraNumber }}</span>
            </p>
          </div>
          <div class="data_col">
            <p>{{ language === "A" ? "الاسم التجاري:" : "Trade Name:" }}</p>
            <p>
              <span>{{ userData.CompanyName }}</span>
            </p>
          </div>
        </div>
        <div class="data_row">
          <div class="data_col">
            <p>
              {{ language === "A" ? "المدير المفوض:" : "Managing Director:" }}
            </p>
            <p>
              <span>{{ userData.ManagerName }}</span>
            </p>
          </div>
          <div class="data_col">
            <p>{{ language === "A" ? "عنوان المصّدر:" : "Address:" }}</p>
            <p>
              <span>{{ userData.CompanyAddress }}</span>
            </p>
          </div>
        </div>
      </div>
    </fieldset>

    <fieldset>
      <legend>
        {{ language === "A" ? "معلومات الشحنة" : "Shipment Information" }}
      </legend>
      <div class="data_container">
        <div class="data_row">
          <div class="data_col">
            <p>{{ language === "A" ? "رقم الفاتورة" : "Invoice Number" }}</p>
            <p>
              <span>{{ formData.CertificateNo }}</span>
            </p>
          </div>
          <div class="data_col">
            <p>{{ language === "A" ? "تاريخ الفاتورة" : "Invoice Date" }}</p>
            <p>
              <span>{{ formData.CertificateDate }}</span>
            </p>
          </div>
        </div>
        <div class="data_row">
          <div class="data_col">
            <p>{{ language === "A" ? "رقم الاجازة" : "License Number" }}</p>
            <p>
              <span>{{ formData.RegNo }}</span>
            </p>
          </div>
          <div class="data_col">
            <p>
              {{
                language === "A" ? "تاريخ انشاء الشهادة" : "License Create Date"
              }}
            </p>
            <p>
              <span>{{ formData.RegDate }}</span>
            </p>
          </div>
        </div>
        <div class="data_row">
          <div class="data_col">
            <p>
              {{
                language === "A"
                  ? "تاريخ انتهاء الاجازة"
                  : "License Expire Date"
              }}
            </p>
            <p>
              <span>{{ formData.ExpDate }}</span>
            </p>
          </div>
        </div>
      </div>
    </fieldset>

    <fieldset>
      <legend>
        {{ language === "A" ? "تفاصيل المادة" : "Subject Details" }}
      </legend>
      <div class="data_container">
        <div class="data_row">
          <div class="data_col">
            <p>{{ language === "A" ? "تفاصيل الشحن" : "Shipping Details" }}</p>
            <p>
              <span>{{ formData.GenerationDscrp }}</span>
            </p>
          </div>
          <div class="data_col">
            <p>
              {{
                language === "A"
                  ? "المنتج وعنوانة كاملاً"
                  : "Product and Full address"
              }}
            </p>
            <p>
              <span>{{ formData.ProductDscrp }}</span>
            </p>
          </div>
        </div>
        <div class="data_row">
          <div class="data_col">
            <p>{{ language === "A" ? "بلد المنشأ" : "Country of Origin" }}</p>
            <p>
              <span>{{ language === "A" ? "العراق" : "Iraq" }}</span>
            </p>
          </div>
          <div class="data_col">
            <p>{{ language === "A" ? "المكان" : "Place" }}</p>
            <p>
              <span>{{ language === "A" ? "بغداد" : "Baghdad" }}</span>
            </p>
          </div>
        </div>
        <div class="data_row">
          <div class="data_col">
            <p>
              {{ language === "A" ? "صنف المادة" : "Material Classification" }}
            </p>
            <p>
              <span>{{
                language === "A" && ClassNameData?.DscrpA
                  ? ClassNameData.DscrpA
                  : ClassNameData?.DscrpE || "غير موجود"
              }}</span>
            </p>
          </div>
        </div>
        <div class="data_row">
          <div class="data_col">
            <p>{{ language === "A" ? "نوع التعبئة" : "Packing type" }}</p>
            <p>
              <span>{{ formData.DetailsTypeDscrp }}</span>
            </p>
          </div>
          <div class="data_col">
            <p>{{ language === "A" ? "الوزن القائم" : "Weight" }}</p>
            <p>
              <span>{{ formData.Wigth + formData.WigthNum }}</span>
            </p>
          </div>
        </div>
        <div class="data_row">
          <div class="data_col">
            <p>{{ language === "A" ? "الملاحظات" : "Notes" }}</p>
            <p>
              <span>{{ formData.Notes }}</span>
            </p>
          </div>
        </div>
      </div>
    </fieldset>

    <fieldset>
      <legend>
        {{ language === "A" ? "تفاصيل المستورد" : "Importer Details" }}
      </legend>
      <div class="data_container">
        <div class="data_row">
          <div class="data_col">
            <p>{{ language === "A" ? "اسم المستورد" : "Importer Name" }}</p>
            <p>
              <span>{{ formData.TargetName }}</span>
            </p>
          </div>
          <div class="data_col">
            <p>
              {{ language === "A" ? "البلد المستورد" : "Importing country" }}
            </p>
            <div v-if="country && country.DscrpA">
              <p>{{ country.DscrpA }}</p>
            </div>
            <div v-else>
              <p>{{ language === "A" ? "غير موجود" : "Not Available" }}</p>
            </div>
          </div>
        </div>
        <div class="data_row">
          <div class="data_col">
            <p>{{ language === "A" ? "عنوان المستورد" : "Importer Name" }}</p>
            <p>
              <span>{{ formData.TargetAddress }}</span>
            </p>
          </div>
        </div>
      </div>
    </fieldset>

    <fieldset>
      <legend>{{ language === "A" ? "الفاتورة" : "The Invoice" }}</legend>
      <div class="data_container">
        <div class="data_row">
          <p class="data_col">
            {{ language === "A" ? "نوع الفاتورة" : "Invoice type" }}
          </p>
          <p class="data_col">
            <span>{{ PriceData.Dscrp }}</span>
          </p>
        </div>
        <div class="data_row" v-for="price in prices" :key="price.Id">
          <p class="data_col">{{ price.Dscrp }}</p>
          <p class="data_col">
            <span>{{ price.Amount }}</span>
          </p>
        </div>
        <hr />
        <div class="data_row">
          <p class="data_col">
            {{ language === "A" ? "المجموع :" : "Total :" }}
          </p>
          <p class="data_col">
            <span>{{ PriceData.TotalAmount }}</span>
          </p>
        </div>
      </div>
    </fieldset>

    <transition name="fade">
      <div v-if="showModal" class="modal-overlay">
        <div class="modal-content">
          <h3>{{ language === "A" ? "هل أنت متأكد؟" : "Are you sure?" }}</h3>
          <p>
            {{
              language === "A"
                ? "عند ضغطك على كلمة (تأكيد) سوف يتم ارسال بياناتك لغرفة تجارة بغداد, سيتم المباشرة في معاملتك بعد تسديد الأجور"
                : "When you click on the word (Confirm), you will be transferred to the payment interface and you cannot return to cancel the process."
            }}
          </p>
          <div class="modal-buttons">
            <button @click="confirmYes">
              {{ language === "A" ? "تأكيد" : "Confirm" }}
            </button>
            <button @click="confirmNo" class="cancel_btn">
              {{ language === "A" ? "ألغاء" : "Cancel" }}
            </button>
          </div>
        </div>
      </div>
    </transition>

    <div class="btn_wrapper">
      <button class="next_btn" @click="showConfirmationModal">
        <span v-if="loading" class="loading-spinner" :disabled="loading"></span>
        <span v-else>{{ language === "A" ? "تأكيد" : "Confirm" }}</span>
      </button>
      <button class="back_btn" @click="$emit('prev-step')">
        {{ language === "A" ? "السابق" : "Previous" }}
      </button>
    </div>
  </div>
</template>

<script>
import { axiosInstance } from "../../axios";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "PersonalInfo",
  props: {
    Language: {
      type: String,
      required: true,
    },
    FormData: {
      type: Object,
      required: true,
    },
    loading: {
      type: Boolean,
    },
    itemClassName: {
      type: String,
      required: true,
    },
    CountryName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showModal: false,
      height: 1910,
      language: this.Language,
      formData: this.FormData,
      userData: {},
      PriceData: {},
      prices: [],
      CountryNameData: this.CountryName,
      ClassNameData: this.itemClassName,
      country: {}, // ✅ تعريف المتغير هنا
    };
  },
  created() {
    this.TradeInfo();
    this.InvoicePrices();

    if (!this.ClassNameData) {
      console.error("ClassNameData is missing!");
    }

    this.$emit("height", this.height);

    // ✅ تحديث قيمة country عند التحميل الأولي
    this.updateCountry();
  },
  watch: {
    CountryName() {
      // ✅ إزالة المتغير غير المستخدم
      this.updateCountry();
    },
  },
  methods: {
    updateCountry() {
      if (this.CountryName) {
        this.country = { DscrpA: this.CountryName }; // ✅ تحديث البيانات بشكل صحيح
      } else {
        this.country = {
          DscrpA: this.language === "A" ? "غير موجود" : "Not Available",
        };
      }
    },
    showConfirmationModal() {
      this.showModal = true;
    },
    confirmYes() {
      this.showModal = false;
      this.$emit("complete");
    },
    confirmNo() {
      this.showModal = false;
      toast.info(
        this.language === "A" ? "تم إلغاء الإجراء" : "Action cancelled"
      );
    },
    async TradeInfo() {
      try {
        const response = await axiosInstance.get(
          "/Certifecate/get-Tajer-Data",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
              "Accept-Language": `${this.language}`,
            },
          }
        );

        this.userData = response.data;
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    },
    async InvoicePrices() {
      try {
        const token = localStorage.getItem("Token");

        const response = await axiosInstance.get(
          "/Certifecate/get-Certifecate-prices",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        this.PriceData = response.data;
        this.prices = this.PriceData.Prices;
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
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

.loading-spinner {
  border: 2px solid #f3f3f3;
  border-radius: 50%;
  border-top: 2px solid #3498db;
  width: 12px;
  height: 12px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
  display: inline-block;
  margin-right: 5px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  width: 30%;
  background: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}

.modal-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.modal-buttons button {
  padding: 10px 20px;
  border: none;
  background-color: #3498db;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}

.modal-buttons button:hover {
  background-color: #2980b9;
}

.modal-buttons .cancel_btn {
  background-color: #ccc;
}

.modal-buttons .cancel_btn:hover {
  background-color: #717171;
}

@media (max-width: 769px) {
  .modal-content {
    width: 90%;
    background: white;
    padding: 20px;
    border-radius: 5px;
    text-align: center;
  }
}
</style>
