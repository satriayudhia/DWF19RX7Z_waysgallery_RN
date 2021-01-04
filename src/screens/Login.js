import React from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { Formik, Form } from "formik";
import * as Yup from "yup";

//Configs
import { API, setAuthToken } from "../configs/API";
import FormikControl from "../configs/FormikControl";
import colors from "../configs/colors";

const Login = ({ navigation }) => {
  const initialValues = { email: "", password: "" };

  const handleLogin = async (values) => {
    console.log(values);
    try {
      const data = {
        email: values.email,
        password: values.password,
      };
      const config = { headers: { "Content-Type": "application/json" } };
      const response = await API.post("/login", data, config);
      if (response.status === 200) {
        setAuthToken(response.data.data.token);
        await AsyncStorage.setItem("token", response.data.data.token);
        await AsyncStorage.setItem(
          "userInfo",
          JSON.stringify(response.data.data)
        );
        navigation.navigate("TabNavigator");
      }
    } catch (error) {
      console.log(error);
      alert("Wrong Email or Password");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: 400,
            height: 300,
            alignSelf: "center",
          }}
        >
          <Image
            style={styles.image}
            resizeMode="contain"
            source={require("../assets/home.png")}
          />
        </View>

        <View
          style={{
            width: 400,
            height: 150,
            marginLeft: 20,
            alignSelf: "center",
          }}
        >
          <Image
            style={styles.image}
            resizeMode="contain"
            source={require("../assets/home-logo.png")}
          />
        </View>

        <Formik
          initialValues={initialValues}
          onSubmit={(values) => handleLogin(values)}
        >
          {(formik) => {
            return (
              <View style={styles.formContainer}>
                <FormikControl
                  control="input"
                  label="Email"
                  name="email"
                  mode="outlined"
                  onChangeText={formik.handleChange("email")}
                  value={formik.values.email}
                />
                <FormikControl
                  control="input"
                  label="Password"
                  name="password"
                  mode="outlined"
                  onChangeText={formik.handleChange("password")}
                  value={formik.values.password}
                  secureTextEntry={true}
                />
                <Button
                  disabled={!formik.isValid}
                  style={{ marginBottom: 10, marginTop: 10 }}
                  mode="contained"
                  onPress={() => formik.handleSubmit()}
                >
                  Login
                </Button>
                <Button mode="outlined">Register</Button>
              </View>
            );
          }}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: colors.white,
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  formContainer: {
    alignSelf: "stretch",
    padding: 20,
  },
});
