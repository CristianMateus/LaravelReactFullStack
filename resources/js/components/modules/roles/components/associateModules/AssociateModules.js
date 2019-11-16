import { Modal } from "antd";

import CardLayout from "../../../../shared/components/cardLayout/CardLayout";
import Card from "../../../../shared/components/card/Card";

import React, { useEffect, useState } from "react";

import {
    getRoleModules as getRoleModulesService,
    addRoleModule,
    deleteRoleModule
} from "../../../../shared/services/RoleServices";
import ModalSpinner from "../../../../shared/components/modalSpinner/ModalSpinner";

const AssociateModules = ({
    allModules = [],
    showModal,
    onOkClicked,
    onCancelClicked,
    role
}) => {
    const [selectedModulesState, setSelectedModulesState] = useState([]);

    useEffect(() => {
        if (showModal) {
            getRoleModules();
        } else {
            setSelectedModulesState([]);
        }
    }, [showModal]);

    const getRoleModules = async () => {
        await getRoleModulesService(role.id)
            .then(response => {
                const roleModules = response;
                const selectedRoleModules = allModules.map(role => {
                    const isModuleSelected = roleModules.find(
                        userRole => userRole.id === role.id
                    );
                    if (isModuleSelected) {
                        return { ...role, selected: true };
                    }
                    return { ...role, selected: false };
                });
                setSelectedModulesState(selectedRoleModules);
            })
            .catch(error => console.error(error));
    };

    const addModule = async moduleId => {
        await addRoleModule(role.id, moduleId).then(response => {
            console.log(response);
            getRoleModules();
        });
    };

    const deleteModule = async moduleId => {
        await deleteRoleModule(role.id, moduleId).then(response => {
            console.log(response);
            getRoleModules();
        });
    };

    const handleCardClicked = (wasCardSelected, moduleId) => {
        if (wasCardSelected) {
            addModule(moduleId);
        } else {
            deleteModule(moduleId);
        }
    };
    return (
        <Modal
            title={role ? `Asociar módulos a rol ${role.name}` : null}
            visible={showModal}
            onOk={() => onOkClicked()}
            onCancel={() => onCancelClicked()}
            footer={null}
            destroyOnClose={true}
        >
            {selectedModulesState.length === 0 ? (
                <ModalSpinner />
            ) : (
                <CardLayout>
                    {selectedModulesState.map((module, i) => (
                        <Card
                            key={i}
                            onCardCliked={isSelected =>
                                handleCardClicked(isSelected, module.id)
                            }
                            title={module.name}
                            isSelected={module.selected}
                        />
                    ))}
                </CardLayout>
            )}
        </Modal>
    );
};

export default AssociateModules;
