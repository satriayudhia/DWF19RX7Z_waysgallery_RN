import React from "react";
import { StyleSheet, Text } from "react-native";
import { Card, Paragraph, Title, Avatar } from "react-native-paper";
import AvatarContent from "../atoms/AvatarContent";
import { TouchableNativeFeedback } from "react-native-gesture-handler";

const CardContent = ({
  id,
  title,
  name,
  profpic,
  photo,
  description,
  props,
}) => (
  <Card
    style={styles.container}
    onPress={() => props.navigation.navigate("Detail", id)}
  >
    <TouchableNativeFeedback>
      <Card.Title
        title={title}
        subtitle={`by: ${name}`}
        left={() => <AvatarContent profpic={profpic} />}
      />

      <Card.Cover source={{ uri: photo }} />
      <Card.Content>
        <Paragraph numberOfLines={3} style={styles.description}>
          {description}
        </Paragraph>
      </Card.Content>
    </TouchableNativeFeedback>
  </Card>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  description: {
    padding: 8,
    textAlign: "justify",
  },
});

export default CardContent;
