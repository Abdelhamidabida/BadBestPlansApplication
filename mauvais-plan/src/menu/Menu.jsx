import React, { useState } from 'react';
import './Menu.css';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { fetchEntre } from "../components/services/UserService";
import { useEffect } from 'react';
import { FcSearch } from "react-icons/fc";

function Menu() {
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
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch(value, selectedId);

      // Naviguer vers la page correspondante si nécessaire
      navigate(`/entre/${selectedId}`);
    }
  };
  console.log(value)
  return (
    <nav className="navbar">
      <ul> <div className='lojo'  >
        <li>  <div className='log'><img src='/Images/Logo2.png' alt="MMM" height="70px" width="140px"></img></div></li> </div>

        <li className='acc'><Link to='/' className='nav-link' >Accueil</Link></li>
        <li><Link to='/register' className='nav-link' >S'inscrire</Link></li>
        <li> <Link to='/contact' className='nav-link' >Contact</Link></li>
        <div className='con'>
          <li> <Link to='/connexion' className='nav-link' >Se connecter</Link></li></div>

        <div className='search'>
          <Form.Control
            type="search"
            placeholder="Rechercher"
            className="me-2"
            aria-label="Search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />

          <Button className='sea' variant="light" onClick={() => onSearch(value, selectedId)}>
            <Link to={"/entre/" + selectedId} className='boutcommm' ><FcSearch /></Link>
          </Button>
        </div>

        <div className="dropdown">
          {Array.isArray(entreprises) &&
            entreprises
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
                  className="dropdown-row"
                  key={item._id}
                >
                  {item.nomen}
                </div>
              ))}
        </div>




      </ul>

    </nav>
  );

}

export default Menu;