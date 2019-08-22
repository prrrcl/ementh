import React, {useState} from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup'; // Para validaciónimport { placeholder } from '@babel/types';
import authService from '../../../services/auth-services';
import moment from 'moment';
import withAuth from '../../../hoc/withAuth'
import 'moment/locale/es';
moment.locale('es')

const FormInvite = ({errors, touched, isSubmitting, login, ...props}) => {
  const [addClass, setAddClass] = useState(false)
  const handleOpenCreateClass = () =>{
    if(addClass){
      setAddClass(false)
    }else{
      setAddClass(true)
    }
  }
  const classNameToggle = addClass ? 'is-opened' : '';

  return(
    <div className="action-admin">
    <h3 className="title">Invita a un usuario</h3>
      <div className={`form-add-container ${classNameToggle}`}>
      <div className={`toggle ${classNameToggle}`} onClick={handleOpenCreateClass}>+</div>
      <div className={`form-add ${classNameToggle}`}>
        <Form autoComplete="off" className="form-create-class">
          <label htmlFor="email">Email</label>
        <Field name="email" id="email" type="email" placeholder="Introduce el mail del usuario que quieres invitar"/>
        {touched.email && errors.email && <p className="form-error">{errors.email}</p>}
        {errors.formNoError && <p className="form-success">{errors.formNoError}</p>}
        <button type="submit" className="btn">Invitar usuario</button>
        </Form>
      </div>
      </div>
    </div>
  )
}

export default withAuth(withFormik({
  mapPropsToValues(){// este método recoge las props del componente (si las hubiera, y las muestro si las hay)
    return({
      email:''
    })
  },
  handleSubmit(values, {setSubmitting, setErrors, resetForm, ...bag}){
    const {email} = values;
    const owner = bag.props.user._id;
   authService.invite({email, owner})
    .then((response) => {
      console.log(response)
      if(response.status === 200){
        resetForm()
        setErrors({
          formNoError: `Usuario invitado correctamente.`
        })
    }else if(response.status === 209){
      resetForm()
      setErrors({
        formNoError: `Nuevo token generado.`
      })
    } return response
  })
    .catch(err => console.log(err))
  }
  , // validación
  validationSchema: Yup.object().shape({
    email: Yup.string()
        .email('Debes introducir un mail válido.')
        .required('Es obligatorio rellenar el campo de mail.')
    })
})(FormInvite))
