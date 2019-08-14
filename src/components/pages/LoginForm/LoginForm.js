import React from 'react';
import { ReactComponent as Ementh } from "../../../logobox.svg";
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup'; // Para validación
import withAuth from '../../../hoc/withAuth';

import './Login.min.css';

const LoginForm = ({errors, touched, isSubmitting, login, ...props}) => {
  return (
    
    <section className="login-page">
    <Ementh/>
    <Form autoComplete="off" className="form-login">
    {touched.email && errors.email && <p>{errors.email}</p>}
    <Field placeholder="Your email" type="text" name="email" /> 
    {touched.password && errors.password && <p>{errors.password}</p>}
    <Field placeholder="Your password" type="password" name="password"/>
      <div>
        <button type="submit">E</button>
      </div>
    </Form>
    </section>
  )
}
export default withAuth(withFormik({
  mapPropsToValues({email}){ // este método recoge las props del componente (si las hubiera, y las muestro si las hay)
    return({
      email: email || '', // los valores iniciales se definen en esta función
      password: ''
    })
  },
  handleSubmit(values, {setErrors, ...bag} ){ //  , {setSubmitting, setErrors, resetForm} con Form, ejecuta esta acción sin llamarla en el jsx
   
  bag.props.login(values)
    .then(res => res)
    .catch(err => {
      if(err.response){
        if(err.response.status === 404){
          setErrors({
            email: "El usuario no existe"
          })
        }
        if(err.response.status === 401){
          setErrors({
            password: "Contraseña incorrecta"
          })
        }
      }
    })
  }
  , // validación
  validationSchema: Yup.object().shape({
        email: Yup.string()
        .email()
        .required(),
        password: Yup.string()
        .required()
    })
})(LoginForm))