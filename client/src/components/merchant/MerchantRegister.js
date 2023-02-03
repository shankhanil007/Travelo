import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

const MerchantRegister = () => {

    const RegisterForm = {
        maxWidth: "500px",
        padding: "15px",
        margin: "auto",
        marginTop: "50px",
      };

      const [merchant, setMerchant] = useState({
        name: "",
        email: "",
        phone:"",
        city:"",
        state:"",
        pincode:"",
        address:"",
        latitude:"",
        longitude:"",
      });
    
      const { name, email, phone, city, state, pincode, address, latitude, longitude } = merchant;
    
      const onChange = (e) => setMerchant({ ...merchant, [e.target.name]: e.target.value });
    
      const onSubmit = async (e) => {
        e.preventDefault();
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
          try {
            const res = await axios.post(
              "http://localhost:5000/api/merchant/register",
              merchant,
              config
            );
            console.log(res);
          } catch (err) {
            console.log(err);
          }
        }

    return (
        <div style={RegisterForm}>
          <h1 style={{ textAlign: "center" }}>
            Merchant <span className="text-primary">Register</span>
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                class="form-control"
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                class="form-control"
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Contact Number</label>
              <input
                class="form-control"
                id="phone"
                type="text"
                name="phone"
                value={phone}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                class="form-control"
                id="city"
                type="text"
                name="city"
                value={city}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                class="form-control"
                id="state"
                type="text"
                name="state"
                value={state}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="pincode">Pincode</label>
              <input
                class="form-control"
                id="pincode"
                type="text"
                name="pincode"
                value={pincode }
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                class="form-control"
                id="address"
                type="text"
                name="address"
                value={address}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="latitude">Latitude</label>
              <input
                class="form-control"
                id="latitude"
                type="text"
                name="latitude"
                value={latitude}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="longitude">Longitude</label>
              <input
                class="form-control"
                id="longitude"
                type="text"
                name="longitude"
                value={longitude}
                onChange={onChange}
                required
              />
            </div>
            
            <button type="submit" className="btn btn-primary mt-3" value="Register">
              Register
            </button>
          </form>
         
        </div>
      );
}

export default MerchantRegister

