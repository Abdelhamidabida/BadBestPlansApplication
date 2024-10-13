import { useState, useEffect } from 'react';
import { fetchVilles } from '../services/VilleService';
import DashboardSuper from './MenuSuper';
import { toast } from 'react-toastify';
import { AddUser } from '../services/UserService';
import { useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';

function AjouterAdmin() {
  const [villes, setVilles] = useState([]);
  const [contenuv, setContenuv] = useState('');
  const [contenu2, setContenu2] = useState('');
  const [contenu, setContenu] = useState('');
  const [contenu3, setContenu3] = useState('');
  const [contenu4, setContenu4] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour contrôler l'ouverture du modal
  const navigate = useNavigate();

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    GetListvilles();
  }, []);

  const GetListvilles = async () => {
    try {
      const res = await fetchVilles();
      setVilles(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const handleSubmit = (event) => {
    event.preventDefault();
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
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      const Publication = {
        nom: contenu,
        prenom: contenu2,
        email: contenu3,
        password: contenu4,
        ville: contenuv,
        role: 'admin',
      };

      AddUser(Publication)
        .then((res) => {
          console.log('Insert OK', res);

          navigate('/AfficheAdmins');
          handleCloseModal() ;
          toast.success('Admin ajouté avec succès', {
            position: toast.POSITION.LEFT,
            autoClose: 3000,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    navigate('/AfficheAdmins');
  };

  return (
    <div className="kol">
      

      <Button
         style={{
          color: 'white',
          backgroundColor: 'rgb(245, 199, 74)',
          border: 'none',
          height: '42px',
          width: '170px',
          marginTop: '13px',
          marginLeft: '50px',
          borderRadius: '14px', 
        }}
        onClick={handleOpenModal}
      >
        Ajouter un admin
      </Button>

      <Modal show={isModalOpen} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: 'rgb(245, 199, 74)' }}>
            Ajouter un Administrateur
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  placeholder="Entrer le nom"
                  onChange={(e) => setContenu(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Prénom</Form.Label>
                <Form.Control
                  placeholder="Entrer le prénom"
                  onChange={(e) => setContenu2(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Email</Form.Label>
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
              <Form.Control.Feedback type="invalid">
                L'adresse e-mail n'est pas valide.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGridAddress2">
              <Form.Label>Mot de passe</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  onChange={(e) => setContenu4(e.target.value)}
                />
                <Button
                  variant="outline-secondary"
                  onClick={handleTogglePasswordVisibility}
                  id="button-addon2"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </Button>
              </div>
              {!isPasswordValid && (
                  <Form.Text className="text-danger">
                    Le mot de passe doit contenir au moins 8 caractères, 1 chiffre et 1 symbole.
                  </Form.Text>
                )}
            </Form.Group>

            <Form.Group as={Col} md="12" className="villuu">
              Ville
              <Form.Control
                as="select"
                label="Ville"
                type="select"
                value={contenuv}
                onChange={(event) => setContenuv(event.target.value)}
              >
                <option>Sélectionner la ville</option>
                {villes ? (
                  villes.map((ville) => (
                    <option key={ville._id} value={ville._id}>
                      {ville.nomVille}
                    </option>
                  ))
                ) : (
                  <option>Loading...</option>
                )}
              </Form.Control>
            </Form.Group>

            <div className="bunk">
              <Button
                style={{
                  color: 'white',
                  backgroundColor: 'rgb(245, 199, 74)',
                  border: 'none',
                }}
                type="submit"
              >
                Ajouter
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AjouterAdmin;
