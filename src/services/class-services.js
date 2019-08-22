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
  addClass(typeOfClass, maxParticipants, date){
    return this.user.post('/addclass', {typeOfClass, maxParticipants, date})
    .then(response => response)
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
  getAllClassesByDay(day){
    if(day){
      return this.user.post('/getallclass')
    }
  }
  getClassesOfUser(user){
    if(user){
      const data = {user};
      return this.user.post('/getuserclasses', data)
      .then(reponse=>reponse)
    }
  }
  getBenchmarks(){
    return this.user.get('/benchmarks')
    .then(response => response)
  }
  addBenchMark(values, idbench){
    const data = {values, idbench};
    return this.user.post('/addmark', data)
    .then(response => response)
  }
  getUser(idUser){
    return this.user.get(`/user/${idUser}`)
    .then(response=>response)
  }
  addBenchmark(data){
    return this.user.post('/addbenchmark', data)
    .then(response => response)
  }
  getMarks(user, bench){
    return this.user.get(`/getmarks/${user}/${bench}`)
    .then(response => response)
  }
  createRoom(user,friend){
    const data = {user,friend};
    console.log(data)
    return this.user.post(`/createroom`, data )
    .then(response=>response)
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