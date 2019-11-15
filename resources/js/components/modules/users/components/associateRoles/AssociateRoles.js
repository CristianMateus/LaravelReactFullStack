import { Modal } from "antd";

import CardLayout from "../../../../shared/components/cardLayout/CardLayout";
import Card from "../../../../shared/components/card/Card";

import React, { useEffect, useState } from "react";

import {
    getUserRoles as getUserRolesService,
    addUserRole,
    deleteUserRole
} from "../../../../shared/services/UserServices";
import ModalSpinner from "../../../../shared/components/modalSpinner/ModalSpinner";

// Many to many websites
// https://appdividend.com/2018/05/17/laravel-many-to-many-relationship-example/
// https://laravel.com/docs/6.x/eloquent-relationships#many-to-many
// 1. definir tabla pivot
// 2. definir la relación de las llaves foraneas

const AssociateRoles = ({
    showModal,
    onOkClicked,
    onCancelClicked,
    user,
    allRoles = []
}) => {
    const [selectedRolesState, setSelectedRolesState] = useState([]);

    useEffect(() => {
        if (showModal) {
            getUserRoles();
        } else {
            setSelectedRolesState([]);
        }
    }, [showModal]);

    const getUserRoles = async () => {
        await getUserRolesService(user.id)
            .then(response => {
                const userRoles = response;
                const selectedUserRoles = allRoles.map(role => {
                    const isRoleSelected = userRoles.find(
                        userRole => userRole.id === role.id
                    );
                    if (isRoleSelected) {
                        return { ...role, selected: true };
                    }
                    return { ...role, selected: false };
                });
                setSelectedRolesState(selectedUserRoles);
            })
            .catch(error => console.error(error));
    };

    const addRole = async roleId => {
        await addUserRole(user.id, roleId).then(response => {
            console.log(response);
            getUserRoles();
        });
    };

    const deleteRole = async roleId => {
        await deleteUserRole(user.id, roleId).then(response => {
            console.log(response);
            getUserRoles();
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
            title={user ? `Asociar roles a usuario ${user.name}` : null}
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
