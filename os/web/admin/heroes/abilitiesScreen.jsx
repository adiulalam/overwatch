import { useEffect, useState } from "react";
import { View, Text, ScrollView, Button } from "react-native";
import tw from "twrnc";
import { dimensionsMap } from "../../../imageMap";
import { DropDown } from "../component/dropdown";
import { Input } from "../component/input";

export const AbilitiesScreen = ({ route }) => {
	const [abilityData, setAbilityData] = useState({});
	const [hideScreen, setHideScreen] = useState(true);

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

	const handleTextChange = (text, key) => {
		// console.log(text, key);
		setAbilityData({
			...abilityData,
			[key]: text,
		});
	};

	const handleImageChange = (e) => {
		const heroName = route?.params?.hero?.name?.replace(/[^0-9a-z]/gi, "_")?.toLowerCase() ?? "";
		const abilityName = abilityData?.name?.replace(/[^0-9a-z]/gi, "_")?.toLowerCase() ?? "";

		const extention = "." + e?.target?.files?.[0]?.name.split(".").pop();
		const newAbilityImage =
			e?.target?.files?.[0]?.name
				?.replace(extention, "")
				?.replace(/[^0-9a-z]/gi, "_")
				?.toLowerCase() ?? "";

		if (!abilityName) {
			console.log("No Abilty Name found");
			window.location.href = "/admin";
			return false;
		}

		const fullPath = `${heroName}/${newAbilityImage + extention}`;

		//Keep this clg
		console.log({ [fullPath]: `require('../assets/overwatch/heroes/${fullPath})` });

		setAbilityData({
			...abilityData,
			ability_image: fullPath,
		});
	};

	return (
		<ScrollView style={tw`flex flex-col py-10`}>
			{!hideScreen ? (
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
						element === "ability_uuid" || element === "fk_hero_uuid" ? (
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
								handleTextChange={handleTextChange}
							/>
						) : (
							<Input
								element={element}
								value={abilityData[element]}
								key={i}
								handleTextChange={handleTextChange}
								handleImageChange={handleImageChange}
							/>
						)
					)}
					<View style={tw`flex flex-row ${dimensionsMap.lg ? " w-1/3" : "w-1/1"} justify-evenly min-w-20`}>
						<Button
							// onPress={handleSubmit}
							title={route?.name.includes("Add Ability") ? "Add Ability" : "Edit Ability"}
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
