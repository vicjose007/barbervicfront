import http from "../http-commons";

class HaircutHelper {

    createHaircut(data){
        return http.post("/Haircut", data, {headers: {'Authorization': `bearer ${sessionStorage.getItem("Token")}`}});
    }
    getAllHaircuts(){
        return http.get("/Haircut", {headers: {'Authorization': `bearer ${sessionStorage.getItem("Token")}`}});
    }
    updateHaircut(id, data){
        return http.put(`/Haircut/${id}`, data, {headers: {'Authorization': `bearer ${sessionStorage.getItem("Token")}`}});
    }
    deleteHaircut(id){
        return http.delete(`/Haircut/${id}`, {headers: {'Authorization': `bearer ${sessionStorage.getItem("Token")}`}});

    }
}
export default new HaircutHelper