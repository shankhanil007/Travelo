import React, { Fragment, useState, useContext, useEffect } from "react";
import axios from "axios";
import Search from "./Search";
import AuthContext from "../../context/auth/authContext";
import DisplayEntities from "./DisplayEntities";
import Map from "./Map";

function NerExtract() {
  const authContext = useContext(AuthContext);
  const { user, loadUser } = authContext;

  const [entities, setEntities] = useState([]);
  const extractEntities = async (search) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/entities-recognition",
        search,
        config
      );
      setEntities(res.data.entities);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Search extractEntities={extractEntities} />
      <DisplayEntities entities={entities} setEntities={setEntities} />
      <button
        type="submit"
        class="btn btn-outline-primary"
        style={{ marginTop: "10px" }}
      >
        Get Coordinates
      </button>
      <Map />
    </>
  );
}

export default NerExtract;