import ReactDOM from "react-dom/client";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { Provider } from "react-redux";

import {
  store,
  persistor,
} from "./redux/store";

import { PersistGate } from "redux-persist/integration/react";

import {
  BrowserRouter,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import App from "./App";

const queryClient =
  new QueryClient();

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <Provider store={store}>
    <PersistGate
      loading={null}
      persistor={
        persistor
      }
    >
      <QueryClientProvider
        client={
          queryClient
        }
      >
        <BrowserRouter>
          <ToastContainer />

          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </PersistGate>
  </Provider>
);