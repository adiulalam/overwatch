import React from "react";
import { Dimensions, Platform, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { useSharedValue } from "react-native-reanimated";
import { CarouselMain } from "../carouselMain";
import tw from "twrnc";
import { CarouselHeader } from "../carouselHeader";
import { colorMap } from "../../../imageMap";

export const CarouselPush = (data) => {
	const progressValue = useSharedValue(0);

	const window =
		Platform.OS === "web" && Dimensions.get("window").width > Dimensions.get("window").height
			? {
					width: Dimensions.get("window").height * 0.7,
					height: Dimensions.get("window").height * 0.7 * 0.5625,
					parallaxScrollingOffset: Dimensions.get("window").height * 0.7 * 0.12,
			  }
			: {
					width: Dimensions.get("window").width * 0.98,
					height: Dimensions.get("window").width * 0.5525,
					parallaxScrollingOffset: Dimensions.get("window").width * 0.12,
			  };

	const bgColour = colorMap(data?.maps?.data?.length * 3, "light");

	return (
		<View style={tw`flex items-center pt-5`}>
			<CarouselHeader {...data} />
			<Carousel
				width={window.width}
				height={window.height}
				loop={true}
				pagingEnabled={true}
				style={{ bottom: Platform.OS === "web" ? "4%" : "3%" }}
				snapEnabled={true}
				onProgressChange={(_, absoluteProgress) => (progressValue.value = absoluteProgress)}
				mode="parallax"
				modeConfig={{
					parallaxScrollingScale: 0.9,
					parallaxScrollingOffset: window.parallaxScrollingOffset,
				}}
				data={data?.maps?.data}
				renderItem={(carousel) => <CarouselMain {...carousel} bgColour={bgColour} />}
			/>
		</View>
	);
};
