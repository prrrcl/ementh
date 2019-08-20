import React, { useState, useEffect, useRef } from 'react'

import withAuth from '../../../hoc/withAuth';
import classService from '../../../services/class-services'
import FormInvite from './FormInvite'
import FormCreateClase from './FormCreateClase'

const HomeAdmin = (props) => {
  return (
    <>
    {props.action ==='createclass' 
    ? (<FormCreateClase/>)
    :(<FormInvite/>)}
    
    </>
  )
}

export default withAuth(HomeAdmin)
