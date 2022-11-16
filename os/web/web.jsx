import React from "react";
import { Image, Text, View } from "react-native";
import tw from "twrnc";
import { cardsData } from "../phone/data/data";

export const WebVersion = () => {
	const location = "OW2_Dva.png";

	return (
		<View style={tw`flex flex-row flex-wrap justify-evenly bg-black max-h-full p-2`}>
			{cardsData?.map((hero, index) => (
				<View key={index} style={tw`flex bg-amber-500 h-96 w-72 rounded-xl m-2`}>
					<View style={tw`flex h-fit w-fit `}>
						<Text adjustsFontSizeToFit style={tw`text-3xl font-bold text-center`}>
							{hero?.name}
						</Text>
					</View>
					<View style={tw`flex h-full h-76 w-72 bg-amber-300 p-2`}>
						<Image
							source={{
								uri: hero?.hero_image,
							}}
							resizeMode="contain"
							style={tw`bg-bg-amber-300 h-full w-full max-w-full max-h-full rounded-lg `}
							key={index}
						/>
					</View>
					<View style={tw`flex h-fit w-fit bg-amber-200`}>
						<Text adjustsFontSizeToFit style={tw`text-3xl font-bold text-center`}>
							{hero?.name}
						</Text>
					</View>
				</View>
			))}
		</View>
	);
};
