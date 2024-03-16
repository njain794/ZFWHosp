import { jwtDecode } from "jwt-decode";

class AuthService {
  login(username, password) {
    // Mock authentication with fake credentials
    if (username === "zippee@gmail.com" && password === "zippee") {
      const token = "fake-jwt-token";
      localStorage.setItem("token", token);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem("token");
  }

  getToken() {
    return localStorage.getItem("token");
  }

  isTokenExpired(token) {
    try {
      const decoded = jwt_decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      }
      return false;
    } catch (err) {
      return true;
    }
  }

  isLoggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token);
  }
}

export default new AuthService();
