import { useMutation } from "@apollo/client";
import { diff } from "deep-object-diff";
import { useEffect, useState } from "react";
import { View, Text, ScrollView, Button, Modal } from "react-native";
import tw from "twrnc";
import { mutationClient } from "../../../../connection/client";
import { abilitydeleteMutation, abilityInsertMutation, abilityUpdateMutation } from "../../../../connection/mutation";
import { dimensionsMap } from "../../../imageMap";
import { DropDown } from "../component/dropdown";
import { Input } from "../component/input";
import { ConfirmationModal } from "../component/modal";

export const AbilitiesScreen = ({ route }) => {
	const [abilityData, setAbilityData] = useState({});
	const [client, setClient] = useState("");
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

	const [insertAbilityMutation, { data, error: insertError }] = useMutation(abilityInsertMutation, {
		client: client,
	});
	const [updateAbilityMutation, { error: updateError }] = useMutation(abilityUpdateMutation, { client: client });
	const [deleteAbilityMutation, { error: deleteError }] = useMutation(abilitydeleteMutation, { client: client });

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

	const handleSubmit = async () => {
		const result = diff({ ...route?.params?.ability }, abilityData);
		let isEmpty = false;
		Object.entries(result).map(([key, value]) => (value === null || value === "" ? (isEmpty = true) : null));
		if (_.isEmpty(result)) isEmpty = true;
		if (isEmpty) {
			console.log("Error empty object");
			return false;
		}

		setClient(await mutationClient());

		if (route?.name === `${route?.params?.hero?.name} - Add Ability`) {
			result["fk_hero_uuid"] = route?.params?.hero?.hero_uuid;

			const variables = {
				variables: { object: result },
			};
			await insertAbilityMutation(variables);
			if (insertError) {
				console.log("Error inserting ability", insertError);
				return false;
			}

			window.location.href = "/admin";
		} else if (abilityData.ability_uuid.split("").length > 35) {
			const uuid = abilityData.ability_uuid;
			const variables = {
				variables: { pk_uuid: { ability_uuid: uuid }, _set: result },
			};

			await updateAbilityMutation(variables);
			if (updateError) {
				console.log("Error updating ability", updateError);
				return false;
			}

			window.location.href = "/admin";
		} else {
			console.log("No mutation type found for abilities");
		}
	};

	const handleDelete = async () => {
		const uuid = abilityData?.ability_uuid;

		if (!uuid) {
			console.log("Error ability uuid is empty");
			return false;
		}

		setClient(await mutationClient());

		const variables = {
			variables: { ability_uuid: uuid },
		};

		await deleteAbilityMutation(variables);
		if (deleteError) {
			console.log("Error deleting ability", insertError);
			return false;
		}

		window.location.href = "/admin";
	};

	const [modalVisible, setModalVisible] = useState(false);

	return (
		<ScrollView style={tw`flex flex-col py-10`}>
			{!hideScreen ? (
				<View style={tw`flex items-center justify-center`}>
					<View style={tw`flex flex-row w-1/3 justify-around min-w-20`}>
						<Button
							onPress={() => setHideScreen(false)}
							title={hideScreen ? "Show Abiilty" : "Hide Abiilty"}
							color="#006400"
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

					<View
						style={tw`flex ${
							dimensionsMap.lg ? "flex-row w-1/3" : "w-1/1 h-30"
						} items-center justify-evenly `}
					>
						<ConfirmationModal
							modalVisible={modalVisible}
							setModalVisible={setModalVisible}
							handleDelete={handleDelete}
						></ConfirmationModal>
						<View style={tw`flex p-2`}>
							<Button
								onPress={handleSubmit}
								title={route?.name.includes("Add Ability") ? "Add Ability" : "Edit Ability"}
								color="#841584"
							/>
						</View>
						{!route?.name.includes("Add Ability") && (
							<View style={tw`flex p-2`}>
								<Button
									onPress={() => setModalVisible(true)}
									title={"Delete Ability"}
									color="#FF0000"
								/>
							</View>
						)}
						<View style={tw`flex p-2`}>
							<Button
								onPress={() => setHideScreen(true)}
								title={hideScreen ? "Show Abiilty" : "Hide Abiilty"}
								color="#006400"
							/>
						</View>
					</View>
				</View>
			)}
		</ScrollView>
	);
};
