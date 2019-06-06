<template>
  <div class="card my-4">
    <h4 class="card-header font-weight-bolder">{{article.title}}</h4>
    <div class="card-body">
      <p class="card-text">{{article.content.substring(0,250)}}</p>
      <router-link :to="`article/${article.id}`" class="btn btn-primary">Read More</router-link>
    </div>
  </div>
</template>
<script>
export default {
  props: ["article"]
};
</script>

