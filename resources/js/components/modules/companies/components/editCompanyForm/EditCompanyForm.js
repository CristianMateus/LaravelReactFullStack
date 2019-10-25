// Ant Design
import { Modal, Form, Input } from "antd";

// React
import React, { useEffect, useState } from "react";

const EditCompanyForm = ({
    company = null,
    showModal = false,
    onSaveClicked,
    onCancelClicked,
    showLoading
}) => {
    useEffect(() => {
        if (!company) {
            return;
        }
        setCompanyState(company);
    }, [company]);

    const [companyState, setCompanyState] = useState({ name: null, nit: null });

    const handleInputChanged = e => {
        const key = e.target.name;
        const value = e.target.value;
        setCompanyState({ ...companyState, [key]: value });
    };

    return (
        <Modal
            title={
                company
                    ? `Actualizar compañía ${company.name}`
                    : "Añadir compañía"
            }
            visible={showModal}
            onOk={() => onSaveClicked(companyState)}
            onCancel={() => {
                company
                    ? setCompanyState({ name: company.name, nit: company.nit })
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
                        value={companyState.name}
                        onChange={e => handleInputChanged(e)}
                    />
                </Form.Item>
                <Form.Item label="Nit">
                    <Input
                        name="nit"
                        required
                        value={companyState.nit}
                        onChange={e => handleInputChanged(e)}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default EditCompanyForm;
