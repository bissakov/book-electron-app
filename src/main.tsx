// import React from "react";
// import ReactDOM from "react-dom/client";
// import WelcomePage from "./routes/Welcome";
// // import App from "./routes/App";
// import SignUpForm from "./routes/SignUpForm";
// import SignInForm from "./routes/SignInForm";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
// import "@fortawesome/fontawesome-svg-core/styles.css";

// library.add(faAngleRight);

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <WelcomePage />,
//   },
//   {
//     path: "/signup",
//     element: <SignUpForm />,
//   },
//   {
//     path: "/signin",
//     element: <SignInForm />,
//   },
// ]);

// // bg-gradient-to-tr from-violet-500 to-fuchsia-500

// ReactDOM.createRoot(document.getElementById("root")!).render(
//   <React.StrictMode>
//     <div className="flex h-screen flex-col items-center justify-center bg-gradient-to-t from-gray-900 to-indigo-900 antialiased">
//       <RouterProvider router={router} />
//     </div>
//   </React.StrictMode>,
// );

// // Remove Preload scripts loading
// postMessage({ payload: "removeLoading" }, "*");

// // Use contextBridge
// window.ipcRenderer.on("main-process-message", (_event, message) => {
//   console.log(message);
// });

import React from "react";
import { createContext, useContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./routes/App";
import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { config } from "../services/config";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const AuthContext = createContext({});

const onRedirectCallback = (appState: AppState | undefined) => {
  history.push(
    appState && appState.returnTo
      ? appState.returnTo
      : window.location.pathname,
  );
};

const providerConfig = {
  domain: config.auth0Domain,
  clientId: config.clientId,
  onRedirectCallback,
  authorizationParams: {
    redirect_uri: window.location.origin,
    ...(config.apiIdentifier ? { audience: config.apiIdentifier } : null),
  },
};

export const useAuth = () => {
  return useContext(AuthContext);
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider {...providerConfig}>
      <App />
    </Auth0Provider>
    ;
  </React.StrictMode>,
);

postMessage({ payload: "removeLoading" }, "*");

window.ipcRenderer.on("main-process-message", (_event, message) => {
  console.log(message);
});
