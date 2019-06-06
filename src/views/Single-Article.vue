<template>
  <div class="card my-5" v-if ="!loading">
    <h4 class="card-header font-weight-bold">{{article.title}}</h4>
    <img class="card-img-top" :src="article.imageUrl" alt="Card image cap">
    <div class="card-body" v-html="article.content"></div>
    <div class="comments my-4">
    <vue-disqus shortname="com-blog" :identifier="article.slug" :url="`${url}`"></vue-disqus>
    </div>
  </div>
  <div class="loader text-center" v-else>
     <i class="fas fa-5x fa-spin fa-spinner"></i>
  </div>
</template>
<script>
import axios from "axios";
import config from "@/config.js";

export default {
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("auth")) {
      return next();
    }
    next({ path: "/login" });
  },

  mounted() {
    this.getArticle();
  },
  data() {
    return {
      article: {},
      loading: true,
      url:"window.location.href"
    };
  },
  methods: {
    getArticle() {
      
      axios
        .get(`${config.baseUrl}/article/${this.$route.params.id}`)
        .then(({ data }) => {
          this.loading = false;
          this.article = data.data;
        })
        .catch(() => {
           this.loading = false;
           this.$noty.error("Error loading article. Please try again");
        });
    }
  }
};
</script>
