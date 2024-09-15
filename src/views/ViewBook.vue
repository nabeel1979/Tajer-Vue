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
            <span><font-awesome-icon :icon="['fas', 'user']" style="font-size: 24px;" /></span>
            {{Language === 'A'? 'تسجيل الدخول' : 'Sign In'}}
          </router-link>
        </div>
        <div class="btn_container">
          <button class="btn_style">
            <span
              ><font-awesome-icon :icon="['fas', 'file-arrow-down']" style="font-size: 24px;"/></span>
            {{Language === 'A' ? 'حفظ' : 'Save'}}
          </button>
        </div>
        <div class="btn_container">
          <button class="btn_style">
            <span
              ><font-awesome-icon :icon="['fab', 'google-play']" style="font-size: 24px" /></span>
            GooglePlay
          </button>
        </div>
        <div class="btn_container">
          <button class="btn_style">
            <span
              ><font-awesome-icon :icon="['fab', 'apple']" style="font-size: 24px" /></span>
            AppStore
          </button>
        </div>
      </div>
    </header>
    <main>
        <div class="container-fluid">
          <div class="book_wrapper">
            <div class="book_header">
              <div class="counter_row">
                  <p><span>العدد </span> / <span> {{ BookNo }}</span></p>
                  <p dir="ltr"><span>NO. </span> / <span>  {{ BookNo }}</span></p>
              </div>
              <div class="date_row">
                  <p><span>التاريخ </span> / <span> {{ formattedDate }}</span></p>
                  <p dir="ltr"><span>Date </span> /  <span>{{ formattedDate }}</span></p>
              </div>
            </div>
            <div class="book_content">
              <div class="book_html_content" v-html="Body">
              </div>
            </div>
          </div>
        </div>
    </main>
  </template>
  
  <script>
  import { axiosInstance } from "../axios";
  import dayjs from "dayjs";
  
  export default {
    name: "BookView",
    data(){
      return {
        Body:'',
        BookNo:'',
        CreationDate:'',
        Language:'A',
      }
    },
    created() {
      this.GetData();
    },
    computed: {
    formattedDate() {
      return this.CreationDate ? dayjs(this.CreationDate).format("DD-MM-YYYY") : "";
    },
  },
    methods: {
      async GetData() {
        const BookId = this.$route.params.bookid;
        try {
          const response = await axiosInstance.get(
            `/Archive/get-formal-book?id=${BookId}`
          );
          this.Body = response.data.body;
          this.BookNo = response.data.bookNo;
          this.CreationDate = response.data.creationDate;

           // Use JavaScript to hide the images after content is rendered
      this.$nextTick(() => {
        const images = document.querySelectorAll('.book_html_content img');
        images.forEach(img => {
          img.style.display = 'none';
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
  
  main{
    background-color: #060c3b;
    height: 100%;
  }
  
  .container-fluid{
    width: 99.5%;
    margin: 0 auto;
    position: relative;
    padding: 25px 10px;
  }
  
  .container-fluid .book_wrapper{
    background-color: white;
    border-radius: 15px;
    padding: 15px 35px;
    margin: 15px 0;
  }

  .book_wrapper .book_header{
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .book_header .counter_row,
  .book_header .date_row{
    display: flex;
    justify-content: space-between;
    padding: 0 35px;
  }

  .counter_row p,
  .date_row p{
    font-size: 18px;
    font-weight: 700;
  }

  .book_html_content p img {
  display: none !important;
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
      font-size: 16px;
      line-height: 14px;
    }
  
    .btn_style span {
      font-size: 8px;
      margin: 0 10px;
    }
    /* Main Styles */

  .book_header .counter_row,
  .book_header .date_row{
    display: flex;
    justify-content: space-between;
    padding: 0 5px;
  }
  }
  </style>