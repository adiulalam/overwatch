import React from "react";
import { Dimensions, Platform, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import { SBItem } from "./SBItem";

export const CarouselPush = () => {
	const progressValue = useSharedValue(0);

	const window =
		Platform.OS === "web" && Dimensions.get("window").width > Dimensions.get("window").height
			? {
					width: Dimensions.get("window").height * 0.6,
					height: Dimensions.get("window").height * 0.6 * 0.56,
					parallaxScrollingOffset: Dimensions.get("window").height * 0.6 * 0.12,
			  }
			: {
					width: Dimensions.get("window").width,
					height: Dimensions.get("window").width * 0.6,
					parallaxScrollingOffset: Dimensions.get("window").width * 0.12,
			  };

	const colors = ["#26292E", "#899F9C", "#B3C680", "#5C6265", "#F5D399", "#F1F1F1"];

	return (
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
	);
};
