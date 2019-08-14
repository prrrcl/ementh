import React from 'react'
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup'; // Para validación
import withAuth from '../../../hoc/withAuth';

const Invite = ({errors, touched, isSubmitting, login, ...props}) => {
  return (
    <Form autoComplete="off" className="form-login">
      {touched.email && errors.email && <p>{errors.email}</p>}
      <Field placeholder="Your email" type="text" name="email" /> 
    </Form>
  )
}

export default withAuth(withFormik({
  mapPropsToValues({email}){ // este método recoge las props del componente (si las hubiera, y las muestro si las hay)
    return({
      email: email || '' // los valores iniciales se definen en esta función
    })
  },
  handleSubmit(values, props ){ //  , {setSubmitting, setErrors, resetForm} con Form, ejecuta esta acción sin llamarla en el jsx
  props.Invite(values)
  //  setTimeout(()=>{
  //    if(values.email === '1@1.com'){
  //      setErrors({
  //        email: 'Email already registrered'
  //      })
  //    }  else{
  //      resetForm();
  //      console.log('Todo ok.')
  //    }
  //   setSubmitting(false)
  //  },2000)
  
  }
  , // validación
  validationSchema: Yup.object().shape({
        email: Yup.string()
        .email()
        .required(),
        password: Yup.string()
        .required()
    })
})(Invite));
