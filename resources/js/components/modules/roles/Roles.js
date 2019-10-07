// Componentes Propios
import ComponentContainer from "../../shared/components/componentContainer/ComponentContainer";

// Ant Design
import { Table, Divider, Tag } from "antd";

// React
import React, { useEffect, useState } from 'react'

// Servicios
import { getAllRoles } from '../../shared/services/RoleServices'

const Roles = () => {
    
    useEffect(() => {
        getRoles()
    }, [])

    const [allRolesState, setAllRolesState] = useState([])

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
        }
    ];

    const getRoles = async () => {
        await getAllRoles().then(response => {
            setAllRolesState(response)
        })
    }


    return (
        <ComponentContainer title="Roles">
            <Table dataSource={allRolesState} columns={columns} />
        </ComponentContainer>
    )
}

export default Roles
