import React from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Content,
  Item,
  Text,
  Input,
  Button,
  Thumbnail,
  View,
} from "native-base";
import { Formik } from "formik";

//CONFIG
import { API } from "../configs/API";

const Register = ({ navigation }) => {
  const initialValues = { email: "", password: "", fullname: "" };

  const handleRegister = async (values) => {
    try {
      const data = {
        email: values.email,
        password: values.password,
        fullname: values.fullname,
        profpic:
          "https://res.cloudinary.com/satria-img/image/upload/v1606645803/satriayud/no-person-profile-pic_k3ijd5.png",
      };
      const config = { headers: { "Content-Type": "application/json" } };
      const response = await API.post("/register", data, config);
      if (response.status === 200) {
        alert("Registration Success");
        props.navigation.navigate("Login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container style={styles.container}>
      <Content>
        <Thumbnail
          style={{ width: 320, height: 200, marginLeft: 10, marginTop: 50 }}
          square
          source={require("../assets/home-logo.png")}
        />

        <Formik
          initialValues={initialValues}
          onSubmit={(values) => handleRegister(values)}
        >
          {(props) => (
            <View>
              <Item>
                <Input
                  style={{ marginTop: 30 }}
                  placeholder="Email"
                  onChangeText={props.handleChange("email")}
                  value={props.values.email}
                />
              </Item>
              <Item>
                <Input
                  secureTextEntry={true}
                  placeholder="Password"
                  onChangeText={props.handleChange("password")}
                  value={props.values.password}
                />
              </Item>
              <Item last>
                <Input
                  placeholder="Fullname"
                  onChangeText={props.handleChange("fullname")}
                  value={props.values.fullname}
                />
              </Item>
              <Button
                onPress={() => props.handleSubmit()}
                full
                style={styles.button}
                info
              >
                <Text>Register</Text>
              </Button>
              <Text
                style={{
                  display: "flex",
                  color: "#15a3b9",
                  marginLeft: "44%",
                  marginTop: 10,
                }}
                onPress={() => navigation.navigate("Login")}
              >
                Login
              </Text>
            </View>
          )}
        </Formik>
      </Content>
    </Container>
  );
};

export default Register;

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    backgroundColor: "#15a3b9",
  },
  container: {
    padding: 20,
  },
});
