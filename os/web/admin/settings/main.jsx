import { Button, ScrollView, View } from "react-native";
import { Input } from "../component/input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import tw from "twrnc";

const storeData = async (value) => {
	try {
		await AsyncStorage.setItem("@storageKey", value);
	} catch (e) {
		console.log("Error saving key", e);
		return false;
	}
};

export const Settings = () => {
	const [value, setValue] = useState("");

	useEffect(() => {
		const getData = async () => {
			try {
				const value = await AsyncStorage.getItem("@storageKey");
				if (value !== null) {
					setValue(value);
					return value;
				}
				return "";
			} catch (e) {
				console.log("Error reading key", e);
				return false;
			}
		};
		getData();
	}, []);

	const handleTextChange = (text, key) => {
		setValue(text);
	};

	const handleSubmit = async () => {
		await storeData(value);
		window.location.href = "/admin";
	};

	return (
		<ScrollView style={tw`flex flex-col py-10`}>
			<View style={tw`flex items-center justify-center`}>
				<Input element={"Key"} value={value} handleTextChange={handleTextChange} editable={true} />
				<View style={tw`flex min-w-20`}>
					<Button onPress={handleSubmit} title={"Update"} color="#841584" />
				</View>
			</View>
		</ScrollView>
	);
};
