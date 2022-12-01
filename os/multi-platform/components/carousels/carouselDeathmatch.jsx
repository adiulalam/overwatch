import React, { useCallback } from "react";
import { Dimensions, Platform, View } from "react-native";
import Animated, { interpolate, interpolateColor, useAnimatedStyle } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { CarouselMain } from "../carouselMain";
import tw from "twrnc";
import { CarouselHeader } from "../carouselHeader";
import { colorMap } from "../../../imageMap";

export const CarouselDeathmatch = (data) => {
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

		const zIndex = interpolate(value, [-1, 0, 1], [-1000, 0, 1000]);
		const translateX = interpolate(value, [-1, 0, 1], [0, 0, window.width]);

		return {
			transform: [{ translateX }],
			zIndex,
		};
	}, []);

	const bgColour = colorMap(data?.maps?.length * 3, "light");

	return (
		<View style={tw`flex py-5 items-center`}>
			<CarouselHeader {...data} />
			<Carousel
				loop={true}
				width={window.width}
				height={window.height}
				style={{ borderRadius: 5 }}
				data={[...data?.maps, ...data?.maps]}
				renderItem={(carousel) => <CustomItem {...carousel} bgColour={bgColour} />}
				customAnimation={animationStyle}
				scrollAnimationDuration={1200}
			/>
		</View>
	);
};

const CustomItem = (props) => {
	const { item, index, animationValue } = props;
	const maskStyle = useAnimatedStyle(() => {
		const backgroundColor = interpolateColor(
			animationValue.value,
			[-1, 0, 1],
			["#000000dd", "transparent", "#000000dd"]
		);

		return {
			backgroundColor,
		};
	}, [animationValue]);

	return (
		<View style={{ flex: 1 }}>
			<CarouselMain {...props} />
			<Animated.View
				pointerEvents="none"
				style={[
					{
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						borderRadius: 5,
					},
					maskStyle,
				]}
			/>
		</View>
	);
};
