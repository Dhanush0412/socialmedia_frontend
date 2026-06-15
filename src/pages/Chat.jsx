import { useSelector } from "react-redux";
import { useGetUsers } from "../hooks/useGetUsers";

function Chat() {

  const auth = useSelector(
    (state) => state.auth
  );

  const {
    data,
    isLoading,
  } = useGetUsers();

  if (isLoading) {
    return (
      <h2>
        Loading...
      </h2>
    );
  }

  const user = data?.find(
    (item) =>
      item.email === auth?.email ||
      item.phone === auth?.login ||
      item.username === auth?.login
  );

  return (
    <div
      style={{
        padding: "40px",
        minHeight: "100vh",

        display: "flex",
        flexDirection: "column",

        justifyContent: "center",
        alignItems: "center",

        background:
          "linear-gradient(135deg,#0f172a,#1e293b)",

        color: "#fff",
      }}
    >

      <div
        style={{
          width: "420px",

          padding: "40px",

          borderRadius: "20px",

          background:
            "rgba(255,255,255,0.08)",

          backdropFilter:
            "blur(12px)",

          textAlign: "center",

          boxShadow:
            "0 10px 30px rgba(0,0,0,.3)",
        }}
      >

        <h1
          style={{
            marginBottom: "12px",
          }}
        >
          Welcome
          {" "}
          {
            user?.username ||
            "User"
          }
        </h1>

        <p
          style={{
            color:
              "#cbd5e1",

            fontSize:
              "16px",
          }}
        >
          Enjoy chatting
        </p>

      </div>

    </div>
  );
}

export default Chat;