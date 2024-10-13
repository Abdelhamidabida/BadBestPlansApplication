import React, { useState } from 'react';
import Menu from '../../menu/Menu';
import './Contact.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {addContact} from '../services/ContactService'
import { useDispatch, useSelector } from 'react-redux';
function Contact() {
  const [contenu1, setContenu1] = useState("");
  const [contenu2, setContenu2] = useState("");
  const [contenu3, setContenu3] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === true) {
      if (!user || !user._id) {
        // Display an error message indicating that the user needs to sign up or authenticate
        toast.error("Vous devez vous inscrire ou vous connecter pour contacter l'admin", {
          position: toast.POSITION.LEFT,
          autoClose: 3000,
        });
        return; // Stop the execution of the function
      }

      const Publication = {
        Name: contenu1,
        Email: contenu2,
        Message: contenu3,
        userID: user._id
      };

      addContact(Publication)
        .then((res) => {
          console.log("Insert OK", res);

          navigate("/accueil");

          toast.success("Publication ajoutée avec succès, Attendez la confirmation de l'admin", {
            position: toast.POSITION.LEFT,
            autoClose: 3000,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  

  return (
    <>
    <Menu/>
    <div className='register'>
    <div className="contact-container">
        
      <h1>Contacter Nous</h1>
      <form >
        <label htmlFor="name">Nom :</label>
        <input type="text" id="name" value={contenu1} onChange={(e) => setContenu1(e.target.value)} required />

        <label htmlFor="email">Email :</label>
        <input type="email" id="email" value={contenu2} onChange={(e) => setContenu2(e.target.value)} required />

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

export default Contact;