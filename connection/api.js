import { Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = Platform.OS === "web" ? "/api" : "https://overwatch.adiulalamadil.me/api";

const request = async (method, path, body, withLogin = false) => {
	const headers = { "Content-Type": "application/json" };
	if (withLogin) headers.Authorization = (await AsyncStorage.getItem("@UserJWTKey")) ?? "";

	const response = await fetch(`${API_URL}${path}`, {
		method,
		headers,
		body: body === undefined ? undefined : JSON.stringify(body),
	});
	const result = await response.json().catch(() => null);
	if (!response.ok) throw new Error(result?.error ?? `${method} ${path} failed with ${response.status}`);
	return result;
};

export const getOverwatchData = () => request("GET", "/data");

export const insertRow = (resource, values) => request("POST", `/${resource}`, values, true);

export const updateRow = (resource, uuid, values) => request("PATCH", `/${resource}/${uuid}`, values, true);

export const deleteRow = (resource, uuid) => request("DELETE", `/${resource}/${uuid}`, undefined, true);
