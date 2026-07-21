import styles from "./ForgotPassword.module.css";
import PandaLogo from "../../assets/Panda.png";

import { useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import { URL } from "../../../config";
import { useNavigate, Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { forgotPasswordSchema } from "../../validation/forgotPasswordSchema";
import { useForgotPassword } from "../../hooks/useForgotPassword";


function ForgotPassword() {

  const navigate = useNavigate();

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
const [sendingOTP, setSendingOTP] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState:{errors},
  } = useForm({

    resolver:yupResolver(
      forgotPasswordSchema
    ),

  });


  const login = watch("login");


  const {mutate,isPending}=useForgotPassword();



  const sendOTP = async () => {
  try {
    if (!login) {
      return toast.error("Enter email or phone first");
    }

    setSendingOTP(true); // <-- Add this

    const response = await axios.post(
      `${URL}/user/sendforgototp`,
      {
        login,
      }
    );

    toast.success(response.data);
    setOtpSent(true);

  } catch (error) {
    toast.error(
      error?.response?.data ||
      "OTP sending failed"
    );
  } finally {
    setSendingOTP(false);
  }
};
  const verifyOTP = async () => {
  try {

    if (!otp) {
      return toast.info("Enter OTP");
    }

    const response = await axios.post(
      `${URL}/user/verifyforgototp`,
      {
        login,
        otp,
      }
    );

    setEmailVerified(true);

    toast.success(
      response.data.message || "OTP Verified Successfully 🎉"
    );

  } catch (error) {

    setEmailVerified(false);

    toast.error(
      error?.response?.data?.message || "Invalid OTP"
    );

  }
};
  const onSubmit=(data)=>{


    if(!emailVerified){

      return toast.error(
        "Please verify OTP first"
      );

    }


    mutate(
      {
        login:data.login,
        password:data.password,
        confirmPassword:data.confirmPassword
      },

      {

        onSuccess:()=>{

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

    <div className={styles["forgot-container"]}>

      <div className={styles["forgot-card"]}>


        {/* LEFT SECTION */}

        <div className={styles["forgot-left"]}>

          <div
            className={styles["forgot-orb-1"]}
          />


          <div
            className={styles["forgot-orb-2"]}
          />


          <div
            className={styles["panda-wrap"]}
          >


            <img
              src={PandaLogo}
              alt="PandaChat mascot"
              className={styles["panda-body-img"]}
            />


            <h2
              className={
                styles["forgot-left-title"]
              }
            >

              Reset your
              <br />

              <em>Password</em> 🔐

            </h2>


            <p
              className={
                styles["forgot-left-sub"]
              }
            >

              Recover your account and get back
              to chatting with your friends.

            </p>
                        <div className={styles["forgot-steps"]}>
              <div>
                <span className={styles["step-num"]}>
                  1
                </span>
                Enter your email or phone
              </div>
              <div>
                <span className={styles["step-num"]}>
                  2
                </span>
                Set a new password
              </div>
              <div>
                <span className={styles["step-num"]}>
                  3
                </span>
                Back to chatting!
              </div>
            </div>
          </div>
        </div>
        {/* RIGHT SECTION */}
        <div className={styles["forgot-right"]}>
          <div className={styles["forgot-right-bg"]}/>
          <div className={styles["brand-top"]}>
            <div className={styles["brand-icon"]}>
              <img
                src={PandaLogo}
                alt="Panda Logo"
                className={styles["brand-panda-image"]}
              />
            </div>
            <span className={styles["brand-label"]}>
              Panda<span>Chat</span>.
            </span>
          </div>
          <div className={styles["panda-chat-wrap"]}>
            <div className={styles["panda-chat-av"]}>
              <img
                src={PandaLogo}
                alt="Panda"
                className={styles["chat-panda-image"]}
              />
            </div>
            <div className={styles["panda-bubble"]}>
              <p>
                Forgot your password? 🐾
                <br/>
                No worries! Let's get you back in{" "}
                <strong>quickly</strong>.
              </p>
            </div>
          </div>
          <h2>
            Forgot Password
          </h2>
          <p className={styles["sub"]}>
            Enter your details below to reset your password
          </p>
          <form
            className={styles["forgot-form"]}
            onSubmit={handleSubmit(onSubmit)}
          >
            
            
              
              <div className={styles["email-row"]}>

  <input
    placeholder="Email or Phone"
    {...register("login")}
  />

  {!emailVerified && ( 
    <button
  type="button"
  className={styles["otp-button"]}
  onClick={sendOTP}
  disabled={otpSent || sendingOTP}
>
  {sendingOTP ? (
    <CircularProgress
      size={18}
      thickness={5}
      sx={{ color: "#fff" }}
    />
  ) : otpSent ? (
    "OTP Sent"
  ) : (
    "Send OTP"
  )}
</button>

  )}
</div>

<p className={styles["forgot-error"]}>
  {errors.login?.message}
</p>

{otpSent && !emailVerified && (
  <div className={styles["verify-section"]}>

    <input
      type="text"
      placeholder="Enter OTP"
      value={otp}
      onChange={(e) => setOtp(e.target.value)}
    />

    <button
      type="button"
      className={styles["verify-button"]}
      onClick={verifyOTP}
    >
      Verify OTP
    </button>

  </div>
)}

                        <input
              type="password"
              disabled={!emailVerified}
              placeholder="New Password"
              {...register("password")}
            />
            <p className={styles["forgot-error"]}>
              {errors.password?.message}
            </p>
            <input
              type="password"
              disabled={!emailVerified}
              placeholder="Confirm Password"
              {...register("confirmPassword")}
            />
            <p className={styles["forgot-error"]}>
              {errors.confirmPassword?.message}
            </p>
            <button
              className={styles["forgot-button"]}
              type="submit"
              disabled={isPending}
            >
              {isPending
                ? "Updating..."
                : "Update Password"}
            </button>
          </form>
          <div className={styles["forgot-link"]}>
            <Link to="/login">
              ← Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ForgotPassword;