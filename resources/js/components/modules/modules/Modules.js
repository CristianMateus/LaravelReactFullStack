// Componentes Propios
import ComponentContainer from "../../shared/components/componentContainer/ComponentContainer";

// Ant Design
import { Table, Divider, Tag } from "antd";

// React
import React, { useEffect, useState } from "react";

// Servicios
import { getAllModules } from '../../shared/services/ModuleServices'

const Modules = () => {
    
    useEffect(() => {
        getModules()
    }, [])

    const [allModulesState, setAllModulesState] = useState([])

    const getModules = async () => {
        await getAllModules().then(response => {
            setAllModulesState(response)
        })
    }

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
        }
    ];

    return (
        <ComponentContainer title="Modulos">
            <Table dataSource={allModulesState} columns={columns} />
        </ComponentContainer>
    );
};

export default Modules;
