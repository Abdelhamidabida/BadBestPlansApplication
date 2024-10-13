import React from 'react'
import { fetchVilles, deleteVilles } from '../services/VilleService'

import { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import { Button, message, Popconfirm } from 'antd';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Link } from 'react-router-dom';

import { urlimage } from "../../axios/Api"
import { Avatar } from '@mui/material';
import { toast } from 'react-toastify';
import DashboardSuper from './MenuSuper';
import AjouterCat from './AjouterCat';
import AjouterVille from './AjouterVille';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#1b1b18',
    color: '#fee57d;',

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
const confirm = (e) => {
  console.log(e);
  message.success('Click on Yes');
};
const cancel = (e) => {
  console.log(e);
  message.error('Click on No');
};
const AfficheVille = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetchVilles().then(res => {
      setUsers(res.data)
    })
      .catch(error => {
        console.log(error)
      })
  }, [])


  const [currentpage, SetCurrentpage] = useState(1)
  const recordsPerPage = 9;
  const lastIndex = currentpage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = users.slice(firstIndex, lastIndex);
  const npage = Math.ceil(users.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1)
  const [publication, setPublication] = useState([]);
  const [deletionSuccess, setDeletionSuccess] = useState(false);

  const delPub = async (_id) => {
    try {
      await deleteVilles(_id);
      setPublication((prevPublication) =>
        prevPublication.filter((item) => item._id !== _id)
      );

      // Met à jour l'état pour indiquer que la suppression a réussi
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  console.log(users)
  // ...

  // Affiche le toast uniquement si la suppression a réussi


  // ...


  // ...


  // ...

  // ...



  return (
    <>
      <div className='affiche-entre-container'>
        <DashboardSuper />
        <div className='table-pagination-container'>
          <TableContainer component={Paper}>

            <Table sx={{ minWidth: 700, height: 30 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Nom de la ville</StyledTableCell>
                  <StyledTableCell align="center">Supprimer</StyledTableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {records.map((row) => (
                  <StyledTableRow key={row._id}>
                    <StyledTableCell component="th" scope="row" align="center" >
                      {row.nomVille}
                    </StyledTableCell>



                    <StyledTableCell align="center"> <Popconfirm
                      title="Supprimer la catégorie"
                      description="Voulez-vous vraiment supprimer cette catégorie?"
                      onConfirm={() => delPub(row._id)}
                      onCancel={cancel}
                      okText="Oui"
                      cancelText="Non"
                    >
                      <Button type="primary" danger>Supprimer</Button>
                    </Popconfirm>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div style={{ display: 'flex' }}>
           
              <AjouterVille/>
            
            <ul className='pagination' style={{ marginTop: '25px' }}>
              <li className='page-item'>
                <a href="#" className='page-link' onClick={prePage}>Précédent</a>
              </li>
              {numbers.map((n, i) => (
                <li className={`page-item ${currentpage === n ? 'active' : ''}`} key={i}>
                  < a href='#' className='page-link' onClick={() => changeCPage(n)} > {n} </a>    </li >
              )


              )
              }
              <li className='page-item'>
                <a href="#" className='page-link' onClick={nextPage}>Suivant</a>
              </li>
            </ul ></div> </div></div>
    </>
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
export default AfficheVille
