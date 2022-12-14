import { View, ScrollView, Button, Text } from "react-native";
import tw from "twrnc";
import { useEffect, useState } from "react";
import { Input } from "../component/input";
import { DropDown } from "../component/dropdown";
import { diff } from "deep-object-diff";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import _ from "lodash";

const AbilitiesTab = createMaterialTopTabNavigator();

function NotAvailable() {
	return <View></View>;
}

function AbilitiesScreen({ route }) {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text style={{ color: "white" }}>Settings!</Text>
		</View>
	);
}

export const HeroesScreen = ({ route }) => {
	const [heroData, setHeroData] = useState({});
	const abilities = [...(route?.params?.hero?.abilities ?? [])];

	const [typeOpen, setTypeOpen] = useState(false);
	const [typeValue, setTypeValue] = useState(null);
	const [typeItems, setTypeItems] = useState([
		{ label: "Damage", value: "damage" },
		{ label: "Tank", value: "tank" },
		{ label: "Support", value: "support" },
	]);

	const [difficultyOpen, setDifficultyOpen] = useState(false);
	const [difficultyValue, setDifficultyValue] = useState(null);
	const [difficultyItems, setDifficultyItems] = useState([
		{ label: "1", value: 1 },
		{ label: "2", value: 2 },
		{ label: "3", value: 3 },
	]);

	useEffect(() => {
		setHeroData(
			route?.name === "Add Hero"
				? {
						name: "",
						hero_image: "",
						type: null,
						difficulty: null,
						description: "",
				  }
				: { ...route?.params?.hero }
		);
		setTypeValue(route?.params?.hero?.type ?? null);
		setDifficultyValue(route?.params?.hero?.difficulty ?? null);
		return () => heroData;
	}, [route?.params?.hero]);

	const handleTextChange = (text, key) => {
		setHeroData({
			...heroData,
			[key]: text,
		});
	};

	const handleSubmit = () => {
		const result = diff({ ...route?.params?.hero }, heroData);
		let isEmpty = false;
		Object.entries(result).map(([key, value]) => (value === null || value === "" ? (isEmpty = true) : null));
		if (_.isEmpty(result)) isEmpty = true;

		console.log(isEmpty, result);
	};

	return (
		<>
			<ScrollView style={tw`flex flex-col py-10`}>
				<AbilitiesTab.Navigator
					screenOptions={{ tabBarItemStyle: { width: 100 }, tabBarScrollEnabled: true, swipeEnabled: false }}
				>
					<AbilitiesTab.Screen
						name={route?.name === "Add Hero" ? "Add Ability" : `${heroData?.name} - Add Ability`}
						component={route?.name === "Add Hero" ? NotAvailable : AbilitiesScreen}
						options={{
							tabBarIcon: () => <Ionicons name="add" color={"green"} size={20} />,
							tabBarStyle: { display: route?.name === "Add Hero" ? "none" : "flex" },
						}}
					/>

					{abilities.map((e, i) => (
						<AbilitiesTab.Screen
							name={`${heroData?.name} - ${e?.name} [${i}]`}
							key={i}
							component={AbilitiesScreen}
							initialParams={{ ability: e, abilityTabIndex: i }}
						/>
					))}
				</AbilitiesTab.Navigator>

				<View style={tw`flex items-center justify-center`}>
					{Object?.keys(heroData ?? {})?.map((element, i) =>
						element === "abilities" ? null : element === "hero_uuid" ? (
							<Input element={element} value={heroData[element]} key={i} editable={false} />
						) : element === "type" || element === "difficulty" ? (
							<DropDown
								key={i}
								element={element}
								open={element === "type" ? typeOpen : difficultyOpen}
								value={element === "type" ? typeValue : difficultyValue}
								items={element === "type" ? typeItems : difficultyItems}
								setOpen={element === "type" ? setTypeOpen : setDifficultyOpen}
								setValue={element === "type" ? setTypeValue : setDifficultyValue}
								setItems={element === "type" ? setTypeItems : setDifficultyItems}
								handleTextChange={handleTextChange}
							/>
						) : (
							<Input
								element={element}
								value={heroData[element]}
								key={i}
								handleTextChange={handleTextChange}
								numberOfLines={element === "description" ? 6 : 1}
								multiline={element === "description" ? true : false}
							/>
						)
					)}
					<View style={tw`flex min-w-20`}>
						<Button
							onPress={handleSubmit}
							title={route?.name === "Add Hero" ? "Add" : "Edit"}
							color="#841584"
						/>
					</View>
				</View>
			</ScrollView>
		</>
	);
};
