import React from "react";
import { Text, View } from "react-native";
import tw from "twrnc";

export const CardHeader = (props) => {
	return (
		<View style={tw`flex h-auto w-auto `}>
			<Text adjustsFontSizeToFit style={tw`text-3xl font-bold text-center`}>
				{props?.hero_name}
			</Text>
		</View>
	);
};
