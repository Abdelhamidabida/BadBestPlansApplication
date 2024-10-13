import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addVilles } from '../services/VilleService'
function AjouterVille() {
    const [showModal, setShowModal] = useState(false);

    const handleButtonClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const [contenu, setContenu] = useState("");
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === true) {
            const Publication = {
                nomVille: contenu,

            }

            addVilles(Publication)
                .then((res) => {
                    console.log("Insert OK", res);

                    navigate("/AfficheVille");
                    handleCloseModal();
                    window.location.reload();
                    toast.success("Ville ajoutée avec succès", {
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
        <div>
            <Button style={{
                marginTop: '23px', marginLeft: '100px', color: 'white',
                backgroundColor: 'rgb(245, 199, 74)',
                border: 'none', height: '40px'
            }} onClick={handleButtonClick}>Ajouter une ville</Button>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Ajouter une Ville</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>Nom du Ville</Form.Label>
                    <Form.Control rows={3}
                        value={contenu}
                        onChange={(e) => setContenu(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Fermer
                    </Button>
                    <Button variant="info" onClick={handleSubmit}  >
                        Ajouter
                    </Button>
                    {/* Additional modal footer buttons if needed */}
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AjouterVille;
