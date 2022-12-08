import { gql } from "@apollo/client";

export const getOverwatchData = gql`
	query ListData {
		Heroes: overwatch_hero(order_by: { name: asc }) {
			hero_uuid
			name
			hero_image
			type
			difficulty
			description
			abilities {
				ability_uuid
				name
				type
				ability_image
			}
		}
		Maps: overwatch_map_mode(order_by: { index: asc }) {
			map_mode_uuid
			type
			description
			maps {
				map_uuid
				name
				map_image
			}
		}
	}
`;
