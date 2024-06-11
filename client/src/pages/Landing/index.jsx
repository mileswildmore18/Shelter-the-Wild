import MissingPetsList from "../../components/MissingPetsList";
import "./style.css";
const Landing = () => {
  return (
    <>
      <h1>Now Missing:</h1>
      <div id='missing-list'>
        <MissingPetsList />
      </div>
    </>
  );
};

export default Landing;
