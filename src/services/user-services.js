import axios from 'axios';

class UserService {
  constructor(){
    this.user = axios.create({
      baseURL: 'http://localhost:5000/api',
      withCredentials: true // Para que viajen tus datos por cookies
    })
  }

  getAllFriends(currentUserId) {
    if(currentUserId){
      return this.user.get(`/friends/${currentUserId.username}`).then(response =>{
        const newArr = response.data;
       return newArr
      } )
    }
  }

  getClasses(day){
    if(day){
      return this.user.post('/getcalendardates', day).then(response =>{
        return response
      })
    }
  }
  // addOneApp(newApp) {
  //   return this.apps.post('/app/new', newApp)
  //   .then(response => response);
  // }

  // updateOneApp (id, updatedApp){
  //   return this.apps.put(`/apps/${id}/update`, updatedApp)
  //   .then(response => response);
  // }

  // delApp (id) {
  //   return this.apps.delete(`/apps/${id}/delete`)
  //   .then(response => response)
  // }

}

const userService = new UserService();

export default userService;