import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  TouchableNativeFeedback,
  SafeAreaView,
} from "react-native";
import { Title } from "react-native-paper";
import AppLoading from "expo-app-loading";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";

//Configs
import { API } from "../configs/API";
import colors from "../configs/colors";

//Components
import CardContent from "../components/molecules/CardContent";

const Home = (props) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getPost = async () => {
    try {
      setIsLoading(true);
      const res = await API.get("/posts");
      console.log(res.data.data.posts);
      setPosts(res.data.data.posts);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      alert("Error fetching data");
      console.log(error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <CardContent
        key={item.id}
        id={item.id}
        title={item.title}
        description={item.description}
        name={item.User.fullname}
        profpic={item.User.profpic}
        photo={item.photos[0].photo}
        props={props}
      />
    );
  };

  return posts == [] ? (
    <AppLoading />
  ) : (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleBar}>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.Ripple("#6d747e", true)}
        >
          <View></View>
        </TouchableNativeFeedback>
        <Title style={[styles.text, { marginLeft: 10 }]}>Home</Title>
        <View></View>
      </View>
      <FlatList
        data={posts}
        refreshing={isLoading}
        onRefresh={getPost}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
};

export default Home;

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
});
