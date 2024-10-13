import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import React from 'react'
import "./Accueil.css";
import Grid from '@mui/material/Grid';
import { addPublication } from '../services/PublicationService';
import { fetchCategories } from "../services/CategoriesService";
import Col from 'react-bootstrap/Col';
import { fetchVilles } from "../services/VilleService";
import { fetchEntre } from "../services/UserService";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';



export default function AjouterPub() {


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (!user || !user._id) {
      // Display an error message indicating that the user needs to sign up or authenticate
      toast.error("Vous devez vous inscrire ou vous connecter pour publier", {
        position: toast.POSITION.LEFT,
        autoClose: 3000,
      });
    } else {
      setShow(true);
    }
  };
  const [categories, setCategories] = useState([]);
  const [villes, setVilles] = useState("");

  const [validated, setValidated] = useState(false);
  useEffect(() => {
    GetListCategories();
  }, []);
  const GetListCategories = async () => {
    fetchCategories()
      .then(res => {
        setCategories(res.data)
      })
      .catch(error => {
        console.log(error)
      })
  }
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

  const [contenu2, setContenu2] = useState("");
  const [contenu, setContenu] = useState("");

  const [contenu3, setContenu3] = useState("");
  const [contenu4, setContenu4] = useState("");


  const [entreprises, setEntreprises] = useState([]);
  const GetListEntreprises = async () => {
    if (contenu3 && contenu2) {
      // Effectuer la requête uniquement si les valeurs de ville et de catégorie sont sélectionnées
      fetch(`http://localhost:3001/api/users/ville/${contenu3}/categorie/${contenu2}`)
        .then(res => res.json())
        .then(data => setEntreprises(data))
        .catch(error => console.log(error));
    }
  };
  useEffect(() => {
    GetListEntreprises();
  }, [contenu3, contenu2]);

  const [photos, setPhotos] = useState("");
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPhotos(file);
  };
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  }
  const { user } = useSelector((state) => state.auth);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      const formData = new FormData();
      formData.append("contenu", contenu);
      formData.append("categorie", contenu2);
      formData.append("ville", contenu3);
      formData.append("entrepriseID", contenu4);
      formData.append("userID", user._id);
      formData.append("photos", photos);

      addPublication(formData)
        .then((res) => {
          console.log("Insert OK", res);

          navigate("/accueilUser");
          handleClose();
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

      <img className='ajoutt' src='/Images/Logo22.png' alt="MMM" onClick={handleShow} height="110px" width="360px"></img>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nouvelle Publication   </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" xs={12} sm={6} >
              <Grid item xs={12} sm={6}>
                <Form.Group as={Col} md="12">
                  <Form.Label>Catégorie</Form.Label>
                  <Form.Control
                    as="select"
                    type="select"
                    value={contenu2}
                    onChange={(e) => setContenu2(e.target.value)}
                    multiple={false}
                  >
                    <option>Sélectionner</option>
                    {categories ? categories.map((cat) => <option key={cat._id}
                      value={cat._id}>     {cat.nomcategorie}      </option>) : null}
                  </Form.Control>
                </Form.Group>



              </Grid>

            </Form.Group>
            <Grid container spacing={1}>

              <Grid item xs={12} sm={6}>
                <Form.Group as={Col} md="12">
                  <Form.Label>Ville</Form.Label>
                  <Form.Control
                    as="select"
                    type="select"
                    value={contenu3}
                    onChange={(e) => setContenu3(e.target.value)}
                  >
                    <option>Sélectionner</option>
                    {villes ? villes.map((vil) => <option key={vil._id}
                      value={vil._id}>{vil.nomVille}</option>) : null}
                  </Form.Control>
                </Form.Group>



              </Grid>

              <Grid item xs={12} sm={6}>
                <Form.Group as={Col} md="12">
                  <Form.Label>Nom de l'entreprise</Form.Label>
                  <Form.Control
                    as="select"
                    type="select"
                    value={contenu4}
                    onChange={(e) => setContenu4(e.target.value)}
                  >
                    <option>Sélectionner</option>
                    {Object.values(entreprises).map((ent) => (
                      <option key={ent.id} value={ent.id}>{ent.nom}</option>
                    ))}
                  </Form.Control>
                </Form.Group>




              </Grid>
            </Grid>

            <Form.Group
              className="mb-3 mt-2"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Ecrire ici</Form.Label>
              <Form.Control as="textarea" rows={3}
                value={contenu}
                onChange={(e) => setContenu(e.target.value)}
              />
            </Form.Group>
          </Form>
          <Form.Group>
            <Form.Label>Photos</Form.Label>
            <Form.Control
              type="file"
              name="photos"
              onChange={handleFileChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Fermer
          </Button>
          <Button variant="info" onClick={handleSubmit}  >
            Publier
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  );
}

