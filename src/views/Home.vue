<template>
  <div>
    <div class="img__header">
      <div class="img__content">
        <h1 class="white--text">Nanchital</h1>
        <h1 class="white--text">35 grados o cuantos grados quieres?</h1>
      </div>
      <!-- <v-img  src="@/assets/header.jpg"></v-img> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>

<style lang="css" scoped>
.img__header {
  background: url("../assets/header.jpg");
  background-image: no-repeat;
  background-image: fixed;
  background-image: center;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  height: 80vh;
  text-align: right;
}

.img__content {
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
}
</style>
