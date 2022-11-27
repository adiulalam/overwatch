import React from "react";
import { View } from "react-native";
import { CarouselEscort } from "./components/carouselEscort";
import { CarouselPush } from "./components/carouselPush";
import tw from "twrnc";

export const Maps = () => {
	return (
		<View style={tw`flex items-center bg-black`}>
			<CarouselPush />
			<CarouselEscort />
		</View>
	);
};
