import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableNativeFeedback,
  Dimensions,
} from "react-native";
import { Card } from "react-native-paper";
import { Button, Caption, Title, Subheading } from "react-native-paper";
import { MaterialIcons, Octicons } from "@expo/vector-icons";

import colors from "../../configs/colors";
import Animated from "react-native-reanimated";

const CardDetail = ({
  id,
  uid,
  title,
  name,
  profpic,
  photos,
  description,
  createdAt,
  props,
}) => {
  const [showButton, setShowButton] = useState(false);
  const [active, setActive] = useState(0);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const { width } = Dimensions.get("window");
  const height = width;

  const changeIndex = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== active) {
      setActive(slide);
    }
  };

  return (
    <Card>
      <View style={styles.headerDetail}>
        <View style={styles.headerLeft}>
          <View
            onTouchEnd={() => props.navigation.navigate("ProfileUser", uid)}
            style={{
              width: 35,
              height: 35,
              borderRadius: 50,
              overflow: "hidden",
            }}
          >
            <Image style={styles.image} source={{ uri: profpic }} />
          </View>

          <Title
            onPress={() => props.navigation.navigate("ProfileUser", uid)}
            style={[styles.text, { marginLeft: 8, fontSize: 16 }]}
          >
            {name}
          </Title>
        </View>

        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple("#6d747e", true)}
          onPress={() =>
            !showButton ? setShowButton(true) : setShowButton(false)
          }
        >
          <View style={{ borderRadius: 15, overflow: "hidden" }}>
            <MaterialIcons
              style={{ alignSelf: "flex-end" }}
              name="more-vert"
              size={24}
              color={colors.black}
            />
          </View>
        </TouchableNativeFeedback>
      </View>

      {showButton ? (
        <View style={styles.btnContainer}>
          <Button
            style={{ width: 150 }}
            mode="contained"
            color="#15a3b9"
            onPress={() => console.log("Pressed")}
          >
            Hire
          </Button>
          <Button
            style={{ width: 150 }}
            mode="outlined"
            color="#15a3b9"
            onPress={() => console.log("Pressed")}
          >
            Follow
          </Button>
        </View>
      ) : null}

      <View>
        <ScrollView
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          onScroll={changeIndex}
          decelerationRate="fast"
        >
          {photos.map((photo, index) => (
            <View key={index}>
              <Image
                style={{
                  width,
                  height,
                  resizeMode: "cover",
                }}
                source={{ uri: photo.photo }}
              />
            </View>
          ))}
        </ScrollView>

        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            bottom: 0,
            alignSelf: "center",
            margin: 3,
          }}
        >
          {photos.map((indicator, index) => (
            <Octicons
              key={index}
              style={{ margin: 3 }}
              name="primitive-dot"
              size={14}
              color={index === active ? colors.primary : colors.white}
            />
          ))}
        </View>
      </View>

      <View style={styles.description}>
        <Title titleNumberOfLines={5}>{title}</Title>
        <Subheading>
          {new Date(createdAt).toLocaleDateString([], options)}
        </Subheading>
        <Caption>{description}</Caption>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  headerDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  headerLeft: {
    flexDirection: "row",
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  text: {
    fontFamily: "Roboto",
    color: colors.black,
  },
  description: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    textAlign: "justify",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 10,
  },
});

export default CardDetail;
