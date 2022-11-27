import React from "react";
import { View } from "react-native";
import { CarouselEscort } from "./components/carouselEscort";
import { CarouselPush } from "./components/carouselPush";

export const Maps = () => {
	return (
		<View
			style={{
				alignItems: "center",
			}}
		>
			<CarouselPush />
			<CarouselEscort />
		</View>
	);
};
