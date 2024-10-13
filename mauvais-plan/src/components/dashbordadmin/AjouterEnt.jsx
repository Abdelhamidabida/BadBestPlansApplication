import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCategories } from '../services/CategoriesService';
import { fetchVilles } from '../services/VilleService';
import { register } from '../../features/AuthSlice';
import { buildFormData } from '../../util/ConvertFormData';
import Dashboard from './Dashboard';
import { AddUser } from '../services/UserService';
import { MdCancel } from 'react-icons/md';
function AjouterEnt() {
  const [showModal, setShowModal] = useState(false);
  const [villes, setVilles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [contenu, setContenu] = useState('');
  const [contenu3, setContenu3] = useState('');
  const [contenu4, setContenu4] = useState('');
  const [contenuv, setContenuv] = useState('');
  const [contenuc, setContenuc] = useState('');
  const [nomen, setNomen] = useState('');
  const [isNomenValid, setIsNomenValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchVilles()
      .then((res) => {
        setVilles(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [avatar, setAvatar] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAvatar(file);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (contenu.trim() === '') {
      setIsNomenValid(false);
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(contenu3)) {
      setIsEmailValid(false);

      return;
    }
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(contenu4)) {
      setIsPasswordValid(false);
      return;
    }
    const formData = new FormData();
    formData.append('avatar', avatar);
    formData.append('ville', contenuv);
    formData.append('categorie', contenuc);
    formData.append('email', contenu3);
    formData.append('password', contenu4);
    formData.append('role', 'entreprise');
    formData.append('nomen', contenu);

    // Add other attributes if necessary

    AddUser(formData)
      .then(() => {
        navigate('/Afficheentr');
        toast.success('Entreprise ajoutée avec succès', {
          position: toast.POSITION.LEFT,
          autoClose: 3000,
        });
        handleCloseModal()

      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  return (
    <div className="kol">

      <Button style={{
        marginTop: '3px', marginLeft: '-408px', color: 'white',
        backgroundColor: 'rgb(1 125 191)',
        border: 'none', height: '40px'
      }} onClick={handleShowModal}>Ajouter une entreprise</Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter une entreprise</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group as={Row} controlId="formGridEmail">
              <Form.Label column sm="3" style={{ whiteSpace: 'nowrap' }}>
                Nom
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  placeholder="Entrer le nom"
                  onChange={(e) => {
                    setContenu(e.target.value);
                    setIsNomenValid(true);
                  }}
                  isInvalid={!isNomenValid}
                />
                {!isNomenValid && (
                  <Form.Control.Feedback type="invalid">
                    Le champ Nom entreprise est requis
                  </Form.Control.Feedback>
                )}
              </Col>
            </Form.Group>


            <Form.Group as={Row} controlId="formGridAddress1" style={{ marginTop: '20px' }}>
              <Form.Label column sm="3">
                <Form.Label column sm="12">Email</Form.Label>
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="email"
                  isInvalid={!isEmailValid}
                  value={contenu3}
                  placeholder="Enter email"
                  onChange={(event) => {
                    setContenu3(event.target.value);
                    setIsEmailValid(true);
                  }}
                />
                {!isEmailValid && (
                  <Form.Control.Feedback type="invalid">
                    L'adresse email n'est pas valide
                  </Form.Control.Feedback>
                )}
              </Col>
            </Form.Group>



            <Form.Group as={Row} controlId="formGridAddress2" style={{ marginTop: '10px' }}>
              <Form.Label column sm="3" style={{ whiteSpace: 'nowrap' }}>
                <Form.Label column sm="12">Mot de passe</Form.Label>
              </Form.Label>
              <Col sm="9">
                <div className="input-group">
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    onChange={(e) => setContenu4(e.target.value)}
                  />
                  <Button
                    variant="outline-secondary"
                    onClick={handleTogglePasswordVisibility}
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </Button>
                </div>
                {!isPasswordValid && (
                  <Form.Text className="text-danger">
                    Le mot de passe doit contenir au moins 8 caractères, 1 chiffre et 1 symbole.
                  </Form.Text>
                )}
              </Col>
            </Form.Group>



            <Form.Group as={Row} controlId="formGridCity" style={{ marginTop: '10px' }}>
              <Form.Label column sm="3">
                <Form.Label column sm="12">Ville</Form.Label>
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  as="select"
                  value={contenuv}
                  onChange={(event) => setContenuv(event.target.value)}
                >
                  <option>Sélectionner la ville</option>
                  {villes &&
                    villes.map((ville) => (
                      <option key={ville._id} value={ville._id}>
                        {ville.nomVille}
                      </option>
                    ))}
                </Form.Control>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formGridState" style={{ marginTop: '10px' }}>
              <Form.Label column sm="3">
                <Form.Label column sm="12">Catégorie</Form.Label>
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  as="select"
                  value={contenuc}
                  onChange={(event) => setContenuc(event.target.value)}
                >
                  <option>Sélectionner la catégorie</option>
                  {categories &&
                    categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.nomcategorie}
                      </option>
                    ))}
                </Form.Control>
              </Col> </Form.Group  >
            <div style={{ display: 'flex' }}>
              <Form.Group style={{ marginTop: '20px' }}>
                <Form.Label>Logo</Form.Label>
              </Form.Group>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Form.Control
                  style={{ marginLeft: '10px', display: 'none' }}// Masquer l'élément input file
                  type="file"
                  name="avatar"
                  onChange={handleFileChange}
                />
                <Form.Control
                  style={{ marginLeft: '83px', width: '345px', }}
                  type="text"
                  readOnly
                  value={avatar ? avatar.name : ''}
                  placeholder="Sélectionner un fichier"
                  onClick={() => document.getElementsByName('avatar')[0].click()}
                />
                {avatar && (
                  <MdCancel
                    className="cancel-icon"
                    onClick={() => setAvatar(null)}
                  />
                )}
              </div>

            </div>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fermer
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Ajouter
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AjouterEnt;
