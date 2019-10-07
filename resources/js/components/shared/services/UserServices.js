import axios from "axios";

export const getAllUsers = async () => {
    return await axios
        .get("/api/user")
        .then(response => {
            return response.data;
        })
        .catch(error => console.error(error));
};
