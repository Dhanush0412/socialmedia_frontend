import * as yup from "yup";

export const registerSchema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Minimum 3 characters"),

  email: yup
    .string()
    .email("Invalid Email")
    .required("Email is required"),
  phone:
    yup
      .string()
      .required(
        "Phone number is required"
      )
      .matches(
        /^[0-9]\d{9}$/,
        "Enter valid phone number"
      ),


  password: yup
    .string()
    .required("Password is required")
    .min(8, "Minimum 8 characters")
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/,
      "Must contain uppercase, lowercase, number and special character"
    ),

  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref("password")],
      "Passwords must match"
    )
    .required("Confirm Password is required"),
});