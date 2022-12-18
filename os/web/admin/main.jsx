import { View, Text, TextInput } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MutateHeroes } from "./heroes/main";
import { Settings } from "./settings/main";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { useContext } from "react";
import { HeroesContext } from "../../../connection/client";

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

	return (
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
			</MainTab.Navigator>
		</NavigationContainer>
	);
};
