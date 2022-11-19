import "react-native-gesture-handler";
import React from "react";
import { Dimensions, Image, View } from "react-native";
import { PhoneVersion } from "./phone";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { useRef } from "react";
import tw from "twrnc";
import { HeroesDetail } from "./components/heroesDetail";
import { cardsData } from "./data/data";
import { LogBox } from "react-native";

LogBox.ignoreLogs(["Non-serializable values were found in the navigation state"]);

const Drawer = createDrawerNavigator();

export const PhoneMain = () => {
	const isCarousel = useRef(null);

	return (
		<NavigationContainer>
			<Drawer.Navigator
				useLegacyImplementation
				initialRouteName="Heroes"
				drawerContent={(props) => {
					return (
						<DrawerContentScrollView {...props}>
							<DrawerItemList {...props} />
							{cardsData.map((e, i) => (
								<DrawerItem
									label={e.name}
									onPress={() => {
										isCarousel?.current?.snapToItem(i);
										props.navigation.closeDrawer();
										props.navigation.navigate("Heroes");
									}}
									activeTintColor="#f32121"
									focused={i === isCarousel?.current?.currentIndex}
									key={i}
								/>
							))}
						</DrawerContentScrollView>
					);
				}}
			>
				<Drawer.Screen
					name="Heroes"
					component={PhoneVersion}
					initialParams={{ isCarousel }}
					options={{
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
					// initialParams={{ cardsData: cardsData }}
					options={({ route }) => ({
						title: route?.params?.name,
						drawerItemStyle: {
							display: "none",
						},
					})}
				/>
			</Drawer.Navigator>
		</NavigationContainer>
	);
};
