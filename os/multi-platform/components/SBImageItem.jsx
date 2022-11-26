import React, { useRef } from "react";
import { StyleSheet, View, ActivityIndicator, StyleProp, ViewStyle, Image, ImageURISource, Text } from "react-native";

// interface Props {
//     style?: StyleProp<ViewStyle>;
//     index?: number;
//     showIndex?: boolean;
// }

export const SBImageItem = ({ style, index: _index, showIndex = true }) => {
	const index = (_index || 0) + 1;
	const source = useRef({
		uri: `https://picsum.photos/id/${index}/400/225`,
	}).current;

	return (
		<View style={[styles.container, style]}>
			<ActivityIndicator size="small" />
			<Image key={index} style={styles.image} resizeMode="contain" source={source} />
			<Text
				style={{
					position: "absolute",
					color: "white",
					fontSize: 40,
					backgroundColor: "#333333",
					borderRadius: 5,
					overflow: "hidden",
					paddingHorizontal: 10,
					paddingTop: 2,
				}}
			>
				{showIndex ? index : ""}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#fff",
		borderRadius: 8,
		overflow: "hidden",
	},
	image: {
		position: "absolute",
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
});
