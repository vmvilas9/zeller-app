import {MyText, MyView} from "../../core";
import {StyleSheet, TouchableOpacity} from "react-native";
import React from "react";
import {ZellerCustomer} from "@/lib/apiService/customerService/types";

const styles = StyleSheet.create({
    userItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#EEEEEE",
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 4,
        backgroundColor: "#E8F2FB",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    avatarText: {
        color: "#0171CE",
    },
    userDetails: {
        flex: 1,
    },
    userRole: {
        color: "#777777",
    },
})

const User = ({userDetails, onUserClick}: {
    userDetails: ZellerCustomer,
    onUserClick: (userId: string) => void
}) => {
    return (
        <TouchableOpacity
            key={userDetails.id}
            onPress={() => onUserClick(userDetails.id)}
            testID="user-item">
            <MyView style={styles.userItem}>
                <MyView style={styles.avatar}>
                    <MyText style={styles.avatarText} testID="avatar-text">
                        {userDetails.name.charAt(0).toUpperCase()}
                    </MyText>
                </MyView>
                <MyView style={styles.userDetails}>
                    <MyText>{userDetails.name}</MyText>
                    <MyText style={styles.userRole}>{userDetails.role}</MyText>
                </MyView>
            </MyView>
        </TouchableOpacity>
    );
}

export default User;
