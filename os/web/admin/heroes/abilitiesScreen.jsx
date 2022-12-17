import { useEffect, useState } from "react";
import { View, Text, ScrollView, Button } from "react-native";
import tw from "twrnc";
import { dimensionsMap } from "../../../imageMap";
import { DropDown } from "../component/dropdown";
import { Input } from "../component/input";

export const AbilitiesScreen = ({ route }) => {
	const [abilityData, setAbilityData] = useState({});
	// console.log(route?.name === `${route?.params?.hero?.name} - Add Ability`);
	const [typeOpen, setTypeOpen] = useState(false);
	const [typeValue, setTypeValue] = useState(null);
	const [typeItems, setTypeItems] = useState([
		{ label: "Primary Weapon", value: "Primary Weapon" },
		{ label: "Secondary Weapon", value: "Secondary Weapon" },
		{ label: "Ability", value: "Ability" },
		{ label: "Passive", value: "Passive" },
		{ label: "Ultimate", value: "Ultimate" },
		{ label: "Weapon Two", value: "Weapon Two" },
	]);

	useEffect(() => {
		setAbilityData({ ...route?.params?.ability });
		setTypeValue(route?.params?.ability?.type ?? null);
		return () => abilityData;
	}, [route?.params]);

	const [hideScreen, setHideScreen] = useState(true);

	return (
		<ScrollView style={tw`flex flex-col py-10`}>
			{hideScreen ? (
				<View style={tw`flex items-center justify-center`}>
					<View style={tw`flex flex-row w-1/3 justify-around min-w-20`}>
						<Button
							onPress={() => setHideScreen(false)}
							title={hideScreen ? "Show Abiilty" : "Hide Abiilty"}
							color="#FF0000"
						/>
					</View>
				</View>
			) : (
				<View style={tw`flex items-center justify-center`}>
					{Object?.keys(abilityData ?? {})?.map((element, i) =>
						element === "ability_uuid" ? (
							<Input element={element} value={abilityData[element]} key={i} editable={false} />
						) : element === "type" ? (
							<DropDown
								key={i}
								element={element}
								open={typeOpen}
								value={typeValue}
								items={typeItems}
								setOpen={setTypeOpen}
								setValue={setTypeValue}
								setItems={setTypeItems}
								// handleTextChange={handleTextChange}
							/>
						) : (
							<Input
								element={element}
								value={abilityData[element]}
								key={i}
								// handleTextChange={handleTextChange}
								// handleImageChange={handleImageChange}
							/>
						)
					)}
					<View style={tw`flex flex-row ${dimensionsMap.lg ? " w-1/3" : "w-1/1"} justify-evenly min-w-20`}>
						<Button
							// onPress={handleSubmit}
							title={
								route?.name === `${route?.params?.hero?.name} - Add Ability`
									? "Add Ability"
									: "Edit Ability"
							}
							color="#841584"
						/>
						<Button
							onPress={() => setHideScreen(true)}
							title={hideScreen ? "Show Abiilty" : "Hide Abiilty"}
							color="#FF0000"
						/>
					</View>
				</View>
			)}
		</ScrollView>
	);
};
