<template>
  <div>
    <h3>{{ title }}</h3>
    <div class="card_wrapper">
        <QuickAccessCard v-for="content in CardContent" :key="content.id" :Content="content" />
    </div>
  </div>
</template>

<script>
import QuickAccessCard from './QuickAccessCard.vue';
export default {
components:{
    QuickAccessCard,
},
data(){
    return{
        title:'الوصول السريع',
        CardContent:[
            {
                "id": 1,
                "Path":'/origincertificate',
                "Title":'طلب شهادة منشأ',
                "Description":'قم بطلب شهادة منشأ',
                "IconName":'inbox'
            },
            {
                "id": 2,
                "Path":'/origincertificate',
                "Title":'طلب انشاء كتاب',
                "Description":'قم بطلب انشاء كتاب',
                "IconName":'book'
            }
        ]
    }
}
}
</script>

<style scoped>
    .card_wrapper{
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 15px;
        padding: 15px;
    }

    @media (max-width: 768px) {
        .card_wrapper{
        gap: 25px;
    }
    }
</style>