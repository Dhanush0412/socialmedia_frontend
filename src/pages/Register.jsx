import "../css/register.css";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { registerSchema } from "../validation/registerSchema";

import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useRegister } from "../hooks/useRegister";

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const { mutate, isPending } = useRegister();

  const onSubmit = (data) => {
    const payload = {
      username: data.username,
      email: data.email,
      phone: data.phone,
      password: data.password,
    };

    mutate(payload, {
      onSuccess: () => {
        toast.success("Account created successfully");

        setTimeout(() => {
          navigate("/login");
        }, 1200);
      },

      onError: (error) => {
        console.log("Register Error:", error);

        toast.error(
          error?.response?.data || "Registration failed"
        );
      },
    });
  };

  return (
    <div className="register-container">
      <div className="register-card">

        {/* LEFT SIDE */}
        <div className="register-left">
          <div className="orb orb-one"></div>
          <div className="orb orb-two"></div>

          <div className="left-content">

            <div className="brand">
              <div className="brand-icon">💬</div>

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
              Create your account and connect with friends using
              private messages and group chats.
            </p>

            <div className="features">

              <div className="feature">
                <div>💬</div>
                <span>Instant Messaging</span>
              </div>

              <div className="feature">
                <div>👥</div>
                <span>Group Chat</span>
              </div>

              <div className="feature">
                <div>🔒</div>
                <span>Secure Communication</span>
              </div>

            </div>

            <div className="chat-preview">

              <div className="chat-msg receive">
                Welcome to PandaChat 👋
              </div>

              <div className="chat-msg send">
                Let's connect 🚀
              </div>

              <div className="chat-msg receive">
                Create groups and chat easily
              </div>

            </div>

          </div>
        </div>


        {/* RIGHT SIDE */}
        <div className="register-form-section">

          <h2>Create Account</h2>

          <p className="subtitle">
            Enter your details to start chatting
          </p>


          <form
            className="register-form"
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
              type="number"
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


            <button disabled={isPending}>
              {isPending ? "Creating..." : "Create Account"}
            </button>


            <div className="bottom-link">
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