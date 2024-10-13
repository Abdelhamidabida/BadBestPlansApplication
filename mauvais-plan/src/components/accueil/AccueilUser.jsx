import React from 'react'
import MenuUser from '../../menu/MenuUser'
import "./Accueil.css"
import Toast from 'react-bootstrap/Toast';
import AjouterPub from './AjouterPub';
import AfficheCategoriesUser from './AfficheCategoriesUser';
import { useSelector } from 'react-redux';
import { Avatar } from '@material-ui/core';
import { urlimage } from '../../axios/Api';




const AccueilUser = () => {


  const { user } = useSelector((state) => state.auth);

  console.log({ user })
  return (
    <div>
      <MenuUser />
      <div className='all'>
        <AfficheCategoriesUser />
        <div className='btoa'>
          <AjouterPub />

          <div className='toaa'>
            <Toast  >
              <Toast.Header>
                <Avatar cursor="pointer" alt="Remy Sharp" src={user.avatar ? urlimage + user.avatar : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} />
                <strong className="me-auto" >   &nbsp;  {user.prenom}  {user.nom} {user.nomen}</strong>
                <small>11 mins </small>
              </Toast.Header>
              <Toast.Body>Une application de Top. <br></br>  Merci pour nous donner la commodité de s'exprimer et aussi pour les accusés de se defender et expliquer </Toast.Body>

              <button className='boutcomb '>
                Commentaire
              </button>
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
      </div>










    </div>


  )
}

export default AccueilUser
