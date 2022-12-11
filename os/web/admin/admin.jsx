import { View, Text, TextInput } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
const { data } = require("./data.json");
import tw from "twrnc";

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
		<View style={tw`flex flex-col items-center p-2`}>
			<View style={tw`flex flex-row md:grid md:grid-cols-5 w-1/3 mb-6 space-x-1.5 `}>
				<View style={tw`flex justify-center md:sm:justify-end `}>
					<Text style={tw`block text-white font-bold md:text-right mb-1 md:mb-0 px-4`} for="inline-full-name">
						Heroes!
					</Text>
				</View>
				<View style={tw`flex col-span-3 w-full`}>
					<TextInput
						value="text"
						style={tw`bg-gray-200 appearance-none border-2 ${
							// value
							false ? "" : "border-red-500"
						} rounded w-full py-2 px-4 text-gray-700 leading-normal focus:outline-none focus:bg-white focus:border-purple-500`}
					></TextInput>
				</View>
			</View>
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
