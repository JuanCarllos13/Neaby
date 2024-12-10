import React from "react";
import { Image, View, Text } from "react-native";
import { styles } from "./styles";

export function Welcome() {
  return (
    <View>
      <Image source={require("@/assets/logo.png")} style={styles.logo} />
      <Text style={styles.title}>Boas vindas</Text>

      <Text style={styles.subTitle}>
        Tenho cupons de vantagem para usar em{"\n"} seus estabelecimentos favoritos.
      </Text>
    </View>
  );
}
