import React from "react";
import { ScrollView, View } from "react-native";
import { CarouselEscort } from "./components/carouselEscort";
import { CarouselPush } from "./components/carouselPush";
import tw from "twrnc";
import { CarouselHybrid } from "./components/carouselHybrid";
import { CarouselControl } from "./components/carouselControl";
import { CarouselAssault } from "./components/carouselAssault";
import { CarouselElimination } from "./components/carouselElimination";
import { CarouselDeathmatch } from "./components/carouselDeathmatch";
import { CarouselCTF } from "./components/carouselCTF";

export const Maps = () => {
	return (
		<ScrollView style={tw`flex bg-black`}>
			<CarouselPush />
			<CarouselEscort />
			<CarouselHybrid />
			<CarouselControl />
			<CarouselAssault />
			<CarouselElimination />
			<CarouselDeathmatch />
			<CarouselCTF />
		</ScrollView>
	);
};
