<template>
  <page size="A4">
    <div id="print-content">
      <div class="head_section">
      <div class="country_info">
        <div style="text-align: right; width: fit-content">
          <p class="ar">جمهورية العراق</p>
          <p class="ar">اتحاد الغرف التجارية العراقية</p>
          <p class="ar">غرفة تجارة بغداد</p>
        </div>
      </div>
      <div>
        <img
          src="../../assets/Image/logo.png"
          alt="logo chamber"
        />
      </div>
      <div class="country_info">
        <div style="text-align: right; width: fit-content">
          <p class="en">The Republic of Iraq</p>
          <p class="en">Federation of Iraqi Chambers of Commerce</p>
          <p class="en">Baghdad Chamber of Commerce</p>
        </div>
      </div>
    </div>
    <hr style="border: 1px solid #000" />
    <div class="body_section">
      <div class="payment_label">
        <p v-if="OrderData.State === 1" class="pay">مدفوعة</p>
        <p v-else class="not_pay">غير مدفوعة</p>
      </div>
      <div class="service_content">
        <h3>الخدمة شهادة المنشأ</h3>
      </div>
      <div class="invoice_info">
        <div class="information_invoice">
          <h2>إيصال الدفع</h2>
          <div class="date_info">
            <p style="width: 80px">رقم الطلب</p>
            :
            <p>{{ OrderData.OrderNumber }}</p>
          </div>
          <div class="date_info">
            <p style="width: 80px">التاريخ</p>
            :
            <p>{{ OrderData.Date }}</p>
          </div>
        </div>
        <div class="qr_info">
          <QrecodeVue v-if="QRValue" :value="QRValue" level="Q" class="qr_img" />
        </div>
      </div>
      <div class="properties_company">
        <h2>خصائص الشركة او المكتب</h2>
        <hr
          style="
            width: 45%;
            border: 1px solid #000;
            border-radius: 5px;
            margin: 5px 0 15px 0;
          "
        />
        <div class="properties_row">
          <h3 style="width: 100px">رقم الاضبارة</h3>
          :
          <h3>{{ OrderData.AzbaraNumber }}</h3>
        </div>
        <div class="properties_row">
          <h3 style="width: 100px">اسم التاجر</h3>
          :
          <h3>{{ OrderData.Name }}</h3>
        </div>
        <div class="properties_row">
          <h3 style="width: 100px">الاسم التجاري</h3>
          :
          <h3>{{ OrderData.TraderTitle }}</h3>
        </div>
      </div>
      <div class="fees_section">
        <h2>الرسوم</h2>
        <div class="details_amount">
          <div style="width: 80%">
            <h3>التفاصيل</h3>
            <p v-for="Dscrp in PriceDetails" :key="Dscrp.id">
              {{ Dscrp.Dscrp }}
            </p>
          </div>
          <div style="width: 20%">
            <h3>المبلغ</h3>
            <p v-for="amount in PriceDetails" :key="amount.id">
              {{ formatNumberWithColon(amount.Amount) }}
            </p>
          </div>
        </div>
      </div>
      <div class="total_sum">
        <div style="width: 70%"></div>
        <div style="width: 30%; display: flex">
          <p style="margin-left: 15px">المجموع:</p>
          <p>{{ formatNumberWithColon(OrderData.TotalAmount) }}</p>
        </div>
      </div>
    </div>
    <hr style="border: 1px solid #000" />
    <div class="footer_section">
      <div class="location">
        <p>Baghdad, Iraq Al-nhar ST</p>
        <span
          ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path
              d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
            /></svg
        ></span>
      </div>
      <div class="emails">
        <div>
          <p>info@bcc.iq.com</p>
          <p>bcoc@baghdadchamber.com</p>
        </div>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
            />
          </svg>
        </span>
      </div>
      <div class="phone_number">
        <div>
          <p>07729776692</p>
          <p>07718810607</p>
        </div>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path
              d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"
            />
          </svg>
        </span>
      </div>
    </div>
    </div>
  </page>
  <button @click="PrintPage" title="طباعة" class="print_btn no-print">
    <font-awesome-icon :icon="['fas', 'print']" />
  </button>
  <button @click="DownloadPage" title="تحميل" class="download_btn no-print">
    <font-awesome-icon :icon="['fas', 'download']" />
  </button>
</template>

<script>
  import appSetting from '../../appSetting';
  import QrecodeVue from 'qrcode.vue';
