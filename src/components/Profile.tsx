import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    return <div>User is not authenticated</div>;
  }

  return (
    <div>
      <img src={user?.picture} alt={user?.name} />
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>
    </div>
  );
};

export default Profile;
