import "../Auth.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../validation/registerSchema";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import { useRegister } from "../hooks/useRegister";

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const {
    mutate,
    isPending,
  } = useRegister();

  const onSubmit = async (data) => {
    try {
      const res = await axios.get(
        "https://6985ac756964f10bf2540df1.mockapi.io/user"
      );

      const users = res.data;

      const usernameExists = users.some(
        (user) =>
          user.username?.toLowerCase() ===
          data.username.toLowerCase()
      );

      const emailExists = users.some(
        (user) =>
          user.email?.toLowerCase() ===
          data.email.toLowerCase()
      );

      const phoneExists = users.some(
        (user) =>
          user.phone === data.phone
      );

      if (usernameExists) {
        setError("username", {
          type: "manual",
          message: "Username already exists",
        });
        return;
      }

      if (emailExists) {
        setError("email", {
          type: "manual",
          message: "Email already registered",
        });
        return;
      }

      if (phoneExists) {
        setError("phone", {
          type: "manual",
          message: "Phone number already registered",
        });
        return;
      }

      const payload = {
        username: data.username,
        email: data.email,
        phone: data.phone,
        password: data.password,
      };

      mutate(payload, {
        onSuccess: () => {
          toast.success(
            `User successfully Sign-up in`
          );

          setTimeout(() => {
            navigate("/login");
          }, 1500);
        },

        onError: (error) => {
          toast.error(
            error?.response?.data?.message ||
              "Registration Failed"
          );
        },
      });
    } catch (error) {
      toast.error(
        "Unable to verify user"
      );
    }
  };

  return (
    <div className="container">
      <div className="auth-card">

        <div className="auth-image">
          <div className="overlay">

            <h1>Join Chat Connect ✨</h1>

            <p>
              Create your account and start
              chatting, sharing moments and
              enjoying conversations with
              your friends.
            </p>

            <div className="feature-box">
              <div>💬 Real-time Chat</div>
              <div>🌎 Connect Anywhere</div>
              <div>🚀 Fast & Secure</div>
            </div>

          </div>
        </div>

        <div className="form-section">

          <h2>Create Account 🎉</h2>

          <form
            className="form"
            onSubmit={handleSubmit(onSubmit)}
          >

            <input
              type="text"
              placeholder="Username"
              {...register("username")}
            />
            <p className="error">
              {errors.username?.message}
            </p>

            <input
              type="email"
              placeholder="Email"
              {...register("email")}
            />
            <p className="error">
              {errors.email?.message}
            </p>

            <input
              type="text"
              placeholder="Phone Number"
              {...register("phone")}
            />
            <p className="error">
              {errors.phone?.message}
            </p>

            <input
              type="password"
              placeholder="Password"
              {...register("password")}
            />
            <p className="error">
              {errors.password?.message}
            </p>

            <input
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword")}
            />
            <p className="error">
              {errors.confirmPassword?.message}
            </p>

            <button
              type="submit"
              disabled={isPending}
            >
              {isPending
                ? "Creating..."
                : "Register"}
            </button>

            <div className="link">
              <Link to="/login">
                Already have an account? Login
              </Link>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
}

export default Register;