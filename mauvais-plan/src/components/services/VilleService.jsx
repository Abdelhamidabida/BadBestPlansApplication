import Api from "../../axios/Api";
const VILLES_API = "/villes"
export const fetchVilles = async () => {
    return await Api.get(VILLES_API);
}
export const deleteVilles = async (userId) => {
    return await Api.delete(VILLES_API + "/" +  userId);
}
export const addVilles = async (cat) => {
    return await Api.post(VILLES_API + "/", cat);
}