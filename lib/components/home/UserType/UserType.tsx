import {MyRadioButton} from "../../core";
import React from "react";
import {UserType} from "./types";

const UserTypeView = ({userType, selectedUserType, setSelectedUserType}: {
    userType: UserType,
    selectedUserType: string,
    setSelectedUserType: (type: string) => void
}) => {
    return (
        <MyRadioButton
            text={userType.displayName}
            selected={selectedUserType === userType.type}
            onSelect={() => {
                setSelectedUserType(userType.type)
            }}/>
    )
}

export default UserTypeView;
