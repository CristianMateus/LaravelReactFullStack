import { Modal } from "antd";

import CardLayout from "../../../../shared/components/cardLayout/CardLayout";
import Card from "../../../../shared/components/card/Card";

import React, { useEffect, useState } from "react";

import {
    getModuleRoles as getModuleRolesService,
    addModuleRole,
    deleteModuleRole
} from "../../../../shared/services/ModuleServices";
import ModalSpinner from "../../../../shared/components/modalSpinner/ModalSpinner";

const AssociateRoles = ({
    showModal,
    onOkClicked,
    onCancelClicked,
    module,
    allRoles = []
}) => {
    const [selectedRolesState, setSelectedRolesState] = useState([]);

    useEffect(() => {
        if (showModal) {
            getModuleRoles();
        } else {
            setSelectedRolesState([]);
        }
    }, [showModal]);
    

    const getModuleRoles = async () => {
        await getModuleRolesService(module.id)
            .then(response => {
                const moduleRoles = response;
                const selectedModuleRoles = allRoles.map(role => {
                    const isRoleSelected = moduleRoles.find(
                        moduleRole => moduleRole.id === role.id
                    );
                    if (isRoleSelected) {
                        return { ...role, selected: true };
                    }
                    return { ...role, selected: false };
                });
                console.log(selectedRolesState)
                setSelectedRolesState(selectedModuleRoles);
            })
            .catch(error => console.error(error));
    };

    const addRole = async roleId => {
        await addModuleRole(module.id, roleId).then(response => {
            console.log(response);
            getModuleRoles();
        });
    };

    const deleteRole = async roleId => {
        await deleteModuleRole(module.id, roleId).then(response => {
            console.log(response);
            getModuleRoles();
        });
    };

    const handleCardClicked = (wasCardSelected, roleId) => {
        if (wasCardSelected) {
            addRole(roleId);
        } else {
            deleteRole(roleId);
        }
    };
    return (
        <Modal
            title={module ? `Asociar roles a módulo ${module.name}` : null}
            visible={showModal}
            onOk={() => onOkClicked()}
            onCancel={() => onCancelClicked()}
            footer={null}
            destroyOnClose={true}
        >
            {selectedRolesState.length === 0 ? (
                <ModalSpinner />
            ) : (
                <CardLayout>
                    {selectedRolesState.map((role, i) => (
                        <Card
                            key={i}
                            onCardCliked={isSelected =>
                                handleCardClicked(isSelected, role.id)
                            }
                            title={role.name}
                            isSelected={role.selected}
                        />
                    ))}
                </CardLayout>
            )}
        </Modal>
    );
};

export default AssociateRoles;
