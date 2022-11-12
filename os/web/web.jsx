import { Image, View } from "react-native";

export const WebVersion = () => {
  const location = "OW2_Dva.png";

  return (
    <View
      style={tw`flex flex-row flex-wrap justify-around bg-white max-h-full py-2`}
    >
      <View style={tw`bg-amber-500 h-96 w-72 m-2 rounded-xl`}>
        <Image
          style={tw`object-contain h-full w-full rounded-xl`}
          resizeMode="contain"
          source={require(`../../assets/overwatch/${location}`)}
        />
      </View>
      <View style={tw`bg-amber-500 h-96 w-72 m-2 rounded-xl`}></View>
      <View style={tw`bg-amber-500 h-96 w-72 m-2 rounded-xl`}></View>
      <View style={tw`bg-amber-500 h-96 w-72 m-2 rounded-xl`}></View>
    </View>
  );
};
