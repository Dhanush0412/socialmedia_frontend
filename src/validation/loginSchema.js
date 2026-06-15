import * as yup from "yup";

export const loginSchema = yup.object({

  login: yup
    .string()
    .required(
      "Username, Email or Phone Number is required"
    )

    .test(
      "username-email-phone",

      "Enter a valid Username, Email or Phone Number",

      (value) => {

        if (!value)
          return false;

        const emailRegex =
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const phoneRegex =
          /^[0-9]{10}$/;

        const usernameRegex =
          /^[a-zA-Z0-9_]{3,20}$/;

        return (
          usernameRegex.test(
            value
          ) ||

          emailRegex.test(
            value
          ) ||

          phoneRegex.test(
            value
          )
        );
      }
    ),

  password: yup
    .string()
    .required(
      "Password is required"
    )

});