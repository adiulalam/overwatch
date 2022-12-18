import { useMutation } from "@apollo/client";
import { diff } from "deep-object-diff";
import { useState } from "react";
import { View, ScrollView, Button } from "react-native";
import tw from "twrnc";
import { mutationClient } from "../../../../connection/client";
import { mapdeleteMutation, mapInsertMutation, mapUpdateMutation } from "../../../../connection/mutation";
import { dimensionsMap } from "../../../imageMap";
import { Input } from "../component/input";
import { ConfirmationModal } from "../component/modal";

export const MapsScreen = ({ route }) => {
	const [mapData, setMapData] = useState({ ...(route?.params?.map ?? {}) });
	const [client, setClient] = useState("");
	const [hideScreen, setHideScreen] = useState(true);
	const [modalVisible, setModalVisible] = useState(false);

	const [updateMapMutation, { error: updateError }] = useMutation(mapUpdateMutation, { client: client });
	const [insertMapMutation, { error: insertError }] = useMutation(mapInsertMutation, { client: client });
	const [deleteMapMutation, { error: deleteError }] = useMutation(mapdeleteMutation, { client: client });

	const handleTextChange = (text, key) => {
		console.log(text, key);
		setMapData({
			...mapData,
			[key]: text,
		});
	};

	const handleImageChange = (e) => {
		const mapModeName = route?.params?.map_mode?.type?.replace(/[^0-9a-z]/gi, "_")?.toLowerCase() ?? "";
		const mapName = mapData?.name?.replace(/[^0-9a-z]/gi, "_")?.toLowerCase() ?? "";

		console.log(mapModeName, mapName);

		const extention = "." + e?.target?.files?.[0]?.name.split(".").pop();
		const newMapImage =
			e?.target?.files?.[0]?.name
				?.replace(extention, "")
				?.replace(/[^0-9a-z]/gi, "_")
				?.toLowerCase() ?? "";

		if (!mapName) {
			console.log("No Map Name found");
			window.location.href = "/admin";
			return false;
		}

		const fullPath = `${mapModeName}/${newMapImage + extention}`;

		//Keep this clg
		console.log({ [fullPath]: `require('../assets/overwatch/heroes/${fullPath})` });

		setMapData({
			...mapData,
			map_image: fullPath,
		});
	};

	const handleSubmit = async () => {
		const result = diff({ ...route?.params?.map }, mapData);
		let isEmpty = false;
		Object.entries(result).map(([key, value]) => (value === null || value === "" ? (isEmpty = true) : null));
		if (_.isEmpty(result)) isEmpty = true;
		if (isEmpty) {
			console.log("Error empty object");
			return false;
		}

		setClient(await mutationClient());

		if (route?.name === `${route?.params?.map_mode?.type} - Add Map`) {
			result["fk_map_mode_uuid"] = route?.params?.map_mode?.map_mode_uuid;

			const variables = {
				variables: { object: result },
			};
			await insertMapMutation(variables);
			if (insertError) {
				console.log("Error inserting map", insertError);
				return false;
			}

			window.location.href = "/admin";
		} else if (mapData?.map_uuid.split("").length > 35) {
			const uuid = mapData?.map_uuid;
			const variables = {
				variables: { pk_uuid: { map_uuid: uuid }, _set: result },
			};

			await updateMapMutation(variables);
			if (updateError) {
				console.log("Error updating map", updateError);
				return false;
			}

			window.location.href = "/admin";
		} else {
			console.log("No mutation type found for maps");
		}
	};

	const handleDelete = async () => {
		const uuid = mapData?.map_uuid;

		if (!uuid) {
			console.log("Error map uuid is empty");
			return false;
		}

		setClient(await mutationClient());

		const variables = {
			variables: { map_uuid: uuid },
		};

		await deleteMapMutation(variables);
		if (deleteError) {
			console.log("Error deleting map", insertError);
			return false;
		}

		window.location.href = "/admin";
	};

	return (
		<ScrollView style={tw`flex flex-col py-10`}>
			{hideScreen ? (
				<View style={tw`flex items-center justify-center`}>
					<View style={tw`flex flex-row w-1/3 justify-around min-w-20`}>
						<Button
							onPress={() => setHideScreen(false)}
							title={hideScreen ? "Show Map" : "Hide Map"}
							color="#006400"
						/>
					</View>
				</View>
			) : (
				<View style={tw`flex items-center justify-center`}>
					{Object?.keys(mapData ?? {})?.map((element, i) =>
						element === "__typename" ? null : element === "map_uuid" || element === "fk_map_mode_uuid" ? (
							<Input element={element} value={mapData[element]} key={i} editable={false} />
						) : (
							<Input
								element={element}
								value={mapData[element]}
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
								title={route?.name.includes("Add Map") ? "Add Map" : "Edit Map"}
								color="#841584"
							/>
						</View>
						{!route?.name.includes("Add Map") && (
							<View style={tw`flex p-2`}>
								<Button onPress={() => setModalVisible(true)} title={"Delete Map"} color="#FF0000" />
							</View>
						)}
						<View style={tw`flex p-2`}>
							<Button
								onPress={() => setHideScreen(true)}
								title={hideScreen ? "Show Map" : "Hide Map"}
								color="#006400"
							/>
						</View>
					</View>
				</View>
			)}
		</ScrollView>
	);
};
