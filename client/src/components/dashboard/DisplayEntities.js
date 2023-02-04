import React from "react";
import { Trash3 } from "react-bootstrap-icons";

function DisplayEntities({ entities, setEntities }) {
  const removeEntity = (entity) => {
    const index = entities.indexOf(entity);
    if (index > -1) {
      setEntities(entities.filter((e, i) => i != index));
    }
  };
  return (
    <div className="row" style={{ marginTop: "50px" }}>
      {entities.map((entity) => (
        <div className="col-lg-3 col-md-6 " style={{ marginTop: "10px" }}>
          <div className="input-group " key={entity.id}>
            <input
              type="text"
              className="form-control "
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={entity}
            />
            <div className="input-group-append ">
              <button
                onClick={() => removeEntity(entity)}
                className="btn btn-outline-secondary"
                type="button"
              >
                <Trash3 color="red" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DisplayEntities;
