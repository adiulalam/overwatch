import React, { useCallback } from "react";
import { Dimensions, Platform, View } from "react-native";
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import tw from "twrnc";
import { overwatchMap } from "../../../imageMap";
import { CarouselHeader } from "../carouselHeader";

export const CarouselAssault = (data) => {
	const animationStyle = useCallback((value) => {
		"worklet";

		const zIndex = interpolate(value, [-1, 0, 1], [300, 0, -300]);
		const translateX = interpolate(value, [-1, 0, 1], [0, 0, 0]);

		return {
			transform: [{ translateX }],
			zIndex,
		};
	}, []);

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
		<View style={tw`flex py-5 items-center`}>
			<CarouselHeader {...data} />
			<Carousel
				loop={true}
				style={{ width: window.width, backgroundColor: "white", borderRadius: 5 }}
				width={window.width}
				height={window.height}
				data={[...data?.maps?.data, ...data?.maps?.data]}
				renderItem={({ index, item, animationValue }) => {
					return <Item key={index} width={window.width} animationValue={animationValue} item={item} />;
				}}
				customAnimation={animationStyle}
				scrollAnimationDuration={1200}
			/>
		</View>
	);
};

const Item = ({ width, item, animationValue }) => {
	const textSize = Math.round(width / 20);

	const leftStyle = useAnimatedStyle(() => {
		const left = interpolate(animationValue.value, [-1, 0, 1], [-(width / 2), 0, 0], Extrapolate.CLAMP);
		return {
			left,
		};
	}, [animationValue, width]);

	const rightStyle = useAnimatedStyle(() => {
		const right = interpolate(animationValue.value, [-1, 0, 1], [-(width / 2), 0, 0], Extrapolate.CLAMP);

		return {
			right,
		};
	}, [animationValue, width]);

	return (
		<View style={{ position: "absolute", height: "100%", width }}>
			<Animated.View
				style={[
					{
						left: 0,
						position: "absolute",
						width: width / 2,
						height: "100%",
						overflow: "hidden",
					},
					leftStyle,
				]}
			>
				<Animated.Image
					source={overwatchMap[item?.map_image] ?? null}
					style={{
						width: width,
						height: "100%",
						left: 0,
						position: "absolute",
					}}
					resizeMode="cover"
				/>
			</Animated.View>
			<Animated.View
				style={[
					{
						right: 0,
						position: "absolute",
						width: width / 2,
						height: "100%",
						overflow: "hidden",
					},
					rightStyle,
				]}
			>
				<Animated.Image
					source={overwatchMap[item?.map_image] ?? null}
					style={{
						width: width,
						height: "100%",
						right: 0,
						position: "absolute",
					}}
					resizeMode="cover"
				/>
				<Animated.Text
					style={tw`absolute text-white overflow-hidden p-2 bottom-0 right-0 bg-[#333333] rounded-lg text-[${textSize}px]`}
				>
					{item?.name ?? ""}
				</Animated.Text>
			</Animated.View>
		</View>
	);
};
