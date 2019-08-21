import React, {useState} from 'react';
import classService from '../../../../services/class-services';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup'; // Para validaciónimport { placeholder } from '@babel/types';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es')
const FormD = ({date,errors, touched, isSubmitting, login, ...props}) => {
  return (
      <Form autoComplete="off">
        <label htmlFor="typeOfClass">Tipo de entreno</label>
      <Field
      id="typeOfClass"
          name="typeOfClass"
          component='select'
              >
              <option value="" disabled label="Selecciona una modalidad" />
              <option value="wod" label="Wod" />
              <option value="openbox" label="Open Box" />
      </Field>
      {touched.typeOfClass && errors.typeOfClass && <p className="form-error">{errors.typeOfClass}</p>}
      <label htmlFor="maxParticipants">Máximo de participantes</label>
      <Field name="maxParticipants" id="maxParticipants" type="number" placeholder="Número máximo de participantes"/>
      {touched.maxParticipants && errors.maxParticipants && <p className="form-error">{errors.maxParticipants}</p>}
      {errors.formNoError && <p className="form-success">{errors.formNoError}</p>}
      {errors.formError && <p className="form-error">{errors.formError}</p>}
      <button type="submit" className="btn">Crear clase</button>
      </Form>
  )
}

export default withFormik({
  mapPropsToValues({date}){
    return({
      typeOfClass: '', // los valores iniciales se definen en esta función
      dateofclass: date,
      maxParticipants:''
    })
  },
  handleSubmit(values, {setSubmitting, setErrors, resetForm, ...bag}){
   const newClasse = classService.addClass(values)
   .then(response => {
    if(response.status === 200){
      resetForm()
      setErrors({
        formNoError: `Clase creada satisfactoriamente.`
      })
    }else if(response.status === 405){
      
    }
    return response
  })
  .catch((err)=>{
    setErrors({
      formError: `La clase ya existe, ¡selecciona otra fecha!`
    })
  })
  }
  , // validación
  validationSchema: Yup.object().shape({
    typeOfClass: Yup.string()
        .required('Es obligatorio seleccionar un tipo de clase.'),
    maxParticipants: Yup.number()
    .required('Es obligatorio indicar el máximo de participantes.'),
    dateofclass: Yup.date()
    })
  
})(FormD);
