import React, {useState} from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import FormD from './form/form'
import es from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es')
registerLocale('es', es);

const FormCreateClase = () => {
  const [addClass, setAddClass] = useState(false)
  const [classSelected,setClassSelected] = useState(new Date())
  const handleOpenCreateClass = () =>{
    if(addClass){
      setAddClass(false)
    }else{
      setAddClass(true)
    }
  }
  const handleChanged = (date) => {
    setClassSelected(new Date(date));
  }
  const classNameToggle = addClass ? 'is-opened' : '';
  return(
    <div className="action-admin">
    <h3 className="title">Crea una clase</h3>
    <div className={`form-add-container ${classNameToggle}`}>
    <div className={`toggle ${classNameToggle}`} onClick={handleOpenCreateClass}>+</div>
    <div className={`form-add ${classNameToggle}`}>
    <div className="form-create-class">
    <label htmlFor="date">Fecha / Hora</label>
    <DatePicker
          selected={classSelected}
          onSelect={handleChanged}
          onChange={handleChanged}
          showTimeSelect
          name="datepicked"
          id="datepicked"
          timeFormat="HH:mm"
          timeIntervals={30}
          dateFormat="d MMMM yyyy h:mm aa"
          timeCaption="time"
          locale="es" required
      />
      <FormD date={classSelected} enableReinitialize/>
    </div>
    </div>
    </div>
  </div>
  )
}

export default FormCreateClase
