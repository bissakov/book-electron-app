import React, { createContext, useContext } from "react";
import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { config } from "../../services/config";
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

export const AuthProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return <Auth0Provider {...providerConfig}>{children}</Auth0Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
