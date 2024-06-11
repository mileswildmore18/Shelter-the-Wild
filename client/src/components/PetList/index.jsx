import "./style.css";
import { Link } from "react-router-dom";

const PetList = ({ petData, ownerData }) => {
  // console.log("petData from PetList.jsx:" + JSON.stringify(petData));
  // console.log(
  //   "ownerData from PetList.jsx:" + JSON.stringify(ownerData.username)
  // );

  if (!petData || !petData.length) {
    console.log(
      "petData from after PetList.jsx logic:" + JSON.stringify(petData)
    );
    return <h3>You haven&apos;t added any pets yet!</h3>;
  }

  return (
    <div>
      <h3>Pets</h3>
      {petData.map((pet) => (
        <div key={pet._id}>
          <Link to={`/pet/${pet._id}`}>
            <h3>Name: {pet.petName}</h3>
          </Link>
          {pet.image ? (
            <img
              src={`../../src/assets/images/SVG/${pet.image}`}
              className='petImage'
              alt='Missing Pet'
            ></img>
          ) : (
            <p>Missing Pet Image</p>
          )}
          {/* {console.log("pet.petOwner: " + pet.petOwner)} */}
          {/* Access the petOwner properties */}
          <h4>
            Owner:{" "}
            <p>
              <Link to={`/profile/${pet.petOwner ? pet.petOwner._id : ""}`}>
                {ownerData.username}
              </Link>
            </p>
          </h4>
          <div>
            <p>{pet.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PetList;
