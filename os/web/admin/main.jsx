import { View, Text, TextInput } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
const { data } = require("./data.json");
import tw from "twrnc";
import { useEffect, useState } from "react";
import { Heroes } from "./heroes/main";

//todo implement deep-diff and _.differenceWith

const MapsTab = createMaterialTopTabNavigator();
const Maps = ({ navigation, route }) => {
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

export const Admin = () => {
	// console.log(overwatch);

	return (
		<MainTab.Navigator screenOptions={{ swipeEnabled: false }}>
			{Object.keys(data).map((e, i) => (
				<MainTab.Screen
					name={e}
					key={i}
					component={e === "Heroes" ? Heroes : Maps}
					initialParams={{ [e]: data[e], mainTabIndex: i }}
				/>
			))}
		</MainTab.Navigator>
	);
};
