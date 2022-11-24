import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createContext } from "react";

export const client = new ApolloClient({
	uri: "https://hasura.adiulalamadil.me/v1/graphql",
	cache: new InMemoryCache(),
});

export const HeroesContext = createContext();
