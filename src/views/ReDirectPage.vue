<template>
  <div class="redirect_container">
    <div class="redirect_header">
        <h2>أهلا بك في خدمات غرفة تجارة بغداد</h2>
        <h3>لصحة الصدور</h3>
    </div>
    <div class="redirect_content">
        <p>أختر احد التطبيقات إدناه في قراءة الوثيقة</p>
        <div class="link_section">
            <p>الأمانة العامة لمجلس الوزراء</p>
            <button class="ur_button">منصة أور</button>
        </div>
        <div class="link_section">
            <p>غرفة تجارة بغداد</p>
            <button class="tajer_button">منصة التاجر</button>
        </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.redirect_container {
    padding: 75px 15px;
    text-align: center;
}

.redirect_container .redirect_header{
    text-align: center;
}

.redirect_container .redirect_content{
    width: 50%;
    margin: 0 auto;
    text-align: center;
    padding: 120px 0;
}

.redirect_content .link_section{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    padding: 0 50px;
    background-color: rgb(227, 227, 227);
    border-radius: 35px;
}

.link_section p{
    margin: 0;
    padding: 15px 0;
}

.link_section .ur_button{
    padding: 5px 50px;
    width: 250px;
    border: none;
    border-radius: 15px;
    background-color: rgb(255, 163, 163);
}

.link_section .ur_button:hover{
    background-color: rgb(255, 117, 117);
}

.link_section .tajer_button{
    padding: 5px 50px;
    width: 250px;
    border: none;
    border-radius: 15px;
    background-color: rgb(163, 171, 255);
}

.link_section .tajer_button:hover{
    background-color: rgb(117, 129, 255);
}

@media (max-width: 768px) {
    .redirect_container .redirect_content{
    width: 98%;
}

.redirect_content .link_section{
    padding: 0 20px 0 10px;
}

.link_section .ur_button{
    padding: 5px 20px;
    width: 150px;
}

    .link_section .tajer_button{
    padding: 5px 20px;
    width: 150px;
}
}

</style>