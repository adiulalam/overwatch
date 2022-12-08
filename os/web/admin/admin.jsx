import { View, Text } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
const { data } = require("./data.json");

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

const HeroesScreen = () => {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text style={{ color: "white" }}>Heroes!</Text>
		</View>
	);
};

const HerosTab = createMaterialTopTabNavigator();
const Heroes = ({ navigation, route }) => {
	const heroes = route?.params?.Heroes;
	console.log(heroes);
	return (
		<HerosTab.Navigator
			screenOptions={{ tabBarItemStyle: { width: 80 }, tabBarScrollEnabled: true, swipeEnabled: true }}
		>
			<HerosTab.Screen
				name="Add Hero"
				component={HeroesScreen}
				options={{
					tabBarIcon: () => <Ionicons name="add" color={"green"} size={20} />,
				}}
			/>

			{heroes.map((e, i) => (
				<HerosTab.Screen
					name={e?.name}
					key={i}
					component={HeroesScreen}
					initialParams={{ hero: e, heroTabIndex: i }}
				/>
			))}
		</HerosTab.Navigator>
	);
};

const MainTab = createMaterialTopTabNavigator();

export const Admin = () => {
	// console.log(overwatch);

	return (
		<MainTab.Navigator>
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
