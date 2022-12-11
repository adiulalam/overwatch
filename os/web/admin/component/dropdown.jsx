import { View, Text } from "react-native";
import tw from "twrnc";
import DropDownPicker from "react-native-dropdown-picker";

export const DropDown = ({ element, value, setValue, open, setOpen, items, setItems, handleTextChange }) => {
	return (
		<View style={tw`flex flex-row w-1/3 mb-6 ${open ? "z-10" : "z-0"}`}>
			<View style={tw`flex justify-center md:sm:justify-end `}>
				<Text style={tw` text-white font-bold md:text-right mb-1 md:mb-0 px-4`} for="inline-full-name">
					{element}
				</Text>
			</View>
			<View style={tw`flex w-full`}>
				<DropDownPicker
					open={open}
					value={value}
					items={items}
					setOpen={setOpen}
					setValue={setValue}
					setItems={setItems}
					onChangeValue={(text) => handleTextChange(text, element)}
				/>
			</View>
		</View>
	);
};
