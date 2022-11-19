import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import tw from "twrnc";
import Ionicons from "@expo/vector-icons/Ionicons";

// import { cardsData } from "../phone/data/data";

const cardsData = require("../../data/heroes_data.json");

export const WebVersion = () => {
	const [showTextKey, setShowTextKey] = useState(null);
	const [showHeroDetailKey, setShowHeroDetailKey] = useState(null);

	const roleIcon = {
		damage: "damage_icon.png",
		support: "support_icon.png",
		tank: "tank_icon.png",
	};

	const weaponMap = {
		"Primary Weapon": "Primary",
		"Secondary Weapon": "Secondary",
		"Weapon Two": "Weapon Two",
		Ability: "Ability",
		Ultimate: "Ultimate",
		Passive: "Passive",
	};

	return (
		<View style={tw`flex flex-row flex-wrap justify-evenly bg-white p-2`}>
			{cardsData?.map((hero, index) => (
				<View key={index} style={tw`flex bg-amber-500 h-119 w-69 rounded-xl m-2`}>
					<View style={tw`flex h-auto w-auto `}>
						<Text adjustsFontSizeToFit style={tw`text-3xl font-bold text-center`}>
							{hero?.name}
						</Text>
					</View>
					<Pressable key={index} onHoverIn={() => setShowHeroDetailKey(index)} onHoverOut={() => setShowHeroDetailKey(null)}>
						<View style={tw`flex h-99 w-69`}>
							{showTextKey === index ? (
								<Text adjustsFontSizeToFit style={tw`text-l font-bold text-center`}>
									{hero?.description}
								</Text>
							) : showHeroDetailKey === index ? (
								<View style={tw`flex flex-row flex-wrap justify-evenly bg-black h-full w-full `}>
									{hero?.abilities?.data?.map((ability, abilityIndex) => (
										<View style={tw`flex h-33 w-23 border border-white rounded-xl`}>
											<Text adjustsFontSizeToFit style={tw`text-sm font-bold text-white text-center`}>
												{ability?.name}
											</Text>
											<Text adjustsFontSizeToFit style={tw`text-xs text-white text-center`}>
												{`(${weaponMap[ability?.type] ?? ability?.type})`}
											</Text>
											<Image
												source={require(`../../assets/overwatch/heroes/${ability?.ability_image}`)}
												resizeMode="contain"
												style={tw`${ability?.name?.split("").length > 10 ? "h-19 w-19" : "h-23 w-23"} rounded-lg`}
												key={abilityIndex}
											/>
										</View>
									))}
								</View>
							) : (
								<Image
									source={require(`../../assets/overwatch/heroes/${hero?.hero_image}`)}
									resizeMode="contain"
									style={tw`h-full w-full rounded-lg`}
									key={index}
								/>
							)}
						</View>
					</Pressable>
					<View style={tw`flex flex-row flex-wrap justify-around h-10 w-auto`}>
						<Image
							source={require(`../../assets/overwatch/roles/${roleIcon[hero?.type]}`)}
							resizeMode="contain"
							style={tw`w-10 h-full`}
						/>

						<View style={tw`flex flex-row`}>
							{[...Array(hero?.difficulty)].map((e, i) => (
								<Ionicons name="star" size={35} color="purple" key={i} />
							))}
						</View>
						<Pressable key={index} onPress={() => (showTextKey === index ? setShowTextKey(null) : setShowTextKey(index))}>
							<Text adjustsFontSizeToFit style={tw`text-3xl font-bold text-center`}>
								ⓘ
							</Text>
						</Pressable>
					</View>
				</View>
			))}
		</View>
	);
};
