import { ScrollView, View, Button } from "react-native";
import tw from "twrnc";
import { useState } from "react";
import { Input } from "../component/input";
import { mutationClient } from "../../../../connection/client";
import { mapModeInsertMutation, mapModeUpdateMutation } from "../../../../connection/mutation";
import { useMutation } from "@apollo/client";
import { diff } from "deep-object-diff";
import _ from "lodash";

export const MapModesScreen = ({ route }) => {
	const [mapModeData, setMapModeData] = useState({ ...(route?.params?.map_mode ?? {}) });
	const [client, setClient] = useState("");

	const [insertMapModeMutation, { data, error: insertError }] = useMutation(mapModeInsertMutation, {
		client: client,
	});
	const [updateMapModeMutation, { error: updateError }] = useMutation(mapModeUpdateMutation, { client: client });

	const handleTextChange = (text, key) => {
		setMapModeData({
			...mapModeData,
			[key]: text,
		});
	};

	const handleSubmit = async () => {
		const result = diff({ ...route?.params?.map_mode }, mapModeData);
		let isEmpty = false;
		Object.entries(result).map(([key, value]) => (value === null || value === "" ? (isEmpty = true) : null));
		if (_.isEmpty(result)) isEmpty = true;
		if (isEmpty) {
			console.log("Error empty object");
			return false;
		}

		setClient(await mutationClient());

		if (route?.name === "Add Map Mode") {
			const newIndex = route?.params?.totalModes + 1;
			result["index"] = newIndex;

			const variables = {
				variables: { object: result },
			};
			await insertMapModeMutation(variables);
			if (insertError) {
				console.log("Error inserting map modes", insertError);
				return false;
			}

			window.location.href = "/admin";
		} else if (mapModeData.map_mode_uuid.split("").length > 35) {
			const uuid = mapModeData.map_mode_uuid;
			const variables = {
				variables: { pk_uuid: { map_mode_uuid: uuid }, _set: result },
			};

			await updateMapModeMutation(variables);
			if (updateError) {
				console.log("Error updating map modes", updateError);
				return false;
			}

			window.location.href = "/admin";
		} else {
			console.log("No mutation type found for map modes");
		}
	};

	return (
		<>
			<ScrollView style={tw`flex flex-col`}>
				{/* <AbilitiesTab.Navigator
				screenOptions={{ tabBarItemStyle: { width: 100 }, tabBarScrollEnabled: true, swipeEnabled: false }}
			>
				<AbilitiesTab.Screen
					name={route?.name === "Add Hero" ? "Add hero" : `${heroData?.name} - Add Ability`}
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
			</AbilitiesTab.Navigator> */}

				<View style={tw`flex items-center justify-center`}>
					{Object?.keys(mapModeData ?? {})?.map((element, i) =>
						element === "maps" || element === "__typename" ? null : element === "map_mode_uuid" ? (
							<Input element={element} value={mapModeData[element]} key={i} editable={false} />
						) : (
							<Input
								element={element}
								value={mapModeData[element]}
								key={i}
								numberOfLines={element === "description" ? 6 : 1}
								multiline={element === "description" ? true : false}
								handleTextChange={handleTextChange}
							/>
						)
					)}
					<View style={tw`flex min-w-20`}>
						<Button
							onPress={handleSubmit}
							title={route?.name === "Add Map Mode" ? "Add Map Mode" : "Edit Map Mode"}
							color="#841584"
						/>
					</View>
				</View>
			</ScrollView>
		</>
	);
};
