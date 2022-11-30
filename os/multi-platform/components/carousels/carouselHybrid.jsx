import React, { useCallback } from "react";
import { View, Dimensions, Platform } from "react-native";
import { interpolate } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { CarouselMain } from "../carouselMain";
import tw from "twrnc";
import { CarouselHeader } from "../carouselHeader";

export const CarouselHybrid = (data) => {
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

	const animationStyle = useCallback((value) => {
		"worklet";

		const zIndex = interpolate(value, [-1, 0, 1], [10, 20, 30]);
		const scale = interpolate(value, [-1, 0, 1], [1.25, 1, 0.25]);
		const opacity = interpolate(value, [-0.75, 0, 1], [0, 1, 0]);

		return {
			transform: [{ scale }],
			zIndex,
			opacity,
		};
	}, []);

	return (
		<View style={tw`flex py-5 items-center`}>
			<CarouselHeader {...data} />
			<Carousel
				loop
				style={{
					justifyContent: "center",
					alignItems: "center",
				}}
				width={window.width}
				height={window.height}
				data={data?.maps?.data}
				renderItem={(carousel) => <CarouselMain {...carousel} />}
				customAnimation={animationStyle}
			/>
		</View>
	);
};