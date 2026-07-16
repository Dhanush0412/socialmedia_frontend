import styles from "./login.module.css";
import PandaLogo from "../../assets/Panda.png";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../validation/loginSchema";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/authSlice";
import { toast } from "react-toastify";
import { useLogin } from "../../hooks/useLogin";

function Login(){

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const {
    register,
    handleSubmit,
    formState:{errors}
  }=useForm({
    resolver:yupResolver(loginSchema)
  });

  const {mutate,isPending}=useLogin();

  const onSubmit=(data)=>{

    mutate(
      {
        login:data.login,
        password:data.password
      },
      {
        onSuccess:(response)=>{

          dispatch(loginSuccess(response));

          localStorage.setItem(
            "token",
            response.token
          );

          localStorage.setItem(
            "userid",
            response.userid
          );

          localStorage.setItem(
            "username",
            response.username
          );

          toast.success(
            "Logged-in Successfully"
          );

          if(response.profileexists){

            localStorage.setItem(
              "profileid",
              response.profileid
            );

            navigate("/dashboard");

          }
          else{

            localStorage.removeItem(
              "profileid"
            );

            navigate("/Profile");

          }

        },

        onError:(error)=>{

          toast.error(
            error?.response?.data?.message ||
            "Invalid login details"
          );

        }
      }
    );

  };


  return(
    <div className={styles["container"]}>

      <div className={styles["auth-card"]}>

        {/* LEFT */}

        <div className={styles["auth-left"]}>

          <div className={styles["orb-1"]}></div>

          <div className={styles["orb-2"]}></div>

          <div className={styles["orb-3"]}></div>

          <div className={styles["logo-block"]}>

            <div className={styles["logo-ring"]}>

              <div className={styles["logo-ring-inner"]}>

                <svg
                  viewBox="0 0 32 32"
                  fill="none"
                >

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

            <h1 className={styles["left-brand-name"]}>
              Welcome <em>Back</em>
            </h1>

            <p className={styles["left-brand-tag"]}>
              Continue your conversations
            </p>
                        <div className={styles["login-content"]}>

              <div className={styles["login-message-card"]}>

                <div className={styles["chat-icon"]}>
                  💬
                </div>

                <div>

                  <h4>
                    Your chats are waiting
                  </h4>

                  <p>
                    Open your conversations and continue where you stopped.
                  </p>

                </div>

              </div>


              <div className={styles["login-message-card"]}>

                <div className={styles["chat-icon"]}>
                  ⚡
                </div>

                <div>

                  <h4>
                    Quick messaging
                  </h4>

                  <p>
                    Send messages faster with smooth experience.
                  </p>

                </div>

              </div>


              <div className={styles["login-message-card"]}>

                <div className={styles["chat-icon"]}>
                  🔐
                </div>

                <div>

                  <h4>
                    Secure communication
                  </h4>

                  <p>
                    Your personal conversations stay private.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* RIGHT */}

        <div className={styles["form-section"]}>

          <div className={styles["right-bg"]}></div>


          <div className={styles["brand-top"]}>

            <div className={styles["brand-icon"]}>

              <img
                src={PandaLogo}
                alt="Panda"
                className={styles["panda-logo"]}
              />

            </div>


            <div className={styles["brand-content"]}>

              <h3 className={styles["brand-title"]}>
                Panda<span>Chat</span>
              </h3>

              <p className={styles["brand-subtitle"]}>
                Smart messaging companion
              </p>

            </div>

          </div>


          <div className={styles["form-center"]}>


            <div className={styles["panda-chat-wrap"]}>


              <div className={styles["panda-chat-av"]}>

                <img
                  src={PandaLogo}
                  alt="Panda"
                  className={styles["panda-chat-image"]}
                />

              </div>


              <div className={styles["panda-bubble"]}>

                <p>
                  Hey Buddy! 🐾 <strong>Sign in</strong> to keep chatting.
                  <br/>
                  Your friends are waiting for you!
                </p>

              </div>


            </div>


            <h2>
              Welcome back Buddy 👋
            </h2>


            <p className={styles["sub"]}>
              Sign in to continue your conversations
            </p>


            <form
              className={styles["form"]}
              onSubmit={handleSubmit(onSubmit)}
            >


              <input
                type="text"
                placeholder="Email or Phone"
                {...register("login")}
              />


              <p className={styles["error"]}>
                {errors.login?.message}
              </p>


              <input
                type="password"
                placeholder="Password"
                {...register("password")}
              />


              <p className={styles["error"]}>
                {errors.password?.message}
              </p>
                            <div className={styles["forgot-row"]}>

                <Link to="/forgot-password">
                  Forgot password?
                </Link>

              </div>


              <button
                disabled={isPending}
              >
                {
                  isPending
                    ? "Checking..."
                    : "Sign In"
                }
              </button>


              <div className={styles["divider"]}>

                <div className={styles["divider-line"]}></div>


                <span className={styles["divider-text"]}>
                  Don't have an account?
                </span>


                <div className={styles["divider-line"]}></div>

              </div>


              <div className={styles["register-row"]}>

                <span>
                  New here?
                </span>


                <Link to="/register">
                  Create Account
                </Link>

              </div>


            </form>


          </div>


        </div>


      </div>


    </div>

  );

}


export default Login;