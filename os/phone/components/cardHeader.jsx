import React from "react";
import { Dimensions, Image, Text, View } from "react-native";
import tw from "twrnc";
import Ionicons from "@expo/vector-icons/Ionicons";
import { roleMap } from "../../imageMap";

export const CardHeader = (item) => {
	const SLIDER_WIDTH = Dimensions.get("window").width;

	const Size = (SLIDER_WIDTH / 100) * 10;
	return (
		<>
			<Text style={tw`text-3xl font-bold text-center text-white`}>{item?.name}</Text>
			<View style={tw`flex flex-row flex-wrap py-2 justify-around max-h-full`}>
				<Image source={roleMap[item?.type]} resizeMode="contain" style={tw`w-[${Size}px] h-[${Size}px]`} />
				<View style={tw`flex flex-row justify-around max-h-full`}>
					{[...Array(item?.difficulty)].map((e, i) => (
						<Ionicons name="star" size={Size} color="orange" key={i} />
					))}
				</View>
			</View>
		</>
	);
};
