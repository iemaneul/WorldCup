import { Text, View, StatusBar } from "react-native";
import { useNavigation } from "expo-router";

export default function Index() {
  const navigation = useNavigation();
  navigation.setOptions({ headerShown: false });

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Edit app/index.tsx to edit this.</Text>
      </View>
    </View>
  );
}
