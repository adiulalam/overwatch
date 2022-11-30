import React from "react";
import { Dimensions, Platform, Text } from "react-native";
import tw from "twrnc";

export const CarouselHeader = (props) => {
	const window =
		Platform.OS === "web" && Dimensions.get("window").width > Dimensions.get("window").height
			? {
					width: Dimensions.get("window").height * 0.7,
					height: Dimensions.get("window").height * 0.7 * 0.5625,
			  }
			: {
					width: Dimensions.get("window").width * 0.95,
					height: Dimensions.get("window").width * 0.5625 * 0.95,
			  };

	return (
		<>
			<Text style={tw`text-3xl font-bold text-center text-white`}>
				{props?.type === "Assault" ? "Assault (Custom Game Only)" : props?.type}
			</Text>
			<Text style={tw`text-sm text-center text-white w-[${window.width}px]`}>{props?.description}</Text>
		</>
	);
};
