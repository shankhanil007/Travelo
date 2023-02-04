import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import axios from "axios";
import Search from "./Search";
import AuthContext from "../../context/auth/authContext";
import DisplayEntities from "./DisplayEntities";
import Map from "./Map";
import Navbar from '../layout/Navbar'

function NerExtract() {
  
  const authContext = useContext(AuthContext);
  const { user, loadUser } = authContext;

  const [city, setCity] = useState("");
  const [entities, setEntities] = useState([]);
  const [entityDetails, setEntityDetails] = useState([]);
  const [entityDisplay, setEntityDisplay] = useState(false)
  const extractEntities = async (search) => {
    setCity(search.city);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/entities-recognition",
        search,
        config
      );
      setEntities(res.data.entities);
      setEntityDisplay(true)
    } catch (err) {
      console.log(err);
    }
  };

  const getEntityDetails = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/geo-details",
        entities,
        config
      );
      setEntityDetails(res.data);
      
      console.log(entityDetails);
      childRef.current.getAlert();
    } catch (err) {
      console.log(err);
    }
  };

  const loadLocalBusiness = async () => {
    childRef.current.getLocalBusinessDetails();
  };

  const childRef = useRef();

  return (
    <>
      <Navbar />
      <Search extractEntities={extractEntities} setCity={setCity} entityDisplay={entityDisplay} />
      <DisplayEntities entities={entities} setEntities={setEntities} />
      <button
        onClick={() => getEntityDetails()}
        class="btn btn-outline-primary"
        style={{ marginTop: "10px", display:  entityDisplay ? 'block' : 'none', marginTop:"40px"}}
      >
        Get Coordinates
      </button>
      
      <button
        onClick={() => loadLocalBusiness()}
        class="btn btn-outline-primary"
        style={{ marginTop: "10px", display:  entityDisplay ? 'block' : 'none', marginTop:"40px"}}
      >
        Load Local Business
      </button>
      <Map ref={childRef} entityDetails={entityDetails} city={city} />
    </>
  );
}

export default NerExtract;
