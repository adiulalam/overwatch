import { gql } from "@apollo/client";

export const overwatchHeroes = gql`
	query ListHeroes {
		overwatch_heroes: overwatch_hero(order_by: { name: asc }) {
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
	}
`;
