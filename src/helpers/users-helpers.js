import http from "../http-commons";

class UserHelper {
  loginUser(data) {
    return http.post("/User/Login", data);
  }
  registerUser(data){
    return http.post("/User/register", data)
  }
  createUser(data){
    return http.post("/User", data, {headers: {'Authorization': `bearer ${sessionStorage.getItem("Token")}`}})
  }
  deleteUser(id) {
    return http.delete(`/User/${id}`,{headers: {'Authorization': `bearer ${sessionStorage.getItem("Token")}`}});
  }
  getAllUsers() {
    return http.get("/User", {headers: {'Authorization': `bearer ${sessionStorage.getItem("Token")}`}});
  }
  updateUser(id,data) {
    return http.put(`/User/${id}`, data, {headers: {'Authorization': `bearer ${sessionStorage.getItem("Token")}`}});
  }
}
export default new UserHelper();
