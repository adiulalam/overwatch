import React from "react";
import { Dimensions, Platform, Text, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { CarouselMain } from "../carouselMain";
import tw from "twrnc";
import { CarouselHeader } from "../carouselHeader";

export const CarouselEscort = (data) => {
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

	return (
		<View style={tw`flex items-center py-5`}>
			<CarouselHeader {...data} />
			<Carousel
				style={{
					width: "100%",
					height: window.height,
					alignItems: "center",
					justifyContent: "center",
				}}
				width={window.width}
				height={window.height}
				snapEnabled={true}
				mode={"horizontal-stack"}
				loop={true}
				data={data?.maps?.data}
				modeConfig={{
					snapDirection: "left",
					stackInterval: data?.maps?.data?.length * 3,
				}}
				customConfig={() => ({ type: "positive", viewCount: data.length })}
				renderItem={(carousel) => <CarouselMain {...carousel} />}
			/>
		</View>
	);
};
