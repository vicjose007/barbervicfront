<template>
  <div class="login"></div>
  <div class="container-lg">
    <div class="row">
      <div class="col-md-4">
        <div
          class="card bg-light text-dark"
          style="width: 18rem; border-radius: 2rem"
        >
          <div class="card-body p-5 text-left">
            <h1 class="fw-bold mb-2 text-uppercase">Sign In</h1>
            <div class="row">
              <div class="form-outline mb-4">
                <b> Email </b>
                <input type="text" v-model="formSingIn.email" />
              </div>
              <div class="row">
                <div class="form-outline mb-4">
                  <b> Name </b>
                  <input type="text" v-model="formSingIn.name" />
                </div>
              </div>
              <div class="row">
                <div class="form-outline mb-4">
                  <b> Last Name </b>
                  <input type="text" v-model="formSingIn.lastName" />
                </div>
              </div>
              <div class="row">
                <div class="form-outline mb-4">
                  <b> Phone </b>
                  <input type="text" v-model="formSingIn.phone" />
                </div>
              </div>
              <div class="row">
                <div class="form-outline mb-4">
                  <b> Password </b>
                  <input type="password" v-model="formSingIn.password" />
                </div>
              </div>
            </div>
            <b-button class="btn btn-success" @click="registerUser()"
              >Register <i class="fa-solid fa-pencil"></i
            ></b-button>
          </div>
        </div>
      </div>
      <div class="col-md-7">
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          class="img-fluid"
          alt="Sample image"
        />
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router/index.js";
import UserHelper from "../helpers/users-helpers.js";
export default {
  name: "SignInView",
  mounted() {},
  data() {
    return {
      formSingIn: {
        email: "",
        name: "",
        lastName: "",
        password: "",
        phone: "",
      },
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await UserHelper.registerUser(this.formSingIn);
        console.log(response);
        router.push({ path: "/login" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
