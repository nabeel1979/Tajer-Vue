<template>
  <div class="container_fluid">
    <div class="img_section">
      <img src="../assets/Image/logo.png" alt="logo">
    </div>
  </div>
</template>

<script>
export default {
  // Component logic here if needed
}
</script>

<style scoped>
  .container_fluid{
    position: relative;
    width: 98%;
    height: 100vh;
    margin: 0 auto;
  }

  .container_fluid .img_section{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .img_section img{
    width: 500px;
    height: 500px;
  }
</style>