import {axiosInstance} from "../../axios";
import html2pdf from "html2pdf.js";
export default {
  name: "PrintPage",
  data() {
    return {
      QRValue:'',
      OrderData:{},
      PriceDetails:[],
      OrderNo: null
    };
  },
  components: {
    QrecodeVue
  },
  created(){
    this.getData();
  },
  methods:{
    PrintPage(){
      window.print();
    },

    DownloadPage() {
      const element = document.getElementById('print-content');
      const options = {
        margin: 0,
        filename: `invoice_${this.OrderNo}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'A4', orientation: 'portrait' }
      };
      html2pdf().from(element).set(options).save();
    },

    formatNumberWithColon(value) {
    if (!value) return '';
    // Convert the number to a string and use regex to add a colon every three digits
    return Number(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
    async getData(){
      const OrderNO = this.$route.params.orderNumber
      this.OrderNo = OrderNO
      this.QRValue = `${appSetting.QrUrl}/orderinvoice/${OrderNO}`;
      try{
        const response = await axiosInstance.get(`/Certifecate/get-Certifecate-Details?orderNumber=${OrderNO}`);

        if(response.data){
          this.OrderData = response.data
          this.PriceDetails = response.data.PaymentDetails
        }

     } catch(error){
      console.error(error);
      }
    }
  }
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Times New Roman";
}

h3 {
  font-size: 1.17em;
  font-weight: 700;
}

button{
  position: fixed;
  padding: 10px 6px;
  border-radius: 50%;
  border: 1px solid #ccc;
  outline: none;
}

.print_btn{
  right: 50px;
  bottom: 50px;
  background-color: rgb(42, 68, 237);
  color: white;
}

.download_btn{
  right: 105px;
  bottom: 50px;
  background-color: rgb(12, 121, 6);
  color: white;
}

.head_section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.head_section .country_info {
  display: flex;
  flex-direction: column;
  width: 40%;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
}

.head_section .country_info .ar {
  text-align: center;
}

.head_section .country_info .en {
  text-align: center;
}

.head_section img {
  width: 75px;
  height: 75px;
}

page {
  background: white;
  display: block;
  margin: 0 auto;
  margin-bottom: 0.5cm;
  box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);
}

page[size="A4"] {
  width:210mm; 
  height:297mm;
}

.body_section {
  width: 100%;
  position: relative;
  overflow: hidden;
}

.body_section .payment_label {
  position: absolute;
  left: 20px;
  top: 30px;
  width: 160px;
  text-align: center;
  font-size: 18px;
  color: white;
  margin-top: 2px;
  float: left;
}

.payment_label .pay {
  width: 100%;
  background-color: green;
  padding: 8px 0;
  border-radius: 10px;
}

.payment_label .not_pay {
  width: 100%;
  background-color: rgb(156, 0, 0);
  padding: 8px 0;
  border-radius: 10px;
}

.body_section .service_content {
  margin-top: 25px;
  text-align: center;
}

.body_section .invoice_info {
  display: flex;
  justify-content: space-between;
  padding: 0 25px;
  margin-top: 35px;
}

.invoice_info .information_invoice {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.information_invoice h2 {
  font-size: 32px;
}

.information_invoice .date_info {
  display: flex;
  gap: 10px;
}

.date_info p {
  font-size: 19px;
  font-weight: 600;
}

.invoice_info .qr_info .qr_img {
  width: 125px;
  height: 125px;
  object-fit: fill;
}

.body_section .properties_company {
  margin-top: 20px;
  padding: 0 25px;
  line-height: 1.7;
}

.properties_company h2 {
  font-size: 32px;
}

.properties_company .properties_row {
  display: flex;
  gap: 10px;
  font-size: 18px;
}

.body_section .fees_section {
  padding: 0 25px;
  margin-top: 20px;
  height: 430px;
}

.fees_section h2 {
  font-size: 32px;
  margin-bottom: 15px;
}

.details_amount {
  width: 100%;
  display: flex;
}

.details_amount > div {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.details_amount p {
  font-size: 19px;
  font-weight: 600;
}

.total_sum {
  padding: 10px 25px;
  width: 100%;
  display: flex;
  margin-bottom: 30px;
}

.total_sum > div {
  width: 50%;
  display: flex;
}

.total_sum > div p {
  font-size: 18px;
  font-weight: 600;
}

.footer_section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 25px;
}

.footer_section .location,
.footer_section .emails,
.footer_section .phone_number {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  text-align: left;
}

svg {
  width: 15px;
  margin: 0 10px;
}

@media (max-width: 768px){
  page {
  background: white;
  display: block;
  margin: 0 auto;
  margin-bottom: 0.5cm;
  box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);
}

page[size="A4"] {
  width: 100%;
  height: 100%;
}

.head_section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.head_section .country_info {
  display: flex;
  flex-direction: column;
  width: 40%;
  font-size: 8px;
  font-weight: 600;
  line-height: 1.5;
}

.head_section img {
  width: 50px;
  height: 50px;
  margin-left: 45px;
}

h3 {
  font-size: 0.8em;
  font-weight: 700;
}

.body_section .payment_label {
  position: absolute;
  left: 10px;
  top: 30px;
  width: 100px;
  text-align: center;
  font-size: 12px;
  color: white;
  margin-top: 2px;
  float: left;
}

.body_section .invoice_info {
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
  margin-top: 25px;
}

.invoice_info .information_invoice {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.information_invoice h2 {
  font-size: 24px;
  font-weight: 600;
}

.date_info p {
  font-size: 14px;
  font-weight: 600;
}

.invoice_info .qr_info .qr_img {
  width: 75px !important;
  height: 75px !important;
  margin-top: 15px;
}

.body_section .properties_company {
  margin-top: 15px;
  padding: 0 15px;
}

.properties_company h2 {
  font-size: 24px;
  font-weight: 600;
}

.properties_company .properties_row {
  font-size: 18px;
}

.body_section .fees_section {
  padding: 0 15px;
  margin-top: 10px;
  height: 200px;
}

.fees_section h2 {
  font-size: 24px;
}

.details_amount p {
  font-size: 14px;
}

.total_sum {
  padding: 10px 15px;
}

.total_sum > div p {
  font-size: 14px;
}

.footer_section {
  padding: 15px 15px;
}

.footer_section .location,
.footer_section .emails,
.footer_section .phone_number {
  font-size: 12px;
}

svg {
  width: 14px;
}
}

@media print {
  @page {
    size: A4;
    margin: 0;
  }

  body {
    margin: 0;
    padding: 0;
    box-shadow: none;
  }

  .no-print {
    display: none;
  }

  page {
    margin: 0;
    box-shadow: none;
  }
}
</style>
