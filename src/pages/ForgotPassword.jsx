import "../css/ForgotPassword.css";
import { URL } from "../../config";

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

 
 const onSubmit = (data)=>{


    mutate(
        {

            login:data.login,

            password:data.password,

            confirmPassword:data.confirmPassword

        },

        {

            onSuccess:(response)=>{


                toast.success(
                    "Password Updated Successfully 🎉"
                );


                navigate("/login");


            },


            onError:(error)=>{


                toast.error(

                    error?.response?.data ||
                    "Password update failed"

                );


            }

        }

    );


};
      

  return (

    <div className="forgot-container">

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
            className="forgot-form"
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

            <p className="forgot-error">
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

            <p className="forgot-error">
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

            <p className="forgot-error">
              {
                errors
                  .confirmPassword
                  ?.message
              }
            </p>

            <button className="forgot-button"
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

          <div className="forgot-link">

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