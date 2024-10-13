import Api from "../../axios/Api";
const PUBLICATION_API = "/publications"
export const fetchPublications = async () => {
    return await Api.get(PUBLICATION_API);
}
export const fetchPublicationById = async (publicationID) => {
    return await Api.get(PUBLICATION_API + '/' + publicationID);
}
export const fetchPubatt = async () => {
    return await Api.get(PUBLICATION_API + "/enattende");
}
export const fetchResVille = async (villeID) => {
    return await Api.get(PUBLICATION_API + "/restaurant/" + villeID );
}
export const fetchPubAdmin = async (villeID) => {
    return await Api.get(PUBLICATION_API + "/accepter/" + villeID );
}
export const fetchcafeVille = async (villeID) => {
    return await Api.get(PUBLICATION_API + "/cafe/" + villeID );
}
export const fetchmagasinVille = async (villeID) => {
    return await Api.get(PUBLICATION_API + "/magasin/" + villeID );
}
export const fetchBoutiqueVille = async (villeID) => {
    return await Api.get(PUBLICATION_API + "/boutique/" + villeID );
}
export const fetchServiceVille = async (villeID) => {
    return await Api.get(PUBLICATION_API + "/service/" + villeID );
}
export const fetchProduitVille = async (villeID) => {
    return await Api.get(PUBLICATION_API + "/produit/" + villeID );
}
export const fetchEntrepiseVille = async (villeID) => {
    return await Api.get(PUBLICATION_API + "/entreprisee/" + villeID );
}

export const fetchPubEnt = async (entID) => {
    return await Api.get(PUBLICATION_API + "/entreprise/" + entID );
}
export const fetchPubEnts = async (entID) => {
    return await Api.get(PUBLICATION_API + "/entreprises/" + entID );
}
export const fetchPubUsers = async (entID) => {
    return await Api.get(PUBLICATION_API + "/user/" + entID );
}
export const fetchPubrestau = async () => {
    return await Api.get(PUBLICATION_API + "/restaurant");
}
export const fetchnombre = async (entID) => {
    return await Api.get(PUBLICATION_API + "/nombre/"+ entID );
}
export const fetchnombreEn = async (entID) => {
    return await Api.get(PUBLICATION_API + "/nombrenot/" + entID);
}
export const fetchnombreUS = async (entID) => {
    return await Api.get(PUBLICATION_API + "/nombreuser/" + entID);
}
export const fetchnombrecp = async (entID) => {
    return await Api.get(PUBLICATION_API + "/nombrecm/" + entID);
}
export const fetchcomm = async (publicationID) => {
    return await Api.get(PUBLICATION_API + "/commentaire/" + publicationID);
}

export const addPublication = async (publication) => {
    return await Api.post(PUBLICATION_API + "/post", publication);
}
export const editentre = (publicationID) => {
    return Api.put(PUBLICATION_API + '/contenuen/' + publicationID);
}

export const editPublication = (publicationID) => {
    return Api.put(PUBLICATION_API + '/edit/' + publicationID);
}
export const deletePublication = async (publicationID) => {
    return await Api.delete(PUBLICATION_API + '/' + publicationID);
}
export const addCommentaire = async (publicationID) => {
    return await Api.post(PUBLICATION_API + "/commentaire/" + publicationID);
}
//cafés
export const fetchPubcafe = async () => {
    return await Api.get(PUBLICATION_API + "/cafes");
}

export const fetchProPub = async () => {
    return await Api.get(PUBLICATION_API + "/produits");
}
export const fetchBouPub = async () => {
    return await Api.get(PUBLICATION_API + "/boutiques");
}
export const fetchMedPub = async () => {
    return await Api.get(PUBLICATION_API + "/medecins");
}
export const fetchMagPub = async () => {
    return await Api.get(PUBLICATION_API + "/magazins");
}
export const fetchEntPub = async () => {
    return await Api.get(PUBLICATION_API + "/entreprises");
}
export const fetchSerPub = async () => {
    return await Api.get(PUBLICATION_API + "/services");
}