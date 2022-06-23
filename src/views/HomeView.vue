<template>
  <div class="home" id="body">
    <div>
      <div
        id="carouselExampleIndicators"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="3"
            aria-label="Slide 4"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img
              src="@/assets/BarberVicPhoto.jpg"
              class="d-block w-100 imagen"
              alt="test"
            />
          </div>
          <div class="carousel-item">
            <img
              src="@/assets/BarberPhoto1.jpg"
              class="d-block w-100 imagen"
              alt="..."
            />
          </div>
          <div class="carousel-item">
            <img
              src="@/assets/BarberPhoto2.jpg"
              class="d-block w-100 imagen"
              alt="..."
            />
          </div>
          <div class="carousel-item">
            <img
              src="@/assets/BarberPhoto3.jpg"
              class="d-block w-100 imagen"
              alt="..."
            />
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div class="col-md-4">
        <b-button
          class="btn-success"
          @click="setFormAppointment()"
          v-b-modal.CreateAppointment
          id="CreateAppoint"
          >Create Appointment <i class="fa-solid fa-notes-medical"></i
        ></b-button>
        |
        <b-modal id="CreateAppointment" title="Insert appointment data">
          <p class="row">
            <b> Date </b>
            <input type="date" v-model="formAppointment.date" />
            <b> User </b>

            <select v-model="selectedUser">
              <option selected value="">--all--</option>
              <option v-for="user in users" :key="user.id" :value="user.id">
                {{ user.name }}
              </option>
            </select>
            <b> Barber </b>
            <select v-model="selectedBarber">
              <option selected value="">--all--</option>
              <option
                v-for="barber in barbers"
                :key="barber.id"
                :value="barber.id"
              >
                {{ barber.barberName }}
              </option>
            </select>
            <b> Haircut </b>
            <select v-model="selectedHaircut">
              <option selected value="">--all--</option>
              <option
                v-for="haircut in haircuts"
                :key="haircut.id"
                :value="haircut.id"
              >
                {{ haircut.haircutName }}
              </option>
            </select>
          </p>
          <b-button class="btn btn-success" @click="createAppointment()"
            >Create Appointment</b-button
          >
        </b-modal>

        <button class="btn btn-primary" v-b-modal.ShowBarbers>
          Meet our barbers <i class="fa-solid fa-user-astronaut"></i>
        </button>
        <b-modal id="ShowBarbers" title="Our barbers">
          <div
            class="card bg-light text-dark"
            style="width: 30rem; border-radius: 1rem"
          >
            <table class="table bordered striped #e3f2fd blue lighten-5">
              <thead>
                <th>Barber</th>
                <th>Experience</th>
                <th>Barber Photo</th>
              </thead>
              <tbody>
                <tr v-for="barber in barbers" :key="barber.id">
                  <td>{{ barber.barberName }}</td>
                  <td>{{ barber.experience }}</td>
                  <td>
                    <img width="250" height="200" :src="barber.barberPhoto" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </b-modal>
        <div
          class="card bg-light text-dark"
          id="HairCard"
          style="width: 40rem; border-radius: 1rem"
        >
          <table
            class="table bordered striped #e3f2fd blue lighten-5"
            id="HairTable"
          >
            <thead>
              <th>Haircuts</th>
              <th>Price</th>
              <th>Haircut Photo</th>
            </thead>

            <tbody>
              <tr v-for="haircut in haircuts" :key="haircut.id">
                <td>{{ haircut.haircutName }}</td>
                <td>{{ haircut.price }}</td>
                <td><img width="200" height="200" :src="haircut.photo" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-md-4">
        <div
          class="card bg-light text-dark"
          style="width: 40rem; border-radius: 1rem"
          id="HairCard"
        >
        <h1 class="fw-bold mb-2 text-uppercase">Appointments</h1>
          <table class="table bordered striped #e3f2fd blue lighten-5">
            <thead>
              <th>Date</th>
              <th>User</th>
              <th>Barber</th>
              <th>Haircut</th>
            </thead>

            <tbody>
              <tr v-for="appointment in appointments" :key="appointment.id">
                <td>{{ appointment.date }}</td>
                <td>{{ appointment.user.name }}</td>
                <td>{{ appointment.barber.barberName }}</td>
                <td>
                  <img
                    width="200"
                    height="200"
                    :src="appointment.haircut.photo"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AppointmentHelper from "../helpers/appointment-helpers.js";
import BarberHelper from "../helpers/barber-helpers.js";
import UserHelper from "../helpers/users-helpers.js";
import HaircutHelper from "../helpers/haircut-helpers.js";

export default {
  name: "AppointmentView",
  mounted() {
    this.getAppointment();
    this.getUser();
    this.getBarber();
    this.getHaircut();
    this.formAppointment = {};
  },
  data() {
    return {
      appointments: [],
      users: [],
      selectedUser: "",
      selectedBarber: "",
      selectedHaircut: "",
      barbers: [],
      haircuts: [],
      formAppointment: {
        date: "",
        userId: 0,
        barberId: 0,
        haircutId: 0,
      },
    };
  },
  methods: {
    onChange: function (e) {
      var id = e.target.value;
      var name = e.target.options[e.target.options.selectedIndex].text;
      console.log("id ", id);
      console.log("name ", name);
    },
    async getAppointment() {
      const response = await AppointmentHelper.getAllAppointments();
      this.appointments = response.data;
      console.log(this.appointments);
    },
    async createAppointment() {
      this.formAppointment.userId = this.selectedUser;
      this.formAppointment.barberId = this.selectedBarber;
      this.formAppointment.haircutId = this.selectedHaircut;
      try {
        const response = await AppointmentHelper.createAppointment(
          this.formAppointment
        );
        console.log(response);
        console.log(this.appointments);
      } catch (error) {
        console.log(error);
      }
    },
    async eraseAppointment(id) {
      try {
        const response = await AppointmentHelper.deleteAppointments(id);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    async updateAppointment(id) {
      this.formAppointment.userId = this.selectedUser;
      this.formAppointment.barberId = this.selectedBarber;
      this.formAppointment.haircutId = this.selectedHaircut;
      try {
        const response = await AppointmentHelper.updateAppointments(
          id,
          this.formAppointment
        );
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    setFormAppointment(formAppointment = {}) {
      console.log(formAppointment);
      this.formAppointment = formAppointment;
    },
    async getUser() {
      const response = await UserHelper.getAllUsers();
      this.users = response.data;
      console.log(this.users);
    },
    async getBarber() {
      const response = await BarberHelper.getAllBarbers();
      this.barbers = response.data;
      console.log(this.barbers);
    },
    async getHaircut() {
      const response = await HaircutHelper.getAllHaircuts();
      this.haircuts = response.data;
      console.log(this.haircuts);
    },
  },
};
</script>
<style>
#carouselExampleIndicators {
  display: block;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
}
#body {
  background-image: url("@/assets/BarberPattern.png");
}
#HairTable {
  margin-top: 20px;
}
#HairCard {
  margin-top: 10px;
  margin-left: 30px;
  margin-right: auto;
}
#CreateAppoint {
  margin-left: 30px;
}
.imagen {
  border-radius: 20px;
}
</style>
