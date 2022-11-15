import React from "react";
import { Dimensions, View, ScrollView, Text, Image } from "react-native";
import tw from "twrnc";

export const HeroesDetail = ({ route }) => {
	const SLIDER_WIDTH = Dimensions.get("window").width;
	const Size = (num) => (SLIDER_WIDTH / 100) * num;

	return (
		<>
			<ScrollView style={tw`flex-1 bg-white`}>
				<Text style={tw`text-3xl font-bold text-left px-2`}>{"Bio:"}</Text>
				<Text style={tw`text-xl font-bold text-center px-2`}>{route?.params?.item?.description}</Text>
				<Text style={tw`text-3xl font-bold text-left px-2 pt-10`}>{"Abilities:"}</Text>
				<View style={tw`flex flex-row flex-wrap justify-evenly `}>
					{route?.params?.item?.abilities?.map((ability, index) => (
						<View key={index} style={tw`flex flex-col pb-5 justify-evenly`}>
							<Text adjustsFontSizeToFit style={tw`text-[${Size(4.5)}px] font-bold text-center`}>
								{ability?.name}
							</Text>
							<Text
								adjustsFontSizeToFit
								style={tw`text-[${Size(4)}px] text-center`}
							>{`(${ability?.type})`}</Text>
							<Image
								source={{
									uri: ability?.ability_image,
								}}
								resizeMode="contain"
								style={tw`bg-black w-[${Size(40)}px] h-[${Size(40)}px] rounded-lg `}
								key={index}
							/>
							<View style={tw`w-full h-1 bg-red-600 border-2 border-red-600 mt-[10%]`}></View>
						</View>
					))}
				</View>
			</ScrollView>
		</>
	);
};
