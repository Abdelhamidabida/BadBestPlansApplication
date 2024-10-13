import React, { useEffect, useState } from 'react';
import './Menu.css';
import { Badge, Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { AiFillBell } from "react-icons/ai";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import { fetchEntre } from "../components/services/UserService";
import Menu from '@mui/material/Menu';
import axios from 'axios';
import { urlimage } from "../axios/Api";
import { fetchnombreEn } from '../components/services/PublicationService';
import { useSelector } from 'react-redux';
import { FcSearch } from "react-icons/fc";
function MenuUser() {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { id } = useParams();
  const [nombre, setNombre] = useState(0);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchnombreEn(user._id)
      .then(res => {
        setNombre(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  console.log(nombre);
  const [value, setValue] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const onSearch = (searchTerm, id) => {
    setValue(searchTerm);
    setSelectedId(id);
    // our api to fetch the search result
    console.log("search ", searchTerm);
    console.log(id);
  };
  const [entreprises, setEntreprises] = useState("");
  useEffect(() => {
    fetchEntre().then(res => {
      setEntreprises(res.data)
    })
      .catch(error => {
        console.log(error)
      })
  }, [])

  console.log(value)

  return (
    <>
      <nav className="navbar">
        <ul>
          <div className='lojo'>
            <li>
              <img src='/Images/Logo33.png' alt="MMM" height="70px" width="140px" />
            </li>
          </div>

          <li className='accU'>
            <Link to='/AccueilUser' className='nav-link'>Accueil</Link>
          </li>
          <li>
            <Link to='/ContactUser' className='nav-link'>Contact</Link>
          </li>

          <div className='con'>
            <li className='avataruser'>
              <Stack direction="row" spacing={2}>
                <Avatar onClick={handleMenu} cursor="pointer" alt="Remy Sharp" src={user.avatar ? urlimage + user.avatar : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"} />
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                ><MenuItem>
                    <Link to={user.role === 'user' ? '/profiluser' : '/Profile'} className='nav-link'>
                      Profil
                    </Link></MenuItem>
                  <MenuItem>
                    <Link to='/Logout' className='nav-link'>Déconnexion</Link>
                  </MenuItem>
                </Menu>
              </Stack>
            </li>
            <li>
              {user.role === 'entreprise' && (
                <Link to='/Notification' className='nav-link'>
                  <AiFillBell />
                </Link>
              )}
              <div className='nmb'>{nombre}</div>
            </li>
          </div>

          <div className='search'>
            <Form.Control
              type="search"
              placeholder="Rechercher"
              className="me-2"
              aria-label="Search"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Button className='sea' variant="light" onClick={() => onSearch(value, selectedId)}>
              <Link to={"/entreuser/" + selectedId} className='boutcommm' ><FcSearch /></Link>
            </Button>
          </div>

          <div className="dropdown1">
            {Array.isArray(entreprises) && entreprises
              .filter((item) => {
                const searchTerm = value.toLowerCase();
                const fullName = item.nomen.toLowerCase();
                return (
                  searchTerm &&
                  fullName.startsWith(searchTerm) &&
                  fullName !== searchTerm
                );
              })
              .slice(0, 10)
              .map((item) => (
                <div
                  onClick={() => onSearch(item.nomen, item._id)}
                  className="dropdown-row1"
                  key={item._id}
                >
                  {item.nomen}
                </div>
              ))}
          </div>
        </ul>
      </nav>
    </>
  );
}

export default MenuUser;
