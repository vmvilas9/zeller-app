import {TextInput, TextInputProps} from "react-native";
import React from "react";

export type SearchBoxProps = TextInputProps

const SearchBox = ({style, ...props}: SearchBoxProps) => {
    return (
        <TextInput style={[{
            borderWidth: 1,
            borderColor: "gray",
            borderRadius: 8,
            paddingVertical: 8,
            paddingHorizontal: 16,
        }, style]} {...props}
        />
    )
}

export default SearchBox
