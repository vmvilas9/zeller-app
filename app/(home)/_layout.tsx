import React, {useEffect, useRef, useState} from 'react';
import {FlatList, RefreshControl, ScrollView, TextInput} from "react-native";
import {listZellerCustomers} from "@/lib/apiService/customerService/customerService";
import {TableZellerCustomerFilterInput, ZellerCustomer} from "@/lib/apiService/customerService/types";
import {userTypes} from "@/app/(home)/constants";
import {useRouter} from "expo-router";
import {
    MyActivityIndicator,
    MySafeAreaView,
    MyText,
    MyView,
    UserTypeView,
    User,
    Divider,
    SearchBox
} from "@/lib/components";

export default function Home() {
    const router = useRouter()
    const [selectedUserType, setSelectedUserType] = useState<string>(userTypes[0].type);
    const [loading, setLoading] = useState(false);
    const [customers, setCustomers] = useState<ZellerCustomer[]>([]);
    const [filterText, setFilterText] = useState("");
    const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [swipeRefresh, setSwipeRefresh] = useState<boolean>(false);

    useEffect(() => {
        setCustomers([])
        fetchCustomers();
    }, [selectedUserType]);

    const fetchCustomers = async (searchText: string = filterText, userType: string = selectedUserType) => {
        const filter: TableZellerCustomerFilterInput = {
            name: {contains: searchText}, role: {eq: userType},
        };
        setLoading(true);
        try {
            const data = await listZellerCustomers(filter);
            setCustomers(data.items);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
            setSwipeRefresh(false)
        }
    }

    const HomeHeaderView = () => {
        return (
            <MyView>
                <MyText type={'defaultSemiBold'} style={{marginVertical: 10}}>User Types</MyText>
                {userTypes.map((type) => (
                    <UserTypeView
                        key={type.type}
                        userType={type}
                        selectedUserType={selectedUserType}
                        setSelectedUserType={setSelectedUserType}/>))}
                <Divider/>
                <MyText type={'defaultSemiBold'} style={{marginBottom: 10}}>{selectedUserType} Users</MyText>
            </MyView>
        )
    }

    const navigateToUserDetailsPage = (userId: string) => {
        router.push(`/(userDetails)/${userId}`);
    }

    const handleTextChange = (text: string) => {
        setFilterText(text);
        if (timeout.current) {
            clearTimeout(timeout.current)
        }
        timeout.current = setTimeout(() => {
            setCustomers([])
            fetchCustomers(text)
        }, 300)
    }

    return (
        <MySafeAreaView>
            <SearchBox
                placeholder={'Search user by name'}
                value={filterText}
                onChangeText={handleTextChange}/>
            <MyView>
                <FlatList
                    testID={"user-types"}
                    data={customers}
                    style={{width: '100%', height: '100%'}}
                    ListHeaderComponent={<HomeHeaderView/>}
                    ListFooterComponent={loading ? <MyActivityIndicator testID="activity-indicator"/> : <MyView/>}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <User userDetails={item} onUserClick={navigateToUserDetailsPage}/>)}
                    refreshControl={<RefreshControl refreshing={swipeRefresh} onRefresh={() => {
                        setSwipeRefresh(true)
                        fetchCustomers()
                    }}/>}
                />
            </MyView>
        </MySafeAreaView>
    );
};
