// Componentes Propios
import ComponentContainer from "../../shared/components/componentContainer/ComponentContainer";
import EditModuleForm from "./components/editModuleForm/EditModuleForm";
import AssociateRoles from "./components/associateRoles/AssociateRoles";

// Ant Design
import { Table, Divider, Modal } from "antd";

// React
import React, { useEffect, useState } from "react";

// Servicios
import {
    getAllModules,
    saveModule,
    updateModule as updateModuleService,
    deleteModule as deleteModuleService
} from "../../shared/services/ModuleServices";
import { getAllRoles } from "../../shared/services/RoleServices";

const Modules = () => {
    useEffect(() => {
        getModules();
        getRoles();
    }, []);

    const [allModulesState, setAllModulesState] = useState([]);
    const [allRolesState, setAllRolesState] = useState([]);
    const [showAddModuleModalState, setShowAddModuleModalState] = useState(
        false
    );
    const [
        showAssociateRoleModalState,
        setShowAssociateRoleModalState
    ] = useState(false);
    const [
        showUpdateModuleModalState,
        setShowUpdateModuleModalState
    ] = useState(false);
    const [
        showDeleteModuleModalState,
        setShowDeleteModuleModalState
    ] = useState(false);
    const [showButtonLoadingState, setShowButtonLoadingState] = useState(false);
    const [selectedItemState, setSelectedItemState] = useState(null);

    const getModules = async () => {
        await getAllModules().then(response => {
            setAllModulesState(response);
        });
    };
    
    const getRoles = async () => {
        await getAllRoles().then(response => {
            setAllRolesState(response);
        });
    };


    const onAssociateRoleClicked = item => {
        setSelectedItemState(item);
        setShowAssociateRoleModalState(true);
    };

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
            title: "Ruta",
            dataIndex: "route",
            key: "route"
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
                </span>
            )
        }
    ];

    const addModule = async updatedModule => {
        setShowButtonLoadingState(true);

        await saveModule(updatedModule)
            .then(response => {
                setShowButtonLoadingState(false);
                setShowAddModuleModalState(false);
                getModules();
            })
            .catch(error => {
                setShowButtonLoadingState(false);
                console.error(error);
            });
    };

    const updateModule = async updatedModule => {
        setShowButtonLoadingState(true);
        await updateModuleService(selectedItemState.id, updatedModule)
            .then(response => {
                setShowButtonLoadingState(false);
                setShowUpdateModuleModalState(false);
                getModules();
            })
            .catch(error => {
                setShowButtonLoadingState(false);
                console.error(error);
            });
    };

    const deleteModule = async () => {
        setShowButtonLoadingState(true);
        await deleteModuleService(selectedItemState.id)
            .then(response => {
                setShowButtonLoadingState(false);
                setShowDeleteModuleModalState(false);
                getModules();
            })
            .catch(error => {
                setShowButtonLoadingState(false);
                console.error(error);
            });
    };

    const onDeleteClicked = item => {
        setSelectedItemState(item);
        setShowDeleteModuleModalState(true);
    };

    const onUpdateClicked = item => {
        setSelectedItemState(item);
        setShowUpdateModuleModalState(true);
    };

    const pageModals = () => {
        return (
            <React.Fragment>
                {/* Añadir modulo */}
                <EditModuleForm
                    showModal={showAddModuleModalState}
                    onSaveClicked={updatedModule => addModule(updatedModule)}
                    onCancelClicked={() => setShowAddModuleModalState(false)}
                    showLoading={showButtonLoadingState}
                />
                {/* Eliminar modulo */}
                <Modal
                    title={`Eliminar módulo ${
                        selectedItemState ? selectedItemState.name : null
                    }`}
                    visible={showDeleteModuleModalState}
                    onOk={() => deleteModule()}
                    confirmLoading={showButtonLoadingState}
                    onCancel={() => setShowDeleteModuleModalState(false)}
                >
                    <p>Esta seguro de querer eliminar este modulo?</p>
                </Modal>
                {/* Actualizar modulo */}
                <EditModuleForm
                    moduleToUpdate={selectedItemState}
                    showModal={showUpdateModuleModalState}
                    onSaveClicked={updatedModule => updateModule(updatedModule)}
                    onCancelClicked={() => setShowUpdateModuleModalState(false)}
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
                    module={selectedItemState}
                />
            </React.Fragment>
        );
    };

    return (
        <ComponentContainer
            title="Modulos"
            addButtonClicked={() => setShowAddModuleModalState(true)}
        >
            {pageModals()}
            <Table dataSource={allModulesState} columns={columns} />
        </ComponentContainer>
    );
};

export default Modules;
