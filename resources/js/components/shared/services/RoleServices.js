import axios from "axios";

export const getAllRoles = async () => {
    return await axios
        .get("/api/role")
        .then(response => {
            return response.data;
        })
        .catch(error => console.error(error));
};
