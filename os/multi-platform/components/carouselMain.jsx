import React from "react";
import { View, ActivityIndicator, Image, Text, Dimensions, Platform } from "react-native";
import Animated from "react-native-reanimated";
import tw from "twrnc";
import { overwatchMap } from "../../imageMap";

export const CarouselMain = (props) => {
	const { item, index, ...animatedViewProps } = props;

	const window =
		Platform.OS === "web" && Dimensions.get("window").width > Dimensions.get("window").height
			? {
					width: Dimensions.get("window").height * 0.7,
					height: Dimensions.get("window").height * 0.7 * 0.5625,
			  }
			: {
					width: Dimensions.get("window").width * 0.95,
					height: Dimensions.get("window").width * 0.5625 * 0.95,
			  };

	const textSize = Math.round(window.width / 20);

	return (
		<Animated.View style={{ flex: 1 }} {...animatedViewProps}>
			<View style={tw`flex-1 items-start bg-white rounded-lg overflow-hidden`}>
				<ActivityIndicator style={tw`absolute inset-0`} size="large" />
				<Image
					style={tw`absolute inset-0 w-full h-full`}
					key={index}
					resizeMode="cover"
					source={overwatchMap[item?.map_image] ?? null}
				/>
				<Text
					style={tw`absolute text-white overflow-hidden p-2 bottom-0 right-0 bg-[#333333] rounded-lg text-[${textSize}px]`}
				>
					{item?.name ?? ""}
				</Text>
			</View>
		</Animated.View>
	);
};
