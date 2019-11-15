import { Modal } from "antd";

import CardLayout from "../../../../shared/components/cardLayout/CardLayout";
import Card from "../../../../shared/components/card/Card";

import React, { useEffect, useState } from "react";

import {
    getUserCompanies as getUserCompaniesService,
    addUserCompany,
    deleteUserCompany
} from "../../../../shared/services/UserServices";
import ModalSpinner from "../../../../shared/components/modalSpinner/ModalSpinner";

const AssociateCompanies = ({
    showModal,
    onOkClicked,
    onCancelClicked,
    user,
    allCompanies = []
}) => {
    const [selectedCompaniesState, setSelectedCompaniesState] = useState([]);

    useEffect(() => {
        if (showModal) {
            getUserCompanies();
        } else {
            setSelectedCompaniesState([]);
        }
    }, [showModal]);

    const getUserCompanies = async () => {
        await getUserCompaniesService(user.id)
            .then(response => {
                const userCompanies = response;
                const selectedUserCompanies = allCompanies.map(role => {
                    const isCompanySelected = userCompanies.find(
                        userRole => userRole.id === role.id
                    );
                    if (isCompanySelected) {
                        return { ...role, selected: true };
                    }
                    return { ...role, selected: false };
                });
                setSelectedCompaniesState(selectedUserCompanies);
            })
            .catch(error => console.error(error));
    };

    const addCompany = async companyId => {
        await addUserCompany(user.id, companyId).then(response => {
            console.log(response);
            getUserCompanies();
        });
    };

    const deleteCompany = async companyId => {
        await deleteUserCompany(user.id, companyId).then(response => {
            console.log(response);
            getUserCompanies();
        });
    };

    const handleCardClicked = (wasCardSelected, companyId) => {
        if (wasCardSelected) {
            addCompany(companyId);
        } else {
            deleteCompany(companyId);
        }
    };
    return (
        <Modal
            title={user ? `Asociar compañías a usuario ${user.name}` : null}
            visible={showModal}
            onOk={() => onOkClicked()}
            onCancel={() => onCancelClicked()}
            footer={null}
            destroyOnClose={true}
        >
            {selectedCompaniesState.length === 0 ? (
                <ModalSpinner />
            ) : (
                <CardLayout>
                    {selectedCompaniesState.map((company, i) => (
                        <Card
                            key={i}
                            onCardCliked={isSelected =>
                                handleCardClicked(isSelected, company.id)
                            }
                            title={company.name}
                            isSelected={company.selected}
                        />
                    ))}
                </CardLayout>
            )}
        </Modal>
    );
};

export default AssociateCompanies;
