import { View, Text, TextInput, ScrollView, Button } from "react-native";
import tw from "twrnc";
import { useEffect, useState } from "react";
import { Input } from "../component/input";
import { DropDown } from "../component/dropdown";
import { diff, addedDiff, deletedDiff, updatedDiff, detailedDiff } from "deep-object-diff";
const _ = require("lodash");
//todo implement deep-diff and _.differenceWith

export const HeroesScreen = ({ route }) => {
	const [heroData, setHeroData] = useState({});

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
		setHeroData({ ...route?.params?.hero });
		setTypeValue(route?.params?.hero?.type);
		setDifficultyValue(route?.params?.hero?.difficulty);
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
		console.log(result);
	};

	return (
		<ScrollView style={tw`flex flex-col p-2`}>
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
				<Button onPress={handleSubmit} title="Submit" color="#841584" />
			</View>
		</ScrollView>
	);
};
