import {StyleSheet} from "react-native";
import {MyView} from "../MyView";
import React from "react";

export const styles = StyleSheet.create({
    divider: {
        marginVertical: 24,
        backgroundColor: "#E2E8F0",
        height: 1,
    }
});

const Divider = () => {
    return (<MyView style={styles.divider}/>)
}

export default Divider
