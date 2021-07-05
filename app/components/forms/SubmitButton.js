import { useFormikContext } from "formik";
import React from "react";
import colors from "../../config/colors";
import AppButton from "../AppButton";

const SubmitButton = ({ title, handleSubmit }) => {
  // const { handleSubmit } = useFormikContext();
  return (
    <AppButton color={colors.primary} title={title} onPress={handleSubmit} />
  );
};

export default SubmitButton;
