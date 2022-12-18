import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const getData = async () => {
	try {
		const value = await AsyncStorage.getItem("@UserJWTKey");
		if (value !== null) {
			return value;
		}
		return "";
	} catch (e) {
		console.log("Error reading key", e);
		return false;
	}
};

export const client = new ApolloClient({
	uri: "https://hasura.adiulalamadil.me/v1/graphql",
	cache: new InMemoryCache(),
});

export const mutationClient = async () => {
	return new ApolloClient({
		uri: "https://hasura.adiulalamadil.me/v1/graphql",
		cache: new InMemoryCache(),
		headers: {
			Authorization: await getData(),
		},
	});
};

export const HeroesContext = createContext();
