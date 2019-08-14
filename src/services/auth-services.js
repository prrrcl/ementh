import axios from 'axios';

class AuthService {
  constructor() {
    this.auth = axios.create({
      baseURL: 'http://localhost:5000',
      withCredentials: true // Para que viajen tus datos por cookies
    })
  }

  signup(user) {
    const { username, password } = user;
    return this.auth.post('/auth/signup', {username, password})
      .then(({ data }) => data);
  }
  invite(user) {
    const {email} = user; 
    return this.auth.post('/auth/invite', {email})
    .then(({data})=> data)
  }
  completeSignUp(user){
    const { username, email, password, token } = user;
    return this.auth.post('/auth/completesignup', {username,email,password,token})
    .then(({data})=> {
      return data
    })
  }
  getInfoSignUp(email, token){
    return this.auth.get('/auth/completesignup').then(response =>{
      const data = response.data;
     return data
    } )
  }
  login(user) {
    const { email, password } = user;
    return this.auth.post('/auth/login', {email, password})
      .then(({ data }) => data);
  }

  logout() {
    return this.auth.post('/auth/logout')
      .then(response => response.data)
  }

  me() {
    return this.auth.get('/auth/me')
    .then(response => response.data)
  }
}

const authService = new AuthService();

export default authService