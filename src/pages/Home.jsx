import "../css/Home.css";

import {
  Link
} from "react-router-dom";

function Home(){

  return(

    <div className="home-page">

      <div className="home-card">

        <div className="home-content">

          <h1>
            Welcome to
            <span>
              {" "}
              Chat Connect 💬
            </span>
          </h1>

          <p>
            Connect with your friends,
            share messages and enjoy
            conversations in a simple
            and secure way.
          </p>

          <div className="home-buttons">

            <Link
              to="/login"
              className="login-link"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="register-link"
            >
              Create Account
            </Link>

          </div>

        </div>


        <div className="home-image">

          <div className="chat-box">

            <div className="message received">
              Hey 👋
            </div>

            <div className="message sent">
              Hello! How are you?
            </div>

            <div className="message received">
              Let's start chatting 🚀
            </div>

          </div>

        </div>


      </div>

    </div>

  );

}

export default Home;