import "../css/ForgotPassword.css";
import PandaLogo from "../assets/Panda.png";

import { toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordSchema } from "../validation/forgotPasswordSchema";
import { useForgotPassword } from "../hooks/useForgotPassword";

/* ── Reusable panda face SVG ── */


function ForgotPassword() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(forgotPasswordSchema) });

  const { mutate, isPending } = useForgotPassword();

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
          toast.error(error?.response?.data || "Password update failed");
        },
      }
    );
  };

  return (
    <div className="forgot-container">
      <div className="forgot-card">

        {/* ══ LEFT — panda illustration + steps ══ */}
        <div className="forgot-left">
          <div className="forgot-orb-1" />
          <div className="forgot-orb-2" />

          <div className="panda-wrap">

            {/* Your Panda.png — falls back to inline SVG if path differs */}
            <img
 src={PandaLogo}
 alt="PandaChat mascot"
 className="panda-body-img"
/>
            <h2 className="forgot-left-title">
              Reset your<br /><em>Password</em> 🔐
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

        {/* ══ RIGHT — PandaChat brand + form ══ */}
        <div className="forgot-right">
          <div className="forgot-right-bg" />

          {/* PandaChat brand */}
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

          {/* Panda chat bubble */}
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
                Forgot your password? 🐾<br />
                No worries! Let's get you back in <strong>quickly</strong>.
              </p>
            </div>
          </div>

          <h2>Forgot Password</h2>
          <p className="sub">Enter your details below to reset your password</p>

          <form className="forgot-form" onSubmit={handleSubmit(onSubmit)}>

            <input
              placeholder="Email or Phone"
              {...register("login")}
            />
            <p className="forgot-error">{errors.login?.message}</p>

            <input
              type="password"
              placeholder="New Password"
              {...register("password")}
            />
            <p className="forgot-error">{errors.password?.message}</p>

            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
            />
            <p className="forgot-error">{errors.confirmPassword?.message}</p>

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