import React, { useCallback } from "react";
import { Dimensions, Platform, View } from "react-native";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import tw from "twrnc";

export const CarouselElimination = () => {
	const ImageItems = [
		require("../../../assets/overwatch/heroes/ana/profile_pic.png"),
		require("../../../assets/overwatch/heroes/ashe/profile_pic.png"),
		require("../../../assets/overwatch/heroes/baptiste/profile_pic.png"),
	];

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

	const pressAnim = useSharedValue(0);
	const animationStyle = useCallback((value) => {
		"worklet";

		const zIndex = interpolate(value, [-1, 0, 1], [-1000, 0, 1000]);
		const translateX = interpolate(value, [-1, 0, 1], [-window.width, 0, window.width]);

		return {
			transform: [{ translateX }],
			zIndex,
		};
	}, []);

	return (
		<View style={tw`flex py-5 items-center`}>
			<Carousel
				loop={true}
				style={{ width: window.width, borderRadius: 5 }}
				width={window.width}
				height={window.height}
				data={[...ImageItems, ...ImageItems]}
				onScrollBegin={() => {
					pressAnim.value = withTiming(1);
				}}
				onScrollEnd={() => {
					pressAnim.value = withTiming(0);
				}}
				renderItem={({ index, item }) => {
					return <CustomItem source={item} key={index} pressAnim={pressAnim} />;
				}}
				customAnimation={animationStyle}
				scrollAnimationDuration={1200}
			/>
		</View>
	);
};

const CustomItem = ({ pressAnim, source }) => {
	const animStyle = useAnimatedStyle(() => {
		const scale = interpolate(pressAnim.value, [0, 1], [1, 0.9]);
		const borderRadius = interpolate(pressAnim.value, [0, 1], [0, 30]);

		return {
			transform: [{ scale }],
			borderRadius,
		};
	}, []);

	return (
		<Animated.View style={[{ flex: 1, overflow: "hidden" }, animStyle]}>
			<Animated.Image
				source={source}
				resizeMode="center"
				style={{ width: "100%", height: "100%", backgroundColor: "white" }}
			/>
		</Animated.View>
	);
};
