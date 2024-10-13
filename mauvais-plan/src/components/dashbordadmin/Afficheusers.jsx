import React from 'react'
import { fetchUsers } from '../services/UserService'
import Dashboard from './Dashboard'
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

import "./Affichepub.css"
import { deleteUser } from "../services/UserService";
import { urlimage } from "../../axios/Api"
import { Avatar } from '@mui/material';
import { toast } from 'react-toastify';
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
const AfficheUsers = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    fetchUsers().then(res => {
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
      await deleteUser(_id);
      setPublication((prevPublication) =>
        prevPublication.filter((item) => item._id !== _id)
      );
  
      // Met à jour l'état pour indiquer que la suppression a réussi
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  
  // ...
  
  // Affiche le toast uniquement si la suppression a réussi
 
  
  // ...
  
  
  // ...
  
  
  // ...
  
  // ...
  
  
  
  return (
    <>
      <div className='affiche-entre-container'>
        <Dashboard />
        <div className='table-pagination-container'>
          <TableContainer component={Paper}>

            <Table sx={{ minWidth: 700, height: 30 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell >Email</StyledTableCell>
                  <StyledTableCell  >Nom</StyledTableCell>
                  <StyledTableCell >Prénom</StyledTableCell>
                  <StyledTableCell >Avatar</StyledTableCell>
                  <StyledTableCell align="center">Supprimer</StyledTableCell>
                  {/* <StyledTableCell align="center"><input name="myInput" />  <button>Rechercher</button></StyledTableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {records.map((row) => (
                  <StyledTableRow key={row._id}>
                    <StyledTableCell component="th" scope="row" >
                      {row.email}
                    </StyledTableCell>
                    <StyledTableCell
                    >{row.nom}</StyledTableCell>
                    <StyledTableCell
                    >{row.prenom}</StyledTableCell>

                    <Avatar cursor="pointer" alt="Remy Sharp" src={row.avatar ? urlimage + row.avatar : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} />


                    <StyledTableCell align="center"> <Popconfirm
                      title="Supprimer l'utilisateur"
                      description="Voulez-vous vraiment supprimer cette utilisateur?"
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
          </TableContainer> <div className='pag1'>
          <ul className='pagination'>
            <li className='page-item'>
              <a href="#" className='page-link' onClick={prePage}>Prec</a>
            </li>
            {numbers.map((n, i) => (
              <li className={`page-item ${currentpage === n ? 'active' : ''}`} key={i}>
                < a href='#' className='page-link' onClick={() => changeCPage(n)} > {n} </a>    </li >
            )


            )
            }
            <li className='page-item'>
              <a href="#" className='page-link' onClick={nextPage}>Suiv</a>
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
export default AfficheUsers
