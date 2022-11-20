import React from "react";
import { Dimensions, View, ScrollView, Text, Image } from "react-native";
import tw from "twrnc";
import { heroMap } from "../../imageMap";
import randomColor from "randomcolor";

export const HeroesDetail = ({ route }) => {
	const SLIDER_WIDTH = Dimensions.get("window").width;
	const Size = (num) => (SLIDER_WIDTH / 100) * num;

	return (
		<>
			<ScrollView style={tw`flex-1`}>
				<Text style={tw`text-3xl font-bold text-left px-2 text-white`}>{"Bio:"}</Text>
				<Text style={tw`text-xl font-bold text-center px-2 text-white`}>{route?.params?.item?.description}</Text>
				<Text style={tw`text-3xl font-bold text-left px-2 pt-10 text-white`}>{"Abilities:"}</Text>
				<View style={tw`flex flex-row flex-wrap justify-evenly `}>
					{route?.params?.item?.abilities?.data?.map((ability, index) => (
						<View key={index} style={tw`flex flex-col justify-evenly rounded-lg m-2 bg-[${randomColor({ luminosity: "dark" })}]`}>
							<Text adjustsFontSizeToFit style={tw`text-[${Size(4.5)}px] font-bold text-center text-white`}>
								{ability?.name}
							</Text>
							<Text adjustsFontSizeToFit style={tw`text-[${Size(4)}px] text-center text-white`}>{`(${ability?.type})`}</Text>
							<Image
								source={heroMap[ability?.ability_image]}
								resizeMode="contain"
								style={tw`w-[${Size(40)}px] h-[${Size(40)}px] rounded-lg `}
								key={index}
							/>
						</View>
					))}
				</View>
			</ScrollView>
		</>
	);
};
