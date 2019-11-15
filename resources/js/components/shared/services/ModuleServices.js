import axios from "axios";

export const getAllModules = async () => {
    return await axios
        .get("/api/module")
        .then(response => {
            return response.data;
        })
        .catch(error => console.error(error));
};

export const deleteModule = async moduleId => {
    return await axios
        .delete(`/api/module/${moduleId}`)
        .then(response => {
            return response.data;
        })
        .catch(error => console.error(error));
};

export const saveModule = async newModule => {
    return await axios
        .post("/api/module", newModule)
        .then(response => response.data)
        .catch(error => console.error(error));
};

export const updateModule = async (updatedModuleId, updatedModule) => {
    return await axios
        .put(`/api/module/${updatedModuleId}`, updatedModule)
        .then(response => response.data)
        .catch(error => console.error(error));
};

export const getModuleRoles = async moduleId => {
    return await axios
        .get(`/api/moduleRoles/${moduleId}`)
        .then(response => response.data)
        .catch(error => console.error(error));
};

export const addModuleRole = async (moduleId, roleId) => {
    return await axios
        .post(`/api/addModuleRole/${moduleId}/${roleId}`)
        .then(response => response.data)
        .catch(error => console.error(error));
};

export const deleteModuleRole = async (moduleId, roleId) => {
    return await axios
        .delete(`/api/deleteModuleRole/${moduleId}/${roleId}`)
        .then(response => response.data)
        .catch(error => console.error(error));
};
