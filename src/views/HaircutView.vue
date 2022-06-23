<template>
  <div class="haircut" id="HaircutBack">
    <nav>
      <router-link to="/users" class="btn btn-success" id="ButtonA"
        >Users <i class="fa-solid fa-users"></i
      ></router-link>
      |
      <router-link to="/barbers" class="btn btn-success"
        >Barbers <i class="fa-solid fa-user-astronaut"></i
      ></router-link>
      |
      <router-link to="/appointments" class="btn btn-success"
        >Appointments <i class="fa-solid fa-clipboard-list"></i
      ></router-link>
      <div
        class="card bg-light text-dark"
        style="width: 13rem; border-radius: 1rem"
        id="Table"
      >
        <h1 class="fw-bold mb-2 text-uppercase">Haircuts</h1>
      </div>
      <b-button @click="setFormHaircut()" v-b-modal.CreateHaircut id="ButtonB"
        >Create Haircut <i class="fa-solid fa-circle-plus"></i
      ></b-button>
      <b-modal id="CreateHaircut" title="Insert haircut data">
        <p class="row">
          <b> Haircut Name </b>
          <input type="text" v-model="formHaircut.haircutName" />
          <b> Price </b>
          <input type="text" v-model="formHaircut.price" />
          <b> Haircut Photo</b>
          <input
            type="file"
            accept="image/png, image/jpeg"
            @change="uploadImage"
          />
        </p>
        <b-button class="btn btn-success" @click="createHaircut()"
          >Add Haircut</b-button
        >
      </b-modal>
    </nav>
    <div
      class="card bg-light text-dark"
      style="width: 50rem; border-radius: 1rem"
      id="Table"
    >
      <table class="table bordered striped #e3f2fd blue lighten-5">
        <thead>
          <th>Haircut Name</th>
          <th>Price</th>
          <th>Haircut Photo</th>
        </thead>

        <tbody>
          <tr v-for="haircut in haircuts" :key="haircut.id">
            <td>{{ haircut.haircutName }}</td>
            <td>{{ haircut.price }}</td>
            <td><img width="200" height="200" :src="haircut.photo" /></td>

            <td>
              <b-button variant="danger" @click="eraseHaircut(haircut.id)"
                >Delete <i class="fa-regular fa-trash-can"></i
              ></b-button>
              |
              <b-button
                variant="btn btn-primary"
                @click="setFormHaircut(haircut)"
                v-b-modal="'modal-' + haircut.id"
                >Update <i class="fa-solid fa-pen"></i
              ></b-button>
              <b-modal :id="'modal-' + haircut.id" title="Update haircut data">
                <p class="row">
                  <b> Haircut Name </b>
                  <input type="text" v-model="formHaircut.haircutName" />
                  <b> Price </b>
                  <input type="text" v-model="formHaircut.price" />
                  <b> Haircut Photo</b>
                  <input
                    type="file"
                    accept="image/png, image/jpeg"
                    @change="uploadImage"
                  />
                </p>
                <b-button
                  class="btn btn-success"
                  @click="updateHaircut(haircut.id)"
                  >Update Haircut</b-button
                >
              </b-modal>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import HaircutHelper from "../helpers/haircut-helpers.js";
export default {
  name: "HaircutView",
  mounted() {
    this.getHaircut();
    this.formHaircut = {};
  },
  data() {
    return {
      haircuts: [],
      formHaircut: {
        haircutName: "",
        price: 0,
        photo: "",
      },
    };
  },
  methods: {
    async getHaircut() {
      const response = await HaircutHelper.getAllHaircuts();
      this.haircuts = response.data;
      console.log(this.haircuts);
    },
    async eraseHaircut(id) {
      try {
        const response = await HaircutHelper.deleteHaircut(id);
        console.log(response);
        location.reload();
      } catch (error) {
        console.log(error);
      }
    },

    async createHaircut() {
      try {
        const response = await HaircutHelper.createHaircut(this.formHaircut);
        console.log(response);
        location.reload();
      } catch (error) {
        console.log(error);
      }
    },

    async updateHaircut(id) {
      try {
        const response = await HaircutHelper.updateHaircut(
          id,
          this.formHaircut
        );
        console.log(response);
        location.reload();
      } catch (error) {
        console.log(error);
      }
    },
    uploadImage(e) {
      this.formHaircut = {
        ...this.formHaircut,
        photo: e.target.files[0],
      };
      console.log(this.formHaircut);
    },
    setFormHaircut(formHaircut = {}) {
      console.log(formHaircut);
      this.formHaircut = formHaircut;
    },
  },
};
</script>
<style>
#HaircutBack {
  background-image: url("@/assets/BarberPattern.png");
}
#ButtonA {
  margin-left: 30px;
  margin-top: 10px;
}
#ButtonB {
  margin-left: 30px;
  margin-bottom: 10px;
}
#Table {
  margin-left: 30px;
}
</style>
