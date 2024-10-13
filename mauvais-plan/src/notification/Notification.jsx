import React from 'react'
import { useState, useEffect } from 'react'
import { fetchPubEnt } from '../components/services/PublicationService'
import MenuUser from '../menu/MenuUser';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import "./Notification.css"
import { useSelector } from 'react-redux';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'rgb(245, 199, 74)',
        color: 'black',

    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 17,

    },
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,

    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,

    },
}));


const Notification = () => {
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

    const [publications, setPublications] = useState([]);
    const { user } = useSelector((state) => state.auth);
    console.log(user._id)
    useEffect(() => {
        fetchPubEnt(user._id).then(res => {
            setPublications(res.data)
        })
            .catch(error => {
                console.log(error)
            })
    }, [])
    console.log(publications)
    const [currentpage, SetCurrentpage] = useState(1)
  const recordsPerPage = 3;
  const lastIndex = currentpage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = publications.slice(firstIndex, lastIndex);
  const npage = Math.ceil(publications.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1)
    return (
        <div>
            <MenuUser />
            <div className='recla'>
            LES RECLAMATIONS RECUES :  </div>
            <TableContainer sx={{ marginTop: 5 }} component={Paper}>

                <Table sx={{ minWidth: 700, height: 30 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Nom et Prénom</StyledTableCell>
                            <StyledTableCell align="left" >Contenu</StyledTableCell>
                            <StyledTableCell align="center">Temps</StyledTableCell>
                            <StyledTableCell align="center">Réponse</StyledTableCell>


                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {records.map((row) => (
                            <StyledTableRow key={row._id}>
                                <StyledTableCell component="th" scope="row">
                                    {row.userID?.prenom} {row.userID?.nom} {row.userID?.nomen}
                                </StyledTableCell>
                                <StyledTableCell
                                >{row.contenu}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <TimeElapsed createdAt={row.createdAt} />

                                </StyledTableCell>

                                <StyledTableCell align="center"><Button >
                                    {<Link to={"/Réaction_entrerpise/" + row._id} className='boutcor' >
                                        Répondre
                                    </Link>
                                    }
                                </Button></StyledTableCell>


                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className='pagination4'>
              <ul className='pagination'>
                <li className='page-item'>
                  <a href="#" className='page-link' onClick={prePage}>Prev</a>
                </li>
                {numbers.map((n, i) => (
                  <li className={`page-item ${currentpage === n ? 'active' : ''}`} key={i}>
                    < a href='#' className='page-link' onClick={() => changeCPage(n)} > {n} </a>    </li >
                )


                )
                }
                <li className='page-item'>
                  <a href="#" className='page-link' onClick={nextPage}>Next</a>
                </li>
              </ul >
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

export default Notification
