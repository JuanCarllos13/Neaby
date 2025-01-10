import { Button } from "@/components/Button";
import { Steps } from "@/components/steps";
import { Welcome } from "@/components/Welcome";
import React from "react";

import { View } from "react-native";
import { router } from "expo-router";

export default function Index() {
  return (
    <View style={{ flex: 1, padding: 40, gap: 40 }}>
      <Welcome />

      <Steps />

      <Button onPress={() => router.navigate("/home")}>
        <Button.Title>Entrar</Button.Title>
      </Button>
    </View>
  );
}
