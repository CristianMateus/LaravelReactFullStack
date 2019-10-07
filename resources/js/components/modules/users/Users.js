// Componentes Propios
import ComponentContainer from "../../shared/components/componentContainer/ComponentContainer";

// Ant Design
import { Table, Divider, Tag } from "antd";

// React
import React, { useEffect, useState } from 'react'

// Servicios
import { getAllUsers } from '../../shared/services/UserServices'

const Users = () => {
    
    useEffect(() => {
        getUsers()
    }, [])

    const [allUsersState, setAllUsersState] = useState([])

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
            title: "Correo",
            dataIndex: "email",
            key: "email"
        },
        {
            title: "IdPersonal",
            dataIndex: "personalId",
            key: "personalId"
        },
        {
            title: "Teléfono",
            dataIndex: "phone",
            key: "phone"
        }
    ];

    const getUsers = async () => {
        await getAllUsers().then(response => {
            setAllUsersState(response)
        })
    }

    return (
        <ComponentContainer title="Usuarios">
            <Table dataSource={allUsersState} columns={columns} />
        </ComponentContainer>
    )
}

export default Users
