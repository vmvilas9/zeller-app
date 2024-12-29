const awsconfig = {
    aws_appsync_graphqlEndpoint: process.env.EXPO_PUBLIC_AWS_APPSYNC_GRAPHQL_ENDPOINT,
    aws_appsync_region: process.env.EXPO_PUBLIC_AWS_APPSYNC_REGION,
    aws_appsync_authenticationType: process.env.EXPO_PUBLIC_AWS_APPSYNC_AUTHENTICATION_TYPE,
    aws_appsync_apiKey: process.env.EXPO_PUBLIC_AWS_APPSYNC_API_KEY,
};

export default awsconfig;
