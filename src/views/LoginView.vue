<template>
  <div class="shadow-lg bg-white rounded login-container container-fluid">
            <div class="row m-auto">
                <SignINComponent />
                <div class="col-lg-7 col-sm-0">
                    <div class="img-col">
                        <div class="login-img">
                            <h1 class="heading-name">غرفة تجارة بغداد</h1>
                            <img src="../assets/Image/logo.png" alt="LoginPhoto">
                            <p>BAGHDAD CHAMBER OF COMMERCE</p>
                            <p>IRAQ - 1926</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
import SignINComponent from '../components/SignINComponent.vue'
export default {
  name:'LoginView',
  components: {
    SignINComponent
  }
}
</script>

<style scoped>
@import '../assets/Css/Root.css';

.login-container{
    margin-top:120px;
    border-radius: 40px !important;
    height: 70vh;
    width: 90%;
}

.heading-name{
    font-family: 'Thulith';
    color:var(--font-color);
    text-align: center;
    font-size: 72px;
    padding-top: 80px;
}

.login-img{
    width: 102%;
    height: 100%;
    border-radius:40px 0 0 40px;
    background: var(--primary-color) ;
    text-align: center;
    color: var(--font-color);
}

.login-img img{
    width: 350px;
    opacity: 90%;
    margin-bottom: 30px;
}

.login-img p{
    font-weight: 900;
}

.img-col{
    height: 70vh;
}

@media (max-width:1366px) {
    .login-img h1{
        font-size: 46px;
    }
    .login-img img{
    width: 250px;
    opacity: 90%;
    margin-bottom: 30px;
}
.login-img p{
    font-size: 14px;
    font-weight: 900;
}
}

@media(max-width:768px){
    .login-img{
        display: none;
}
.login-container{
    margin-top:120px;
    border-radius: 40px !important;
    height: 65vh;
    width: 90%;
}
}
</style>