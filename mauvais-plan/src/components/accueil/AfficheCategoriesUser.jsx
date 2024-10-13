import React from 'react'
import { Link } from 'react-router-dom'
import { BiRestaurant, BiCoffee } from "react-icons/bi";
import { TbVaccine, TbBrandProducthunt } from "react-icons/tb";
import { AiFillShop, AiFillPlusCircle } from "react-icons/ai";
import { MdLocalGroceryStore, MdHomeWork } from "react-icons/md";
import { GrServices } from "react-icons/gr";
import "./Accueil.css"



function AfficheCategoriesUser() {
  return (
    <div>
      <div className='filt'>
        <div>

          <div className='cat'><h4>Catégorie </h4> </div><br></br>
          <div className='souscat'>
            <ul>
              <li><Link to='/RestaurantsUser' className='nav-link' > <BiRestaurant />  Restaurants</Link></li>
              <li><Link to='/CafésUser' className='nav-link' >   <BiCoffee /> Cafés </Link></li>
              <li><Link to='/MagasinsUser' className='nav-link' > <AiFillShop /> Magasins </Link></li>
              <li><Link to='/BoutiqueUser' className='nav-link' > <MdLocalGroceryStore /> Boutiques </Link> </li>
              <li><Link to='/ServicesUser' className='nav-link' > <GrServices />   Services </Link></li>
              <li><Link to='/ProduitUser' className='nav-link' ><TbBrandProducthunt /> Produits </Link></li>
              <li><Link to='/EntrepriseUser' className='nav-link' ><MdHomeWork /> Entreprises </Link></li>

            </ul>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AfficheCategoriesUser
