// Componentes Propios
import ComponentContainer from "../../shared/components/componentContainer/ComponentContainer";

// Ant Design
import { Table, Divider, Modal } from "antd";

// React
import React, { useEffect, useState } from "react";

// Servicios
import { getAllModules } from "../../shared/services/ModuleServices";

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

    const addModule = async () => {
        setShowButtonLoadingState(true);
        setTimeout(() => {
            setShowButtonLoadingState(false);
            setShowModalState(false);
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
                <Modal
                    title="Añadir módulo"
                    visible={showAddModuleModalState}
                    onOk={() => addModule()}
                    confirmLoading={showButtonLoadingState}
                    onCancel={() => setShowAddModuleModalState(false)}
                >
                    <p>Formulario</p>
                </Modal>
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
                <Modal
                    title={`Actualizar módulo ${
                        selectedItemState ? selectedItemState.name : null
                    }`}
                    visible={showUpdateModuleModalState}
                    onOk={() => addModule()}
                    confirmLoading={showButtonLoadingState}
                    onCancel={() => setShowUpdateModuleModalState(false)}
                >
                    <h1>Actualizar</h1>
                </Modal>
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
