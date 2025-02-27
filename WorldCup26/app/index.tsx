import React, { useEffect, useState } from "react";
import { View, Image, StatusBar, StyleSheet, Dimensions, LogBox } from "react-native";
import { useRouter } from "expo-router";  // Importando o useRouter

LogBox.ignoreLogs(["Warning: Cannot update a component"]);

const images = [
  require("../assets/images/Canada-background.png"),
  require("../assets/images/Mexico-background.png"),
  require("../assets/images/USA-background.png"),
  require("../assets/images/WeAre-Canada.png"),
  require("../assets/images/WeAre-Mexico.png"),
  require("../assets/images/WeAre-USA.png"),
];

export default function Index() {
  const [currentImage, setCurrentImage] = useState(0);
  const router = useRouter();  // Inicializando o router
  const { width, height } = Dimensions.get("window");

  useEffect(() => {
    let index = 0;
    let timeoutId: NodeJS.Timeout;

    const showImages = () => {
      if (index < images.length) {
        setCurrentImage(index);
        index++;
        timeoutId = setTimeout(showImages, 500);
      } else {
        setTimeout(() => {
          router.replace("/screens/matchs");  // Navegando para a tela matchs
        }, 500);
      }
    };

    timeoutId = setTimeout(showImages, 500);

    return () => clearTimeout(timeoutId);
  }, [router]);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Image source={images[currentImage]} style={[styles.image, { width, height }]} resizeMode="cover" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  image: {
    position: "absolute",
  },
});