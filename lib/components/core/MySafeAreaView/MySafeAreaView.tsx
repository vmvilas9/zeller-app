import {SafeAreaView} from "react-native-safe-area-context";
import React from "react";
import {StyleSheet} from "react-native";

export const MySafeAreaView = ({children}: { children: React.ReactNode }) => {
    return <SafeAreaView style={styles.container}>{children}</SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        backgroundColor: "#FFFFFF",
    }
})
