import {ActivityIndicator, ActivityIndicatorProps, ViewStyle} from "react-native";
import React from "react";

interface MyActivityIndicatorProps extends ActivityIndicatorProps {
    style?: ViewStyle;
}

const MyActivityIndicator = ({style, ...props}: MyActivityIndicatorProps) => {
    return <ActivityIndicator
        size={'large'}
        style={{
            flex: 1,
            justifyContent: "center",
            alignItems: 'center',
            backgroundColor: "#FFFFFF", ...style
        }} {...props}/>
}

export default MyActivityIndicator;
