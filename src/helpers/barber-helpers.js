import http from "../http-commons";

class BarberHelper {

    createBarber(data){
        return http.post("/Barber", data);
    }
    getAllBarbers(){
        return http.get("/Barber");
    }
    updateBarbers(id, data){
        return http.put(`/Barber/${id}`, data);
    }
    deleteBarbers(id){
        return http.delete(`/Barber/${id}`);
    }

}
export default new BarberHelper 