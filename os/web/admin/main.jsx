import { View, Text, TextInput } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MutateHeroes } from "./heroes/main";
import { Settings } from "./settings/main";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { HeroesContext } from "../../../connection/client";
import { useAuth0 } from "@auth0/auth0-react";
import { NotAvailable } from "./notFound";

const MapsTab = createMaterialTopTabNavigator();
const MutateMaps = ({ navigation, route }) => {
	// console.log(route);
	return (
		// <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
		// 	<Text>Home!</Text>
		// </View>

		<MapsTab.Navigator>
			<MapsTab.Screen name="Settings" component={SettingsScreen} />
		</MapsTab.Navigator>
	);
};

function SettingsScreen() {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text style={{ color: "white" }}>Settings!</Text>
		</View>
	);
}

const MainTab = createMaterialTopTabNavigator();

export const Admin = ({ navigation, route }) => {
	const data = useContext(HeroesContext);

	const { getAccessTokenSilently, loginWithRedirect, user, isAuthenticated, isLoading, logout } = useAuth0();

	const [userToken, setUserToken] = useState("");

	useEffect(() => {
		(async function login() {
			if (!isLoading && !user && !isAuthenticated) {
				await loginWithRedirect();
			} else {
				try {
					const token = await getAccessTokenSilently({
						audience: "hasura",
					});
					setUserToken(token);
				} catch (e) {
					console.error(e);
				}
			}
		})();
		// eslint-disable-next-line
	}, [isLoading, getAccessTokenSilently]);

	const headers = {
		"Content-Type": "application/json",
		Authorization: `Bearer ${userToken ? userToken : null}`,
	};

	return (
		isAuthenticated && (
			<NavigationContainer independent={true} theme={DarkTheme}>
				<MainTab.Navigator screenOptions={{ swipeEnabled: false }}>
					{Object.keys(data).map((e, i) => (
						<MainTab.Screen
							name={e}
							key={i}
							component={e === "Heroes" ? MutateHeroes : MutateMaps}
							initialParams={{ [e]: data[e], mainTabIndex: i }}
						/>
					))}
					<MainTab.Screen name={"Settings"} component={Settings} />
					<MainTab.Screen
						name={"Logout"}
						component={NotAvailable}
						listeners={{
							tabPress: () => logout({ returnTo: window.location.origin }),
						}}
					/>
				</MainTab.Navigator>
			</NavigationContainer>
		)
	);
};
