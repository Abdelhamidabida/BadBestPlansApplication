import React from 'react'
import "./Accueil.css"
import Toast from 'react-bootstrap/Toast';
import AjouterPub from './AjouterPub';
import Menu from '../../menu/Menu';
import AfficheCategories from './AfficheCategories';
import { fetchPublications } from '../services/PublicationService'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify';


const Accueil = () => {
  const handleImageClick = () => {
    toast.error('Erreur !');
  };
  return (<>
    <Menu />
    <div className='all'>
      <AfficheCategories />
      <div className='btoa'>
        <AjouterPub />

        <div className='toaa'>
          <Toast  >
            <Toast.Header>
              <img src='Images/pdp.jpg' className="rounded me-2" alt="AA" height="30px" width="40px" />
              <strong className="me-auto" >Nom Prénom</strong>
              <small>11 mins </small>
            </Toast.Header>
            <Toast.Body>Une application de Top. <br></br>  Merci pour nous donner la commodité de s'exprimer et aussi pour les accusés de se defender et expliquer </Toast.Body>

            <button className='boutcomb'>  Commentaire</button>
          </Toast>
          <div className='toa2'>
            <Toast  >
              <Toast.Header>
                <img src='Images/Logo3.png' className="rounded me-2" alt="AA" height="30px" width="50px" />
                <strong className="me-auto" >FEEL FREE</strong>
                <small>18 mins </small>
              </Toast.Header>
              <Toast.Body>J'adore ça .<br></br> Merci pour votre confiance ! </Toast.Body>

            </Toast>
          </div>

        </div>





      </div>
    </div></>

  )
}
export default Accueil