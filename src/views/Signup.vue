<template>
  <div class="row my-5">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-body">
          <h3 class="text-center">Sign Up</h3>
          <form>
            <div class="form-group">
              <label>Name</label>
              <input
                v-bind:class="{'is-invalid' : errors.name, 'is-valid': !errors.name && submitted }"
                v-model="name"
                type="text"
                class="form-control"
              >
              <div class="errors" v-if="errors.name">
                <small class="text-danger" :key="error" v-for="error in errors.name">{{error}}</small>
              </div>
            </div>
            <div class="form-group">
              <label>Email</label>
              <input
                v-bind:class="{'is-invalid' : errors.email, 'is-valid': !errors.email && submitted }"
                v-model="email"
                type="email"
                class="form-control"
              >
              <div class="errors" v-if="errors.email">
                <small class="text-danger" :key="error" v-for="error in errors.email">{{error}}</small>
              </div>
            </div>
            <div class="form-group">
              <label>Password</label>
              <input
                v-bind:class="{'is-invalid' : errors.password, 'is-valid': !errors.password  && submitted  }"
                v-model="password"
                type="password"
                class="form-control"
              >
              <div class="errors" v-if="errors.password">
                <small class="text-danger" :key="error" v-for="error in errors.password">{{error}}</small>
              </div>
            </div>
            <div class="form-group text-center">
              <button @click="registerUser()" :disabled="loading" class="btn btn-success btn-block">
                <span v-if="!loading">Signup</span>
                <span v-else>
                  <i class="fas fa-spin fa-spinner"></i>
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      errors: {},
      submitted: false,
      loading: false
    };
  },
  methods: {
    registerUser() {
      this.loading = true;
      axios
        .post("https://react-blog-api.bahdcasts.com/api/auth/register", {
          name: this.name,
          email: this.email,
          password: this.password
        })
        .then(({ data }) => {
          this.loading = false;
          this.submitted = true;
          const { data: authUserData } = data;
          localStorage.setItem("auth", JSON.stringify(authUserData));
          this.$root.auth = authUserData;
          this.$router.push("/");
          this.$noty.success("Signup Successful");
        })
        .catch(({ response }) => {
          this.loading = false;
          this.submitted = true;
          this.errors = response.data;
          this.$noty.error("Oops, something went wrong");
        });
    }
  }
};
</script>
<style>
/* .is-invalid{
  border: 1px solid #ff0000;
} */
</style>

