import { View } from "react-native";
import tw from "twrnc";
import DropDownPicker from "react-native-dropdown-picker";
import { dimensionsMap } from "../../../imageMap";
import { Label } from "./label";

export const DropDown = ({ element, value, setValue, open, setOpen, items, setItems, handleTextChange }) => {
	return (
		<View style={tw`flex ${dimensionsMap.lg ? "flex-row w-1/3" : "w-1/1"} mb-6 ${open ? "z-10" : "z-0"}`}>
			<Label element={element} />
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
