import React from "react";
import { Dimensions, Platform, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import { SBItem } from "./SBItem";
import tw from "twrnc";

export const CarouselPush = () => {
	const progressValue = useSharedValue(0);

	const window =
		Platform.OS === "web" && Dimensions.get("window").width > Dimensions.get("window").height
			? {
					width: Dimensions.get("window").height * 0.7,
					height: Dimensions.get("window").height * 0.7 * 0.5625,
					parallaxScrollingOffset: Dimensions.get("window").height * 0.7 * 0.12,
			  }
			: {
					width: Dimensions.get("window").width * 0.98,
					height: Dimensions.get("window").width * 0.5525,
					parallaxScrollingOffset: Dimensions.get("window").width * 0.12,
			  };

	const colors = ["#26292E", "#899F9C", "#B3C680", "#5C6265", "#F5D399", "#F1F1F1"];

	return (
		<View style={tw`flex py-5`}>
			<Carousel
				width={window.width}
				height={window.height}
				loop={true}
				pagingEnabled={true}
				snapEnabled={true}
				onProgressChange={(_, absoluteProgress) => (progressValue.value = absoluteProgress)}
				mode="parallax"
				modeConfig={{
					parallaxScrollingScale: 0.9,
					parallaxScrollingOffset: window.parallaxScrollingOffset,
				}}
				data={colors}
				renderItem={({ index }) => <SBItem index={index} />}
			/>
		</View>
	);
};
