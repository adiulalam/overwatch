import React, { useRef } from "react";
import { Dimensions, Platform, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { SBItem } from "./SBItem";
import { FadeInRight } from "react-native-reanimated";
import tw from "twrnc";

export const CarouselEscort = () => {
	const data = useRef([...new Array(6).keys()]).current;
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
		<Carousel
			style={{
				width: "100%",
				height: window.height,
				alignItems: "center",
				justifyContent: "center",
				padding: 2,
			}}
			width={window.width}
			height={window.height}
			pagingEnabled={true}
			snapEnabled={true}
			mode={"horizontal-stack"}
			loop={true}
			data={data}
			modeConfig={{
				snapDirection: "left",
				stackInterval: data.length * 3,
			}}
			customConfig={() => ({ type: "positive", viewCount: data.length })}
			renderItem={({ index }) => (
				<SBItem
					index={index}
					key={index}
					entering={FadeInRight.delay((data.length - index) * 100).duration(200)}
				/>
			)}
		/>
	);
};
