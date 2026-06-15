import "../Auth.css";

import axios from "axios";

import { toast } from "react-toastify";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import {
  useForm,
} from "react-hook-form";

import {
  yupResolver,
} from "@hookform/resolvers/yup";

import {
  forgotPasswordSchema,
} from "../validation/forgotPasswordSchema";

import {
  useForgotPassword,
} from "../hooks/useForgotPassword";

function ForgotPassword() {

  const navigate =
    useNavigate();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm({
    resolver:
      yupResolver(
        forgotPasswordSchema
      ),
  });

  const {
    mutate,
    isPending,
  } =
    useForgotPassword();

  const onSubmit =
    async (
      data
    ) => {

      try {

        const res =
          await axios.get(
            "https://6985ac756964f10bf2540df1.mockapi.io/user"
          );

        const user =
          res.data.find(
            (
              item
            ) =>
              item.email ===
                data.login ||

              item.phone ===
                data.login
          );

        if (
          !user
        ) {
          toast.error(
            "User not found"
          );

          return;
        }

        mutate(
          {
            id:
              user.id,

            password:
              data.password,
          },

          {

            onSuccess:
              () => {

                toast.success(
                  "Password Updated 🎉"
                );

                navigate(
                  "/login"
                );

              },

            onError:
              () => {

                toast.error(
                  "Update Failed"
                );

              },

          }
        );

      }

      catch {

        toast.error(
          "Something went wrong"
        );

      }

    };

  return (

    <div className="container">

      <div className="forgot-card">

        <div className="forgot-left">

          <div className="forgot-overlay">

            <h1>
              Reset Password 🔐
            </h1>

            <p>
              Recover your
              account and
              continue
              chatting.
            </p>

          </div>

        </div>

        <div className="forgot-right">

          <h2>
            Forgot Password
          </h2>

          <form
            className="form"
            onSubmit={
              handleSubmit(
                onSubmit
              )
            }
          >

            <input
              placeholder="Email or Phone"
              {
                ...register(
                  "login"
                )
              }
            />

            <p className="error">
              {
                errors.login
                  ?.message
              }
            </p>

            <input
              type="password"
              placeholder="New Password"
              {
                ...register(
                  "password"
                )
              }
            />

            <p className="error">
              {
                errors.password
                  ?.message
              }
            </p>

            <input
              type="password"
              placeholder="Confirm Password"
              {
                ...register(
                  "confirmPassword"
                )
              }
            />

            <p className="error">
              {
                errors
                  .confirmPassword
                  ?.message
              }
            </p>

            <button
              disabled={
                isPending
              }
            >
              {
                isPending
                  ? "Updating..."
                  : "Update Password"
              }
            </button>

          </form>

          <div className="link">

            <Link to="/login">

              Back to Login

            </Link>

          </div>

        </div>

      </div>

    </div>

  );
}

export default ForgotPassword;