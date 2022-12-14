import { View, TextInput, Dimensions } from "react-native";
import tw from "twrnc";
import { dimensionsMap } from "../../../imageMap";
import { Label } from "./label";

export const Input = ({ element, value, editable, handleTextChange, handleImageChange, numberOfLines, multiline }) => {
	return (
		<View style={tw`flex ${dimensionsMap.lg ? "flex-row w-1/3" : "w-1/1"} mb-6 `}>
			<Label element={element} />
			<View style={tw`flex w-full`}>
				{element === "hero_image" && (
					<input type="file" onChange={(e) => handleImageChange(e)} accept="image/*" />
				)}
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
