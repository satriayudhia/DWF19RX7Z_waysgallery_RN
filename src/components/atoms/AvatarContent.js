import React from "react";
import { Avatar } from "react-native-paper";

const AvatarContent = (props) => (
  <Avatar.Image size={42} source={{ uri: props.profpic }} />
);

export default AvatarContent;
