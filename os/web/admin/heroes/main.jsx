import { View, Text, TextInput } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import tw from "twrnc";
import { useEffect, useState } from "react";
import { HeroesScreen } from "./heroesScreen";

//todo implement deep-diff and _.differenceWith

const HeroesTab = createMaterialTopTabNavigator();
export const Heroes = ({ navigation, route }) => {
	const heroes = route?.params?.Heroes;
	// console.log(heroes);
	return (
		<HeroesTab.Navigator
			screenOptions={{ tabBarItemStyle: { width: 80 }, tabBarScrollEnabled: true, swipeEnabled: false }}
		>
			<HeroesTab.Screen
				name="Add Hero"
				component={HeroesScreen}
				options={{
					tabBarIcon: () => <Ionicons name="add" color={"green"} size={20} />,
				}}
			/>

			{heroes.map((e, i) => (
				<HeroesTab.Screen
					name={e?.name}
					key={i}
					component={HeroesScreen}
					initialParams={{ hero: e, heroTabIndex: i }}
				/>
			))}
		</HeroesTab.Navigator>
	);
};
