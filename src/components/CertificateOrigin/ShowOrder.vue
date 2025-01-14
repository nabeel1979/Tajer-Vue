<template>
  <div class="show_container">
    <div class='head_part'>
      <div class="right">
        <p>غرفة تجارة بغداد</p>
        <p>نظام التصدير الالكتروني</p>
        <p class="important">شهادة منشأ</p>
      </div>
      <div class="image_part">
        <img src='../../assets/Image/logo.png' alt='logo' />
        <QrecodeVue v-if="QRValue" :value="QRValue" level="Q" size="75"  class="qr_desktop"/>
      </div>
      <div class="left">
        <p class="important">{{ OrderData.OrderNo }}</p>
        <p>{{ OrderData.OperationName }}</p>
      </div>
    </div>
    <div style="width: 100%; text-align: center">
      <QrecodeVue v-if="QRValue" :value="QRValue" level="Q" size="75"  class="qr_mobile"/>
    </div>
    <hr style="width: 90%; margin: 0 auto; border: 2px solid #000;">
    <div class="details_part">
      <fieldset>
        <legend>معلومات المصدر</legend>
        <div class="field_container">
          <div class="info_row">
            <div class="info">
              <p class="title">رقم الاضبارة</p>
              <p class="dscrp">{{ TagerData.AzbaraNumber }}</p>
            </div>
            <div class="info">
              <p class="title">المدير المفوض</p>
              <p class="dscrp">{{ TagerData.ManagerName }}</p>
            </div>
          </div>
          <div class="info_row">
            <div class="info">
              <p class="title">الاسم التجاري</p>
              <p class="dscrp">{{ TagerData.CompanyName }}</p>
            </div>
            <div class="info">
              <p class="title">عنوان العمل</p>
              <p class="dscrp">{{ TagerData.CompanyAddress }}</p>
            </div>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend>معلومات الشحنة</legend>
        <div class="field_container">
          <div class="info_row">
            <div class="info">
              <p class="title">رقم الفاتورة</p>
              <p class="dscrp">{{ OrderData.CertificateNo }}</p>
            </div>
            <div class="info">
              <p class="title">تاريخ الفاتورة</p>
              <p class="dscrp">{{ formatDate(OrderData.CertificateDate) }}</p>
            </div>
          </div>
          <div class="info_row">
            <div class="info">
              <p class="title">رقم الاجازة</p>
              <p class="dscrp">{{ OrderData.RegNo }}</p>
            </div>
            <div class="info">
              <p class="title">تاريخ انشاء الاجازة</p>
              <p class="dscrp">{{ formatDate(OrderData.RegDate) }}</p>
            </div>
          </div>
          <div class="info_row">
            <div class="info">
              <p class="title">تاريخ انتهاء الاجازة</p>
              <p class="dscrp">{{ formatDate(OrderData.ExpDate) }}</p>
            </div>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend>تفاصيل المادة</legend>
        <div class="field_container">
          <div class="info_row">
            <div class="info">
              <p class="title">تفاصيل الشحن</p>
              <p class="dscrp">{{ OrderData.GenerationDscrp }}</p>
            </div>
            <div class="info">
              <p class="title">المنتج وعنوانة كاملاً</p>
              <p class="dscrp">{{ OrderData.ProductDscrp }}</p>
            </div>
          </div>
          <div class="info_row">
            <div class="info">
              <p class="title">البلد المنشأ</p>
              <p class="dscrp">{{ OrderData.SourceCountry }}</p>
            </div>
            <div class="info">
              <p class="title">وصف السلع</p>
              <p class="dscrp">{{ OrderData.DetailsDscrp }}</p>
            </div>
          </div>
          <div class="info_row">
            <div class="info">
              <p class="title">نوع التعبئة</p>
              <p class="dscrp">{{ OrderData.DetailsTypeDscrp }}</p>
            </div>
            <div class="info">
              <p class="title">الكمية</p>
              <p class="dscrp">{{ OrderData.Wigth + OrderData.WigthNum }}</p>
            </div>
          </div>
          <div class="info_row">
            <div class="info" style="width:100%;">
              <p class="title">الملاحظات</p>
              <p class="dscrp">{{ OrderData.Notes }}</p>
            </div>
          </div>
        </div>
      </fieldset>
      <fieldset>
        <legend>تفاصيل المستورد</legend>
        <div class="field_container">
          <div class="info_row">
            <div class="info">
              <p class="title">اسم المستورد</p>
              <p class="dscrp">{{ OrderData.TargetName }}</p>
            </div>
            <div class="info">
              <p class="title">عنوان المستورد</p>
              <p class="dscrp">{{ OrderData.TargetAddress }}</p>
            </div>
          </div>
        </div>
      </fieldset>
    </div>
  </div>
</template>

<script>
  import QrecodeVue from 'qrcode.vue';
import {axiosInstance} from '../../axios';
import { format } from 'date-fns';
  export default{
    name:'ShowOrder',
    data(){
      return{
        QRValue:'',
        TagerData:{},
        OrderData:[],
      }
    },
    components: {
    QrecodeVue
  },
    created(){
      this.getTagerData();
      this.getOrderData();
    },
    methods:{
      formatDate(date) {
      if (!date) return ''; // Handle null or undefined dates
      return format(new Date(date), 'dd/MM/yyyy');
    },
      async getTagerData(){
        try{
          const response = await axiosInstance.get('/Certifecate/get-Tajer-Data',{
          headers:{
            Authorization: `Bearer ${localStorage.getItem('Token')}`,
            'Accept-Language': 'A'
          }
        })
        this.TagerData = response.data
        } catch(error){
          console.log(error)
        }
      },
      async getOrderData(){
        try{
          const OrderId = this.$route.params.id
        const response = await axiosInstance.get(`/Certifecate/get-Certifecate-List?Id=${OrderId}`,{
          headers:{
            Authorization: `Bearer ${localStorage.getItem('Token')}`,
            'Accept-Language': 'A'
          }
        });

        this.OrderData = response.data.Data[0]
        this.QRValue = `https://tajr.gcc.iq/showorder/${OrderId}`
        } catch(error){
          console.log(error)
        }
      }
    }
  }
</script>

<style scoped>

*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Times New Roman', Times, serif;
}

.show_container{
  width: 100%;
  padding: 35px;
}

.show_container .head_part{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 35px;
}

.head_part div{
  width: 33.3%;
  text-align: center;
}

.head_part p{
  font-size: 18px;
  font-weight: 400;
  line-height: 1.3;
}

.head_part .right{
  text-align: right;
}

.head_part .image_part{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 25px;
}

.head_part .left{
  text-align: left;
}

.head_part .important{
  font-size: 24px;
  font-weight: 700;
}

.head_part img{
  width: 100px;
}

.show_container .details_part{
  margin-top: 35px;
}

.details_part fieldset{
  width: 100%;
  border: 1px solid #ccc;
  padding: 15px;
  border-radius: 15px;
}

fieldset legend{
  float: none;
  width: max-content;
  text-align: center;
  padding: 0 15px;
  font-weight: 600;
}

fieldset .field_container{
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.field_container .info_row{
  display: flex;
  justify-content: start;
  align-items: center;
}

.info_row .info{
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.info .title{
  font-size: 18px;
  font-weight: 600;
}

.info .dscrp{
  padding: 0 10px;
  color: crimson;
  font-weight: 600;
}

.qr_mobile{
  display: none;
}

.qr_desktop{
  display: block;
}

@media(max-width:768px){
  .qr_mobile{
    display: block;
    text-align: center;
    margin-top: 15px;
  }

  .qr_desktop{
  display: none;
}
}
</style>