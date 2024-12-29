import React, {useEffect, useState} from "react";
import {ZellerCustomer} from "@/lib/apiService/customerService/types";
import {useLocalSearchParams} from "expo-router";
import {fetchZellerCustomer} from "@/lib/apiService/customerService/customerService";
import {MyActivityIndicator, MyText, MyView, UserDetails} from "@/lib/components";

const CustomerDetail = () => {
    const {id} = useLocalSearchParams();
    const [loading, setLoading] = useState(false);
    const [customer, setCustomer] = useState<ZellerCustomer | undefined>();

    useEffect(() => {
        const fetchCustomer = async () => {
            setLoading(true);
            try {
                const data = await fetchZellerCustomer(id as string);
                setCustomer(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomer();
    }, [id]);

    if (loading) return <MyActivityIndicator testID="activity-indicator"/>

    if (!customer) return <MyText testID="no-data">No customer found</MyText>;

    return (
        <MyView style={{width: '100%', height: '100%', padding: 20}}>
            <UserDetails testID="user-details" userDetails={customer}/>
        </MyView>
    );
};

export default CustomerDetail;
