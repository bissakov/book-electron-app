import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./routes/Home";
import BookPage from "./routes/BookPage";
import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { createBrowserHistory } from "history";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./@/components/ui/theme-provider";
import AuthenticatedRoute from "./routes/AuthenticatedRoute";
import SearchPage from "./routes/SearchPage";
import RecommendationsPage from "./routes/RecommendationsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthenticatedRoute component={Home} />,
  },
  {
    path: "/books/:bookId",
    element: <AuthenticatedRoute component={BookPage} />,
  },
  {
    path: "/search",
    element: <AuthenticatedRoute component={SearchPage} />,
  },
  {
    path: "/search",
    element: <AuthenticatedRoute component={RecommendationsPage} />,
  },
  {
    path: "/recommendations",
    element: <AuthenticatedRoute component={RecommendationsPage} />,
  },
]);

const config = {
  domain: "dev-aapkyq04nrxqdzz4.eu.auth0.com",
  clientId: "YOhtCjTWDUMCJMwznFGRAaL8ojQQns93",
};

const history = createBrowserHistory();

const onRedirectCallback = (appState: AppState | undefined) => {
  history.push(
    appState && appState.returnTo
      ? appState.returnTo
      : window.location.pathname,
  );
};

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  onRedirectCallback,
  authorizationParams: {
    redirect_uri: window.location.origin,
  },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider {...providerConfig}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </Auth0Provider>
  </React.StrictMode>,
);

postMessage({ payload: "removeLoading" }, "*");

window.ipcRenderer.on("main-process-message", (_event, message) => {
  console.log(message);
});
