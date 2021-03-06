// Componentes Propios
import ComponentContainer from "../../shared/components/componentContainer/ComponentContainer";
import AssociateModules from "./components/associateModules/AssociateModules";

// Ant Design
import { Table, Divider, Modal } from "antd";

// React
import React, { useEffect, useState } from "react";

// Servicios
import {
    getAllRoles,
    saveRole,
    updateRole as updateRoleService,
    deleteRole as deleteRoleService
} from "../../shared/services/RoleServices";
import { getAllModules } from "../../shared/services/ModuleServices";
import EditRoleForm from "./components/editRoleForm/EditRoleForm";

const Roles = () => {
    useEffect(() => {
        getRoles();
        getModules();
    }, []);

    const [allRolesState, setAllRolesState] = useState([]);
    const [allModulesState, setAllModulesState] = useState([]);
    const [showAddRoleModalState, setShowAddRoleModalState] = useState(false);
    const [showUpdateRoleModalState, setShowUpdateRoleModalState] = useState(
        false
    );
    const [showDeleteRoleModalState, setShowDeleteRoleModalState] = useState(
        false
    );
    const [
        showAssociateModuleModalState,
        setShowAssociateModuleModalState
    ] = useState(false);
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
                    <Divider type="vertical" />
                    <i
                        className="fas fa-atlas"
                        onClick={() => onAssociateModuleClicked(record)}
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

    const getModules = async () => {
        await getAllModules().then(response => {
            setAllModulesState(response);
        });
    };

    const addRole = async updatedRole => {
        setShowButtonLoadingState(true);
        await saveRole(updatedRole)
            .then(response => {
                setShowButtonLoadingState(false);
                setShowAddRoleModalState(false);
                getRoles();
            })
            .catch(error => {
                setShowButtonLoadingState(false);
                console.error(error);
            });
    };

    const updateRole = async updatedRole => {
        setShowButtonLoadingState(true);
        await updateRoleService(selectedItemState.id, updatedRole)
            .then(response => {
                setShowButtonLoadingState(false);
                setShowUpdateRoleModalState(false);
                getRoles();
            })
            .catch(error => {
                setShowButtonLoadingState(false);
                console.error(error);
            });
    };

    const deleteRole = async () => {
        setShowButtonLoadingState(true);
        await deleteRoleService(selectedItemState.id)
            .then(response => {
                setShowButtonLoadingState(false);
                setShowDeleteRoleModalState(false);
                getRoles();
            })
            .catch(error => {
                setShowButtonLoadingState(false);
                console.error(error);
            });
    };

    const onDeleteClicked = item => {
        setSelectedItemState(item);
        setShowDeleteRoleModalState(true);
    };

    const onUpdateClicked = item => {
        setSelectedItemState(item);
        setShowUpdateRoleModalState(true);
    };

    const onAssociateModuleClicked = item => {
        setSelectedItemState(item);
        setShowAssociateModuleModalState(true);
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
                {/* Asociar módulo */}
                <AssociateModules
                    allModules={allModulesState}
                    showModal={showAssociateModuleModalState}
                    onCancelClicked={() =>
                        setShowAssociateModuleModalState(false)
                    }
                    onOkClicked={() => setShowAssociateModuleModalState(false)}
                    role={selectedItemState}
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
