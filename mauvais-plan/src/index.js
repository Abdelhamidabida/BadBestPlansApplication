import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'mdbreact/dist/css/mdb.css';

import './index.css';
import App from './App.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Connexion from './components/authentification/Connexion';
import Inscrire from './components/inscrire/Inscrire';
import Post from './components/posts/post';
import Contact from './components/contact/Contact';
import Dashboard from './components/dashbordadmin/Dashboard';
import Restaurants from './components/categories/restaurants/Restaurants';
import Cafés from './components/categories/cafés/Cafés';
import AjouterPub from './components/accueil/AjouterPub';
import InscrireUser from './components/inscrire/InscrireUser';
import AffichePublications from './components/dashbordadmin/AffichePublications';
import AfficheUsers from './components/dashbordadmin/Afficheusers';
import MenuUser from './menu/MenuUser';
import AccueilUser from './components/accueil/AccueilUser';
import Modifiercompte from './components/profile/profile';
import AfficheCategories from './components/accueil/AfficheCategories';
import Accueil from './components/accueil/Accueil';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Ajouterentreprise from './components/accueil/Réaction_entrerpise';
import RestaurantsUser from './components/categories/restaurants/RestaurantsUser';
import AfficheCategoriesUser from './components/accueil/AfficheCategoriesUser';
import Ajoutcmnt from './components/commentaires/Ajoutcmnt';
import AfficheEntre from './components/dashbordadmin/Afficheentreprise';
import Notification from './notification/Notification';
import Réaction_entrerpise from './components/accueil/Réaction_entrerpise';
import store from './redux/store';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import Logout from './components/authentification/Logout';
import RestaurantVille from './components/categories/restaurants/RestaurantVille';
import RestaurantVilleUser from './components/categories/restaurants/VilleUser';
import Boutique from './components/categories/boutiques/Boutiques';
import Produit from './components/categories/produits/Produits';

import Magazins from './components/categories/magazins/Magazins';
import Entreprise from './components/categories/entreprises/Entreprises';
import Services from './components/categories/services/Services';
import EntrepriseSearch from './components/EntrepriseSearch';
import Profile from './components/profile/profile';
import ModifierProfile from './components/profile/ModifierProfile';
import EntrepriseSearchUser from './components/EntrepriseSearchUser';
import CafésVille from './components/categories/cafés/Cafésville';
import MagasinsVille from './components/categories/magazins/MagazinsVille';
import BoutiquesVille from './components/categories/boutiques/BoutiquesVille';
import ServiceVille from './components/categories/services/ServicesVille';
import EntrepriseVille from './components/categories/entreprises/EntrepriseVille';
import ProduitVille from './components/categories/produits/ProduitVille';
import ProduitUser from './components/categories/produits/ProduitsUser';
import CafésUser from './components/categories/cafés/CafésUser';
import BoutiqueUser from './components/categories/boutiques/BoutiquesUser';
import MagasinsUser from './components/categories/magazins/MagasinsUser';
import EntrepriseUser from './components/categories/entreprises/EntrepriseUser';
import ServicesUser from './components/categories/services/ServiceUser';
import CafésVilleUser from './components/categories/cafés/CafésVilleUser';
import EntrepriseVilleUser from './components/categories/entreprises/EntrepriseVilleUSer';
import MagasinsVilleUser from './components/categories/magazins/MagasinsUserVille';
import ProduitVilleUser from './components/categories/produits/ProduitsVilleUser';
import ServiceVilleUser from './components/categories/services/ServicesUserVille';
import BoutiquesVilleUser from './components/categories/boutiques/BoutiquesVilleUSer';
import ContactUser from './components/contact/ContactUser';
import AjoutcmntUser from './components/commentaires/AjoutcmntUser';
import AfficheMessage from './components/dashbordadmin/AfficheMessages';
import DashboardSuper from './components/Super administrateur/MenuSuper';
import AfficheAdmins from './components/Super administrateur/Afficheadmin';
import AjouterAdmin from './components/Super administrateur/AjouterAdmin';
import AjouterEnt from './components/dashbordadmin/AjouterEnt';
import Profiluser from './components/profile/ProfileUser';
import Modal from 'react-modal';
import AfficheCat from './components/Super administrateur/AfficheCat';
import AjouterCat from './components/Super administrateur/AjouterCat';
import AfficheVille from './components/Super administrateur/AfficheVille';







const root = ReactDOM.createRoot(document.getElementById('root'));

let persistor = persistStore(store)

