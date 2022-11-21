import "react-native-gesture-handler";
import React from "react";
import { Dimensions, Image, View } from "react-native";
import { PhoneVersion } from "./phone";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { useRef } from "react";
import tw from "twrnc";
import { HeroesDetail } from "./components/heroesDetail";
import { LogBox } from "react-native";
const cardsData = require("../../data/heroes_data.json");

LogBox.ignoreLogs(["Non-serializable values were found in the navigation state"]);

const Drawer = createDrawerNavigator();

export const PhoneMain = () => {
	const isCarousel = useRef(null);

	return (
		<NavigationContainer theme={DarkTheme}>
			<Drawer.Navigator
				useLegacyImplementation
				initialRouteName="Heroes"
				drawerContent={(props) => {
					return (
						<DrawerContentScrollView {...props}>
							<DrawerItemList {...props} />
							{props.state.index === 0 || props.state.index === 1
								? cardsData.map((e, i) => (
										<DrawerItem
											label={e.name}
											onPress={() => {
												isCarousel?.current?.scrollTo({ index: i });
												props.navigation.closeDrawer();
												props.navigation.navigate("Heroes");
											}}
											activeTintColor="#f32121"
											focused={i === isCarousel?.current?.getCurrentIndex()}
											key={i}
										/>
								  ))
								: null}
						</DrawerContentScrollView>
					);
				}}
			>
				<Drawer.Screen
					name="Heroes"
					component={PhoneVersion}
					initialParams={{ isCarousel }}
					options={{
						headerTintColor: "white",
						drawerIcon: () => (
							<View>
								<Image
									style={tw`w-[${(Dimensions.get("window").width / 100) * 10}px] h-[${
										(Dimensions.get("window").width / 100) * 10
									}px]`}
									source={require("../../assets/overwatch/icons/heroes_icon.png")}
								/>
							</View>
						),
					}}
				/>
				<Drawer.Screen
					name="Heroes Detail"
					component={HeroesDetail}
					options={({ route }) => ({
						title: route?.params?.name,
						headerTintColor: "white",
						drawerItemStyle: {
							display: "none",
						},
					})}
				/>
			</Drawer.Navigator>
		</NavigationContainer>
	);
};
