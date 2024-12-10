import {StyleSheet} from "react-native"
import {colors} from "@/styles/colors"
import {fontFamily} from "@/styles/font-family"



export const styles = StyleSheet.create({
  container:{
    gap: 24, 
    flex: 1
  },
  title:{
    fontSize: 16, 
    fontFamily: fontFamily.regular,
    color: colors.gray[500],
  }
})