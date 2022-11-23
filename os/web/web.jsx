import React, { useState } from "react";
import { Pressable, View } from "react-native";
import tw from "twrnc";
import randomColor from "randomcolor";
const cardsData = require("../../data/heroes_data.json");
import { CardHeader } from "./components/cardHeader";
import { CardBody } from "./components/cardBody";
import { CardFooter } from "./components/cardFooter";

export const WebVersion = () => {
	const [showTextKey, setShowTextKey] = useState(null);
	const [showHeroDetailKey, setShowHeroDetailKey] = useState(null);

	return (
		<View style={tw`flex flex-row flex-wrap justify-evenly bg-black p-2`}>
			{cardsData?.map((hero, index) => (
				<View key={index} style={tw`flex h-119 w-69 rounded-xl m-2 bg-[${randomColor({ luminosity: "light" })}]`}>
					<CardHeader hero_name={hero?.name} />
					<Pressable key={index} onHoverIn={() => setShowHeroDetailKey(index)} onHoverOut={() => setShowHeroDetailKey(null)}>
						<CardBody hero={hero} index={index} showTextKey={showTextKey} showHeroDetailKey={showHeroDetailKey} />
					</Pressable>
					<CardFooter hero={hero} index={index} showTextKey={showTextKey} setShowTextKey={setShowTextKey} />
				</View>
			))}
		</View>
	);
};
