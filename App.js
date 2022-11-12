import { Platform } from "react-native";
import { NativeWindStyleSheet } from "nativewind";
import { WebVersion } from "./os/web/web";
import { PhoneVersion } from "./os/phone/phone";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  return Platform.OS === "web" ? <WebVersion /> : <PhoneVersion />;
}
