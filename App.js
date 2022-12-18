import "react-native-gesture-handler";
import React from "react";
import { Platform, Text, View, ActivityIndicator } from "react-native";
import { NativeWindStyleSheet } from "nativewind";
import { WebMain } from "./os/web/main";
import { PhoneMain } from "./os/phone/main";
import { client, HeroesContext } from "./connection/client";
import { getOverwatchData } from "./connection/query";
import { ApolloProvider, useQuery } from "@apollo/client";
import tw from "twrnc";
import { Auth0Provider } from "@auth0/auth0-react";

NativeWindStyleSheet.setOutput({
	default: "native",
});

export default function App() {
	const { loading, error, data } = useQuery(getOverwatchData, { client });

	if (loading)
		return (
			<View style={tw`flex-1 items-center justify-center bg-black`}>
				<ActivityIndicator size="large" color="#ffffff" />
			</View>
		);

	if (error)
		return (
			<View style={tw`flex-1 items-center justify-center bg-black`}>
				<Text style={tw`text-white text-2xl`}>Connection Error</Text>
			</View>
		);

	return (
		<ApolloProvider client={client}>
			<HeroesContext.Provider value={data}>
				{Platform.OS === "web" ? (
					<Auth0Provider
						domain={process.env.REACT_APP_AUTH0_DOMAIN_NAME}
						clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
						redirectUri={`${window.location.origin}/admin`}
						audience="hasura"
					>
						<WebMain />
					</Auth0Provider>
				) : (
					<PhoneMain />
				)}
			</HeroesContext.Provider>
		</ApolloProvider>
	);
}
