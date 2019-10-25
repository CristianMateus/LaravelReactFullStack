// Componentes Propios
import ComponentContainer from "../../shared/components/componentContainer/ComponentContainer";

// Ant Design
import { Table, Divider, Modal, Form, Input } from "antd";

// React
import React, { useEffect, useState } from "react";

// Servicios
import { getAllCompanies } from "../../shared/services/CompanyServices";

const Company = () => {
    useEffect(() => {
        getCompanies();
    }, []);

    const [allCompaniesState, setAllCompaniesState] = useState([]);
    const [showAddCompanyModalState, setshowAddCompanyModalState] = useState(
        false
    );
    const [
        showDeleteCompanyModalState,
        setshowDeleteCompanyModalState
    ] = useState(false);
    const [
        showUpdateCompanyModalState,
        setshowUpdateCompanyModalState
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
            title: "Nit",
            dataIndex: "nit",
            key: "nit"
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

    const getCompanies = async () => {
        await getAllCompanies().then(response => {
            setAllCompaniesState(response);
        });
    };

    const addCompany = async () => {
        setShowButtonLoadingState(true);
        setTimeout(() => {
            setShowButtonLoadingState(false);
            setshowAddCompanyModalState(false);
        }, 2000);
    };

    const onDeleteClicked = item => {
        setSelectedItemState(item);
        setshowDeleteCompanyModalState(true);
    };

    const onUpdateClicked = item => {
        setSelectedItemState(item);
        setshowUpdateCompanyModalState(true);
    };

    const pageModals = () => {
        return (
            <React.Fragment>
                <Modal
                    title="Añadir compañía"
                    visible={showAddCompanyModalState}
                    onOk={() => addCompany()}
                    confirmLoading={showButtonLoadingState}
                    onCancel={() => setshowAddCompanyModalState(false)}
                >
                    <Form>
                        <Form.Item label="Nombre">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Nit">
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
                <Modal
                    title={`Eliminar compañía ${
                        selectedItemState ? selectedItemState.name : null
                    }`}
                    visible={showDeleteCompanyModalState}
                    onOk={() => addModule()}
                    confirmLoading={showButtonLoadingState}
                    onCancel={() => setshowDeleteCompanyModalState(false)}
                >
                    <p>Esta seguro de querer eliminar esta compañía?</p>
                </Modal>
                <Modal
                    title={`Actualizar compañía ${
                        selectedItemState ? selectedItemState.name : null
                    }`}
                    visible={showUpdateCompanyModalState}
                    onOk={() => addModule()}
                    confirmLoading={showButtonLoadingState}
                    onCancel={() => setshowUpdateCompanyModalState(false)}
                >
                    <Form>
                        <Form.Item label="Nombre">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Nit">
                            <Input />
                        </Form.Item>
                    </Form>
                </Modal>
            </React.Fragment>
        );
    };

    return (
        <ComponentContainer
            title="Compañías"
            addButtonClicked={() => setshowAddCompanyModalState(true)}
        >
            {pageModals()}
            <Table dataSource={allCompaniesState} columns={columns} />
        </ComponentContainer>
    );
};

export default Company;
