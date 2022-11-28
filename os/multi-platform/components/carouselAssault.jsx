import React, { useCallback } from "react";
import { Dimensions, Platform, View } from "react-native";
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import tw from "twrnc";

export const CarouselAssault = () => {
	const animationStyle = useCallback((value) => {
		"worklet";

		const zIndex = interpolate(value, [-1, 0, 1], [300, 0, -300]);
		const translateX = interpolate(value, [-1, 0, 1], [0, 0, 0]);

		return {
			transform: [{ translateX }],
			zIndex,
		};
	}, []);

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
					width: Dimensions.get("window").width * 0.9,
					height: Dimensions.get("window").width * 0.5625 * 0.9,
			  };

	return (
		<View style={tw`flex py-5 items-center`}>
			<Carousel
				loop={true}
				style={{ width: window.width, backgroundColor: "white", borderRadius: 5 }}
				width={window.width}
				height={window.height}
				data={[...ImageItems, ...ImageItems]}
				renderItem={({ index, item, animationValue }) => {
					return <Item key={index} width={window.width} animationValue={animationValue} imageSource={item} />;
				}}
				customAnimation={animationStyle}
				scrollAnimationDuration={1000}
			/>
		</View>
	);
};

const Item = ({ width, imageSource, animationValue }) => {
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
					source={imageSource}
					style={{
						width: width,
						height: "100%",
						left: 0,
						position: "absolute",
						// backgroundColor: "white",
					}}
					resizeMode="contain"
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
					source={imageSource}
					style={{
						width: width,
						height: "100%",
						right: 0,
						position: "absolute",
						// backgroundColor: "white",
					}}
					resizeMode="contain"
				/>
			</Animated.View>
		</View>
	);
};
