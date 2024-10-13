import React from 'react'
import { useParams } from 'react-router-dom';
import Menu from '../menu/Menu';
import AfficheCategories from './accueil/AfficheCategories';
import "./EntrepriseSearch.css"
import { Toast } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import { fetchPubEnts, fetchnombrecp } from './services/PublicationService'
import { Link } from 'react-router-dom';
import { urlimage } from "../axios/Api"
import { Avatar } from '@mui/material';
import MenuUser from '../menu/MenuUser';
import AfficheCategoriesUser from './accueil/AfficheCategoriesUser';
import { TfiCommentsSmiley } from 'react-icons/tfi';
function EntrepriseSearchUser() {
    const { id } = useParams();
    console.log(id)
    const [like, setLike] = useState(0)
  const [isLike, setIsLike] = useState(false),

    onLikeButtonClick = () => {
      setLike(like + (isLike ? -1 : 1))
      setIsLike(!isLike);

    }
    const [publication, setPublication] = useState([]);
    useEffect(() => {
      fetchPubEnts(id).then(res => {
        setPublication(res.data)
      })
        .catch(error => {
          console.log(error)
        })
    }, [])



    const [nombre, setNombre] = useState(0);

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

    const [fullscreen, setFullscreen] = useState(false);
    const handleImageClick = () => {
      setFullscreen(true);
    };
  
    const handleImageClose = () => {
      setFullscreen(false);
    };
    const [currentpage, SetCurrentpage] = useState(1)
    const recordsPerPage = 3;
    const lastIndex = currentpage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = publication.slice(firstIndex, lastIndex);
    const npage = Math.ceil(publication.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1)
    console.log(publication)
  return (
    <div>
      <MenuUser/>
      <div className='all' >
      <div className='Cattt'>

      <AfficheCategoriesUser/></div>


      <div className='Arrr'>
          
      <div className='trour'>
            Vous Trouver içi les publications sur {records[0]?.entrepriseID?.nomen}
            </div>
              {records.map((row, index) => (
              <div className='toar'>

                <Toast key={row._id}  >

                  <Toast.Header>
                    <Avatar cursor="pointer" alt="Remy Sharp" src={row.userID.avatar ? urlimage + row.userID?.avatar : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} height="30px" width="30px" />  &nbsp;  &nbsp;
                    <strong className="me-auto" >{row.userID?.prenom}  {row.userID?.nom} {row.userID?.nomen}</strong>
                    <small><TimeElapsed createdAt={row.createdAt} /></small>
                  </Toast.Header>
                  <Toast.Body>
                    {row.contenu}
                    {row.photos && row.photos.length > 0 && (
                      <img
                        src={urlimage + row.photos}
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
                          src={urlimage + row.photos}
                          alt="Photo"
                          style={{ maxHeight: '90vh', maxWidth: '90vw' }}
                        />
                      </div>
                    )}
                    <br></br>
                    <button className='boutcomr'>{<Link to={"/AjoutcmntUser/" + row._id} className='boutcommm' >
                      <TfiCommentsSmiley style={{ width: '15px', height: '15px' }} /> &nbsp;Commentaire(s) ({nombre[index]})
                      </Link>
                      }  </button>
                   
                  </Toast.Body>


                </Toast>
                <div className='toa2'>
                  <Toast  >
                    <Toast.Header>
                    <Avatar  src= {row.entrepriseID.avatar ? urlimage + row.entrepriseID.avatar : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} /> &nbsp;  &nbsp;
                      <strong className="me-auto" >{row.entrepriseID?.nomen} - {row.ville?.nomVille} </strong>
                      <div>
                        <p>
                          {row.content_en !== " " && (
                            <small>
                              <p>
                                <TimeElapsedu updatedAt={row.updatedAt} />
                              </p>
                            </small>
                          )}
                        </p>
                      </div>
                    </Toast.Header>
                    <Toast.Body>{row.contenu_en}</Toast.Body>

                  </Toast>
                </div>
              </div>))}
              {numbers.length > 0 ? (
              <div className='pagination3'>
                <ul className='pagination'>
                  <li className='page-item'>
                    <a href="#" className='page-link' onClick={prePage}>Prec</a>
                  </li>
                  {numbers.map((n, i) => (
                    <li className={`page-item ${currentpage === n ? 'active' : ''}`} key={i}>
                      <a href='#' className='page-link' onClick={() => changeCPage(n)}> {n} </a>
                    </li>
                  ))}
                  <li className='page-item'>
                    <a href="#" className='page-link' onClick={nextPage}>Suiv</a>
                  </li>
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    
      
  








      
   
  )
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

export default EntrepriseSearchUser
