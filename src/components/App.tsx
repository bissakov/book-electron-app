import { useAuth0 } from "@auth0/auth0-react";
import Home from "./Home";
import { useEffect, useState } from "react";

const App = () => {
  const profile = window.electron.getProfile();
  console.log({ profile });

  // const {
  //   error,
  //   isAuthenticated,
  //   isLoading,
  //   user,
  //   getAccessTokenSilently,
  //   getIdTokenClaims,
  //   loginWithRedirect,
  //   loginWithPopup,
  //   logout,
  // } = useAuth0();
  // const [savedToken, setSavedToken] = useState<string | null>(null);
  // if (!isAuthenticated) {
  //   window.electron.logOut();
  // }
  return <div>sads</div>;

  // useEffect(() => {
  //   const token = window.electron.readEncryptedToken();
  //   console.log({ token });
  //   if (token) {
  //     setSavedToken(token);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     getAccessTokenSilently().then(async (token) => {
  //       console.log({ token });
  //       if (!token) {
  //         return;
  //       }
  //       window.electron.storeEncryptedToken(token);
  //       setSavedToken(token);
  //     });
  //   }
  // }, [isAuthenticated, getAccessTokenSilently]);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }
  // if (error) {
  //   return <div>Oops... {error.message}</div>;
  // }

  // if (isAuthenticated) {
  //   return (
  //     <div>
  //       Hello {user?.name}{" "}
  //       <button
  //         onClick={() =>
  //           logout({ logoutParams: { returnTo: window.location.origin } })
  //         }
  //       >
  //         Log out
  //       </button>
  //     </div>
  //   );
  // } else {
  //   return <button onClick={() => loginWithRedirect()}>Log in</button>;
  // }
};

export default App;
