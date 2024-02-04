import axios from "axios";

const API_URL = "http://localhost:3001/api/auth/";

export default class AuthService {
  static async login(username, password) {
    try {
      // console.log("in api");
        const response = await axios.post(API_URL + "signin", { username, password })
        console.log(response);
        if (response.data.accessToken) {
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("user", username);
        }
        return response.data;
    } catch(err) {
        throw err;
    }
  }

  static logout() {
    localStorage.removeItem("user");
    localStorage.removeItem('access_token');
  }
}
