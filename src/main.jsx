import ReactDOM from "react-dom/client";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import axios from "axios";
import "./index.css";
import { Provider } from "react-redux";
import {
  store,
  persistor,
} from "./redux/store";
import { logout } from "./redux/authSlice";
import {
  PersistGate,
} from "redux-persist/integration/react";
import {
  BrowserRouter,
} from "react-router-dom";
import {
  ToastContainer,
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./App";

 
import { registerSW } from "virtual:pwa-register";
 
registerSW({
  immediate: true,
});
 

const queryClient = new QueryClient();

let isLoggingOut = false;

axios.interceptors.response.use(
  (response) => response,
  async (error) => {

    if (error.response?.status === 401) {

      const code = error.response.data?.code;

      if (
        (
          code === "TOKEN_EXPIRED" ||
          code === "SESSION_EXPIRED" ||
          code === "INVALID_TOKEN"
        ) &&
        !isLoggingOut
      ) {

        isLoggingOut = true;

        try {

          store.dispatch(logout());

          await persistor.purge();

          localStorage.removeItem("token");

          queryClient.clear();

        } finally {

          window.location.replace("/login");

        }

      }

    }

    return Promise.reject(error);

  }
);

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <Provider store={store}>
    <PersistGate
      loading={null}
      persistor={persistor}
    >
      <QueryClientProvider
        client={queryClient}
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>

        <ToastContainer
          position="top-right"
          autoClose={3000}
        />

      </QueryClientProvider>
    </PersistGate>
  </Provider>
);