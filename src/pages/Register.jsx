import "../css/register.css";
<<<<<<< HEAD
 
import {
  useForm
} from "react-hook-form";
 
import {
  yupResolver
} from "@hookform/resolvers/yup";
 
import {
  registerSchema
} from "../validation/registerSchema";
 
=======

import { useState } from "react";

import {
  useForm
} from "react-hook-form";

import {
  yupResolver
} from "@hookform/resolvers/yup";

import {
  registerSchema
} from "../validation/registerSchema";

>>>>>>> upstream/main
import {
  Link,
  useNavigate
} from "react-router-dom";
<<<<<<< HEAD
 
import {
  toast
} from "react-toastify";
 
import {
  useRegister
} from "../hooks/useRegister";
 
 
function Register(){
 
 
const navigate = useNavigate();
 
 
 
const {
register,
handleSubmit,
formState:{
errors
}
 
}=useForm({
 
resolver:yupResolver(
registerSchema
)
 
});
 
 
 
const {
mutate,
isPending
 
}=useRegister();
 
 
 
 
 
const onSubmit=(data)=>{
 
 
const payload={
 
username:data.username,
 
email:data.email,
 
phone:data.phone,
 
password:data.password
 
};
 
 
 
mutate(payload,{
 
onSuccess:()=>{
 
 
toast.success(
"Account created successfully"
);
console.log(URL)
 
setTimeout(()=>{
 
navigate("/login");
 
},1200);
 
 
},
 
 
onError:(error)=>{
console.log(
          "Register Error:",
          error
        );
 
toast.error(
 
error?.response?.data ||
"Registration failed"
 
);
 
 
=======

import {
  toast
} from "react-toastify";

import axios from "axios";

import {
  useRegister
} from "../hooks/useRegister";

import {
  URL
} from "../../config";


function Register(){

const navigate = useNavigate();


const [otpSent,setOtpSent]=useState(false);

const [otp,setOtp]=useState("");

const [emailVerified,setEmailVerified]=useState(false);



const {
register,
handleSubmit,
watch,
formState:{
errors
}

}=useForm({

resolver:yupResolver(registerSchema)

});



const email = watch("email");



const {
mutate,
isPending

}=useRegister();





// Send OTP

const sendOTP = async()=>{

try{


if(!email){

return toast.error(
"Enter email first"
);

}


let response = await axios.post(
`${URL}/user/sentotp`,
{
email
}
);


toast.success(response.data);

setOtpSent(true);



}catch(error){

toast.error(
error?.response?.data ||
"OTP sending failed"
);


}


}




// Verify OTP

const verifyOTP = async()=>{


try{


let response = await axios.post(

`${URL}/user/verifyotp`,

{
email,
otp
}

);


toast.success(response.data);


setEmailVerified(true);


}catch(error){

toast.error(
error?.response?.data ||
"Invalid OTP"
);


}


}






const onSubmit=(data)=>{


if(!emailVerified){

return toast.error(
"Please verify your email first"
);

}



const payload={


username:data.username,

email:data.email,

phone:data.phone,

password:data.password


};



mutate(payload,{


onSuccess:(response)=>{


toast.success(
response
);


setTimeout(()=>{

navigate("/login");

},1200);



},


onError:(error)=>{


toast.error(

error?.response?.data ||
"Registration failed"

);


}


});



}





return(


<div className="register-container">


<div className="register-card">



{/* LEFT SIDE */}

<div className="register-left">


<div className="orb orb-one"></div>

<div className="orb orb-two"></div>



<div className="left-content">



<div className="brand">


<div className="brand-icon">

💬

</div>


<h3>

Panda<span>Chat</span>

</h3>


</div>





<h1>

Join the
<br/>

conversation
<br/>

<span>

today.

</span>


</h1>



<p>

Create your account and connect with friends using
private messages and group chats.

</p>





<div className="features">


<div className="feature">

<div>
💬
</div>

<span>
Instant Messaging
</span>

</div>



<div className="feature">

<div>
👥
</div>

<span>
Group Chat
</span>

</div>




<div className="feature">

<div>
🔒
</div>

<span>
Secure Communication
</span>

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


<h2>
Create Account
</h2>


<p className="subtitle">

Enter your details to start chatting

</p>




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






{/* Email Verification Section */}

<div className="otp-section">

  {!emailVerified && (
    <button
      type="button"
      className="otp-button"
      onClick={sendOTP}
      disabled={otpSent}
    >
      {otpSent ? "OTP Sent" : "Send OTP"}
    </button>
  )}


  {otpSent && !emailVerified && (
    <div className="verify-section">

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
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





<button

disabled={isPending}

>

{

isPending

?

"Creating..."

:

"Create Account"

}


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


)


>>>>>>> upstream/main
}
 
 
});
 
 
};
 
 
 
 
 
return(
 
 
<div className="register-container">
 
 
<div className="register-card">
 
 
 
 
 
{/* LEFT SIDE */}
 
 
<div className="register-left">
 
 
<div className="orb orb-one"></div>
 
<div className="orb orb-two"></div>
 
 
 
<div className="left-content">
 
 
 
<div className="brand">
 
 
<div className="brand-icon">
 
💬
 
</div>
 
 
<h3>
 
Panda
<span>
Chat
</span>
 
</h3>
 
 
</div>
 
 
 
 
 
 
<h1>
 
Join the
<br/>
 
conversation
<br/>
 
<span>
today.
</span>
 
 
</h1>
 
 
 
<p>
 
Create your account and connect
with friends using private messages
and group chats.
 
</p>
 
 
 
 
 
 
 
<div className="features">
 
 
 
<div className="feature">
 
 
<div>
 
💬
 
</div>
 
 
<span>
 
Instant Messaging
 
</span>
 
 
</div>
 
 
 
 
<div className="feature">
 
 
<div>
 
👥
 
</div>
 
 
<span>
 
Group Chat
 
</span>
 
 
</div>
 
 
 
 
 
<div className="feature">
 
 
<div>
 
🔒
 
</div>
 
 
<span>
 
Secure Communication
 
</span>
 
 
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
 
 
 
<h2>
 
Create Account
 
</h2>
 
 
 
<p className="subtitle">
 
Enter your details to start chatting
 
</p>
 
 
 
 
 
<form
 
className="register-form"
 
onSubmit={
handleSubmit(onSubmit)
}
 
>
 
 
 
 
 
<input
 
type="text"
 
placeholder="Username"
 
{...register(
"username"
)}
 
/>
 
 
<p className="error">
 
{
errors.username?.message
}
 
</p>
 
 
 
 
 
 
 
<input
 
type="email"
 
placeholder="Email"
 
{...register(
"email"
)}
 
/>
 
 
<p className="error">
 
{
errors.email?.message
}
 
</p>
 
 
 
 
 
 
 
<input
 
type="number"
 
placeholder="Phone Number"
 
{...register(
"phone"
)}
 
/>
 
 
<p className="error">
 
{
errors.phone?.message
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
errors.password?.message
}
 
</p>
 
 
 
 
 
 
 
 
<input
 
type="password"
 
placeholder="Confirm Password"
 
{...register(
"confirmPassword"
)}
 
/>
 
 
<p className="error">
 
{
errors.confirmPassword?.message
}
 
</p>
 
 
 
 
 
 
 
 
<button
 
disabled={isPending}
 onClick={onSubmit}
>
 
 
{
 
isPending
?
"Creating..."
:
"Create Account"
 
}
 
 
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