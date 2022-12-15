import { gql } from "@apollo/client";

export const heroUpdateMutation = gql`
	mutation updateHeroMutation(
		$pk_uuid: overwatch_hero_pk_columns_input = { hero_uuid: "" }
		$_set: overwatch_hero_set_input = {}
	) {
		update_overwatch_hero_by_pk(pk_columns: $pk_uuid, _set: $_set) {
			hero_uuid
		}
	}
`;

export const heroInsertMutation = gql`
	mutation insertHeroMutation($object: overwatch_hero_insert_input = {}) {
		insert_overwatch_hero_one(object: $object) {
			hero_uuid
		}
	}
`;
