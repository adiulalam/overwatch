import React, { useCallback } from "react";
import { Dimensions, Platform, View } from "react-native";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import tw from "twrnc";
import { colorMap, overwatchMap } from "../../../imageMap";
import { CarouselHeader } from "../carouselHeader";

export const CarouselElimination = (data) => {
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

	const bgColour = colorMap(data?.maps?.data?.length * 2, "light");

	return (
		<View style={tw`flex py-5 items-center`}>
			<CarouselHeader {...data} />
			<Carousel
				loop={true}
				style={{ width: window.width, borderRadius: 5 }}
				width={window.width}
				height={window.height}
				data={[...data?.maps?.data, ...data?.maps?.data]}
				onScrollBegin={() => {
					pressAnim.value = withTiming(1);
				}}
				onScrollEnd={() => {
					pressAnim.value = withTiming(0);
				}}
				renderItem={({ index, item }) => {
					return (
						<CustomItem
							item={item}
							key={index}
							pressAnim={pressAnim}
							width={window.width}
							bgColour={bgColour}
							index={index}
						/>
					);
				}}
				customAnimation={animationStyle}
				scrollAnimationDuration={1200}
			/>
		</View>
	);
};

const CustomItem = ({ pressAnim, item, width, index, bgColour }) => {
	const textSize = Math.round(width / 20);

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
				source={overwatchMap[item?.map_image] ?? null}
				resizeMode="cover"
				style={tw`w-full h-full bg-black`}
			/>
			<Animated.Text
				style={tw`absolute text-black overflow-hidden p-2 bottom-0 right-0 bg-[${
					bgColour[index] ?? "#333333"
				}] rounded-lg text-[${textSize}px]`}
			>
				{item?.name ?? ""}
			</Animated.Text>
		</Animated.View>
	);
};
