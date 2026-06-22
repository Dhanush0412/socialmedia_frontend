import "../css/login.css";
import PandaLogo from "../assets/Panda.png";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../validation/loginSchema";

import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { loginSuccess } from "../redux/authSlice";
import { toast } from "react-toastify";

import { useLogin } from "../hooks/useLogin";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const { mutate, isPending } = useLogin();

  const onSubmit = (data) => {
    const payload = {
      login: data.login,
      password: data.password,
    };

    mutate(payload, {
      onSuccess: (response) => {
        dispatch(loginSuccess(response));

        localStorage.setItem(
          "userid",
          response.userid
        );

        localStorage.setItem(
          "profileid",
          response.profileid || ""
        );

        localStorage.setItem(
          "user",
          JSON.stringify({
            username: response.username,
            email: response.email,
            phone: response.phone,
          })
        );

        if (response?.token) {
          localStorage.setItem(
            "token",
            response.token
          );
        }

        toast.success(
          "Logged-in Successfully"
        );

        if (response.profileexists) {
          navigate("/dashboard");
        } else {
          navigate("/profile");
        }
      },

      onError: (error) => {
        const message =
          error?.response?.data?.message ||
          "User not found or invalid password";

        toast.error(message);
      },
    });
  };

  return (
    <div className="container">
      <div className="auth-card">

        {/* LEFT SIDE */}
        <div className="auth-left">
          <div className="orb-1"></div>
          <div className="orb-2"></div>
          <div className="orb-3"></div>

          <div className="logo-block">
            <div className="logo-ring">
              <div className="logo-ring-inner">
                <svg viewBox="0 0 32 32" fill="none">
                  <path
                    d="M6 8C6 6.9 6.9 6 8 6h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H10l-4 4V8z"
                    fill="white"
                  />
                  <circle
                    cx="12"
                    cy="14"
                    r="1.5"
                    fill="#ff6b1a"
                  />
                  <circle
                    cx="16"
                    cy="14"
                    r="1.5"
                    fill="#ff6b1a"
                  />
                  <circle
                    cx="20"
                    cy="14"
                    r="1.5"
                    fill="#ff6b1a"
                  />
                </svg>
              </div>
            </div>

            <h1 className="left-brand-name">
              Welcome <em>Back</em>
            </h1>

            <p className="left-brand-tag">
              Continue your conversations
            </p>

            <div className="login-content">
              <div className="login-message-card">
                <div className="chat-icon">💬</div>
                <div>
                  <h4>Your chats are waiting</h4>
                  <p>
                    Open your conversations and
                    continue where you stopped.
                  </p>
                </div>
              </div>

              <div className="login-message-card">
                <div className="chat-icon">⚡</div>
                <div>
                  <h4>Quick messaging</h4>
                  <p>
                    Send messages faster with a
                    smooth experience.
                  </p>
                </div>
              </div>

              <div className="login-message-card">
                <div className="chat-icon">🔐</div>
                <div>
                  <h4>Secure communication</h4>
                  <p>
                    Your personal conversations
                    stay private.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="form-section">
          <div className="right-bg"></div>

          <div className="brand-top">
            <div className="brand-icon">
              <img
                src={PandaLogo}
                alt="Panda Chat Logo"
                className="panda-logo"
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
                className="panda-chat-image"
              />
            </div>

            <div className="panda-bubble">
              <p>
                Hey Buddy! 🐾{" "}
                <strong>Sign in</strong> to keep
                chatting.
                <br />
                Your friends are waiting for you!
              </p>
            </div>
          </div>

          <h2>Welcome back Buddy 👋</h2>

          <p className="sub">
            Sign in to continue your conversations
          </p>

          <form
            className="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="text"
              placeholder="Email or Phone"
              {...register("login")}
            />

            <p className="error">
              {errors.login?.message}
            </p>

            <input
              type="password"
              placeholder="Password"
              {...register("password")}
            />

            <p className="error">
              {errors.password?.message}
            </p>

            <div className="forgot-row">
              <Link to="/forgot-password">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isPending}
            >
              {isPending
                ? "Checking..."
                : "Sign In"}
            </button>

            <div className="divider">
              <div className="divider-line"></div>

              <span className="divider-text">
                Don't have an account?
              </span>

              <div className="divider-line"></div>
            </div>

            <div className="register-row">
              <span>New here?</span>

              <Link to="/register">
                Create Account
              </Link>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}

export default Login;