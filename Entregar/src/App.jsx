import React from 'react';
import NavBar from './componentes/NavBar';
import Routes from './componentes/Routes';
import { BrowserRouter } from 'react-router-dom'
export default function(){
  return  <BrowserRouter>
  <React.Fragment><NavBar/><Routes/></React.Fragment>
  </BrowserRouter> 
}


