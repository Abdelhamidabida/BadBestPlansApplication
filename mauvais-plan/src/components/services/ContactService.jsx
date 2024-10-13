import Api from "../../axios/Api";
const USER_API = "/contact"



export const fetchContact = async () => {
    return await Api.get(USER_API+'/');
}

export const deleteContact = async (userId) => {
    return await Api.delete(USER_API + '/' + userId);
}

export const addContact = async (publication) => {
    return await Api.post(USER_API + "/", publication);
}
export const fetchnombreContact = async () => {
    return await Api.get(USER_API + "/nombre");
}