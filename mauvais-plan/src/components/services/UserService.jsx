import Api from "../../axios/Api";
const USER_API = "/users"
export const fetchUsers = async () => {
    return await Api.get(USER_API+'/user');
}
export const fetchAdmins = async () => {
    return await Api.get(USER_API+'/admin');
}
export const fetchEntre = async () => {
    return await Api.get(USER_API+'/entreprise');
}
export const AddUser = async (User) => {
    return await Api.post(USER_API+'/register',User);
}

export const ModifierUser = async (userId) => {
    return await Api.put(USER_API + '/' + userId);
}
export const deleteUser = async (userId) => {
    return await Api.delete(USER_API + '/' + userId);
}