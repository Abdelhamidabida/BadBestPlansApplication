// import React from 'react'
// import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
// import Col from 'react-bootstrap/Col';
// import Grid from '@mui/material/Grid';
// import { Button } from 'react-bootstrap';
// import { useState } from 'react';



// const ModifierProfile = () => {
//     const [show, setShow] = useState(false);
//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);
//   return (
//     <div>
//          <img  className='ajoutt' src='/Images/Logo33.png' alt="MMM"  onClick={handleShow}  height="90px" width="200px"></img>
//        <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Nouvelle Publication   </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3" xs={12} sm={6} >
//               <Grid item xs={12} sm={6}>
//                 <Form.Group as={Col} md="12">
//                   <Form.Label>Catégorie</Form.Label>
                 
//                 </Form.Group>



//               </Grid>

//             </Form.Group>
//             <Grid container spacing={1}>

//               <Grid item xs={12} sm={6}>
//                 <Form.Group as={Col} md="12">
//                   <Form.Label>Ville</Form.Label>
                 
//                 </Form.Group>



//               </Grid>

              




//               </Grid>
            

//             <Form.Group
//               className="mb-3 mt-2"
//               controlId="exampleForm.ControlTextarea1"
//             >
//               <Form.Label>Ecrire ici</Form.Label>
//               <Form.Control as="textarea" rows={3}
//                 // value={contenu}
//                 // onChange={(e) => setContenu(e.target.value)}
//               />
//             </Form.Group>
//           </Form>
//           <input variant="warning" id="fileInput"
//             type="file"
//             // onChange={handleFileInputChange}

//           />
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="danger" onClick={handleClose}>
//             Fermer
//           </Button>
//           <Button variant="info"  >
//             Publier
//           </Button>
//         </Modal.Footer>

//       </Modal>
//     </div>
//   )
// }

// export default ModifierProfile
