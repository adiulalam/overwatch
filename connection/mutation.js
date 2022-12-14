import { gql } from "@apollo/client";

export const heroUpdateMutation = gql`
	mutation getHeroMutation(
		$pk_uuid: overwatch_hero_pk_columns_input = { hero_uuid: "" }
		$_set: overwatch_hero_set_input = {}
	) {
		update_overwatch_hero_by_pk(pk_columns: $pk_uuid, _set: $_set) {
			hero_uuid
		}
	}
`;
