import * as yup from "yup";

export const forgotPasswordSchema =
  yup.object({

    login: yup
      .string()

      .required(
        "Email or Phone Number is required"
      )

      .test(
        "email-or-phone",

        "Enter valid Email or Phone Number",

        (value) => {

          if (!value)
            return false;

          const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

          const phoneRegex =
            /^[0-9]{10}$/;

          return (
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

      .min(
        8,
        "Password must contain at least 8 characters"
      ),

    confirmPassword:
      yup
        .string()

        .required(
          "Confirm Password is required"
        )

        .oneOf(
          [
            yup.ref(
              "password"
            ),
          ],

          "Passwords do not match"
        ),

  });