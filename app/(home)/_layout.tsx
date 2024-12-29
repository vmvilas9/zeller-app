import React, {useEffect, useState} from 'react';
import {FlatList} from "react-native";
import {listZellerCustomers} from "@/lib/apiService/customerService/customerService";
import {TableZellerCustomerFilterInput, ZellerCustomer} from "@/lib/apiService/customerService/types";
import {userTypes} from "@/app/(home)/constants";
import {useRouter} from "expo-router";
import {MyActivityIndicator, MySafeAreaView, MyText, MyView, UserTypeView, User, Divider} from "@/lib/components";

export default function Home() {
    const router = useRouter()
    const [selectedUserType, setSelectedUserType] = useState<string>(userTypes[0].type);
    const [loading, setLoading] = useState(false);
    const [customers, setCustomers] = useState<ZellerCustomer[]>([]);

    useEffect(() => {
        const filter: TableZellerCustomerFilterInput = {
            role: {eq: selectedUserType},
        };
        const fetchCustomers = async () => {
            setLoading(true);
            try {
                const data = await listZellerCustomers(filter);
                setCustomers(data.items);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCustomers();
    }, [selectedUserType]);

    const navigateToUserDetailsPage = (userId: string) => {
        router.push(`/(userDetails)/${userId}`);
    }

    return (
        <MySafeAreaView>
            <MyView>
                <MyText type={'defaultSemiBold'} style={{marginBottom: 10}}>User Types</MyText>
                {userTypes.map((type) => (
                    <UserTypeView
                        key={type.type}
                        userType={type}
                        selectedUserType={selectedUserType}
                        setSelectedUserType={setSelectedUserType}/>))}
                <Divider/>
                <MyText type={'defaultSemiBold'} style={{marginBottom: 10}}>{selectedUserType} Users</MyText>
                {loading ?
                    <MyActivityIndicator testID="activity-indicator"/> :
                    <FlatList
                        testID={"user-types"}
                        data={customers}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({item}) => (<User userDetails={item} onUserClick={navigateToUserDetailsPage}/>)}
                        pagingEnabled
                    />}
            </MyView>
        </MySafeAreaView>
    );
};
