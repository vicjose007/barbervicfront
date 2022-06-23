import http from "../http-commons";

class AppointmentHelper {

    createAppointment(data){
        return http.post("/Appointment", data);
    }
    getAllAppointments(){
        return http.get("/Appointment");
    }
    updateAppointments(id, data){
        return http.put(`/Appointment/${id}`, data);
    }
    deleteAppointments(id){
        return http.delete(`/Appointment/${id}`);
    }

}
export default new AppointmentHelper 