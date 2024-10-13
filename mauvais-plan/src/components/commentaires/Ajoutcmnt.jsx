import React from 'react';
import { useEffect, useState } from 'react';
import { fetchcomm, addCommentaire, fetchPublicationById } from '../services/PublicationService';
import { useNavigate, useParams } from 'react-router-dom';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import './Ajoutcmnt.css';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Menu from '../../menu/Menu';
import AfficheCategories from '../accueil/AfficheCategories';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { urlimage } from '../../axios/Api';
import { Avatar } from '@mui/material';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function Ajoutcmnt() {
  const { id } = useParams();
  const [commentaire, setCommentaire] = useState('');
  const [commentaires, setCommentaires] = useState([]);

  useEffect(() => {
    fetchPublicationById(id)
      .then((res) => {
        setCommentaire(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetchcomm(id)
      .then((res) => {
        setCommentaires(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(commentaires);

  const [contenu, setContenu] = useState('');

  const { user } = useSelector((state) => state.auth);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3001/api/publications/commentaire/${id}`, {
        contenu_cm: contenu,
        userid: user._id,
      });

      window.location.reload();

      window.onload = function () {
        // Display the toast message after the window reloads
        toast.success('Commentaire ajouté avec succès', {
          position: toast.POSITION.LEFT,
          autoClose: 3000,
        });
      };

      console.log(response.data);
      // Mettre à jour la liste des commentaires
      id.updateCommentaires(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [currentpage, SetCurrentpage] = useState(1);
  const recordsPerPage = 1;
  const lastIndex = currentpage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = commentaires.slice(firstIndex, lastIndex);
  const npage = Math.ceil(commentaires.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

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
  const [fullscreen, setFullscreen] = useState(false);
  const handleImageClick = () => {
    setFullscreen(true);
  };

  const handleImageClose = () => {
    setFullscreen(false);
  };
  const handleClick = () => {
    // Afficher le toast d'erreur
    toast.error('Veuillez vous authentifier ou créer un compte pour commenter.');
  };
  return (
    <>
      <Menu />
      <div className="catbou">
        <div className="aff">
          <AfficheCategories />
        </div>

        <div className="allcomme">
          <div className="Liste">
            <ul>
              <div className="contenupub0">
                <div className="contenupub">
                  <Avatar
                    cursor="pointer"
                    alt="Remy Sharp"
                    src={commentaire.userID?.avatar ? urlimage + commentaire.userID?.avatar : 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'}
                  />
                  <div className="username">
                    {commentaire.userID?.prenom}&nbsp;{commentaire.userID?.nom}&nbsp;{commentaire.userID?.nomen}
                    <div className="waktr">{'('}<TimeElapsed createdAt={commentaire.createdAt} />{')'}</div>
                  </div>
                </div>
                <br></br>
                <div className="contneu">{commentaire.contenu}</div>
                {commentaire.photos && commentaire.photos.length > 0 && (
                      <img
                        src={urlimage + commentaire.photos}
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
                          src={urlimage + commentaire.photos}
                          alt="Photo"
                          style={{ maxHeight: '90vh', maxWidth: '90vw' }}
                        />
                      </div>
                    )}
              </div>

              <div className="comen">
                {records.map((row) => (
                  <StyledTableRow key={row._id}>
                    <li>
                      <div className="useravna">
                        <Avatar
                          cursor="pointer"
                          alt="Remy Sharp"
                          src={row.userid?.avatar ? urlimage + row.userid?.avatar : 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'}
                          height="30px"
                          width="30px"
                        />
                        <div className="username">
                          {row.userid?.prenom}&nbsp;{row.userid?.nom}&nbsp;{row.userid?.nomen}
                          <div className="waktr">{'('}<TimeElapsed createdAt={row.createdAt} />{')'}</div>
                        </div>
                      </div>
                    </li><div className="comen1">
                      {row.contenu_cm}
                    </div>
                  </StyledTableRow>
                ))}
              </div>
            </ul>
          </div>
          <div className="comm">
            <input className="inputcomm" placeholder="Ecrire ici votre commentaire" onChange={(e) => setContenu(e.target.value)} />
            <button className="commbout" onClick={handleClick} >
              Commenter
            </button>
          </div>
          <div className="pagination1">
            <ul className="pagination">
              <li className="page-item">
                <a href="#" className="page-link" onClick={prePage}>
                  Prec
                </a>
              </li>
              {numbers.map((n, i) => (
                <li className={`page-item ${currentpage === n ? 'active' : ''}`} key={i}>
                  <a href="#" className="page-link" onClick={() => changeCPage(n)}>
                    {n}
                  </a>
                </li>
              ))}
              <li className="page-item">
                <a href="#" className="page-link" onClick={nextPage}>
                Suiv
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );

  function prePage() {
    if (currentpage !== 1) {
      SetCurrentpage(currentpage - 1);
    }
  }

  function changeCPage(id) {
    SetCurrentpage(id);
  }

  function nextPage() {
    if (currentpage !== npage) {
      SetCurrentpage(currentpage + 1);
    }
  }
}

export default Ajoutcmnt;
