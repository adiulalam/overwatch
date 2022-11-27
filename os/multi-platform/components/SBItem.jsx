import React, { useState } from "react";
import { LongPressGestureHandler } from "react-native-gesture-handler";
import { SBImageItem } from "./SBImageItem";
import { SBTextItem } from "./SBTextItem";
import Constants from "expo-constants";
import Animated from "react-native-reanimated";

export const SBItem = (props) => {
	const { style, index, pretty, ...animatedViewProps } = props;
	// @ts-ignore
	const enablePretty = Constants.manifest.extra.enablePretty;
	const [isPretty, setIsPretty] = useState(pretty || enablePretty);
	return (
		<LongPressGestureHandler
			onActivated={() => {
				setIsPretty(!isPretty);
			}}
		>
			<Animated.View style={{ flex: 1 }} {...animatedViewProps}>
				{isPretty ? <SBImageItem style={style} index={index} /> : <SBTextItem style={style} index={index} />}
			</Animated.View>
		</LongPressGestureHandler>
	);
};
