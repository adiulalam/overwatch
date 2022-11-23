import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import tw from "twrnc";
import Ionicons from "@expo/vector-icons/Ionicons";
import { roleMap } from "../../imageMap";

export const CardFooter = (props) => {
	return (
		<View style={tw`flex flex-row flex-wrap justify-around h-10 w-auto`}>
			<Image source={roleMap[props?.hero?.type]} resizeMode="contain" style={tw`w-10 h-full`} />

			<View style={tw`flex flex-row`}>
				{[...Array(props?.hero?.difficulty)].map((e, i) => (
					<Ionicons name="star" size={35} color="purple" key={i} />
				))}
			</View>
			<Pressable
				key={props?.index}
				onPress={() => (props?.showTextKey === props?.index ? props?.setShowTextKey(null) : props?.setShowTextKey(props?.index))}
			>
				<Text adjustsFontSizeToFit style={tw`text-3xl font-bold text-center`}>
					ⓘ
				</Text>
			</Pressable>
		</View>
	);
};
