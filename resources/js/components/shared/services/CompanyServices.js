import axios from "axios";

export const getAllCompanies = async () => {
    return await axios
        .get("/api/company")
        .then(response => {
            return response.data;
        })
        .catch(error => console.error(error));
};
