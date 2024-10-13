import React from 'react';
import { Button, Form, Row } from 'react-bootstrap';
import { editentre, fetchPublicationById } from '../services/PublicationService';
import MenuUser from '../../menu/MenuUser';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Avatar } from '@mui/material';
import { urlimage } from '../../axios/Api';





function Réaction_entrerpise() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [publications, setPublications] = useState([]);
  useEffect(() => {
    fetchPublicationById(id).then(res => {
      setPublications(res.data)
    })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const [validated, setValidated] = useState(false);
  const [contenu, setContenu] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3001/api/publications/contenuen/${id}`, {
        contenuen: contenu

      });


      toast.success("Réponse ajouté avec succès ", {
        position: toast.POSITION.LEFT,
        autoClose: 3000,
      });
      navigate('/Notification');
      console.log(response.data);
      // Mettre à jour la liste des commentaires
      id.updateCommentaires(response.data);

    } catch (error) {
      console.log(error);
    }
  };
  const [fullscreen, setFullscreen] = useState(false);
  const handleImageClick = () => {
    setFullscreen(true);
  };

  const handleImageClose = () => {
    setFullscreen(false);
  };
  return (
    <div>
      <MenuUser />
      <div className="container w-100 d-flex justify-content-center">
        <div className=' mt-5 w-50'>
          <h2 align="center">Ajouter Réponse</h2>
          <div className='forma'>
            <div className='form mt-3'>
              <Form className=" p-3" noValidate validated={validated}
                onSubmit={handleSubmit}>
                <Row className="mb-2">
                  <div className='nono'> <Avatar
                    cursor="pointer"
                    alt="Remy Sharp"
                    src={publications.userID?.avatar ? urlimage + publications.userID?.avatar : 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'}
                  />
                    <div className='nammm'>  {publications.userID?.prenom} {publications.userID?.nom} </div></div>
                  <br></br>
                  <div className='conttt' style={{ wordWrap: 'break-word', width: '100%' }}>
                    {publications.contenu}
                    {publications.photos && publications.photos.length > 0 && (
                      <img
                        src={urlimage + publications.photos}
                        alt="Photo"
                        height="50"
                        width="150"
                        style={{ marginLeft: '30%', marginTop: '20px', cursor: 'pointer' }}
                        onClick={handleImageClick}
                      />
                    )}
                    {fullscreen && (
                      <div
                        className="fullscreen-overlay"
                        style={{
                          position: 'fixed',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          zIndex: 9999
                        }}
                        onClick={handleImageClose}
                      >
                        <img
                          src={urlimage + publications.photos}
                          alt="Photo"
                          style={{ maxHeight: '50vh', maxWidth: '90vw' }}
                        />
                      </div>
                    )}
                  </div>


                  <Form.Group md="6" >
                    <div className='repp'> <Form.Label >Réponse : </Form.Label> <br></br> </div>
                    <textarea style={{ width: '450px', borderRadius: '5px', marginLeft: '70px' }} id="message" value={contenu} onChange={(e) => setContenu(e.target.value)} required />




                  </Form.Group></Row>
                <center><Button type="submit" style={{
                  color: 'white',
                  backgroundColor: 'rgb(245, 199, 74)',
                  border: 'none' // Supprime la bordure du bouton
                }}>Répondre</Button></center>
              </Form> </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Réaction_entrerpise


