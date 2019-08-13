import React from 'react';
import {Redirect} from 'react-router-dom'
import { ReactComponent as Ementh } from "../../../logobox.svg";
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup'; // Para validación
import withAuth from '../../../hoc/withAuth';

import './Login.min.css';

const Login = ({errors, touched, isSubmitting, ...props}) => {

  const { isLoggedIn, login } = props
  return (
    
    <section className="login-page">
      {isLoggedIn && <Redirect to="/"/>}
    <Ementh/>
    <Form className="form-login">
    <Field type="text" name="email" /> 
    {touched.email && errors.email && <p>{errors.email}</p>}
      <input type="password" placeholder="Password"/>
      <div>
        <button>E</button>
      </div>
    </Form>
    </section>
  )
}
export default withFormik({
  mapPropsToValues({email}){ // este método recoge las props del componente (si las hubiera, y las muestro si las hay)
    return({
      email: email || '', // los valores iniciales se definen en esta función
      password: ''
    })
  },
  handleSubmit(values, {setSubmitting, setErrors, resetForm}){ // con Form, ejecuta esta acción sin llamarla en el jsx
   setTimeout(()=>{
     if(values.email === '1@1.com'){
       setErrors({
         email: 'Email already registrered'
       })
     }  else{
       resetForm();
       console.log('Todo ok.')
     }
    setSubmitting(false)
   },2000)
  }
  , // validación
  validationSchema: Yup.object().shape({
        email: Yup.string()
        .email()
        .required(),
        password: Yup.string()
        .required()
        .min(8)
    })
})(withAuth(Login))