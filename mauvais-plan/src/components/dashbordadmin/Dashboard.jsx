import React, { useState, useEffect } from 'react';
import "./Dashboard.css"
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ImUserTie } from "react-icons/im"
import { AiTwotoneHome, AiOutlineMessage } from "react-icons/ai"
import { FaUsers } from "react-icons/fa";
import { RiUserStarFill } from "react-icons/ri";
import { TfiWrite } from "react-icons/tfi"
import { CgProfile } from "react-icons/cg"
import { GoSignOut } from "react-icons/go"
import Badge from '@mui/material/Badge';
import { fetchnombre } from '../services/PublicationService';
import axios from 'axios';
import { fetchnombreContact } from '../services/ContactService';
import { useSelector } from 'react-redux';
import { AiOutlineUserAdd } from "react-icons/ai"





const Dashboard = () => {
  const [nombre, setNombre] = useState(0);
  const { user } = useSelector((state) => state.auth); 
  useEffect(() => {
    Getnombres();
  }, []);
  const Getnombres = async () => {
    fetchnombre(user.ville._id)
      .then(res => {
        setNombre(res.data)
      })
      .catch(error => {
        console.log(error)
      })
  }
  const [nombreC, setNombreC] = useState(0);
  useEffect(() => {
    GetnombresC();
  }, []);
  const GetnombresC = async () => {
    fetchnombreContact()
      .then(res => {
        setNombreC(res.data)
      })
      .catch(error => {
        console.log(error)
      })
  }
  
  
  
  return (
    <>

      <div className="menu-vertical1">
        <ul>
          <li><Link to='/admin' className='nav-link' >  <ImUserTie />  Admin</Link></li>
          <li><Link to='/' className='nav-link' >  <AiTwotoneHome /> Accueil</Link></li>
          <li> <Link to='/AfficheUsers' className='nav-link' > <RiUserStarFill /> Utilisateurs </Link></li>
          <li> <Link to='/Afficheentr' className='nav-link' > <FaUsers /> Entreprises </Link></li>
        
          <li> <Link to='/Affichepub' className='nav-link' > <TfiWrite />  Publications   &nbsp; &nbsp;<Badge badgeContent={ "+" + nombre} color="primary">
          </Badge> </Link></li>
          <li> <Link to='/AfficheMessage' className='nav-link' >  <AiOutlineMessage /> Messages&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Badge badgeContent={ "+" + nombreC} color="primary">
          </Badge> </Link></li>

        
          <li><Link to='/Logout' className='nav-link' > <GoSignOut /> Déconnexion</Link></li>
        </ul>
      </div> </>
  );
};

export default Dashboard;