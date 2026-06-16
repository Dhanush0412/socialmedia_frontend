import "../css/register.css";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { registerSchema } from "../validation/registerSchema";

import {
  useNavigate,
  Link,
} from "react-router-dom";

import { toast } from "react-toastify";

import { useRegister } from "../hooks/useRegister";


function Register() {

  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    formState:{
      errors
    }
  } = useForm({

    resolver:
      yupResolver(registerSchema)

  });


  const {
    mutate,
    isPending
  } = useRegister();



  const onSubmit = (data)=>{


    const payload={

      username:data.username,

      email:data.email,

      phone:data.phone,

      password:data.password

    };



    mutate(payload,{

      onSuccess:()=>{


        toast.success(
          "Account created successfully 🎉"
        );
console.log(URL);

        setTimeout(()=>{

          navigate("/login");

        },1500);


      },


      onError:(error)=>{


        console.log(
          "Register Error:",
          error
        );


        toast.error(

          error?.response?.data ||
          "Registration Failed"

        );


      }


    });


  };



  return (

    <div className="register-container">


      <div className="register-card">



        <div className="register-image">

          <div className="register-overlay">


            <h1>
              Join Chat Connect ✨
            </h1>


            <p>
              Create your account and
              start chatting with your
              friends.
            </p>



            <div className="feature-box">


              <div>
                💬 Real Time Chat
              </div>


              <div>
                🌎 Connect Anywhere
              </div>


              <div>
                🚀 Fast & Secure
              </div>


            </div>


          </div>


        </div>





        <div className="register-form-section">


          <h2>
            Create Account 🎉
          </h2>



          <form
            className="register-form"
            onSubmit={
              handleSubmit(onSubmit)
            }
          >



            <input

              type="text"

              placeholder="Username"

              {...register("username")}

            />


            <p className="error">
              {
                errors.username?.message
              }
            </p>





            <input

              type="email"

              placeholder="Email"

              {...register("email")}

            />


            <p className="error">
              {
                errors.email?.message
              }
            </p>






            <input

              type="text"

              placeholder="Phone Number"

              {...register("phone")}

            />


            <p className="error">
              {
                errors.phone?.message
              }
            </p>






            <input

              type="password"

              placeholder="Password"

              {...register("password")}

            />


            <p className="error">
              {
                errors.password?.message
              }
            </p>







            <input

              type="password"

              placeholder="Confirm Password"

              {...register("confirmPassword")}

            />


            <p className="error">
              {
                errors.confirmPassword?.message
              }
            </p>






            <button className="register-button"

              type="submit"

              disabled={isPending}

            >

              {
                isPending
                ?
                "Creating..."
                :
                "Register"
              }


            </button>





            <div className="link">

              <Link to="/login">

                Already have account?
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