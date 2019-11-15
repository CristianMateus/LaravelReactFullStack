// Componentes Propios
import ComponentContainer from "../../shared/components/componentContainer/ComponentContainer";
import EditUserForm from "./components/editUserForm/EditUserForm";
import AssociateRoles from "./components/associateRoles/AssociateRoles";
import AssociateCompanies from "./components/associateCompanies/AssociateCompanies";

// Ant Design
import { Table, Divider, Modal } from "antd";

// React
import React, { useEffect, useState } from "react";

// Servicios
import {
    getAllUsers,
    saveUser,
    deleteUser as deleteUserService,
    updateUser as updatedUserService
} from "../../shared/services/UserServices";
import { getAllRoles } from "../../shared/services/RoleServices";
import { getAllCompanies } from "../../shared/services/CompanyServices";

const Users = () => {
    useEffect(() => {
        getUsers();
        getRoles();
        getCompanies();
    }, []);

    const [allUsersState, setAllUsersState] = useState([]);
    const [allRolesState, setAllRolesState] = useState([]);
    const [allCompaniesState, setAllCompaniesState] = useState([]);
    const [showAddUserModalState, setShowAddUserModalState] = useState(false);
    const [showUpdateUserModalState, setShowUpdateUserModalState] = useState(
        false
    );
    const [
        showAssociateRoleModalState,
        setShowAssociateRoleModalState
    ] = useState(false);
    const [
        showAssociateCompaniesModalState,
        setShowAssociateCompaniesModalState
    ] = useState(false);
    const [showDeleteUserModalState, setShowDeleteUserModalState] = useState(
        false
    );
    const [showButtonLoadingState, setShowButtonLoadingState] = useState(false);
    const [selectedItemState, setSelectedItemState] = useState(null);

    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "Nombre",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Correo",
            dataIndex: "email",
            key: "email"
        },
        {
            title: "IdPersonal",
            dataIndex: "personalId",
            key: "personalId"
        },
        {
            title: "Teléfono",
            dataIndex: "phone",
            key: "phone"
        },
        {
            title: "Acciones",
            key: "action",
            render: record => (
                <span>
                    <i
                        className="far fa-trash-alt"
                        onClick={() => onDeleteClicked(record)}
                        style={{ cursor: "pointer" }}
                    />
                    <Divider type="vertical" />
                    <i
                        className="fas fa-pen"
                        onClick={() => onUpdateClicked(record)}
                        style={{ cursor: "pointer" }}
                    />
                    <Divider type="vertical" />
                    <i
                        className="far fa-address-card"
                        onClick={() => onAssociateRoleClicked(record)}
                        style={{ cursor: "pointer" }}
                    />
                    <Divider type="vertical" />
                    <i
                        className="far fa-building"
                        onClick={() => onAssociateCompanyClicked(record)}
                        style={{ cursor: "pointer" }}
                    />
                </span>
            )
        }
    ];

    const getUsers = async () => {
        await getAllUsers().then(response => {
            setAllUsersState(response);
        });
    };

    const getRoles = async () => {
        await getAllRoles().then(response => {
            setAllRolesState(response);
        });
    };

    const getCompanies = async () => {
        await getAllCompanies().then(response => {
            setAllCompaniesState(response);
        });
    };

    const addUser = async updatedUser => {
        setShowButtonLoadingState(true);
        await saveUser({ ...updatedUser, date: null })
            .then(response => {
                setShowButtonLoadingState(false);
                setShowAddUserModalState(false);
                getUsers();
            })
            .catch(error => {
                setShowButtonLoadingState(false);
                console.error(error);
            });
    };

    const updateUser = async updatedUser => {
        setShowButtonLoadingState(true);

        await updatedUserService(selectedItemState.id, {
            ...updatedUser,
            date: null
        })
            .then(response => {
                setShowButtonLoadingState(false);
                setShowUpdateUserModalState(false);
                getUsers();
            })
            .catch(error => {
                console.error(error);
                setShowButtonLoadingState(false);
            });
    };

    const deleteUser = async () => {
        setShowButtonLoadingState(true);
        await deleteUserService(selectedItemState.id)
            .then(response => {
                setShowButtonLoadingState(false);
                setShowDeleteUserModalState(false);
                getUsers();
            })
            .catch(error => {
                console.error(error);
                setShowButtonLoadingState(false);
            });
    };

    const onDeleteClicked = item => {
        setSelectedItemState(item);
        setShowDeleteUserModalState(true);
    };

    const onUpdateClicked = item => {
        setSelectedItemState(item);
        setShowUpdateUserModalState(true);
    };

    const onAssociateRoleClicked = item => {
        setSelectedItemState(item);
        setShowAssociateRoleModalState(true);
    };

    const onAssociateCompanyClicked = item => {
        setSelectedItemState(item);
        setShowAssociateCompaniesModalState(true);
    };

    const pageModals = () => {
        return (
            <React.Fragment>
                {/* Añadir usuario */}
                <EditUserForm
                    showModal={showAddUserModalState}
                    onSaveClicked={updatedUser => addUser(updatedUser)}
                    onCancelClicked={() => setShowAddUserModalState(false)}
                    showLoading={showButtonLoadingState}
                />
                {/* Eliminar usuario */}
                <Modal
                    title={`Eliminar usuario ${
                        selectedItemState ? selectedItemState.name : null
                    }`}
                    visible={showDeleteUserModalState}
                    onOk={() => deleteUser()}
                    confirmLoading={showButtonLoadingState}
                    onCancel={() => setShowDeleteUserModalState(false)}
                >
                    <p>Esta seguro de querer eliminar este usuario?</p>
                </Modal>
                {/* Actualizar usuario */}
                <EditUserForm
                    user={selectedItemState}
                    showModal={showUpdateUserModalState}
                    onSaveClicked={updatedUser => updateUser(updatedUser)}
                    onCancelClicked={() => setShowUpdateUserModalState(false)}
                    showLoading={showButtonLoadingState}
                />
                {/* Asociar Roles */}
                <AssociateRoles
                    allRoles={allRolesState}
                    showModal={showAssociateRoleModalState}
                    onCancelClicked={() =>
                        setShowAssociateRoleModalState(false)
                    }
                    onOkClicked={() => setShowAssociateRoleModalState(false)}
                    user={selectedItemState}
                />
                {/* Asociar Compañías */}
                <AssociateCompanies
                    allCompanies={allCompaniesState}
                    showModal={showAssociateCompaniesModalState}
                    onCancelClicked={() =>
                        setShowAssociateCompaniesModalState(false)
                    }
                    onOkClicked={() => setShowAssociateCompaniesModalState(false)}
                    user={selectedItemState}
                />
            </React.Fragment>
        );
    };

    return (
        <ComponentContainer
            title="Usuarios"
            addButtonClicked={() => setShowAddUserModalState(true)}
        >
            {pageModals()}
            <Table dataSource={allUsersState} columns={columns} />
        </ComponentContainer>
    );
};

export default Users;
