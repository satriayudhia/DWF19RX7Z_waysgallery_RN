import React from "react";
import { Text } from "react-native";

const TextError = (props) => {
  return <Text style={{ color: "#bd0707", padding: 4 }}>{props.children}</Text>;
};

export default TextError;
