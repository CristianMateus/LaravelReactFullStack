import axios from "axios";

export const getAllUsers = async () => {
    return await axios
        .get("/api/user")
        .then(response => {
            return response.data;
        })
        .catch(error => console.error(error));
};

export const deleteUser = async userId => {
    return await axios
        .delete(`/api/user/${userId}`)
        .then(response => {
            return response.data;
        })
        .catch(error => console.error(error));
};

export const saveUser = async newUser => {
    return await axios
        .post("/api/user", newUser)
        .then(response => response.data)
        .catch(error => console.error(error));
};

export const updateUser = async (updatedUserId, updatedUser) => {
    return await axios
        .put(`/api/user/${updatedUserId}`, updatedUser)
        .then(response => response.data)
        .catch(error => console.error(error));
};

export const getUserRoles = async userId => {
    return await axios
        .get(`/api/userRoles/${userId}`)
        .then(response => response.data)
        .catch(error => console.error(error));
};

export const addUserRole = async (userId, roleId) => {
    return await axios
        .post(`/api/addUserRole/${userId}/${roleId}`)
        .then(response => response.data)
        .catch(error => console.error(error));
};

export const deleteUserRole = async (userId, roleId) => {
    return await axios
        .delete(`/api/deleteUserRole/${userId}/${roleId}`)
        .then(response => response.data)
        .catch(error => console.error(error));
};
