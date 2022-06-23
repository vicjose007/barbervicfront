<template>
  <div class="login"></div>
  <div class="container-lg">
    <div class="row">
      <div class="col-md-4">
        <div class="card bg-light text-dark" style=  "width: 18rem; border-radius: 2rem">
          <div class="card-body p-5 text-left">
            <h1 class="fw-bold mb-2 text-uppercase">Login</h1>
            <div class="row">
              <div class="form-outline mb-4 ">
                <b> Email </b>
                <input type="text" v-model="formLogin.email" />
              </div>
              <div class="row">
                <div class="form-outline mb-4">
                  <b> Password </b>
                  <input type="password" v-model="formLogin.password" />
                </div>
                <div class="row">
                  <div class="col">
                    <b-button class="btn btn-success" @click="loginUser()"
                      >Login <i class="fa-solid fa-door-open"></i
                    ></b-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-7">
        <img
          src="@/assets/BarberWelcome.png"
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
  name: "LoginView",

  data() {
    return {
      formLogin: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await UserHelper.loginUser(this.formLogin);

        if (response.status) {
          sessionStorage.setItem("Token", response.data);
          sessionStorage.getItem("Token");

          sessionStorage.setItem(
            "UserLogged",
            JSON.stringify(this.DecodeJWT(sessionStorage.getItem("Token")))
          );
          var jsonStringObj = sessionStorage.getItem("UserLogged");

          var obj = JSON.parse(jsonStringObj);

          console.log(obj.role);

          if (obj.role == "Admin") router.push({ path: "/users" });
          else if (obj.role == "Client") router.push({ path: "/" });
          else if (obj.role == "Barber") router.push({ path: "/barbers" });
        } else {
          alert("El usuario no existe");
        }
      } catch (error) {
        console.log(error);
      }
    },

    DecodeJWT(token) {
      const jwt = JSON.parse(window.atob(token.split(".")[1]));
      let jwtObject = {};
      for (const claim in jwt) {
        let atrr = claim.split("/").pop();
        jwtObject = { ...jwtObject, [`${atrr}`]: jwt[claim] };
      }
      return jwtObject;
    },
  },
};
</script>
