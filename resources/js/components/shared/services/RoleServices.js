import axios from "axios";

export const getAllRoles = async () => {
    return await axios
        .get("/api/role")
        .then(response => {
            return response.data;
        })
        .catch(error => console.error(error));
};

export const deleteRole = async roleId => {
    return await axios
        .delete(`/api/role/${roleId}`)
        .then(response => {
            return response.data;
        })
        .catch(error => console.error(error));
};

export const saveRole = async newRole => {
    return await axios
        .post("/api/role", newRole)
        .then(response => response.data)
        .catch(error => console.error(error));
};

export const updateRole = async (updatedRoleId, updatedRole) => {
    return await axios
        .put(`/api/role/${updatedRoleId}`, updatedRole)
        .then(response => response.data)
        .catch(error => console.error(error));
};

export const getRoleModules = async roleId => {
    return await axios
        .get(`/api/roleModules/${roleId}`)
        .then(response => response.data)
        .catch(error => console.error(error));
};

export const addRoleModule = async (roleId, moduleId) => {
    return await axios
        .post(`/api/addRoleModule/${roleId}/${moduleId}`)
        .then(response => response.data)
        .catch(error => console.error(error));
};

export const deleteRoleModule = async (roleId, moduleId) => {
    return await axios
        .delete(`/api/deleteRoleModule/${roleId}/${moduleId}`)
        .then(response => response.data)
        .catch(error => console.error(error));
};