import React from "react";
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import { ErrorMessage, Field } from "formik";

import colors from "../../configs/colors";

import TextError from "./TextError";

const Input = (props) => {
  const { label, name, ...rest } = props;
  return (
    <View>
      <TextInput
        theme={{
          colors: {
            placeholder: colors.primary,
            text: colors.black,
            background: colors.white,
          },
        }}
        id={name}
        name={name}
        label={label}
        {...rest}
      />
      <ErrorMessage name={name} component={TextError} />
    </View>
  );
};

export default Input;
