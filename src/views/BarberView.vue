<template>
  <div class="barber" id="BarberBack">
    <nav>
      <router-link to="/users" class="btn btn-success" id="ButtonA"
        >Users <i class="fa-solid fa-users"></i
      ></router-link>
      |
      <router-link to="/appointments" class="btn btn-success"
        >Appointments <i class="fa-solid fa-clipboard-list"></i
      ></router-link>
      |
      <router-link to="/haircut" class="btn btn-success"
        >Haircuts <i class="fa-solid fa-scissors"></i
      ></router-link>
       <div
          class="card bg-light text-dark"
          style="width: 12rem; border-radius: 1rem"
          id="Table"
        >
      <h1 class="fw-bold mb-2 text-uppercase">Barbers</h1>
      </div>
      <b-button @click="setFormBarber()" v-b-modal.CreateBarber id="ButtonB"
        >Create Barber <i class="fa-solid fa-circle-plus"></i
      ></b-button>
      <b-modal id="CreateBarber" title="Insert barber data">
        <p class="row">
          <b> Barber Name </b>
          <input type="text" v-model="formBarber.barberName" />
          <b> Experience </b>
          <input type="text" v-model="formBarber.experience" />
          <b> Start Date </b>
          <input type="date" v-model="formBarber.startDate" />
          <b> Barber Photo</b>
          <input
            type="file"
            accept="image/png, image/jpeg"
            @change="uploadImage"
          />
        </p>
        <b-button class="btn btn-success" @click="createBarber()"
          >Add Barber</b-button
        >
      </b-modal>
    </nav>
    <!-- <pre>{{barbers}}</pre> -->
        <div
          class="card bg-light text-dark"
          style="width: 77rem; border-radius: 1rem"
          id="Table"
        >

    <table class="table bordered striped #e3f2fd blue lighten-5">
      <thead>
        <th>Barber Name</th>
        <th>Experience</th>
        <th>Start Date</th>
        <th>Barber Photo</th>
      </thead>

      <tbody>
        <tr v-for="barber in barbers" :key="barber.id">
          <td>{{ barber.barberName }}</td>
          <td>{{ barber.experience }}</td>
          <td>{{ barber.startDate }}</td>
          <td><img width="250" height="200" :src="barber.barberPhoto" /></td>

          <td>
            <b-button variant="danger" @click="eraseBarber(barber.id)"
              >Delete <i class="fa-regular fa-trash-can"></i
            ></b-button>
            |
            <b-button
              variant="btn btn-primary"
              @click="setFormBarber(barber)"
              v-b-modal="'modal-' + barber.id"
              >Update <i class="fa-solid fa-pen"></i
            ></b-button>
            <b-modal :id="'modal-' + barber.id" title="Update user data">
              <p class="row">
                <b> Barber Name </b>
                <input type="text" v-model="formBarber.barberName" />
                <b> Experience </b>
                <input type="text" v-model="formBarber.experience" />
                <b> Start Date </b>
                <input type="date" v-model="formBarber.startDate" />
                <b> Barber Photo</b>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  @change="uploadImage"
                />
              </p>
              <b-button class="btn btn-success" @click="updateBarber(barber.id)"
                >Update Barber</b-button
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
import BarberHelper from "../helpers/barber-helpers.js";
export default {
  name: "BarberView",
  mounted() {
    this.getBarber();
    this.formBarber = {};
  },
  data() {
    return {
      barbers: [],
      formBarber: {
        barberName: "",
        experience: "",
        startDate: "",
        barberPhoto: "",
      },
    };
  },
  methods: {
    async getBarber() {
      const response = await BarberHelper.getAllBarbers();
      this.barbers = response.data;
      console.log(this.barbers);
    },
    async eraseBarber(id) {
      try {
        const response = await BarberHelper.deleteBarbers(id);
        console.log(response);
        location.reload();
      } catch (error) {
        console.log(error);
      }
    },
    async createBarber() {
      try {
        const response = await BarberHelper.createBarber(this.formBarber);
        console.log(response);
        location.reload();
      } catch (error) {
        console.log(error);
      }
    },
    async updateBarber(id) {
      try {
        const response = await BarberHelper.updateBarbers(id, this.formBarber);
        console.log(response);
        location.reload();
      } catch (error) {
        console.log(error);
      }
    },
    uploadImage(e) {
      this.formBarber = {
        ...this.formBarber,
        barberPhoto: e.target.files[0],
      };
      console.log(this.formBarber);
    },
    setFormBarber(formBarber = {}) {
      console.log(formBarber);
      this.formBarber = formBarber;
    },
  },
};
</script>
<style>
#BarberBack {
  background-image: url("@/assets/BarberPattern.png");
}
#ButtonA{
  margin-left: 30px;
  margin-top: 10px;
}
#ButtonB{
  margin-left: 30px;
  margin-bottom: 10px;
}
#Table{
  margin-left: 30px;
}
</style>
