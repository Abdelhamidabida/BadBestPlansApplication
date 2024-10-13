import React from 'react'
import { Link } from 'react-router-dom'
import { BiRestaurant ,BiCoffee} from "react-icons/bi";
import {TbVaccine,TbBrandProducthunt} from "react-icons/tb";
import {AiFillShop,AiFillPlusCircle} from "react-icons/ai";
import {MdLocalGroceryStore,MdHomeWork} from "react-icons/md";
import {GrServices} from "react-icons/gr";



function AfficheCategories() {
  return (
    <div>
      <div className='filt'>
        <div>

          <div className='cat'><h4>Catégorie </h4> </div><br></br>
          <div className='souscat'>
            <ul>
              <li><Link to='/restaurants' className='nav-link' > <BiRestaurant/>  Restaurants</Link></li>
              <li><Link to='/Cafés' className='nav-link' >   <BiCoffee/> Cafés </Link></li>
              
              <li><Link to='/Magazins' className='nav-link' > <AiFillShop/> Magasins </Link></li>
              <li><Link to='/Boutique' className='nav-link' > <MdLocalGroceryStore/> Boutiques </Link> </li>
              <li><Link to='/Services' className='nav-link' > <GrServices/>   Services </Link></li>
              <li><Link to='/Produit' className='nav-link' ><TbBrandProducthunt/> Produits </Link></li>
              <li><Link to='/Entreprise' className='nav-link' ><MdHomeWork/> Entreprises </Link></li>
              
            </ul>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AfficheCategories
