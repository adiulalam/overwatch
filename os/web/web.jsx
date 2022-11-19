import React, { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import tw from "twrnc";
import { cardsData } from "../phone/data/data";
import Ionicons from "@expo/vector-icons/Ionicons";

export const WebVersion = () => {
	const [showTextKey, setShowTextKey] = useState(null);
	const [showHeroDetailKey, setShowHeroDetailKey] = useState(null);

	const roleIcon = {
		damage: "https://static.wikia.nocookie.net/overwatch_gamepedia/images/1/1c/New_Damage_Icon.png",
		support: "https://static.wikia.nocookie.net/overwatch_gamepedia/images/f/f7/New_Support_Icon.png",
		tank: "https://static.wikia.nocookie.net/overwatch_gamepedia/images/d/d4/New_Tank_Icon.png",
	};

	const weaponMap = {
		"Primary Weapon": "Primary",
		"Secondary Weapon": "Secondary",
		"Weapon Two": "Weapon Two",
		Ability: "Ability",
		Ultimate: "Ultimate",
		Passive: "Passive",
	};

	const location = "OW2_Dva.png";

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
									{hero?.abilities?.map((ability, abilityIndex) => (
										<View style={tw`flex h-33 w-23 border border-white rounded-xl`}>
											<Text adjustsFontSizeToFit style={tw`text-sm font-bold text-white text-center`}>
												{ability?.name}
											</Text>
											<Text adjustsFontSizeToFit style={tw`text-xs text-white text-center`}>
												{`(${weaponMap[ability?.type] ?? ability?.type})`}
											</Text>
											<Image
												source={{
													uri: ability?.ability_image,
												}}
												resizeMode="contain"
												style={tw`${ability?.name?.split("").length > 12 ? "h-19 w-19" : "h-23 w-23"} rounded-lg`}
												key={abilityIndex}
											/>
										</View>
									))}
								</View>
							) : (
								<Image
									source={{
										uri: hero?.hero_image,
									}}
									resizeMode="contain"
									style={tw`h-full w-full rounded-lg`}
									key={index}
								/>
							)}
						</View>
					</Pressable>
					<View style={tw`flex flex-row flex-wrap justify-around h-10 w-auto`}>
						<Image
							source={{
								uri: roleIcon[hero?.type],
							}}
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
