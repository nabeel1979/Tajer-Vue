<template>
  <router-link :to="Content.Path">
    <div class="quick_card">
      <div class="icon_wrapper">
        <span class="icon_circle"
          ><font-awesome-icon :icon="['fas', Content.IconName]"
        /></span>
      </div>
      <div class="content_text">
        <p class="card_title">{{ Content.Title }}</p>
        <p class="card_description">{{ Content.Description }}</p>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    Content: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
a{
    text-decoration: none;
    display: block;
    width: 25%;
    height: 155px;
}
.quick_card {
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 10px 1px rgb(195, 195, 195);
  border-radius: 10px;
  padding: 25px 30px 15px 30px;
  width: 100%;
  gap: 25px;
}

.quick_card .icon_wrapper {
  width: 100%;
}

.icon_wrapper .icon_circle {
  display: block;
  width: 46px;
  padding: 8px 15px;
  background-color: #0073ff47;
  color: #0071ff;
  border-radius: 50%;
  text-align: center;
}

.quick_card .content_text {
  padding: 0 5px;
  line-height: 0.8;
}

.content_text .card_title {
  font-size: 20px;
  font-weight: 700;
}

.content_text .card_description {
  font-size: 16px;
  font-weight: 500;
  color: rgb(163, 163, 163);
}

@media (max-width: 600px){
  a{
    width: 100%;
}
}
</style>