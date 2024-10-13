import Api from "../../axios/Api";
const COMMENTAIRE_API = "/commentaire"
export const fetchCommentaire = async () => {
    return await Api.get(COMMENTAIRE_API);
}
export const AddComm = async (Commentaire) => {
    return await Api.post(COMMENTAIRE_API + '/Ajouter', Commentaire);
}
