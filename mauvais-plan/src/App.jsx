import './App.css';
import Menu from './menu/Menu';
import Footer from './components/footer/Footer';
import Publicationspace from './components/accueil/Accueil'
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />


function App() {
  return (
  <>
 

  <Menu/>
  <Publicationspace/>
  
  </>
  );
}


export default App;
