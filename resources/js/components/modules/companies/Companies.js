// Componentes Propios
import ComponentContainer from "../../shared/components/componentContainer/ComponentContainer";

// Ant Design
import { Table, Divider, Tag } from "antd";

// React
import React, {useEffect, useState} from "react";

// Servicios
import { getAllCompanies } from '../../shared/services/CompanyServices'

const Company = () => {

    useEffect(() => {
        getCompanies()
    }, [])

    const [allCompaniesState, setAllCompaniesState] = useState([])

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
            title: "nit",
            dataIndex: "nit",
            key: "nit"
        }
    ];

    const getCompanies = async () => {
        await getAllCompanies().then(response => {
            setAllCompaniesState(response)
        })
    }

    return (
        <ComponentContainer title="Compañías">
            <Table dataSource={allCompaniesState} columns={columns} />
        </ComponentContainer>
    );
};

export default Company;
