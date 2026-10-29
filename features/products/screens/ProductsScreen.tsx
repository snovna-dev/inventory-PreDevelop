import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";

export default function ProductsScreen() {
  <View className="flex-1 items-center justify-center bg-white">
    <Text className="text-xl font-bold text-blue-500">
      Welcome to Nativewind!
    </Text>
    <Text>Tab One</Text>
    <View lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    <EditScreenInfo path="app/(tabs)/index.tsx" />
  </View>;
}
