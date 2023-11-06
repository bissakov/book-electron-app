import { useAuth0 } from "@auth0/auth0-react";
import SignInForm from "./SignInForm";

const App = () => {
  const { isAuthenticated, logout } = useAuth0();

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <div>
      {isAuthenticated ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <SignInForm />
      )}
      {/* Other components */}
    </div>
  );
};

export default App;
