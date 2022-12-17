import { View, ScrollView, Button, Text } from "react-native";
import tw from "twrnc";
import { useEffect, useState } from "react";
import { Input } from "../component/input";
import { DropDown } from "../component/dropdown";
import { diff } from "deep-object-diff";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import _ from "lodash";
import { mutationClient } from "../../../../connection/client";
import { heroInsertMutation, heroUpdateMutation } from "../../../../connection/mutation";
import { useMutation } from "@apollo/client";
import { NotAvailable } from "./notFound";
import { AbilitiesScreen } from "./abilitiesScreen";

const AbilitiesTab = createMaterialTopTabNavigator();
export const HeroesScreen = ({ route }) => {
	const [heroData, setHeroData] = useState({});
	const [client, setClient] = useState("");
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

	const [insertHeroMutation, { data, error: insertError }] = useMutation(heroInsertMutation, { client: client });
	const [updateHeroMutation, { error: updateError }] = useMutation(heroUpdateMutation, { client: client });

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
	}, [route?.params]);

	const handleTextChange = (text, key) => {
		// console.log(text);
		setHeroData({
			...heroData,
			[key]: text,
		});
	};

	const handleImageChange = (e) => {
		const heroName = heroData?.name?.replace(/[^0-9a-z]/gi, "_")?.toLowerCase() ?? "";
		const extention = "." + e?.target?.files?.[0]?.name.split(".").pop();
		const newHeroImage =
			e?.target?.files?.[0]?.name
				?.replace(extention, "")
				?.replace(/[^0-9a-z]/gi, "_")
				?.toLowerCase() ?? "";

		if (!heroName) {
			console.log("No Hero Name found");
			window.location.href = "/admin";
			return false;
		}

		const fullName = `${heroName}/${newHeroImage + extention}`;

		//Keep this clg
		console.log({ [fullName]: `require('../assets/overwatch/heroes/${fullName})` });

		setHeroData({
			...heroData,
			hero_image: fullName,
		});
	};

	const handleSubmit = async () => {
		const result = diff({ ...route?.params?.hero }, heroData);
		let isEmpty = false;
		Object.entries(result).map(([key, value]) => (value === null || value === "" ? (isEmpty = true) : null));
		if (_.isEmpty(result)) isEmpty = true;
		if (isEmpty) {
			console.log("Error empty object");
			return false;
		}

		setClient(await mutationClient());

		if (route?.name === "Add Hero") {
			const variables = {
				variables: { object: result },
			};
			await insertHeroMutation(variables);
			if (insertError) {
				console.log("Error inserting heroes", insertError);
				return false;
			}
		} else if (heroData.hero_uuid.split("").length > 35) {
			const uuid = heroData.hero_uuid;
			const variables = {
				variables: { pk_uuid: { hero_uuid: uuid }, _set: result },
			};

			await updateHeroMutation(variables);
			if (updateError) {
				console.log("Error updating heroes", updateError);
				return false;
			}

			window.location.href = "/admin";
		} else {
			console.log("No mutation type found for heroes");
		}
	};

	return (
		<>
			<ScrollView style={tw`flex flex-col py-10`}>
				<AbilitiesTab.Navigator
					screenOptions={{ tabBarItemStyle: { width: 100 }, tabBarScrollEnabled: true, swipeEnabled: false }}
				>
					<AbilitiesTab.Screen
						name={route?.name === "Add Hero" ? "Add Hero" : `${heroData?.name} - Add Ability`}
						component={route?.name === "Add Hero" ? NotAvailable : AbilitiesScreen}
						options={{
							tabBarIcon: () => <Ionicons name="add" color={"green"} size={20} />,
							tabBarStyle: { display: route?.name === "Add Hero" ? "none" : "flex" },
						}}
						initialParams={{
							hero: { hero_uuid: heroData?.hero_uuid, name: heroData?.name },
							ability: {
								fk_hero_uuid: heroData?.hero_uuid,
								name: "",
								type: null,
								ability_image: "",
							},
						}}
					/>

					{abilities.map((e, i) => (
						<AbilitiesTab.Screen
							name={`${heroData?.name} - ${e?.name} [${i}]`}
							key={i}
							component={AbilitiesScreen}
							initialParams={{
								ability: e,
								abilityTabIndex: i,
								hero: { hero_uuid: heroData?.hero_uuid, name: heroData?.name },
							}}
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
								handleImageChange={handleImageChange}
							/>
						)
					)}
					<View style={tw`flex min-w-20`}>
						<Button
							onPress={handleSubmit}
							title={route?.name === "Add Hero" ? "Add Hero" : "Edit Hero"}
							color="#841584"
						/>
					</View>
				</View>
			</ScrollView>
		</>
	);
};
