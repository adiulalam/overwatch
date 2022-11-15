import React from "react";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { Button, Dimensions, Image, Pressable, Text, View } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import tw from "twrnc";
import { CarouselCardItem } from "./components/card";

export const PhoneVersion = ({ navigation, route }) => {
	const [index, setIndex] = useState(0);

	const cardsData = route.params.cardsData;
	const isCarousel = route.params.isCarousel;
	const SLIDER_WIDTH = Dimensions.get("window").width;
	const ITEM_WIDTH = Math.round(SLIDER_WIDTH);

	return (
		<>
			<StatusBar hidden />
			<Carousel
				layout="default"
				ref={isCarousel}
				data={cardsData}
				renderItem={(carousel) => CarouselCardItem(carousel, navigation)}
				sliderWidth={SLIDER_WIDTH}
				itemWidth={ITEM_WIDTH}
				useScrollView={true}
				loop={true}
				onSnapToItem={(index) => setIndex(index)}
			/>
			<Pagination
				dotsLength={cardsData.length}
				activeDotIndex={index}
				carouselRef={isCarousel}
				dotStyle={{
					width: 8,
					height: 8,
					borderRadius: 2,
					marginHorizontal: -3,
					backgroundColor: "rgba(0, 0, 0, 0.92)",
				}}
				inactiveDotOpacity={0.4}
				inactiveDotScale={0.6}
				tappableDots={true}
			/>
			{/* <Button
        onPress={() => {
          // isCarousel.current.snapToItem(1);
          // console.log(isCarousel.current.currentIndex);
          // navigation.openDrawer();
        }}
        title="Learn More"
        color="#841584"
      /> */}
		</>
	);
};
