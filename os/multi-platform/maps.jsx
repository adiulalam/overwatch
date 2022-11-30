import React from "react";
import { ScrollView } from "react-native";
import tw from "twrnc";
import { CarouselEscort } from "./components/carousels/carouselEscort";
import { CarouselPush } from "./components/carousels/carouselPush";
import { CarouselHybrid } from "./components/carousels/carouselHybrid";
import { CarouselControl } from "./components/carousels/carouselControl";
import { CarouselAssault } from "./components/carousels/carouselAssault";
import { CarouselElimination } from "./components/carousels/carouselElimination";
import { CarouselDeathmatch } from "./components/carousels/carouselDeathmatch";
import { CarouselCTF } from "./components/carousels/carouselCTF";

export const Maps = () => {
	const data = require("../../data/maps_data.json");
	return (
		<ScrollView style={tw`flex bg-black`}>
			{data.map((element, i) =>
				element?.type === "Push" ? (
					<CarouselPush key={i} {...element} />
				) : element?.type === "Escort" ? (
					<CarouselEscort key={i} {...element} />
				) : element?.type === "Hybrid" ? (
					<CarouselHybrid key={i} {...element} />
				) : element?.type === "Control" ? (
					<CarouselControl key={i} {...element} />
				) : element?.type === "Assault" ? (
					<CarouselAssault key={i} {...element} />
				) : element?.type === "Elimination" ? (
					<CarouselElimination key={i} {...element} />
				) : element?.type === "Deathmatch" ? (
					<CarouselDeathmatch key={i} {...element} />
				) : element?.type === "Capture the Flag" ? (
					<CarouselCTF key={i} {...element} />
				) : null
			)}
		</ScrollView>
	);
};
