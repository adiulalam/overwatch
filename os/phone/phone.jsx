import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Dimensions } from "react-native";
import { Pagination } from "react-native-snap-carousel";
import Carousel from "react-native-reanimated-carousel";
import { CarouselCardItem } from "./components/card";
import randomColor from "randomcolor";
const cardsData = require("../../data/heroes_data.json");

export const PhoneVersion = ({ navigation, route }) => {
	const [index, setIndex] = useState(0);
	const [colourArray, setColourArray] = useState([]);

	const isCarousel = route.params.isCarousel;

	const SLIDER_WIDTH = Dimensions.get("window").width;
	const ITEM_WIDTH = Math.round(SLIDER_WIDTH);

	useEffect(() => {
		setColourArray(
			randomColor({
				count: 38,
				luminosity: "light",
			})
		);
	}, []);

	return (
		<>
			<StatusBar hidden />
			<Carousel
				layout="default"
				ref={isCarousel}
				data={cardsData}
				renderItem={(carousel) => CarouselCardItem(carousel, navigation, colourArray)}
				width={SLIDER_WIDTH}
				sliderWidth={SLIDER_WIDTH}
				itemWidth={ITEM_WIDTH}
				useScrollView={true}
				loop={true}
				onSnapToItem={(index) => setIndex(index)}
				style={{ height: "90%" }}
			/>
			<Pagination
				dotsLength={cardsData.length}
				activeDotIndex={index}
				containerStyle={{ flexWrap: "wrap", padding: 3, height: "10%" }}
				dotStyle={{
					width: 8,
					height: 8,
					borderRadius: 2,
					marginHorizontal: -3,
					margin: 8,
					backgroundColor: "#ffffff",
				}}
				inactiveDotOpacity={0.4}
				inactiveDotScale={0.6}
			/>
		</>
	);
};
