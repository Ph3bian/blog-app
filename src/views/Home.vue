<template>
  <div>
    <div v-if="!loading" class="">
    <div class="row" v-if="articles.data">
      <div class="col-md-8 offset-md-2" v-for="article in articles.data" :key="article.id">
        <Article :article="article"/>
      </div>
    </div>
    <div class="row justify-content-center text-center mx-auto">
      <nav aria-label="Page navigation">
        <ul class="pagination">
          <li class="page-item">
            <a
              class="page-link"
              :disabled="articles.prev_page_url == null"
              @click="update(articles.prev_page_url)"
            >Previous</a>
          </li>
          <li class="page-item">
            <a class="page-link"> Page {{articles.current_page}} of {{articles.last_page}}</a>
          </li>
          <li class="page-item">
            <a
              class="page-link"
              :disabled="articles.next_page_url == null"
              @click="update(articles.next_page_url)"
            >Next</a>
          </li>
        </ul>
      </nav>
    </div>
</div>
    <div v-else class="d-flex justify-content-center ">
      <Loader class="align-items-center"></Loader>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import config from "@/config.js";
import Article from "@/components/Article.vue";
import Loader from "@/components/Loader.vue";
export default {
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("auth")) {
      return next();
    }
    next({ path: "/login" });
  },
  components: {
    Article,
    Loader
  },
  mounted() {
    this.getArticles();
  },
  data() {
    return {
      articles: {},
      loading: true,
      url: `${config.baseUrl}/articles`
    };
  },
  methods: {
    getArticles() {
      
      axios
        .get(this.url)
        .then(({ data }) => {
          this.loading = false;
          this.articles = data.data;
        })
        .catch(() => {
          this.loading = false;
          this.$noty.error("Error loading articles. Please try again");
        });
    },
    update(data) {
      this.loading = true;
      this.url = data;
      this.getArticles();
    }
  }
};
</script>

