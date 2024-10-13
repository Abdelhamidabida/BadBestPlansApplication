import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';
import "./Profile.css"
import MenuUser from '../../menu/MenuUser';
import { useSelector } from 'react-redux';
import { urlimage } from '../../axios/Api';
import { Button, Toast } from 'react-bootstrap';
import { TfiCommentsSmiley } from 'react-icons/tfi';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPubUsers, fetchnombrecp, fetchnombreUS } from '../../components/services/PublicationService';
import { fetchVilles } from "../services/VilleService";
import { Avatar } from '@mui/material';
import { toast } from 'react-toastify';
export default function Profiluser() {
  const { user } = useSelector((state) => state.auth);
  const [nombre, setNombre] = useState(0);
  const [publication, setPublication] = useState([]);
  const navigate = useNavigate();

  const [villes, setVilles] = useState("");
  const TimeElapsed = ({ createdAt }) => {
    const [timeElapsed, setTimeElapsed] = useState('');

    useEffect(() => {
      const interval = setInterval(() => {
        const now = new Date();
        const created = new Date(createdAt);
        const elapsed = now - created;

        // Calculer le temps écoulé en jours, heures, minutes et secondes
        const days = Math.floor(elapsed / 86400000);
        const hours = Math.floor((elapsed % 86400000) / 3600000);
        const minutes = Math.floor((elapsed % 3600000) / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);

        let formattedTimeElapsed = '';

        if (days > 0) {
          formattedTimeElapsed += `${days}jr`;
        } else if (hours > 0) {
          formattedTimeElapsed += `${hours}h`;
        } else if (minutes > 0) {
          formattedTimeElapsed += `${minutes}m`;
        } else {
          formattedTimeElapsed += `${seconds}s`;
        }

        setTimeElapsed(formattedTimeElapsed);
      }, 1000);

      return () => clearInterval(interval);
    }, [createdAt]);

    return <span>{timeElapsed}</span>;
  };

  const [ville, setVille] = useState([]);
  const [publications, setPublications] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  console.log(user._id)
  useEffect(() => {
    fetchPubUsers(user._id).then(res => {
      setPublications(res.data)
    })
      .catch(error => {
        console.log(error)
      })
  }, [])
  console.log(publications)
  useEffect(() => {
    fetchPubUsers(user._id).then(res => {
      setPublication(res.data)
    })
      .catch(error => {
        console.log(error)
      })
  }, [])

  const fetchVillesAndVille = () => {
    fetchVilles()
      .then(res => {
        setVilles(res.data);
      })
      .catch(error => {
        console.log(error);
      });

    fetchPubUsers(user._id)
      .then(res => {
        setVille(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  console.log(ville);
  useEffect(() => {
    fetchVillesAndVille();
  }, [user._id]);
  useEffect(() => {
    if (publication) {
      fetchNumberOfComments(publication);
    }
  }, [publication]);

  const fetchNumberOfComments = async (pubs) => {
    const promises = pubs.map(pub => fetchnombrecp(pub._id));
    const commentCounts = await Promise.all(promises);
    const counts = commentCounts.map(res => res.data);
    setNombre(counts);
  };

  const TimeElapsedu = ({ updatedAt }) => {
    const [timeElapsedu, setTimeElapsedu] = useState('');

    useEffect(() => {
      const interval = setInterval(() => {
        const now = new Date();
        const created = new Date(updatedAt);
        const elapsed = now - created;

        // Calculer le temps écoulé en jours, heures, minutes et secondes
        const days = Math.floor(elapsed / 86400000);
        const hours = Math.floor((elapsed % 86400000) / 3600000);
        const minutes = Math.floor((elapsed % 3600000) / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);

        let formattedTimeElapsedu = '';

        if (days > 0) {
          formattedTimeElapsedu += `${days}jr`;
        } else if (hours > 0) {
          formattedTimeElapsedu += `${hours}h`;
        } else if (minutes > 0) {
          formattedTimeElapsedu += `${minutes}m`;
        } else {
          formattedTimeElapsedu += `${seconds}s`;
        }

        setTimeElapsedu(formattedTimeElapsedu);
      }, 1000);

      return () => clearInterval(interval);
    }, [updatedAt]);

    return <span>{timeElapsedu}</span>;
  };

  const [contenu, setContenu] = useState('');
  const [contenu2, setContenu2] = useState('');
  const [contenu3, setContenu3] = useState('')
  const [contenu4, setContenu4] = useState("");
  const [contenu5, setContenu5] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentpage, SetCurrentpage] = useState(1)
  const recordsPerPage = 3;
  const lastIndex = currentpage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = ville.slice(firstIndex, lastIndex);
  const npage = Math.ceil(ville.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const [nombres, setNombres] = useState(0);
  useEffect(() => {
    fetchnombreUS(user._id)
      .then(res => {
        setNombres(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    GetListvilles();
  }, []);
  const GetListvilles = async () => {
    fetchVilles()
      .then(res => {
        setVilles(res.data)
      })
      .catch(error => {
        console.log(error)
      })
  }
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setContenu5(file);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(contenu4)) {
      setIsPasswordValid(false);
      return;
    }
    if (form.checkValidity() === true) {
      const formData = new FormData();
      formData.append("nom", contenu);
      formData.append("prenom", contenu2);
      formData.append("ville", contenu3);
      formData.append("password", contenu4);
      formData.append("avatar", contenu5);

      try {
        const response = await axios.put(`http://localhost:3001/api/users/${user._id}`, formData);

        console.log("Update OK", response.data);
        toast.success("Profil modifié avec succès ", {
          position: toast.POSITION.LEFT,
          autoClose: 3000,
        });
        handleClose();
        navigate('/logout');
      } catch (error) {
        console.log(error);
      }
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
    <>
      <MenuUser />
      <div className="gradient-custom-2" >
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="9" xl="7">
              <MDBCard>
                <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#f4cc54', height: '160px' }}>
                  <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '83px', marginTop: '20px' }}>
                    <MDBCardImage
                      src={user?.avatar ? urlimage + user?.avatar : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"}
                      alt="avatar"

                      style={{ width: '63px', borderRadius: '25px', height: '100px', marginTop: '6px' }}

                      fluid
                    /></div>


                  <div className="ms-3" style={{ marginTop: '88px' }}>
                    <MDBTypography tag="h5">{user.nom} {user.prenom}</MDBTypography>
                    <MDBCardText> {user.ville?.nomVille}</MDBCardText>
                  </div>

                </div>
                <div className='gvgg'>
                  <Button
                    className='boutp'
                    style={{
                      height: '45px',
                      width: '123px',
                      marginTop: '27px',
                      marginLeft: '113px',
                      fontSize: '13px',
                      backgroundColor: '#f4cc54',
                      border: 'none'
                    }}
                    onClick={handleShow}
                  >
                    Modifier profil
                  </Button>


                  <div className='momp'>
                    <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                      <div className="d-flex justify-content-end text-center py-1">
                        <div>
                          <MDBCardText className="mb-1 h5">{nombres}</MDBCardText>
                          <MDBCardText className="small text-muted mb-0">Publications</MDBCardText>
                        </div>
                        <div className="px-3">
                          <MDBCardText className="mb-1 h5">00</MDBCardText>
                          <MDBCardText className="small text-muted mb-0">Commentaires</MDBCardText>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <MDBCardBody className="text-black p-4">

                  <div style={{ marginTop: '20px' }} className="d-flex justify-content-between align-items-center mb-4">


                    <MDBCardText className="lead fw-normal mb-0">Vos Publications ( {nombres} ) </MDBCardText>
                    <MDBCardText className="mb-0"><a href="#!" className="text-muted"></a></MDBCardText>
                  </div>
                  <MDBRow>
                    <MDBCol lg="12">
                      {/* Boucle de rendu des publications */}
                      {records.map((publication, index) => (
                        <MDBCard key={publication.id} className="mb-6 mb-md-0">

                          <MDBCardBody>
                            <div className='toa222'>

                              <Toast className="custom-toast" >
                                <Toast.Header>
                                  <Avatar
                                    cursor="pointer"
                                    alt="Remy Sharp"
                                    src={
                                      publication.userID?.avatar
                                        ? urlimage + publication.userID?.avatar
                                        : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                                    }
                                    height="30px"
                                    width="30px"
                                  />{" "}
                                  &nbsp; &nbsp;
                                  <strong className="me-auto">
                                    {publication.userID?.prenom} {publication.userID?.nom} {publication.userID?.nomen}
                                  </strong>
                                  <small>
                                    <TimeElapsed createdAt={publication.createdAt} />
                                  </small>
                                </Toast.Header>
                                <Toast.Body>
                                  {publication.contenu}
                                  {publication.photos && publication.photos.length > 0 && (
                      <img
                        src={urlimage + publication.photos}
                        alt="Photo"
                        height="200"
                        width="300"
                        style={{ marginLeft: '10px', marginTop: '20px', cursor: 'pointer' }}
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
                          src={urlimage + publication.photos}
                          alt="Photo"
                          style={{ maxHeight: '90vh', maxWidth: '90vw' }}
                        />
                      </div>
                    )}
                                  <div className="r2bt">


                                    <button className="boutcomp">
                                      {
                                        <Link to={"/AjoutcmntUser/" + publication._id} className="boutcommmp">
                                          <TfiCommentsSmiley style={{ width: '15px', height: '15px', color: '#aae5f5' }} /> &nbsp;Commentaire(s) ({nombre[index]})
                                        </Link>
                                      }{" "}
                                    </button>
                                  </div>
                                </Toast.Body>
                              </Toast>
                              <div className="toa2">
                                <Toast className="custom-toast" >
                                  <Toast.Header>
                                    <Avatar src={publication.entrepriseID?.avatar ? urlimage + publication.entrepriseID?.avatar : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} /> &nbsp;  &nbsp;
                                    <strong className="me-auto">
                                      {publication.entrepriseID?.nomen} - {publication.ville?.nomVille}
                                    </strong>
                                    <div>
                                      <p>
                                        {publication.contenu_en !== " " && (
                                          <small>
                                            <p>
                                              <TimeElapsedu updatedAt={publication.updatedAt} />
                                            </p>
                                          </small>
                                        )}
                                      </p>
                                    </div>
                                  </Toast.Header>
                                  <Toast.Body>{publication.contenu_en}</Toast.Body>
                                </Toast>
                              </div></div>
                          </MDBCardBody>
                        </MDBCard>
                      ))}
                    </MDBCol>
                  </MDBRow>

                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>  Modifier Profil   </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" xs={12} sm={6} >
              <Grid item xs={12} sm={6}>
                <Form.Group as={Col} md="12">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control type="text" placeholder={user.nom} value={contenu}
                    onChange={(e) => setContenu(e.target.value)}
                  />
                </Form.Group>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Form.Group as={Col} md="12">
                  <Form.Label>Prénom</Form.Label>
                  <Form.Control type="text" placeholder={user.prenom} value={contenu2}
                    onChange={(e) => setContenu2(e.target.value)}
                  />
                </Form.Group>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Form.Group as={Col} md="12">
                  <Form.Label style={{ marginTop: '10px' }}>Ville</Form.Label>
                  <Form.Control
                    as="select"
                    type="select"
                    value={contenu3}
                    onChange={(e) => setContenu3(e.target.value)}
                  >
                    <option>Sélectionner </option>
                    {villes ? villes.map((vil) => <option key={vil._id}
                      value={vil._id}>{vil.nomVille}</option>) : null}
                  </Form.Control>
                </Form.Group>


                <Grid item xs={12} sm={6}>
                  <Form.Group as={Col} md="12">
                    <Form.Label>Mot de passe</Form.Label>
                    <div className="d-flex align-items-center" >
                      <Form.Control value={contenu4}
                        onChange={(e) => setContenu4(e.target.value)}
                        type={showPassword ? 'text' : 'password'}
                      />
                      <Button
                        variant="outline-secondary"
                        onClick={handleTogglePasswordVisibility}
                      >
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                      </Button>  {!isPasswordValid && (
                  <Form.Text className="text-danger">
                    Le mot de passe doit contenir au moins 8 caractères, 1 chiffre et 1 symbole.
                  </Form.Text>
                )}</div>
                  </Form.Group>
                </Grid>
              </Grid>



            </Form.Group>
            <Form.Label>Nouveau photo</Form.Label>
            <Form.Control
              type="file"
              name="photos"
              onChange={handleFileChange}
            />

          </Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Fermer
          </Button>
          <Button variant="info" onClick={handleSubmit} >
            Modifier
          </Button>
        </Modal.Footer>

      </Modal>
      <div className='pagination8'>
        <ul className='pagination'>
          <li className='page-item'>
            <a href="#" className='page-link' onClick={prePage}>Prec</a>
          </li>
          {numbers.map((n, i) => (
            <li className={`page-item ${currentpage === n ? 'active' : ''}`} key={i}>
              < a href='#' className='page-link' onClick={() => changeCPage(n)} > {n} </a>    </li >
          )


          )
          }
          <li className='page-item'>
            <a href="#" className='page-link' onClick={nextPage}>Suiv</a>
          </li>
        </ul >
      </div>
    </>
  );
  function prePage() {
    if (currentpage !== 1) {
      SetCurrentpage(currentpage - 1)
    }

  }
  function changeCPage(id) {
    SetCurrentpage(id)

  }

  function nextPage() {
    if (currentpage !== npage) {
      SetCurrentpage(currentpage + 1)
    }
  }
}