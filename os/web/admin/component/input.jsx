import { View, Text, TextInput } from "react-native";
import tw from "twrnc";

export const Input = ({ element, value, editable, handleTextChange, numberOfLines, multiline }) => {
	return (
		<View style={tw`flex flex-row w-1/3 mb-6 `}>
			<View style={tw`flex justify-center md:sm:justify-end `}>
				<Text style={tw` text-white font-bold md:text-right mb-1 md:mb-0 px-4`} for="inline-full-name">
					{element}
				</Text>
			</View>
			<View style={tw`flex w-full`}>
				<TextInput
					value={value}
					editable={editable ?? true}
					onChangeText={(text) => handleTextChange(text, element)}
					style={tw`bg-gray-200 border-2 ${
						value ? "" : "border-red-500"
					} rounded w-full py-2 px-4 text-base text-black leading-normal focus:outline-none focus:bg-white focus:border-purple-500`}
					numberOfLines={numberOfLines ?? 1}
					multiline={multiline ?? false}
				></TextInput>
			</View>
		</View>
	);
};
