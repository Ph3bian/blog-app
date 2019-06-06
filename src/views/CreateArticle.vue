<template>
  <div class="row my-5">
    <div class="col-md-8 offset-md-2">
      <div class="card my-5">
        <div class="card-body">
          <form>
            <picture-input
              @change="onChange"
              accept="image/jpeg, image/png"
              size="5"
              buttonClass="btn btn-danger"
              class="w-100 h-25"
            ></picture-input>
            <input type="text" v-model="title" placeholder="Title" class="form-control my-4">
            <select name v-model="category" class="form-control mb-4">
              <option value>Select Category</option>
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >{{category.name}}</option>
            </select>
            <wysiwyg v-model="content" class="mb-4"/>

            <button
              type="button"
              :disabled="loading"
              @click="createArticle"
              class="btn btn-success btn-block"
            >
            <span v-if="!loading">Create Article</span>
             <span v-else>
                  Loading...
                </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PictureInput from "vue-picture-input";
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
    this.getCategories();
  },
  data() {
    return {
      content: "",
      title:"",
      image: null,
      url: `${config.baseUrl}/articles`,
      categories: [],
      category: "",
      loading: false,
    };
  },
  components: {
    PictureInput
  },
  methods: {
    onChange(image) {
      this.image = image;
    },
    createArticle() {
      if(!this.title || !this.image || !this.cntent|| !this.category){
        this.$noty.error("Please fill in all fields")
      }
      this.loading= true
      const form = new FormData();
      form.append("file", this.image);
      form.append("upload_preset", process.env.VUE_APP_CLOUNDINARY_PRESET);
      form.append("api_key", process.env.VUE_APP_CLOUNDINARY_API_KEY);

      axios
        .post(process.env.VUE_APP_CLOUNDINARY_URL, form)
        .then(({ data }) => {
          console.log(data, "here")
          axios
            .post(this.url, {
              title: this.title,
              imageUrl: data.secure_url,
              content: this.content,
              category_id: this.category
            }, {
              headers:{
                Authorization: `Bearer ${this.$root.auth.token}`
              }
            })
            .then(() => {
               this.loading= false;
              this.$noty.success("Article created successfully");
              this.$router.push("/")
            })
            .catch(({response})=> {
              this.loading= false;
              console.log(response, "0000000hrrrrrr")
               this.$noty.error("Oops, something went wrong");
            });
        })
        .catch((response) => {
           this.loading= false;
          this.$noty.error("Oops, something went wrong");
        });
    },
    getCategories() {
      const getCategories = localStorage.getItem("categories");
      if (getCategories) {
        return (this.categories = JSON.parse(getCategories));
      }
      axios
        .get(`${config.baseUrl}/categories`)
        .then(({ data }) => {
          this.categories = data.categories;
          localStorage.setItem("categories", JSON.stringify(data.categories));
        })
        .catch(() => {
          this.$noty.error("Oops, something went wrong");
        });
    }
  }
};
</script>

