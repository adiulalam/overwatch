import React, { useState } from "react";
import { Image, Pressable, Text, TouchableHighlight, TouchableOpacity, View } from "react-native";
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

	const location = "OW2_Dva.png";

	return (
		<View style={tw`flex flex-row flex-wrap justify-evenly bg-black p-2 h-full`}>
			{cardsData?.map((hero, index) => (
				<View key={index} style={tw`flex bg-amber-500 h-96 w-69 rounded-xl m-2`}>
					<View style={tw`flex h-fit w-fit `}>
						<Text adjustsFontSizeToFit style={tw`text-3xl font-bold text-center`}>
							{hero?.name}
						</Text>
					</View>
					<Pressable key={index} onHoverIn={() => setShowHeroDetailKey(index)} onHoverOut={() => setShowHeroDetailKey(null)}>
						<View onenter style={tw`flex h-full h-76 w-69 p-2 cursor-auto`}>
							{showTextKey === index ? (
								<Text adjustsFontSizeToFit style={tw`text-l font-bold text-center`}>
									{hero?.description}
								</Text>
							) : (
								<Image
									source={{
										uri: hero?.hero_image,
									}}
									resizeMode="contain"
									style={tw`h-full w-full rounded-lg `}
									key={index}
								/>
							)}
						</View>
					</Pressable>
					<View style={tw`flex flex-row flex-wrap justify-around h-10 w-fit`}>
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
