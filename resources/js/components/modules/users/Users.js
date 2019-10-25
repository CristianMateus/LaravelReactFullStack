// Componentes Propios
import ComponentContainer from "../../shared/components/componentContainer/ComponentContainer";

// Ant Design
import { Table, Divider, Modal } from "antd";

// React
import React, { useEffect, useState } from "react";

// Servicios
import { getAllUsers } from "../../shared/services/UserServices";
import EditUserForm from "./components/editUserForm/EditUserForm";

const Users = () => {
    useEffect(() => {
        getUsers();
    }, []);

    const [allUsersState, setAllUsersState] = useState([]);
    const [showAddUserModalState, setShowAddUserModalState] = useState(false);
    const [showUpdateUserModalState, setShowUpdateUserModalState] = useState(
        false
    );
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
                        style={{cursor: 'pointer'}}
                    />
                    <Divider type="vertical" />
                    <i
                        className="fas fa-pen"
                        onClick={() => onUpdateClicked(record)}
                        style={{cursor: 'pointer'}}
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

    const addUser = async (updatedUser) => {
        setShowButtonLoadingState(true);
        setTimeout(() => {
            console.log('addUser', updatedUser)
            setShowButtonLoadingState(false);
            setShowAddUserModalState(false);
        }, 2000);
    };

    const updateUser = async (updatedUser) => {
        setShowButtonLoadingState(true);
        setTimeout(() => {
            console.log('updateUser', updatedUser)
            setShowButtonLoadingState(false);
            setShowUpdateUserModalState(false);
        }, 2000);
    };

    const deleteUser = async () => {
        setShowButtonLoadingState(true);
        setTimeout(() => {
            console.log('eliminar usuario', selectedItemState)
            setShowButtonLoadingState(false);
            setShowDeleteUserModalState(false);
        }, 2000);
    };

    const onDeleteClicked = item => {
        setSelectedItemState(item)
        setShowDeleteUserModalState(true);
    };

    const onUpdateClicked = item => {
        setSelectedItemState(item)
        setShowUpdateUserModalState(true);
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
                    onSaveClicked={updatedUser =>
                        updateUser(updatedUser)
                    }
                    onCancelClicked={() =>
                        setShowUpdateUserModalState(false)
                    }
                    showLoading={showButtonLoadingState}
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
