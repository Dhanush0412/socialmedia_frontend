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
    formState: {
      errors,
    },
  } = useForm({
    resolver:
      yupResolver(
        loginSchema
      ),
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
        <div className="auth-image">

          <div className="chat-logo">

            <div className="logo-circle">
              💬
            </div>

            <div className="sound-wave">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>

          </div>

          <div className="overlay">

            <h1>
              Welcome Back
            </h1>

            <p>
              Login and continue
              chatting with friends.
            </p>

          </div>

        </div>

        <div className="form-section">

          <h2>
            Sign In
          </h2>

          <form
            className="form"
            onSubmit={handleSubmit(
              onSubmit
            )}
          >

            <input
              type="text"
              placeholder="Email or Phone"
              {...register(
                "login"
              )}
            />

            <p className="error">
              {
                errors
                  .login
                  ?.message
              }
            </p>

            <input
              type="password"
              placeholder="Password"
              {...register(
                "password"
              )}
            />

            <p className="error">
              {
                errors
                  .password
                  ?.message
              }
            </p>
            <div className="link">

              <Link
                to="/forgot-password"
              >

                Forgot Password?

              </Link>

            </div>


            <button
              type="submit"
              disabled={
                isPending
              }
            >
              {
                isPending
                  ? "Checking..."
                  : "Login"
              }
            </button>

            <div className="link">

              <Link
                to="/register"
              >
                New user?
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