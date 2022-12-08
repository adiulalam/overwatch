import React, { useContext } from "react";
import { ScrollView } from "react-native";
import tw from "twrnc";
import { HeroesContext } from "../../connection/client";
import { CarouselEscort } from "./components/carousels/carouselEscort";
import { CarouselPush } from "./components/carousels/carouselPush";
import { CarouselHybrid } from "./components/carousels/carouselHybrid";
import { CarouselControl } from "./components/carousels/carouselControl";
import { CarouselAssault } from "./components/carousels/carouselAssault";
import { CarouselElimination } from "./components/carousels/carouselElimination";
import { CarouselDeathmatch } from "./components/carousels/carouselDeathmatch";
import { CarouselCTF } from "./components/carousels/carouselCTF";

export const Maps = () => {
	const { Maps } = useContext(HeroesContext);

	return (
		<ScrollView style={tw`flex bg-black`}>
			{Maps.map((element, i) =>
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
