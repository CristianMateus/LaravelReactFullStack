// Ant Design
import { Modal, Form, Input } from "antd";

// React
import React, { useEffect, useState } from "react";

const EditUserForm = ({
    user = null,
    showModal = false,
    onSaveClicked,
    onCancelClicked,
    showLoading
}) => {
    useEffect(() => {
        if (!user) {
            return;
        }
        setUserState(user);
    }, [user]);

    const [userState, setUserState] = useState({
        name: null,
        email: null,
        personalId: null,
        phone: null
    });

    const handleInputChanged = e => {
        const key = e.target.name;
        const value = e.target.value;
        setUserState({ ...userState, [key]: value });
    };

    return (
        <Modal
            title={
                user ? `Actualizar compañía ${user.name}` : "Añadir compañía"
            }
            visible={showModal}
            onOk={() => {
                setUserState({
                    name: null,
                    email: null,
                    personalId: null,
                    phone: null
                });
                onSaveClicked(userState);
            }}
            onCancel={() => {
                setUserState({
                    name: null,
                    email: null,
                    personalId: null,
                    phone: null
                });
                onCancelClicked();
            }}
            confirmLoading={showLoading}
        >
            <Form>
                <Form.Item label="Nombre">
                    <Input
                        name="name"
                        required
                        value={userState.name}
                        onChange={e => handleInputChanged(e)}
                    />
                </Form.Item>
                <Form.Item label="Correo">
                    <Input
                        name="email"
                        required
                        value={userState.email}
                        onChange={e => handleInputChanged(e)}
                    />
                </Form.Item>
                <Form.Item label="IdPersonal">
                    <Input
                        name="personalId"
                        required
                        value={userState.personalId}
                        onChange={e => handleInputChanged(e)}
                    />
                </Form.Item>
                <Form.Item label="Teléfono">
                    <Input
                        name="phone"
                        required
                        value={userState.phone}
                        onChange={e => handleInputChanged(e)}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditUserForm;
