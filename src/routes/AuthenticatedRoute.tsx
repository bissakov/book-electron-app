import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../components/Loading";
import Header from "../components/Header";

interface AuthenticatedRouteProps {
  component: React.ComponentType;
}

const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({
  component: Component,
}) => {
  const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      loginWithRedirect();
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  // if (isLoading) return <Loading />;

  return (
    <>
      <Header
        email={user?.email}
        email_verified={user?.email_verified}
        name={user?.name}
        nickname={user?.nickname}
        picture={user?.picture}
      />
      <Component />
    </>
  );
};

export default AuthenticatedRoute;
