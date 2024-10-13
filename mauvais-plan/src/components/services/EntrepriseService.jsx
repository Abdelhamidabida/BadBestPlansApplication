import Api from "../../axios/Api";
const Entreprises_API="/entreprises"
    export const fetchEntreprises=async()=> {
    return await Api.get(Entreprises_API);
    }
    export const signup =async(entreprise)=> {
    return await Api.post(Entreprises_API + "/register",entreprise);
        }
    export const signin=async(entreprise)=> {
    return await Api.post(Entreprises_API+"/login", entreprise);
        }