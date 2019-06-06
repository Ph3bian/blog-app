<template>
  <div class="row my-5">
    <div class="col-md-6 offset-md-3">
      <div class="card">
        <div class="card-body">
          <h3 class="text-center">Login</h3>
          <form action>
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
              <button @click="login()" :disabled="loading" class="btn btn-success btn-block">
                <span v-if="!loading">Login</span>
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
import config from "@/config.js";
export default {
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("auth")) {
      return next({ path: "/" });
    }
    next();
  },
  data() {
    return {
      email: "",
      password: "",
      errors: {},
      submitted: false,
      loading: false
    };
  },
  methods: {
    login() {
      this.loading = true;
      axios
        .post(`${config.baseUrl}/auth/login`, {
          email: this.email,
          password: this.password
        })
        .then(response => {
          this.loading = false;
          this.submitted = true;
          const { data } = response.data;
          localStorage.setItem("auth", JSON.stringify(data));
          this.$root.auth = data;
          this.$noty.success("Login Successful");
          this.$router.push("/");
        })
        .catch(({ response }) => {
          this.loading = false;
          this.submitted = true;
          if (response.status === 401) {
            this.$noty.error("User credentials does not match");
            this.errors = { email: ["User credentials does not match"] };
          } else {
            this.$noty.error("Oops, something went wrong");
            this.errors = response.data;
          }
        });
    }
  }
};
</script>
