import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Text,
  TouchableNativeFeedback,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";
import { Button } from "react-native-paper";

//Configs
import { API } from "../configs/API";
import colors from "../configs/colors";

const Profile = (props) => {
  const [user, setUser] = useState(undefined);
  const [isFollow, setIsFollow] = useState(false);

  const getUser = async () => {
    try {
      console.log("props Detail:", props);
      const userLogin = await AsyncStorage.getItem("userInfo");
      const parsing = await JSON.parse(userLogin);

      const res = await API.get(`/user-profile/${parsing.id}`);
      console.log(res.data.user);
      setUser(res.data.user);
    } catch (error) {
      alert("Error fetching data");
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return user == undefined ? (
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
              }}
            >
              <Ionicons
                onPress={props.navigation.goBack}
                name="ios-arrow-back"
                size={24}
                color="#52575D"
              />
            </View>
          </TouchableNativeFeedback>
          <View>
            <Text>Profile</Text>
          </View>

          <MaterialIcons name="more-vert" size={24} color="#52575D" />
        </View>
        <View style={{ alignSelf: "center" }}>
          <View style={styles.profileImage}>
            <Image
              source={{
                uri: user.profpic,
              }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <View style={styles.dm}>
            <MaterialIcons name="chat" size={18} color="#DFD8C8" />
          </View>
          <View style={styles.active}></View>
          <View style={styles.add}>
            <Ionicons
              name="ios-add"
              size={48}
              color="#DFD8C8"
              style={{ marginLeft: 2 }}
            />
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={[styles.text, { fontWeight: "200", fontSize: 26 }]}>
            {user.fullname}
          </Text>
          <Text style={[styles.text, { color: "#AEB5BC", fontSize: 14 }]}>
            {user.greeting}
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statsBox}>
            <Text style={[styles.text, { fontSize: 24 }]}>
              {user.post.length >= 0 && user.post.length}
            </Text>
            <Text style={[styles.text, styles.subText]}>Posts</Text>
          </View>
          <View
            style={[
              styles.statsBox,
              {
                borderColor: "#DFD8C8",
                borderLeftWidth: 1,
                borderRightWidth: 1,
              },
            ]}
          >
            <Text style={[styles.text, { fontSize: 24 }]}>
              {user.follower.length >= 0 && user.follower.length}
            </Text>
            <Text style={[styles.text, styles.subText]}>Followers</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={[styles.text, { fontSize: 24 }]}>
              {user.following.length >= 0 && user.following.length}
            </Text>
            <Text style={[styles.text, styles.subText]}>Following</Text>
          </View>
        </View>

        {/* <View style={styles.btnContainer}>
          <Button
            style={{ width: 150 }}
            mode="contained"
            color="#15a3b9"
            onPress={() => console.log("Pressed")}
          >
            Hire
          </Button>
          {isFollow ? (
            <Button
              style={{ width: 150 }}
              mode="contained"
              color="#6d747e"
              onPress={() => setIsFollow(false)}
            >
              Unfollow
            </Button>
          ) : (
            <Button
              style={{ width: 150 }}
              mode="outlined"
              color="#15a3b9"
              onPress={() => setIsFollow(true)}
            >
              Follow
            </Button>
          )}
        </View> */}

        <View style={{ marginTop: 20 }}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {user.arts.length > 0 &&
              user.arts.map((art) => (
                <View key={art.id} style={styles.mediaImageContainer}>
                  <Image
                    source={{
                      uri: art.photo,
                    }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                </View>
              ))}
          </ScrollView>
          <View style={styles.mediaCount}>
            <Text
              style={[
                styles.text,
                { fontSize: 24, color: "#DFD8C8", fontWeight: "300" },
              ]}
            >
              {user.arts.length}
            </Text>
            <Text
              style={[
                styles.text,
                { fontSize: 12, color: "#DFD8C8", textTransform: "uppercase" },
              ]}
            >
              Arts
            </Text>
          </View>

          <Text style={[styles.subText, styles.recent]}>Recent Activity</Text>

          {user.post.length > 0 &&
            user.post.slice(0, 5).map((post) => (
              <TouchableNativeFeedback key={post.id}>
                <View style={{ alignItems: "center" }}>
                  <View style={styles.recentItem}>
                    <View style={styles.recentItemIndicator}></View>
                    <View style={{ width: 250 }}>
                      <Text
                        style={[
                          styles.text,
                          { color: "#41444B", fontWeight: "300" },
                        ]}
                      >
                        {user.fullname} Post{" "}
                        <Text style={{ fontWeight: "400" }}>{post.title}</Text>
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableNativeFeedback>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: Constants.statusBarHeight,
  },
  text: {
    fontFamily: "Roboto",
    color: "#52575D",
  },
  subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500",
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16,
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
  },
  dm: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    backgroundColor: "#34FFB9",
    position: "absolute",
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    alignItems: "center",
    alignSelf: "center",
    marginTop: 16,
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32,
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 20,
  },
  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10,
  },
  mediaCount: {
    backgroundColor: "#6d747e",
    position: "absolute",
    top: 100,
    marginTop: -50,
    marginLeft: 30,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    shadowColor: "rgba(0, 0, 0, 0.38)",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 1,
  },
  recent: {
    marginLeft: 72,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 10,
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  recentItemIndicator: {
    alignSelf: "center",
    backgroundColor: "#CABFAB",
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20,
  },
});
