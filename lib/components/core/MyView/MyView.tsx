import {View, ViewProps} from "react-native";
import React from "react";

export const MyView = ({style, ...props}: ViewProps) => {
    return <View style={[{backgroundColor: "#FFFFFF"}, style]} {...props} />
}
