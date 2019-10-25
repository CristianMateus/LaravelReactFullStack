// Componentes Propios
import ComponentContainer from "../../shared/components/componentContainer/ComponentContainer";

// Ant Design
import { Table, Divider, Modal } from "antd";

// React
import React, { useEffect, useState } from "react";

// Servicios
import { getAllRoles } from "../../shared/services/RoleServices";

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

    const getRoles = async () => {
        await getAllRoles().then(response => {
            setAllRolesState(response);
        });
    };

    const addRole = async () => {
        setShowButtonLoadingState(true);
        setTimeout(() => {
            setShowButtonLoadingState(false);
            setShowAddRoleModalState(false);
        }, 2000);
    };

    const onDeleteClicked = item => {
        setSelectedItemState(item)
        setShowDeleteRoleModalState(true);
    };

    const onUpdateClicked = item => {
        setSelectedItemState(item)
        setShowUpdateRoleModalState(true);
    };

    const pageModals = () => {
        return (
            <React.Fragment>
                <Modal
                    title="Añadir rol"
                    visible={showAddRoleModalState}
                    onOk={() => addRole()}
                    confirmLoading={showButtonLoadingState}
                    onCancel={() => setShowAddRoleModalState(false)}
                >
                    <p>Formulario</p>
                </Modal>
                <Modal
                    title={`Eliminar rol ${
                        selectedItemState ? selectedItemState.name : null
                    }`}
                    visible={showDeleteRoleModalState}
                    onOk={() => addRole()}
                    confirmLoading={showButtonLoadingState}
                    onCancel={() => setShowDeleteRoleModalState(false)}
                >
                    <p>Esta seguro de querer eliminar este rol?</p>
                </Modal>
                <Modal
                    title={`Actualizar rol ${
                        selectedItemState ? selectedItemState.name : null
                    }`}
                    visible={showUpdateRoleModalState}
                    onOk={() => addRole()}
                    confirmLoading={showButtonLoadingState}
                    onCancel={() => setShowUpdateRoleModalState(false)}
                >
                    <h1>Actualizar</h1>
                </Modal>
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
