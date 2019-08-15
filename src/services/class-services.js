import axios from 'axios';

class ClassService {
  constructor(){
    this.user = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_DOMAIN + '/api',
      withCredentials: true // Para que viajen tus datos por cookies
    })
  }

  bookClass(user, idClass){
    return this.user.post('/bookclass', {user, idClass})
      .then(({ data }) => data);
  }

  getClassesOfUser(user){
    if(user){
      return this.user.post('/classes', user)
      .then(data => data)
    }
  }

  getClasses(day){
    if(day){
      return this.user.post('/getcalendardates', day)
        .then(response =>{
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

const classService = new ClassService();

export default classService;