import React, { useState, useEffect } from "react";
import AppLoading from "expo-app-loading";
import {
  Image,
  FlatList,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableNativeFeedback,
  StatusBar,
} from "react-native";
import { Title } from "react-native-paper";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";

import { API } from "../configs/API";
import colors from "../configs/colors";
import CardDetail from "../components/molecules/CardDetail";

const Detail = (props) => {
  const [post, setPost] = useState(undefined);

  const getPost = () => {
    API.get(`/post/${props.route.params}`)
      .then((res) => {
        console.log("data detail", res.data.data.post);
        setPost(res.data.data.post);
      })
      .catch(() => {
        alert("Error fetching data");
      });
  };

  useEffect(() => {
    getPost();
  }, []);

  return post == undefined ? (
    <AppLoading />
  ) : (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleBar}>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple("#6d747e", true)}
          >
            <View
              style={{
                overflow: "hidden",
                justifyContent: "center",
              }}
            >
              <Ionicons
                onPress={() => props.navigation.goBack()}
                name="ios-arrow-back"
                size={24}
                color={colors.black}
              />
            </View>
          </TouchableNativeFeedback>
          <Title style={[styles.text, { marginLeft: 10 }]}>Detail Post</Title>
          <View></View>
        </View>
        <CardDetail
          title={post.title}
          name={post.User.fullname}
          profpic={post.User.profpic}
          uid={post.User.id}
          photos={post.photos.length > 0 && post.photos}
          description={post.description}
          createdAt={post.createdAt}
          props={props}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: Constants.statusBarHeight,
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 16,
  },
  text: {
    fontFamily: "Roboto",
    color: colors.black,
  },
});
