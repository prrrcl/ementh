import React,{ useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import withAuth from '../../../hoc/withAuth'
import classService from '../../../services/class-services'
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup'; // Para validación
import './Benchmark.min.css'
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es')

const Benchmarks = ({errors, touched, isSubmitting, login, ...props}) => {
  const [benchmarks, setBenchmarks] = useState();
  const [selectedBench, setSelectedBench] = useState([]);
  const [isOpen, setIsOpen] = useState(0);
  const [nameBench, setNameBench] = useState();
  const { idbench } = props.match.params;

  
  useEffect(()=>{

    if(idbench){
      classService.getMarks(props.user._id, idbench)
    .then(response => {
      setSelectedBench(response.data)
      setIsOpen(1)
    })
    }else{
      setIsOpen(0)
    }

    classService.getBenchmarks()
    .then((response)=>{
      setBenchmarks(response.data)
    })

  },[idbench, props.user._id])

  const openForm = (bench) =>{
    setIsOpen(2)
  }

  const handleSelectBench =(idBench) =>{
    classService.getMarks(props.user._id, idBench)
    .then(response => {
      setSelectedBench(response.data)
    })
  }
  const classTwoScreens = isOpen === 1 ? 'is-opened' : isOpen === 2 ? 'is-opened-3' : '';
  const classBack = isOpen === 1 || isOpen === 2 ? 'opened' : '';
  const goBackAction = props.history.goBack;
  
  if(benchmarks){
    return (
      <div className={`threescreens ${classTwoScreens}`}>

      <section className="benchmarks-list">
              <h3>benchmarks</h3>
            {benchmarks.map((bench)=>{
              return(
                <article className="benchmark" key={bench._id}>
                  <Link to={`/user/${props.user._id}/benchmarks/${bench._id}`} onClick={()=>{handleSelectBench(bench._id);setNameBench(bench.name)}}>{bench.name}</Link>
                </article>
              )
            })}
      </section>
      
      <section className="benchmarks-details">
        {
          selectedBench.length > 0
          ? (
            <>
              <span onClick={goBackAction} className={`go-back ${classBack}`}>t</span>
              <span className="create-bench" onClick={()=> openForm(selectedBench)}>+</span>
              <div className="benchmark-details-list">
                <h3>{nameBench}</h3>
                {selectedBench.map((mark)=>{
                  return(<p key={mark._id}><strong>{moment(mark.date).format('DD/MM/YY')}</strong> - {mark.weight}kg - {mark.reps} reps</p>)
                })}
              </div>
            </>
          )
          :
          (
          <>
          <span onClick={goBackAction} className={`go-back ${classBack}`}>t</span>
          <span className="create-bench" onClick={()=> openForm(selectedBench)}>+</span>
            <p className="no-marks">No has añadido ningún <strong>mark</strong> todavía. Anímate a añadir el primero!</p>
          </>
          )
        }
      </section>
      <section className="benchmarks-details-form">
        
            <>
              <span onClick={goBackAction} className={`go-back ${classBack}`}>t</span>
                <h3>Añadir benchmark</h3>

                  <Form autoComplete="off" className="add-bench">
                  <label htmlFor="date">Fecha</label>
                  <Field placeholder="Fecha" id="date" type="date" name="date" /> 
                  {touched.date && errors.date && <p className="form-error">{errors.date}</p>}
                  <label htmlFor="weight">Peso</label>
                  <Field placeholder="Peso en Kg" type="text" name="weight" id="weight"/>
                  {touched.weight && errors.weight && <p className="form-error">{errors.weight}</p>}
                  <label htmlFor="weight">Repeticiones</label>
                  <Field placeholder="Numero de repeticiones" type="text" name="reps" id="reps"/>
                  {touched.reps && errors.reps && <p className="form-error">{errors.reps}</p>}
                    <div>
                      <button type="submit">Añadir Benchmark</button>
                    </div>
                  </Form>
            </>
        

      </section>
      </div>
      
    )
  }else{
    return(
      <>
      Loading
      </>
    )
  }
}

export default withAuth(withFormik({
  mapPropsToValues(){ // este método recoge las props del componente (si las hubiera, y las muestro si las hay)
    return({
      date: '', // los valores iniciales se definen en esta función
      weight: '',
      reps: ''
    })
  },
  handleSubmit(values, {setErrors, ...bag} ){ //  , {setSubmitting, setErrors, resetForm} con Form, ejecuta esta acción sin llamarla en el jsx
   //call to service
   classService.addBenchMark(values, bag.props.match.params.idbench)
   .then((response)=>{
      bag.props.history.goBack()
   })
   .catch((err)=>{
     console.log(err)
   })
  }
  , // validación
  validationSchema: Yup.object().shape({
        date: Yup.date()
        .required('El campo fecha es requerido.'),
        weight: Yup.string()
        .required('El campo peso es requerido.'),
        reps: Yup.number('Debe de ser un número.')
        .required('El campo repeticiones es requerido.')
    })
})(Benchmarks))
