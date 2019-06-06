<template>
  <div id="app">
    <Navbar/>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: "app",
  components: {
    Navbar
  }
};
</script>

<style>
* {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#app {
  color: #2c3e50;
}
body {
  background-color: #f5f3f8;
}
.noty_type__success{
    color: #fff;
    font-weight:bold !important;
    background-color: #28a745 !important;
    border-color: #28a745!important;
}
.noty_type__error{
  font-weight:bold!important;
}

</style>
