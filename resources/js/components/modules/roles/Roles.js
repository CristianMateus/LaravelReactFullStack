// Componentes Propios
import ComponentContainer from "../../shared/components/componentContainer/ComponentContainer";

// Ant Design
import { Table, Divider, Modal } from "antd";

// React
import React, { useEffect, useState } from "react";

// Servicios
import { getAllRoles } from "../../shared/services/RoleServices";
import EditRoleForm from "./components/editRoleForm/EditRoleForm";

const Roles = () => {
    useEffect(() => {
        getRoles();
    }, []);

    const [allRolesState, setAllRolesState] = useState([]);
    const [showAddRoleModalState, setShowAddRoleModalState] = useState(false);
    const [showUpdateRoleModalState, setShowUpdateRoleModalState] = useState(
        false
    );
    const [showDeleteRoleModalState, setShowDeleteRoleModalState] = useState(
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
                </span>
            )
        }
    ];

    const getRoles = async () => {
        await getAllRoles().then(response => {
            setAllRolesState(response);
        });
    };

    const addRole = async updatedRole => {
        setShowButtonLoadingState(true);
        setTimeout(() => {
            console.log("addRole", updatedRole);
            setShowButtonLoadingState(false);
            setShowAddRoleModalState(false);
        }, 2000);
    };

    const updateRole = async updatedRole => {
        setShowButtonLoadingState(true);
        setTimeout(() => {
            console.log("updateRole", updatedRole);
            setShowButtonLoadingState(false);
            setShowUpdateRoleModalState(false);
        }, 2000);
    };

    const deleteRole = async () => {
        setShowButtonLoadingState(true);
        setTimeout(() => {
            console.log('eliminar rol', selectedItemState)
            setShowButtonLoadingState(false);
            setShowDeleteRoleModalState(false);
        }, 2000);
    };

    const onDeleteClicked = item => {
        setSelectedItemState(item);
        setShowDeleteRoleModalState(true);
    };

    const onUpdateClicked = item => {
        setSelectedItemState(item);
        setShowUpdateRoleModalState(true);
    };

    const pageModals = () => {
        return (
            <React.Fragment>
                {/* Añadir rol */}
                <EditRoleForm
                    showModal={showAddRoleModalState}
                    onSaveClicked={updatedRole => addRole(updatedRole)}
                    onCancelClicked={() => setShowAddRoleModalState(false)}
                    showLoading={showButtonLoadingState}
                />
                {/* Eliminar rol */}
                <Modal
                    title={`Eliminar rol ${
                        selectedItemState ? selectedItemState.name : null
                    }`}
                    visible={showDeleteRoleModalState}
                    onOk={() => deleteRole()}
                    confirmLoading={showButtonLoadingState}
                    onCancel={() => setShowDeleteRoleModalState(false)}
                >
                    <p>Esta seguro de querer eliminar este rol?</p>
                </Modal>
                {/* Editar rol */}
                <EditRoleForm
                    role={selectedItemState}
                    showModal={showUpdateRoleModalState}
                    onSaveClicked={updatedRole => updateRole(updatedRole)}
                    onCancelClicked={() => setShowUpdateRoleModalState(false)}
                    showLoading={showButtonLoadingState}
                />
            </React.Fragment>
        );
    };

    return (
        <ComponentContainer
            title="Roles"
            addButtonClicked={() => setShowAddRoleModalState(true)}
        >
            {pageModals()}
            <Table dataSource={allRolesState} columns={columns} />
        </ComponentContainer>
    );
};

export default Roles;
