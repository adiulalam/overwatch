import { Button, Modal, View } from "react-native";
import { dimensionsMap } from "../../../imageMap";
import tw from "twrnc";

export const ConfirmationModal = ({ modalVisible, setModalVisible, handleDelete }) => {
	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => setModalVisible(!modalVisible)}
		>
			<View style={tw`flex-1 items-center justify-center`}>
				<View
					style={tw`flex flex-row ${
						dimensionsMap.lg ? " w-1/3" : "w-1/1"
					} h-20 items-center justify-evenly bg-black border-2 border-rose-500 rounded-lg`}
				>
					<Button onPress={handleDelete} title={"YES"} color="#FF0000" />
					<Button onPress={() => setModalVisible(false)} title={"NO"} color="#006400" />
				</View>
			</View>
		</Modal>
	);
};
