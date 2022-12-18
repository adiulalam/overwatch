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

export const abilityUpdateMutation = gql`
	mutation updateAbilityMutation(
		$pk_uuid: overwatch_ability_pk_columns_input = { ability_uuid: "" }
		$_set: overwatch_ability_set_input = {}
	) {
		update_overwatch_ability_by_pk(pk_columns: $pk_uuid, _set: $_set) {
			ability_uuid
		}
	}
`;

export const abilityInsertMutation = gql`
	mutation insertAbilityMutation($object: overwatch_ability_insert_input = {}) {
		insert_overwatch_ability_one(object: $object) {
			ability_uuid
		}
	}
`;

export const abilitydeleteMutation = gql`
	mutation deleteAbilityMutation($ability_uuid: uuid = "") {
		delete_overwatch_ability_by_pk(ability_uuid: $ability_uuid) {
			ability_uuid
		}
	}
`;

export const mapModeUpdateMutation = gql`
	mutation updateMapModeMutation(
		$pk_uuid: overwatch_map_mode_pk_columns_input = { map_mode_uuid: "" }
		$_set: overwatch_map_mode_set_input = {}
	) {
		update_overwatch_map_mode_by_pk(pk_columns: $pk_uuid, _set: $_set) {
			map_mode_uuid
		}
	}
`;

export const mapModeInsertMutation = gql`
	mutation insertMapModeMutation($object: overwatch_map_mode_insert_input = {}) {
		insert_overwatch_map_mode_one(object: $object) {
			map_mode_uuid
		}
	}
`;

export const mapUpdateMutation = gql`
	mutation updateMapMutation(
		$pk_uuid: overwatch_map_pk_columns_input = { map_uuid: "" }
		$_set: overwatch_map_set_input = {}
	) {
		update_overwatch_map_by_pk(pk_columns: $pk_uuid, _set: $_set) {
			map_uuid
		}
	}
`;

export const mapInsertMutation = gql`
	mutation insertMapMutation($object: overwatch_map_insert_input = {}) {
		insert_overwatch_map_one(object: $object) {
			map_uuid
		}
	}
`;

export const mapdeleteMutation = gql`
	mutation deleteMapMutation($map_uuid: uuid = "") {
		delete_overwatch_map_by_pk(map_uuid: $map_uuid) {
			map_uuid
		}
	}
`;
