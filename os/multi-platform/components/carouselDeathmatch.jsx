import React, { useCallback } from "react";
import { Dimensions, Platform, View } from "react-native";
import Animated, { interpolate, interpolateColor, useAnimatedStyle } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import { SBItem } from "../components/SBItem";
import tw from "twrnc";

export const CarouselDeathmatch = () => {
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

	return (
		<View style={tw`flex py-5 items-center`}>
			<Carousel
				loop={true}
				width={window.width}
				height={window.height}
				style={{ borderRadius: 5 }}
				data={[...new Array(6).keys()]}
				renderItem={({ index, animationValue }) => {
					return <CustomItem key={index} index={index} animationValue={animationValue} />;
				}}
				customAnimation={animationStyle}
				scrollAnimationDuration={1200}
			/>
		</View>
	);
};

const CustomItem = ({ index, animationValue }) => {
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
			<SBItem key={index} index={index} style={{ borderRadius: 5 }} />
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
