import * as React from "react";
import { View, Dimensions } from "react-native";
import { interpolate } from "react-native-reanimated";
import Carousel from "react-native-reanimated-carousel";
import type { TAnimationStyle } from "../../customCarouselAnimation/layouts/BaseLayout";
import { SBItem } from "../components/SBItem";
import tw from "twrnc";

export const CarouselHybrid = () => {
	const PAGE_WIDTH = Dimensions.get("window").width;

	const animationStyle: TAnimationStyle = React.useCallback((value: number) => {
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
		<View style={tw`flex py-10`}>
			<Carousel
				loop
				style={{
					width: PAGE_WIDTH,
					height: 240,
					justifyContent: "center",
					alignItems: "center",
				}}
				width={PAGE_WIDTH * 0.7}
				height={240 * 0.7}
				data={[...new Array(6).keys()]}
				renderItem={({ index }) => {
					return <SBItem key={index} index={index} />;
				}}
				customAnimation={animationStyle}
			/>
		</View>
	);
};
