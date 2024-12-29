import {MyText, MyView} from "../../core";
import React from "react";
import {ZellerCustomer} from "@/lib/apiService/customerService/types";

const UserDetails = ({userDetails, testID}: { userDetails: ZellerCustomer, testID: string }) => {
    return (
        <MyView testID={testID}>
            <MyText>ID: {userDetails.id}</MyText>
            <MyText>Name: {userDetails.name}</MyText>
            <MyText>Email: {userDetails.email}</MyText>
            <MyText>Role: {userDetails.role}</MyText>
        </MyView>
    )
}

export default UserDetails;
