import React from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import { IconProps } from "@tabler/icons-react-native";
import { colors } from "@/styles/colors";

interface Props {
  title: string;
  description: string;
  icon: React.ComponentType<IconProps>;
}

export function Step({ description, title, icon: Icon }: Props) {
  return (
    <View style={styles.container}>
      <Icon color={colors.red.base}/>
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
}
