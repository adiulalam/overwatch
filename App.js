import "react-native-gesture-handler";
import React from "react";
import { Platform } from "react-native";
import { NativeWindStyleSheet } from "nativewind";
import { WebMain } from "./os/web/main";
import { PhoneMain } from "./os/phone/main";
import { HeroesContext } from "./connection/client";
import overwatchData from "./data/overwatch.json";

NativeWindStyleSheet.setOutput({
	default: "native",
});

export default function App() {
	return (
		<HeroesContext.Provider value={overwatchData}>
			{Platform.OS === "web" ? <WebMain /> : <PhoneMain />}
		</HeroesContext.Provider>
	);
}
