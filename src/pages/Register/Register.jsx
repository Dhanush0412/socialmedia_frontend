import styles from "./Register.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../validation/registerSchema";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import { useRegister } from "../../hooks/useRegister";
import { URL } from "../../../config";

function Register() {
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
    resolver: yupResolver(registerSchema),
    mode: "onChange",
  });

  const email = watch("email");

  const { mutate, isPending } = useRegister();

  const sendOTP = async () => {
    try {
      if (!email) {
        return toast.error("Enter email first");
      }

      const response = await axios.post(
        `${URL}/user/sentotp`,
        { email }
      );

      toast.success(response.data);
      setOtpSent(true);
    } catch (error) {
      toast.error(
        error?.response?.data || "OTP sending failed"
      );
    }
  };

  const verifyOTP = async () => {
    try {
      if (!otp) {
        return toast.error("Enter OTP");
      }

      const response = await axios.post(
        `${URL}/user/verifyotp`,
        {
          email,
          otp,
        }
      );

      if (
        response.data
          .toLowerCase()
          .includes("verified")
      ) {
        toast.success("Email Verified Successfully");
        setEmailVerified(true);
      } else {
        setEmailVerified(false);
        toast.error("Invalid OTP");
      }
    } catch (error) {
      setEmailVerified(false);

      toast.error(
        error?.response?.data?.message ||
          error?.response?.data ||
          "Invalid OTP"
      );
    }
  };
    const onSubmit = (data) => {
    if (!emailVerified) {
      return toast.error(
        "Please verify your email first"
      );
    }

    const payload = {
      username: data.username,
      email: data.email,
      phone: data.phone,
      password: data.password,
    };

    mutate(payload, {
      onSuccess: (response) => {
        toast.success(response);

        setTimeout(() => {
          navigate("/login");
        }, 1200);
      },

      onError: (error) => {
        toast.error(
          error?.response?.data ||
            "Registration failed"
        );
      },
    });
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerCard}>

        {/* LEFT SIDE */}

        <div className={styles.registerLeft}>

          <div
            className={`${styles.orb} ${styles.orbOne}`}
          ></div>

          <div
            className={`${styles.orb} ${styles.orbTwo}`}
          ></div>

          <div className={styles.leftContent}>

            <div className={styles.brandTop}>

              <div className={styles.brandImage}>
                💬
              </div>

              <h3>
                Panda<span>Chat</span>
              </h3>

            </div>

            <h1>
              Join the
              <br />
              conversation
              <br />
              <span>today.</span>
            </h1>

            <p>
              Create your account and connect
              with friends using private
              messages and group chats.
            </p>

            <div className={styles.features}>

              <div className={styles.feature}>
                <div>💬</div>
                <span>Instant Messaging</span>
              </div>

              <div className={styles.feature}>
                <div>👥</div>
                <span>Group Chat</span>
              </div>

              <div className={styles.feature}>
                <div>🔒</div>
                <span>Secure Communication</span>
              </div>

            </div>

            <div className={styles.chatPreview}>

              <div
                className={`${styles.chatMsg} ${styles.receive}`}
              >
                Welcome to PandaChat 👋
              </div>

              <div
                className={`${styles.chatMsg} ${styles.send}`}
              >
                Let's connect 🚀
              </div>

              <div
                className={`${styles.chatMsg} ${styles.receive}`}
              >
                Create groups and chat easily
              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div
          className={styles.registerFormSection}
        >

          <h2>Create Account</h2>

          <p className={styles.subtitle}>
            Enter your details to start
            chatting
          </p>

          <form
            className={styles.registerForm}
            onSubmit={handleSubmit(onSubmit)}
          >
                      <input
              type="text"
              placeholder="Username"
              {...register("username")}
            />

            <p className={styles.error}>
              {errors.username?.message}
            </p>

            <div className={styles.emailRow}>

              <input
                type="email"
                placeholder="Email"
                {...register("email")}
              />

              {!emailVerified && (
                <button
                  type="button"
                  className={styles.otpButton}
                  onClick={sendOTP}
                  disabled={otpSent}
                >
                  {otpSent ? "OTP Sent" : "Send OTP"}
                </button>
              )}

            </div>

            <p className={styles.error}>
              {errors.email?.message}
            </p>

            {otpSent && !emailVerified && (

              <div className={styles.verifySection}>

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
                  className={styles.verifyButton}
                  onClick={verifyOTP}
                >
                  Verify
                </button>

              </div>

            )}

            {emailVerified && (

              <p
                className={styles.verifiedMessage}
              >
                ✅ Email Verified Successfully
              </p>

            )}

            <input
              type="number"
              placeholder="Phone Number"
              disabled={!emailVerified}
              {...register("phone")}
            />

            <p className={styles.error}>
              {errors.phone?.message}
            </p>

            <input
              type="password"
              placeholder="Password"
              disabled={!emailVerified}
              {...register("password")}
            />

            <p className={styles.error}>
              {errors.password?.message}
            </p>

            <input
              type="password"
              placeholder="Confirm Password"
              disabled={!emailVerified}
              {...register("confirmPassword")}
            />

            <p className={styles.error}>
              {errors.confirmPassword?.message}
            </p>

            <button
              type="submit"
              disabled={
                isPending || !emailVerified
              }
            >
              {isPending
                ? "Creating..."
                : "Create Account"}
            </button>

            <div className={styles.bottomLink}>

              Already have account?

              <Link to="/login">
                Login
              </Link>

            </div>
                      </form>

        </div>

      </div>

    </div>
  );
}

export default Register;