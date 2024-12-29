import {Link, Stack} from 'expo-router';
import {StyleSheet} from 'react-native';
import React from 'react';
import {MyText, MyView} from "@/lib/components";

export default function NotFoundScreen() {
    return (
        <>
            <Stack.Screen options={{title: 'Oops!'}}/>
            <MyView style={styles.container}>
                <MyText type="title">This screen doesn't exist.</MyText>
                <Link href="/(home)/_layout" style={styles.link}>
                    <MyText type="link">Go to home screen!</MyText>
                </Link>
            </MyView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
});
