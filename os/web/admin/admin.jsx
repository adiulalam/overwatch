import { View, Text, TextInput } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
const { data } = require("./data.json");
import tw from "twrnc";
import { useEffect, useState } from "react";

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

const HeroesScreen = ({ navigation, route }) => {
	const [heroData, setHeroData] = useState({ ...route?.params?.hero } ?? {});

	useEffect(() => {
		setHeroData({ ...route?.params?.hero });
		return () => heroData;
	}, [route?.params?.hero]);

	return (
		<View style={tw`flex flex-col items-center justify-center p-2`}>
			{Object?.keys(heroData ?? {})?.map((element, i) =>
				element === "abilities" ? null : element === "hero_uuid" ? (
					<View key={i} style={tw`flex flex-row w-1/3 mb-6 `}>
						<View style={tw`flex justify-center md:sm:justify-end `}>
							<Text
								style={tw` text-white font-bold md:text-right mb-1 md:mb-0 px-4`}
								for="inline-full-name"
							>
								{element}
							</Text>
						</View>
						<View style={tw`flex w-full`}>
							<TextInput
								value={heroData[element]}
								style={tw`bg-gray-200 border-2 ${
									// value
									false ? "" : "border-red-500"
								} rounded w-full py-2 px-4 text-gray leading-normal focus:outline-none focus:bg-white focus:border-purple-500`}
							></TextInput>
						</View>
					</View>
				) : (
					<View key={i} style={tw`flex flex-row w-1/3 mb-6`}>
						<View style={tw`flex justify-center md:sm:justify-end `}>
							<Text
								style={tw` text-white font-bold md:text-right mb-1 md:mb-0 px-4`}
								for="inline-full-name"
							>
								{element}
							</Text>
						</View>
						<View style={tw`flex w-full`}>
							<TextInput
								value={heroData[element]}
								style={tw`bg-gray-200 border-2 ${
									// value
									false ? "" : "border-red-500"
								} rounded w-full py-2 px-4 text-gray leading-normal focus:outline-none focus:bg-white focus:border-purple-500`}
							></TextInput>
						</View>
					</View>
				)
			)}
		</View>
	);
};

const HerosTab = createMaterialTopTabNavigator();
const Heroes = ({ navigation, route }) => {
	const heroes = route?.params?.Heroes;
	// console.log(heroes);
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
