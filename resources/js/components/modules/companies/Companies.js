// Componentes Propios
import ComponentContainer from "../../shared/components/componentContainer/ComponentContainer";
import EditCompanyForm from "./components/editCompanyForm/EditCompanyForm";

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

    const addCompany = async updatedCompany => {
        setShowButtonLoadingState(true);
        console.log("nueva compañía", updatedCompany);
        setTimeout(() => {
            setShowButtonLoadingState(false);
            setshowAddCompanyModalState(false);
        }, 2000);
    };

    const updateCompany = async updatedCompany => {
        setShowButtonLoadingState(true);
        console.log("actualizarcompañía", updatedCompany);
        setTimeout(() => {
            setShowButtonLoadingState(false);
            setshowUpdateCompanyModalState(false);
        }, 2000);
    };

    const deleteCompany = async () => {
        setShowButtonLoadingState(true);
        setTimeout(() => {
            console.log('eliminar compañía', selectedItemState)
            setShowButtonLoadingState(false);
            setshowDeleteCompanyModalState(false);
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
                {/* Nueva Compañía */}
                <EditCompanyForm
                    showModal={showAddCompanyModalState}
                    onSaveClicked={updatedCompany => addCompany(updatedCompany)}
                    onCancelClicked={() => setshowAddCompanyModalState(false)}
                    showLoading={showButtonLoadingState}
                />
                {/* Eliminar Compañia */}
                <Modal
                    title={`Eliminar compañía ${
                        selectedItemState ? selectedItemState.name : null
                    }`}
                    visible={showDeleteCompanyModalState}
                    onOk={() => deleteCompany()}
                    confirmLoading={showButtonLoadingState}
                    onCancel={() => setshowDeleteCompanyModalState(false)}
                >
                    <p>Esta seguro de querer eliminar esta compañía?</p>
                </Modal>
                {/* Actualizar Compañia */}
                <EditCompanyForm
                    company={selectedItemState}
                    showModal={showUpdateCompanyModalState}
                    onSaveClicked={updatedCompany =>
                        updateCompany(updatedCompany)
                    }
                    onCancelClicked={() =>
                        setshowUpdateCompanyModalState(false)
                    }
                    showLoading={showButtonLoadingState}
                />
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
