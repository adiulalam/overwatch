import React, { useRef } from "react";
import { Dimensions, Platform, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { CarouselMain } from "../carouselMain";
import tw from "twrnc";
import { CarouselHeader } from "../carouselHeader";

export const CarouselCTF = (data) => {
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
		<View style={tw`flex items-center py-5`}>
			<CarouselHeader {...data} />
			<Carousel
				width={window.width}
				height={window.height}
				loop={true}
				vertical={true}
				data={data?.maps?.data}
				renderItem={(carousel) => <CarouselMain {...carousel} />}
			/>
		</View>
	);
};
