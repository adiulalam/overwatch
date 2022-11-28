import React, { useRef } from "react";
import { Dimensions, Platform, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { SBItem } from "../components/SBItem";
import tw from "twrnc";

export const CarouselCTF = () => {
	const data = useRef([...new Array(6).keys()]).current;
	const window =
		Platform.OS === "web" && Dimensions.get("window").width > Dimensions.get("window").height
			? {
					width: Dimensions.get("window").height * 0.7,
					height: Dimensions.get("window").height * 0.7 * 0.5625,
			  }
			: {
					width: Dimensions.get("window").width * 0.98,
					height: Dimensions.get("window").width * 0.5625 * 0.98,
			  };

	return (
		<View style={tw`flex items-center py-5`}>
			<Carousel
				width={window.width}
				height={window.height}
				loop={true}
				vertical={true}
				data={data}
				renderItem={({ index }) => <SBItem key={index} index={index} />}
			/>
		</View>
	);
};
