<template>
  <div class="appointment" id="AppointmentBack">
    <nav>
      <router-link to="/users" class="btn btn-success" id="ButtonA"
        >Users <i class="fa-solid fa-users"></i
      ></router-link>
      |
      <router-link to="/barbers" class="btn btn-success"
        >Barbers <i class="fa-solid fa-user-astronaut"></i
      ></router-link>
      |
      <router-link to="/haircut" class="btn btn-success"
        >Haircuts <i class="fa-solid fa-scissors"></i
      ></router-link>
      <div
        class="card bg-light text-dark"
        style="width: 20rem; border-radius: 1rem"
        id="Table"
      >
        <h1 class="fw-bold mb-2 text-uppercase">Appointments</h1>
      </div>
      <b-button
        @click="setFormAppointment()"
        v-b-modal.CreateAppointment
        id="ButtonB"
        >Create Appointment <i class="fa-solid fa-notes-medical"></i
      ></b-button>
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
    </nav>
    <!-- <pre>{{users}}</pre> -->
    <div
      class="card bg-light text-dark"
      style="width: 77rem; border-radius: 1rem"
      id="Table"
    >
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
              <img width="200" height="200" :src="appointment.haircut.photo" />
            </td>
            <td>
              <b-button
                variant="danger"
                @click="eraseAppointment(appointment.id)"
                >Delete <i class="fa-regular fa-trash-can"></i>
              </b-button>
              |
              <b-button
                variant="btn btn-primary"
                @click="setFormAppointment(appointment)"
                v-b-modal="'modal-' + appointment.id"
                >Update <i class="fa-solid fa-pen"></i>
              </b-button>
              <b-modal
                :id="'modal-' + appointment.id"
                title="Update appointment data"
              >
                <p class="row">
                  <b> Date </b>
                  <input type="date" v-model="formAppointment.date" />
                  <b> User </b>

                  <select v-model="selectedUser">
                    <option selected value="">--all--</option>
                    <option
                      v-for="user in users"
                      :key="user.id"
                      :value="user.id"
                    >
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
                <b-button
                  class="btn btn-success"
                  @click="updateAppointment(appointment.id)"
                  >Update Appointment</b-button
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
        location.reload();
      } catch (error) {
        console.log(error);
      }
    },
    async eraseAppointment(id) {
      try {
        const response = await AppointmentHelper.deleteAppointments(id);
        console.log(response);
        location.reload();
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
        location.reload();
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
#AppointmentBack {
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
