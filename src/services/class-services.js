import axios from 'axios';

class ClassService {
  constructor(){
    this.user = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_DOMAIN + '/api',
      withCredentials: true // Para que viajen tus datos por cookies
    })
  }

  bookClass(user, classe){
    return this.user.post('/bookclass', {user, classe})
      .then(response => {
        return response
      });
  }

  delBookClass (user, classe) {
    const userId = user._id;
    const classeId = classe._id;
    return this.user.post('/unsubclass', {userId, classeId})
    .then(response => response)
  }

  getClasses(day, user){
    if(day){
      const data = {day, user}
      return this.user.post('/getcalendardates',data)
        .then(response => response)
    }
  }

  getClassesOfUser(day, user){
    if(day){
      const data = {day, user};
      return this.user.post('/getuserclasses', data)
      .then(reponse=>reponse)
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

  

}

const classService = new ClassService();

export default classService;