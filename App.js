import "react-native-gesture-handler";
import React from "react";
import { Platform, Text, View, ActivityIndicator } from "react-native";
import { NativeWindStyleSheet } from "nativewind";
import { WebMain } from "./os/web/main";
import { PhoneMain } from "./os/phone/main";
import { client, HeroesContext } from "./connection/client";
import { overwatchHeroes } from "./connection/query";
import { ApolloProvider, useQuery } from "@apollo/client";
import tw from "twrnc";

NativeWindStyleSheet.setOutput({
	default: "native",
});

export default function App() {
	const { loading, error, data } = useQuery(overwatchHeroes, { client });

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
				{Platform.OS === "web" ? <WebMain /> : <PhoneMain />}
			</HeroesContext.Provider>
		</ApolloProvider>
	);
}
