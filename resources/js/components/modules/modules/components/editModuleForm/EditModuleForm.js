// Ant Design
import { Modal, Form, Input } from "antd";

// React
import React, { useEffect, useState } from "react";

const EditModuleForm = ({
    moduleToUpdate = null,
    showModal = false,
    onSaveClicked,
    onCancelClicked,
    showLoading
}) => {
    useEffect(() => {
        if (!moduleToUpdate) {
            return;
        }
        setModuleState(moduleToUpdate);
    }, [moduleToUpdate]);

    const [moduleState, setModuleState] = useState({ name: null, route: null });

    const handleInputChanged = e => {
        const key = e.target.name;
        const value = e.target.value;
        setModuleState({ ...moduleState, [key]: value });
    };

    return (
        <Modal
            title={
                moduleToUpdate
                    ? `Actualizar modulo ${moduleToUpdate.name}`
                    : "Añadir modulo"
            }
            visible={showModal}
            onOk={() => onSaveClicked(moduleState)}
            onCancel={() => {
                setModuleState({ name: null, route: null });
                onCancelClicked();
            }}
            confirmLoading={showLoading}
        >
            <Form>
                <Form.Item label="Nombre">
                    <Input
                        name="name"
                        required
                        value={moduleState.name}
                        onChange={e => handleInputChanged(e)}
                    />
                </Form.Item>
                <Form.Item label="Ruta">
                    <Input
                        name="route"
                        required
                        value={moduleState.route}
                        onChange={e => handleInputChanged(e)}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditModuleForm;
