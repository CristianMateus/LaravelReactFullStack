// Componentes Propios
import ComponentContainer from "../../shared/components/componentContainer/ComponentContainer";

// Ant Design
import { Table, Divider, Modal } from "antd";

// React
import React, { useEffect, useState } from "react";

// Servicios
import { getAllModules } from "../../shared/services/ModuleServices";
import EditModuleForm from "./components/editModuleForm/EditModuleForm";

const Modules = () => {
    useEffect(() => {
        getModules();
    }, []);

    const [allModulesState, setAllModulesState] = useState([]);
    const [showAddModuleModalState, setShowAddModuleModalState] = useState(
        false
    );
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

    const addModule = async (updatedModule) => {
        setShowButtonLoadingState(true);
        console.log('addModule', updatedModule)
        setTimeout(() => {
            setShowButtonLoadingState(false);
            setShowAddModuleModalState(false);
        }, 2000);
    };

    const updateModule = async (updatedModule) => {
        setShowButtonLoadingState(true);
        console.log('updateModule', updatedModule)
        setTimeout(() => {
            setShowButtonLoadingState(false);
            setShowUpdateModuleModalState(false);
        }, 2000);
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
                </span>
            )
        }
    ];

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
                    onOk={() => addModule()}
                    confirmLoading={showButtonLoadingState}
                    onCancel={() => setShowDeleteModuleModalState(false)}
                >
                    <p>Esta seguro de querer eliminar este modulo?</p>
                </Modal>
                {/* Actualizar modulo */}
                <EditModuleForm
                    moduleToUpdate={selectedItemState}
                    showModal={showUpdateModuleModalState}
                    onSaveClicked={updatedModule =>
                        updateModule(updatedModule)
                    }
                    onCancelClicked={() => setShowUpdateModuleModalState(false)}
                    showLoading={showButtonLoadingState}
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
