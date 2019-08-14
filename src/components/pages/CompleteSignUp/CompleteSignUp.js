import React, { useEffect, useState } from 'react'
import authService from '../../../services/auth-services';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup'; // Para validación
import withAuth from '../../../hoc/withAuth';

import './CompleteSignUp.min.css'

function CompleteSignUp({errors, touched, isSubmitting, login, ...props}) {
  const { mail, token } = props.match.params
  const  [dataUser, setDataUser] = useState({})

  return (
    <div className="complete-profile">
      <h3>¡Completa el registro!</h3>
      <h5>Para poder acceder a todas las funcionalidades.</h5>
      <Form autoComplete="off" className="form-sign-up">
        {touched.email && errors.email && <p>{errors.email}</p>}
        <Field placeholder="Your email" type="text" name="email" readOnly={true} /> 
        <Field placeholder="Choose an username" type="text" name="username"/>
        <Field placeholder="Choose a password" type="password" name="password"/>
        <Field hidden name="token" />
        <div>
          <button type="submit">Completar registro</button>
        </div>
      </Form>
    </div>
  )
}

export default withAuth(withFormik({
  mapPropsToValues({email, ...props}){ // este método recoge las props del componente (si las hubiera, y las muestro si las hay)
    return({
      email: props.match.params.email || '', // los valores iniciales se definen en esta función
      username: '',
      password: '',
      token: props.match.params.token
    })
  },
  handleSubmit(values, {setSubmitting, setErrors, resetForm, ...bag}){ 
    // con Form, ejecuta esta acción sin llamarla en el jsx
   bag.props.completeSignup(values)
    .then(response => {
      return response
    })
    .catch(err => console.log(err))
  }
  , // validación
  validationSchema: Yup.object().shape({
        email: Yup.string()
        .email()
        .required(),
        password: Yup.string()
        .required()
    })
})(CompleteSignUp))
