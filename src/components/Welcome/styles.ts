import { StyleSheet } from "react-native";
import { colors } from "@/styles/colors";
import { fontFamily } from "@/styles/font-family";

export const styles = StyleSheet.create({
  logo: {
    width: 48,
    height: 48,
    marginTop: 24, 
    marginBottom: 28
  },
  title: {
    fontSize: 24, 
    fontFamily: fontFamily.bold,
    color: colors.gray[600],
  },
  subTitle: {
    fontSize: 16, 
    fontFamily: fontFamily.regular,
    color: colors.gray[500],
    marginTop: 12
  }
});
