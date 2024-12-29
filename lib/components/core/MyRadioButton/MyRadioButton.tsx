import {MyView} from "../MyView";
import {MyText} from "../MyText";
import {StyleSheet, TouchableOpacity} from "react-native";
import React from "react";

type MyRadioButtonProps = {
    text: string;
    selected: boolean;
    onSelect: () => void;
}

const MyRadioButton = ({text, selected, onSelect}: MyRadioButtonProps) => {
    return (
        <TouchableOpacity
            style={{...styles.radioButtonContainer, ...(selected && styles.selectedContainer)}}
            onPress={onSelect}>
            <MyView style={styles.radioOuterCircle} testID="radio-outer-circle">
                {selected && <MyView style={styles.radioInnerCircle} testID="radio-inner-circle"/>}
            </MyView>
            <MyText>{text}</MyText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    radioButtonContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    radioOuterCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: "#0171CE",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    radioInnerCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: "#0171CE",
    },
    selectedContainer: {
        backgroundColor: "#E8F2FB"
    },
})

export default MyRadioButton
