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
            <span><i class="fa-solid fa-user" style="font-size: 24px"></i></span>
            {{Language === 'A'? 'تسجيل الدخول' : 'Sign In'}}
          </router-link>
        </div>
        <div class="btn_container">
          <button class="btn_style">
            <span
              ><i class="fa-solid fa-file-arrow-down" style="font-size: 24px"></i
            ></span>
            {{Language === 'A' ? 'حفظ' : 'Save'}}
          </button>
        </div>
        <div class="btn_container">
          <button class="btn_style">
            <span
              ><i class="fa-brands fa-google-play" style="font-size: 24px"></i
            ></span>
            GooglePlay
          </button>
        </div>
        <div class="btn_container">
          <button class="btn_style">
            <span
              ><i class="fa-brands fa-apple" style="font-size: 24px"></i
            ></span>
            AppStore
          </button>
        </div>
      </div>
    </header>
    <main>
      <div class="container-fluid">
      <div class="btn_wrap">
        <a v-if="Language === 'E'" :href="`https://baghdadchamber.bcc.iq/CertificateOfOrigin/${CertificateId}`" class="data">View Information</a>
        <a v-else :href="`https://baghdadchamber.bcc.iq/CertificateOfOriginA/${CertificateId}`" class="data">عرض البيانات</a>
        <router-link :to="`/showcrtificate/${CertificateId}`" class="files">{{Language === 'A'? 'عرض الوثائق' : 'View documents'}}</router-link>
      </div>
    </div>
    </main>
    <footer></footer>
  </template>
  
  <script>
  import { axiosInstance } from "../axios";
  
  export default {
    name: "ChambersTemplate",
    data(){
      return {
        CertificateId:'',
        Language:''
      }
    },
    created() {
      this.GetData();
    },
    methods: {
      async GetData() {
        const certificateId = this.$route.params.idNumber;
        try {
          const response = await axiosInstance.get(
            `/Archive/get-certificate?id=${certificateId}`
          );
          this.Language = response.data.language;
          this.CertificateId = response.data.id;
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
    font-family: "Readex Pro", sans-serif;
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
    size: 16px;
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
    font-family: "Times New Roman", Times, serif;
    cursor: pointer;
    font-size: 28px;
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
  
  main{
    background-color: #060c3b;
  }
  
  .container-fluid{
    width: 99.5%;
    height: 80vh;
    margin: 0 auto;
    position: relative;
  }
  
  .container-fluid .btn_wrap{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 500px;
    height: 400px;
    background-color: #fff;
    border-radius: 25px;
    padding: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    flex-direction: column;
    gap: 65px;
  }
  
  .btn_wrap button,
  .btn_wrap a{
    text-decoration: none;
    border: 1px solid #ccc;
    border-radius: 10px;
    width: 90%;
    color: white;
    font-size: 32px;
    text-align: center;
    padding: 15px;
  }
  
  .btn_wrap .data{
    background-color: #00400a;
  }
  
  .btn_wrap .files{
    background-color: #a41d1d;
  }
  
  .btn_wrap .data:hover{
    background-color: #00600e;
    cursor: pointer;
  }
  
  .btn_wrap .files:hover{
    background-color: #610303;
    cursor: pointer;
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
    }
  
    .main_header .img_title img {
      width: 40px;
      height: 40px;
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
  .container-fluid .btn_wrap{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-65%);
    width: 90%;
    height: 400px;
    background-color: #fff;
    border-radius: 25px;
    padding: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    vertical-align: middle;
    flex-direction: column;
    gap: 65px;
  }
  }
  </style>