<template>
  <div>
    <h3>{{ title }}</h3>
    <div>
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
            }
        ]
    }
}
}
</script>

<style>

</style>