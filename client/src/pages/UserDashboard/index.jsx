import { useQuery } from "@apollo/client";
import { Navigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react"; // Import useState

import PetForm from "../../components/PetForm";
import PetList from "../../components/PetList";
import { QUERY_ME, QUERY_USER } from "../../utils/queries";
import Auth from "../../utils/auth";

const UserDashboard = () => {
  const { profileId } = useParams();
  const { loading, error, data } = useQuery(profileId ? QUERY_USER : QUERY_ME, {
    variables: { userId: profileId },
  });

  const [refreshPets, setRefreshPets] = useState(false); // State to trigger pet list refresh

  useEffect(() => {
    if (refreshPets) {
      // Do something when refreshPets changes (e.g., refetch data)
      // You can add your logic here to refetch the pet list
      // Example: refetchDataFunction();
      // Once data is refetched, you can setRefreshPets(false);
    }
  }, [refreshPets]);

  const user = data?.user || data?.me || {};
  // console.log(user, user.username);
  if (!Auth.loggedIn()) {
    // Redirect unauthenticated users to the login page
    return <Navigate to='/login' />;
  }

  const handlePetAdded = () => {
    // Callback function to trigger pet list refresh
    setRefreshPets(true);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <div>
        <h2>Viewing {profileId ? `${user.username}'s` : "your"} profile.</h2>

        <div>
          <PetList
            pets={user.pets}
            title={`${user.username}'s pets...`}
            refresh={() => setRefreshPets(true)} // Trigger refresh on function call
          />
        </div>
        {!profileId && (
          <div>
            <PetForm onPetAdded={handlePetAdded} />
            {/* Pass the callback function */}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
