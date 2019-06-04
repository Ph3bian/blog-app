<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        <img src="../assets/logo.png" width="40px" alt>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item" v-if="!authUser">
            <router-link class="nav-link" to="login">Login</router-link>
          </li>
          <li class="nav-item" v-if="!authUser">
            <router-link class="nav-link" to="signup">Signup</router-link>
          </li>

          <li class="nav-item dropdown" v-if="authUser">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Hey,
              {{authUser.name}}
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">Settings</a>
              <a class="dropdown-item" @click="logOut">Logout</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    authUser() {
      return this.$root.auth.user;
    }
  },
  methods: {
    logOut() {
      localStorage.clear();
      this.$router.push("/login");
      this.$root.auth = {};
    }
  }
};
</script>