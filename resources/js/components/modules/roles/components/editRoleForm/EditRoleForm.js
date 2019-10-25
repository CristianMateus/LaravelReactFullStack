// Ant Design
import { Modal, Form, Input } from "antd";

// React
import React, { useEffect, useState } from "react";

const EditRoleForm = ({
    role = null,
    showModal = false,
    onSaveClicked,
    onCancelClicked,
    showLoading
}) => {
    useEffect(() => {
        if (!role) {
            return;
        }
        setRoleState(role);
    }, [role]);

    const [roleState, setRoleState] = useState({ name: null });

    const handleInputChanged = e => {
        const key = e.target.name;
        const value = e.target.value;
        setRoleState({ ...roleState, [key]: value });
    };

    return (
        <Modal
            title={
                role
                    ? `Actualizar rol ${role.name}`
                    : "Añadir rol"
            }
            visible={showModal}
            onOk={() => onSaveClicked(roleState)}
            onCancel={() => {
                role
                    ? setRoleState({ name: role.name })
                    : null;
                onCancelClicked();
            }}
            confirmLoading={showLoading}
        >
            <Form>
                <Form.Item label="Nombre">
                    <Input
                        name="name"
                        required
                        value={roleState.name}
                        onChange={e => handleInputChanged(e)}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditRoleForm;
