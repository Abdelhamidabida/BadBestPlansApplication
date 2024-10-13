import React, { useState } from 'react';
import Menu from '../../menu/Menu';
import './Contact.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {addContact} from '../services/ContactService'
import MenuUser from '../../menu/MenuUser';
import { useSelector } from 'react-redux';
function ContactUser() {
  const [contenu1, setContenu1] = useState("");
  const [contenu2, setContenu2] = useState("");
  const [contenu3, setContenu3] = useState("");
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      const Publication = {
        Name: user.nom + ' ' + user.prenom,
        Email: user.email,
        Message: contenu3
      };

      addContact(Publication)
        .then(res => {
          console.log("Insert OK", res);

          navigate("/accueilUser");
          
          toast.success("Message envoyeé avec succès , Merci !", {
            position: toast.POSITION.LEFT,
            autoClose: 3000,
          });


        })
        .catch(error => {
          console.log(error)
        })
    }
  };
  

  return (
    <>
    <MenuUser/>
    <div className='register'>
    <div className="contact-container">
        
      <h1>Contacter Nous</h1>
      <form >
        <label htmlFor="name">Nom :</label>
        <input type="text" id="name"  value={`${user.nom ? user.nom : ''} ${user.prenom ? user.prenom : ''} ${user?.nomen ? user.nomen : ''}`}
onChange={(e) => setContenu1(e.target.value)} required />

        <label htmlFor="email">Email :</label>
        <input type="email" id="email" value={user.email} onChange={(e) => setContenu2(e.target.value)} required />

        <label htmlFor="message">Message :</label>
        <textarea id="message" value={contenu3} onChange={(e) => setContenu3(e.target.value)} required />

        <button type="submit" onClick={handleSubmit}>Envoyer</button>
      </form>
    </div>
    <div className='azerty' >
                <img src='Images/Logo33.png' alt="MMM" height='330px' width="420px"></img>
            </div>
    </div>
    </>
  );
}

export default ContactUser;