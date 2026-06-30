import "../css/ForgotPassword.css";
import PandaLogo from "../assets/Panda.png";
import { useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import { URL } from "../../config";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordSchema } from "../validation/forgotPasswordSchema";
import { useForgotPassword } from "../hooks/useForgotPassword";

function ForgotPassword() {
  const navigate = useNavigate();

  const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState("");
    const [emailVerified, setEmailVerified] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });
   const login = watch("login");

  const { mutate, isPending } = useForgotPassword();
  const sendOTP = async () => {
  try {
    if (!login) {
      return toast.error("Enter email or phone first");
    }

    const response = await axios.post(
      `${URL}/user/sendforgototp`,
      {
        login
      }
    );

    toast.success(response.data);
    console.log(response.data);
    setOtpSent(true);

  } catch(error) {
    toast.error(
      error?.response?.data ||
      "OTP sending failed",
      console.log(error?.response?.data)
    );
  }
  
};
    
  
    const verifyOTP = async () => {
  try {

    if(!otp){
      return toast.info("Enter OTP");
    }

    const response = await axios.post(
      `${URL}/user/verifyforgototp`,
      {
        login,
        otp
      }
    );

    toast.success(
      response.data.message ||
      "OTP Verified"
    );

    setEmailVerified(true);

  } catch(error){

    setEmailVerified(false);

    toast.error(
      error?.response?.data?.message ||
      "Invalid OTP"
    );
  }
};

  const onSubmit = (data) => {
    mutate(
      {
        login: data.login,
        password: data.password,
        confirmPassword: data.confirmPassword,
      },
      
      {
        onSuccess: () => {
          toast.success("Password Updated Successfully 🎉");
          navigate("/login");
        },
        onError: (error) => {
          toast.error(
            error?.response?.data || "Password update failed"
          );
        },
      }
    );
    if(!emailVerified){
    return toast.error(
      "Please verify OTP first"
    );
  }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        {/* LEFT SECTION */}
        <div className="forgot-left">
          <div className="forgot-orb-1" />
          <div className="forgot-orb-2" />

          <div className="panda-wrap">
            <img
              src={PandaLogo}
              alt="PandaChat mascot"
              className="panda-body-img"
            />

            <h2 className="forgot-left-title">
              Reset your
              <br />
              <em>Password</em> 🔐
            </h2>

            <p className="forgot-left-sub">
              Recover your account and get back to chatting with your friends.
            </p>

            <div className="forgot-steps">
              <div>
                <span className="step-num">1</span>
                Enter your email or phone
              </div>

              <div>
                <span className="step-num">2</span>
                Set a new password
              </div>

              <div>
                <span className="step-num">3</span>
                Back to chatting!
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="forgot-right">
          <div className="forgot-right-bg" />

          <div className="brand-top">
            <div className="brand-icon">
              <img
                src={PandaLogo}
                alt="Panda Logo"
                className="brand-panda-image"
              />
            </div>

            <span className="brand-label">
              Panda<span>Chat</span>.
            </span>
          </div>

          <div className="panda-chat-wrap">
            <div className="panda-chat-av">
              <img
                src={PandaLogo}
                alt="Panda"
                className="chat-panda-image"
              />
            </div>

            <div className="panda-bubble">
              <p>
                Forgot your password? 🐾
                <br />
                No worries! Let's get you back in{" "}
                <strong>quickly</strong>.
              </p>
            </div>
          </div>

          <h2>Forgot Password</h2>

          <p className="sub">
            Enter your details below to reset your password
          </p>

          <form
            className="forgot-form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              placeholder="Email or Phone"
              {...register("login")}
            />
            <p className="forgot-error">
              {errors.login?.message}
            </p>

 <div className="otp-section">
              {!emailVerified && (
                <button
                  type="button"
                  className="otp-button"
                  onClick={sendOTP}
                  disabled={otpSent}
                >
                  {otpSent
                    ? "OTP Sent"
                    : "Send OTP"}
                </button>
              )}
              {otpSent && !emailVerified && (
                <div className="verify-section">
                  <input
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value)
                    }
                  />

                  <button
                    type="button"
                    className="verify-button"
                    onClick={verifyOTP}
                  >
                    Verify OTP
                  </button>
                </div>
              )}

              {emailVerified && (
                <p className="verified-message">
                  ✅ Email Verified Successfully
                </p>
              )}
            </div>


            <input
              type="password"
              disabled={!emailVerified}
              placeholder="New Password"
              {...register("password")}
            />
            <p className="forgot-error">
              {errors.password?.message}
            </p>

            <input
              type="password"
                 disabled={!emailVerified}
              placeholder="Confirm Password"
              {...register("confirmPassword")}
            />
            <p className="forgot-error">
              {errors.confirmPassword?.message}
            </p>

            <button
              className="forgot-button"
              type="submit"
              disabled={isPending}
            >
              {isPending ? "Updating..." : "Update Password"}
            </button>
          </form>

          <div className="forgot-link">
            <Link to="/login">← Back to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;