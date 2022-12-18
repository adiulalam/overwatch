import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { MapModesScreen } from "./mapModesScreen";

const MapsTab = createMaterialTopTabNavigator();
export const MutateMaps = ({ route }) => {
	const maps = [...route?.params?.Maps];
	return (
		<MapsTab.Navigator>
			<MapsTab.Screen
				name="Add Map Mode"
				component={MapModesScreen}
				options={{
					tabBarIcon: () => <Ionicons name="add" color={"green"} size={20} />,
				}}
				initialParams={{
					map_mode: {
						type: "",
						description: "",
					},
					totalModes: maps.length,
				}}
			/>
			{maps.map((e, i) => (
				<MapsTab.Screen
					name={e?.type}
					key={i}
					component={MapModesScreen}
					initialParams={{ map_mode: e, mapModeTabIndex: i }}
				/>
			))}
		</MapsTab.Navigator>
	);
};
