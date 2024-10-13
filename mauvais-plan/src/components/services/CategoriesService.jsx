import Api from "../../axios/Api";
const Categories_API = "/categories"
export const fetchCategories = async () => {
    return await Api.get(Categories_API);
}
export const deleteCategories = async (userId) => {
    return await Api.delete(Categories_API + "/" +  userId);
}
export const addCategories = async (cat) => {
    return await Api.post(Categories_API + "/", cat);
}