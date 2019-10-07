import axios from "axios";

export const getAllModules = async () => {
    return await axios
        .get("/api/module")
        .then(response => {
            return response.data;
        })
        .catch(error => console.error(error));
};
