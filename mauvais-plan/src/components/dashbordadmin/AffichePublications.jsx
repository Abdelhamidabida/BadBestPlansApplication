import React, { useState, useEffect } from 'react';
import { deletePublication, fetchPubAdmin, editPublication } from '../services/PublicationService';
import Dashboard from './Dashboard';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './Affichepub.css';
import { useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { Button, message, Popconfirm } from 'antd';
import { useSelector } from 'react-redux';
import { urlimage } from '../../axios/Api';
import { Avatar } from '@mui/material';
import Modal from 'react-modal';

const confirm = (e) => {
  console.log(e);
  message.success('Click on Yes');
};

const cancel = (e) => {
  console.log(e);
  message.error('Click on No');
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#1b1b18',
    color: '#9bcfeb',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 17,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const customModalStyles = {
  content: {
    width: '60%',
    margin: 'auto',
    maxHeight: '70vh',
    borderRadius: '15px' // Add the desired border radius value
  }
};
const AffichePublications = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalPublicationId, setModalPublicationId] = useState(null);

  const openModal = (publicationId) => {
    setModalPublicationId(publicationId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalPublicationId(null);
    setModalIsOpen(false);
  };

  const delPub = async (_id) => {
    await deletePublication(_id);
    var newpublication = publication.filter((item) => {
      return item._id !== _id;
    });

    setPublication(newpublication);

    toast.error('Publication supprimé avec succès !', {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const accPub = async (_id) => {
    await editPublication(_id);
    var newpublication = publicationa.filter((item) => {
      return item._id !== _id;
    });
    window.location.reload();
    setPublicationa(newpublication);

    toast.success("Publication ajouté avec succès, Attendez la confirmation de l'admin", {
      position: toast.POSITION.LEFT,
      autoClose: 3000,
    });
  };

  const [expandedPublication, setExpandedPublication] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchPubAdmin(user.ville._id)
      .then((res) => {
        setPublications(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const [publication, setPublication] = useState([]);
  const [publicationa, setPublicationa] = useState([]);


  const [publications, setPublications] = useState([]);
  const [currentpage, SetCurrentpage] = useState(1);
  const recordsPerPage = 9;
  const lastIndex = currentpage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = publications.slice(firstIndex, lastIndex);
  const npage = Math.ceil(publications.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const handlePrePage = () => {
    if (currentpage !== 1) {
      SetCurrentpage(currentpage - 1);
    }
  };

  const handleChangePage = (id) => {
    SetCurrentpage(id);
  };

  const handleNextPage = () => {
    if (currentpage !== npage) {
      SetCurrentpage(currentpage + 1);
    }
  };

  return (
    <>
      <div className="affiche-entre-container">
        <Dashboard />
        <div className="table-pagination-container">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700, height: 30 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Nom-pré / Societé</StyledTableCell>
                  <StyledTableCell align="center">Entreprise</StyledTableCell>
                  <StyledTableCell align="center">Categorie</StyledTableCell>
                  <StyledTableCell align="center">Contenu</StyledTableCell>
                  <StyledTableCell align="center">Validation</StyledTableCell>
                  <StyledTableCell align="center">Refus</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {records.map((row) => (
                  <StyledTableRow key={row._id}>
                    <StyledTableCell component="th" scope="row">
                      {row.userID?.nom} {row.userID?.prenom} {row.userID?.nomen}
                    </StyledTableCell>
                    <StyledTableCell>{row.entrepriseID?.nomen}</StyledTableCell>
                    <StyledTableCell>{row.categorie?.nomcategorie}</StyledTableCell>
                   
                    <StyledTableCell height="10px">
                      {row.contenu.substr(0, 30)}
                      {row.contenu.length > 30 && (
                        <Button type="link" onClick={() => openModal(row._id)}>
                          Voir plus
                        </Button>
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Popconfirm
                        title="Accepter la publication"
                        description="Êtes-vous sûr d'accepter cette publication?"
                        onConfirm={() => accPub(row._id)}
                        onCancel={cancel}
                        okText="Oui"
                        cancelText="Non"
                      >
                        <Button type="primary" success>
                          VALIDER
                        </Button>
                      </Popconfirm>
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Popconfirm
                        title="Supprimer la Publication"
                        description="Voulez-vous vraiment supprimer cette publication?"
                        onConfirm={() => delPub(row._id)}
                        onCancel={cancel}
                        okText="Oui"
                        cancelText="Non"
                      >
                        <Button type="primary" danger>
                          SUPPRIMER
                        </Button>
                      </Popconfirm>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {!modalIsOpen && (
            <div className='pag1'>
              <ul className='pagination'>
                <li className='page-item'>
                  <a href="#" className='page-link' onClick={handlePrePage}>
                    Prec
                  </a>
                </li>
                {numbers.map((n, i) => (
                  <li className={`page-item ${currentpage === n ? 'active' : ''}`} key={i}>
                    <a href='#' className='page-link' onClick={() => handleChangePage(n)}>
                      {n}
                    </a>
                  </li>
                ))}
                <li className='page-item'>
                  <a href="#" className='page-link' onClick={handleNextPage}>
                  Suiv
                  </a>
                </li>
              </ul>
            </div>
          )}

        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customModalStyles}
        contentLabel="Example Modal"

      >
        {modalPublicationId && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h3 style={{ marginRight: '1rem' }}>La publication</h3>
              <IconButton onClick={closeModal} style={{ backgroundColor: 'red', marginLeft: '580px' }}>
                <CloseIcon />
              </IconButton>
            </div>
            <div>
             <div style={{  marginTop: '20px' }}>
              <p>{publications.find((publication) => publication._id === modalPublicationId)?.contenu}</p></div>
              <p style={{ display: 'inline',marginLeft: '40%' }}></p>
              <img
                src={
                  publications.find((publication) => publication._id === modalPublicationId)?.photos
                    ? urlimage + publications.find((publication) => publication._id === modalPublicationId)?.photos
                    : null
                }
                alt="Publication Photo"
                style={{ maxWidth: '100%', height: '300px' }}
              />
              {/* Ajoutez le reste du contenu du modal ici */}
            </div>
          </div>
        )}



      </Modal>
    </>
  );
};

export default AffichePublications;
