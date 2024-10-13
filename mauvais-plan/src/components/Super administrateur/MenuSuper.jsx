import React, { useState, useEffect } from 'react';
import "./Menusuper.css"
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ImUserTie } from "react-icons/im"
import { AiTwotoneHome, AiOutlineMessage } from "react-icons/ai"
import { FaUsers } from "react-icons/fa";
import { RiUserStarFill } from "react-icons/ri";
import { AiOutlineUserAdd } from "react-icons/ai"
import { CgProfile } from "react-icons/cg"
import { GoSignOut } from "react-icons/go"
import Badge from '@mui/material/Badge';
import { fetchnombre } from '../services/PublicationService';
import axios from 'axios';
import { fetchnombreContact } from '../services/ContactService';
import { useSelector } from 'react-redux';





const DashboardSuper = () => {
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

      <div className="menu-vertical">
        <ul>
          <li><Link to='/cc' className='nav-link' >  <ImUserTie /> Super Admin</Link></li>
          <li><Link to='/' className='nav-link' >  <AiTwotoneHome /> Accueil</Link></li>
          <li> <Link to='/AfficheAdmins' className='nav-link' > <RiUserStarFill /> Gérer Admins</Link></li>

          <li> <Link to='/AfficheCat' className='nav-link' > <AiOutlineUserAdd /> Gérer catégories</Link></li>

          <li> <Link to='/AfficheVille' className='nav-link' > <AiOutlineUserAdd /> Gérer villes</Link></li>
          <li><Link to='/Logout' className='nav-link' > <GoSignOut /> Déconnexion</Link></li>
        </ul>
      </div> </>
  );
};

export default DashboardSuper;