Modal.setAppElement('#root');
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ToastContainer />
                <Router>
                    <Routes>
                        <Route path='/' element={<Accueil />} />
                        <Route path='/connexion' element={<Connexion />} />
                        <Route path='/inscrire' element={<Inscrire />} />
                        <Route path='/post' element={<Post />} />
                        <Route path='/contact' element={<Contact />} />
                        <Route path='/admin' element={<Dashboard />} />
                        <Route path='/Accueil' element={<Accueil />} />
                        <Route path='/Restaurants' element={<Restaurants />} />
                        <Route path='/cafés' element={<Cafés />} />
                        <Route path='/Ajouter' element={<AjouterPub />} />
                        <Route path='/register' element={<InscrireUser />} />

                        <Route path='/Affichepub' element={<AffichePublications />} />
                        <Route path='/Afficheusers' element={<AfficheUsers />} />
                        <Route path='/MenuUser' element={<MenuUser />} />
                        <Route path='/AccueilUser' element={<AccueilUser />} />
                        <Route path='/profile' element={<Modifiercompte />} />
                        <Route path='/AjouterPub' element={<AjouterPub />} />
                        <Route path='/Affcat' element={<AfficheCategories />} />
                        <Route path='/ajouten' element={<Ajouterentreprise />} />
                        <Route path='/RestaurantsUser' element={<RestaurantsUser />} />
                        <Route path='/AfficheCategoriesUser' element={<AfficheCategoriesUser />} />
                        <Route path='/Ajoutcmnt/:id' element={<Ajoutcmnt />} />
                        <Route path='/ville/:id' element={<RestaurantVille />} />
                        <Route path='/villeUser/:id' element={<RestaurantVilleUser/>} />
                        <Route path='/Afficheentr' element={<AfficheEntre />} />
                        <Route path='/Notification' element={<Notification />} />
                        <Route path='/Réaction_entrerpise/:id' element={<Réaction_entrerpise />} />
                        <Route path='/Logout' element={<Logout/>} />
                        <Route path='/Boutique' element={<Boutique/>} />
                        <Route path='/Produit' element={<Produit/>} />

                        <Route path='/Magazins' element={<Magazins/>} />
                        <Route path='/Entreprise' element={<Entreprise/>} />
                        <Route path='/Services' element={<Services/>} />
                        <Route path='/entre/:id' element={<EntrepriseSearch/>} />
                        <Route path='/Profile' element={<Profile/>} />
                        <Route path='/ModifierProfile/:id' element={<ModifierProfile/>} />
                        <Route path='/entreuser/:id' element={<EntrepriseSearchUser/>} />
                        <Route path='/villecafe/:id' element={<CafésVille/>} />
                        <Route path='/MagasinsVille/:id' element={<MagasinsVille/>} />
                        <Route path='/BoutiquesVille/:id' element={<BoutiquesVille/>} />
                        <Route path='/ServiceVille/:id' element={<ServiceVille/>} />
                        <Route path='/EntrepriseVille/:id' element={<EntrepriseVille/>} />
                        <Route path='/ProduitVille/:id' element={<ProduitVille/>} />
                        <Route path='/ProduitUser' element={<ProduitUser/>} />
                        <Route path='/CafésUser' element={<CafésUser/>} />
                        <Route path='/BoutiqueUser' element={<BoutiqueUser/>} />
                        <Route path='/MagasinsUser' element={<MagasinsUser/>} />
                        <Route path='/EntrepriseUser' element={<EntrepriseUser/>} />
                        <Route path='/ServicesUser' element={<ServicesUser/>} />
                        <Route path='/CafésVilleUser/:id' element={<CafésVilleUser/>} />
                        <Route path='/EntrepriseVilleUser/:id' element={<EntrepriseVilleUser/>} />
                        <Route path='/MagasinsVilleUser/:id' element={<MagasinsVilleUser/>} />
                        <Route path='/ProduitVilleUser/:id' element={<ProduitVilleUser/>} />
                        <Route path='/ServiceVilleUser/:id' element={<ServiceVilleUser/>} />
                        <Route path='/BoutiquesVilleUser/:id' element={<BoutiquesVilleUser/>} />
                        <Route path='/ContactUser' element={<ContactUser/>} />
                        <Route path='/AfficheMessage' element={<AfficheMessage/>} />
                        <Route path='/ContactUser' element={<ContactUser/>} />
                        <Route path='/DashboardSuper' element={<DashboardSuper/>} />
                        <Route path='/AfficheAdmins' element={<AfficheAdmins/>} />
                        <Route path='/AjouterAdmin' element={<AjouterAdmin/>} />
                        <Route path='/AjouterEnt' element={<AjouterEnt/>} />
                        <Route path='/AfficheCat' element={<AfficheCat/>} />
                        <Route path='/AjouterCat' element={<AjouterCat/>} />
                        <Route path='/AfficheVille' element={<AfficheVille/>} />
                        
                        <Route path='/profiluser' element={<Profiluser/>} />
                        <Route path='/AjoutcmntUser/:id' element={<AjoutcmntUser/>} />
                    </Routes>

                </Router>

             </PersistGate> 
        </Provider>
    </React.StrictMode>



);


reportWebVitals();
