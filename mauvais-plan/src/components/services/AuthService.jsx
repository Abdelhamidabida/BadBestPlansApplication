import Api from '../../axios/Api';
const USER_API = "/users";

export const signup = async (user) => {
    const u = {}
    for (var pair of user.entries()) {
        u[pair[0]] = pair[1]
    }
    console.log(u)
    return await Api.post(USER_API + '/register', u);
}




export const signin = async (user) => {
    return await Api.post(USER_API + "/login", user);
}